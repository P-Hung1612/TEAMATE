import Dexie, { Table } from 'dexie';
import { IStorageDriver } from './driver';
import { DocumentNode } from '../api/types';

/**
 * Lớp cơ sở dữ liệu Dexie (IndexedDB)
 */
class TeamateDB extends Dexie {
  documents!: Table<DocumentNode, string>;

  constructor() {
    super('TEAMATE_LOCAL_DB');
    // Định nghĩa bảng 'documents' và các chỉ số (index) để tìm kiếm nhanh
    this.version(1).stores({
      documents: 'id, type, is_synced, deleted_at'
    });
  }
}

/**
 * Trình điều khiển IndexedDB sử dụng thư viện Dexie.
 * Dùng cho các môi trường chạy trên Trình duyệt / Web / PWA.
 */
export class DexieDriver implements IStorageDriver {
  private db!: TeamateDB;

  async init(): Promise<void> {
    this.db = new TeamateDB();
    await this.db.open();
    console.log('[DexieDriver] IndexedDB đã được khởi tạo thành công.');
  }

  async get<T = any>(id: string): Promise<DocumentNode<T> | null> {
    const doc = await this.db.documents.get(id);
    // Nếu không tìm thấy hoặc đã bị soft-delete thì coi như không tồn tại
    if (!doc || doc.deleted_at !== null) return null;
    return doc as DocumentNode<T>;
  }

  async getAll<T = any>(type: string): Promise<DocumentNode<T>[]> {
    // Truy vấn tất cả tài liệu có type tương ứng và chưa bị xóa mềm
    const docs = await this.db.documents
      .where('type')
      .equals(type)
      .filter(doc => doc.deleted_at === null)
      .toArray();
    return docs as DocumentNode<T>[];
  }

  async save<T = any>(doc: DocumentNode<T>): Promise<void> {
    await this.db.documents.put(doc as any);
  }

  async delete(id: string): Promise<void> {
    const doc = await this.db.documents.get(id);
    if (doc) {
      doc.deleted_at = Date.now();
      doc.is_synced = false; // Đánh dấu để Sync Engine biết và xóa trên Cloud sau này
      await this.db.documents.put(doc);
    }
  }
}
