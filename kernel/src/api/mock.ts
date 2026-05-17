import { IKernelAPI } from './index';
import { DocumentNode } from './types';

/**
 * Bản giả lập Lõi (Mock Kernel) sử dụng LocalStorage.
 * Dùng để cấp cho Collab Dev code UI trong lúc chờ bạn xây dựng Lõi thực (SQLite/WatermelonDB).
 */
export class MockKernel implements IKernelAPI {
  private readonly STORAGE_KEY = 'TEAMATE_MOCK_DB';
  private networkCallbacks: ((isOnline: boolean) => void)[] = [];

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }

    window.addEventListener('online', () => this.notifyNetworkChange(true));
    window.addEventListener('offline', () => this.notifyNetworkChange(false));
  }

  private readDB(): DocumentNode[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private writeDB(data: DocumentNode[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private generateId(): string {
    return 'mock_' + Math.random().toString(36).substring(2, 15);
  }

  async getDocuments<T = any>(type: string): Promise<DocumentNode<T>[]> {
    const db = this.readDB();
    // Bỏ qua những bản ghi đã bị soft-delete
    return db.filter(doc => doc.type === type && doc.deleted_at === null) as DocumentNode<T>[];
  }

  async getDocument<T = any>(id: string): Promise<DocumentNode<T> | null> {
    const db = this.readDB();
    const doc = db.find(d => d.id === id && d.deleted_at === null);
    return (doc as DocumentNode<T>) || null;
  }

  async insertDocument<T = any>(type: string, payload: T): Promise<string> {
    const db = this.readDB();
    const now = Date.now();
    
    const newDoc: DocumentNode<T> = {
      id: this.generateId(),
      type,
      payload,
      owner_id: 'mock_teacher_1',
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_synced: false // Mock data mặc định chưa đồng bộ
    };

    db.push(newDoc as unknown as DocumentNode);
    this.writeDB(db);
    return newDoc.id;
  }

  async updateDocument<T = any>(id: string, payload: Partial<T>): Promise<boolean> {
    const db = this.readDB();
    const index = db.findIndex(d => d.id === id);
    
    if (index === -1) return false;

    db[index].payload = { ...db[index].payload, ...payload };
    db[index].updated_at = Date.now();
    db[index].is_synced = false; // Sửa đổi thì cần sync lại

    this.writeDB(db);
    return true;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const db = this.readDB();
    const index = db.findIndex(d => d.id === id);
    
    if (index === -1) return false;

    db[index].deleted_at = Date.now();
    db[index].is_synced = false; // Đánh dấu để server biết xóa

    this.writeDB(db);
    return true;
  }

  async syncNow(): Promise<void> {
    console.log('[MockKernel] Đang giả lập quá trình đồng bộ lên server...');
    const db = this.readDB();
    
    // Giả lập thành công: đổi tất cả is_synced = false thành true
    const updatedDb = db.map(doc => ({
      ...doc,
      is_synced: true
    }));
    
    this.writeDB(updatedDb);
    console.log('[MockKernel] Đồng bộ thành công!');
  }

  onNetworkChange(callback: (isOnline: boolean) => void): void {
    this.networkCallbacks.push(callback);
    // Bắn trạng thái hiện tại ngay lập tức khi dev đăng ký lắng nghe
    callback(navigator.onLine);
  }

  private notifyNetworkChange(isOnline: boolean) {
    this.networkCallbacks.forEach(cb => cb(isOnline));
  }
}
