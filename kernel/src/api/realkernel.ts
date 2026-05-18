import { IKernelAPI } from './index';
import { DocumentNode } from './types';
import { IStorageDriver } from '../storage/driver';

/**
 * Lõi thực tế (Real Kernel) của hệ thống.
 * Kết nối trực tiếp với tầng lưu trữ (Storage Driver) để thao tác dữ liệu thực tế.
 */
export class RealKernel implements IKernelAPI {
  private readonly driver: IStorageDriver;
  private networkCallbacks: ((isOnline: boolean) => void)[] = [];

  constructor(driver: IStorageDriver) {
    this.driver = driver;

    // Lắng nghe sự kiện thay đổi trạng thái mạng nếu chạy trong môi trường trình duyệt
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.notifyNetworkChange(true));
      window.addEventListener('offline', () => this.notifyNetworkChange(false));
    }
  }

  /**
   * Tạo mã UUID v4 ngẫu nhiên cho tài liệu mới
   */
  private generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    // Thuật toán fallback sinh UUID v4 thủ công nếu môi trường không hỗ trợ
    return 'doc_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  }

  async getDocuments<T = any>(type: string): Promise<DocumentNode<T>[]> {
    return this.driver.getAll<T>(type);
  }

  async getDocument<T = any>(id: string): Promise<DocumentNode<T> | null> {
    return this.driver.get<T>(id);
  }

  async insertDocument<T = any>(type: string, payload: T): Promise<string> {
    const now = Date.now();
    const id = this.generateId();

    const newDoc: DocumentNode<T> = {
      id,
      type,
      payload,
      owner_id: 'teacher_1', // Tạm thời giả lập teacher_1, sẽ cập nhật khi có Auth
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_synced: false // Bản ghi mới tạo chưa được đồng bộ lên Cloud
    };

    await this.driver.save(newDoc);
    return id;
  }

  async updateDocument<T = any>(id: string, payload: Partial<T>): Promise<boolean> {
    const doc = await this.driver.get<T>(id);
    if (!doc) {
      return false;
    }

    // Cập nhật payload và các siêu dữ liệu
    doc.payload = { ...doc.payload, ...payload };
    doc.updated_at = Date.now();
    doc.is_synced = false; // Đã chỉnh sửa thì cần được đồng bộ lại

    await this.driver.save(doc);
    return true;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const doc = await this.driver.get(id);
    if (!doc) {
      return false;
    }

    // Thực hiện xóa mềm thông qua driver
    await this.driver.delete(id);
    return true;
  }

  async syncNow(): Promise<void> {
    console.log('[RealKernel] Đang kích hoạt đồng bộ dữ liệu cục bộ với Cloud Server...');
    // TODO: Sẽ tích hợp Sync Engine chi tiết ở Phase sau
  }

  onNetworkChange(callback: (isOnline: boolean) => void): void {
    this.networkCallbacks.push(callback);
    // Bắn trạng thái mạng hiện tại ngay lập tức khi đăng ký
    if (typeof navigator !== 'undefined') {
      callback(navigator.onLine);
    } else {
      callback(true);
    }
  }

  private notifyNetworkChange(isOnline: boolean) {
    this.networkCallbacks.forEach(cb => cb(isOnline));
  }
}
