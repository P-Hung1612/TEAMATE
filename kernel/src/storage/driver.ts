import { DocumentNode } from '../api/types';

/**
 * Cổng giao tiếp chung cho các bộ lưu trữ dữ liệu (Database Drivers).
 * Giúp hoán đổi dễ dàng giữa IndexedDB (Web) và SQLite (Desktop/Tauri).
 */
export interface IStorageDriver {
  /**
   * Khởi tạo kết nối database và các bảng
   */
  init(): Promise<void>;

  /**
   * Lấy một tài liệu bằng ID
   */
  get<T = any>(id: string): Promise<DocumentNode<T> | null>;

  /**
   * Lấy tất cả tài liệu có cùng type (VD: 'lesson_log')
   */
  getAll<T = any>(type: string): Promise<DocumentNode<T>[]>;

  /**
   * Lưu hoặc cập nhật một tài liệu
   */
  save<T = any>(doc: DocumentNode<T>): Promise<void>;

  /**
   * Xóa một tài liệu (Soft delete hoặc Hard delete vật lý tùy cấu hình)
   */
  delete(id: string): Promise<void>;
}
