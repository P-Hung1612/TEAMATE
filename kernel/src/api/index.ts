import { DocumentNode } from './types';

export * from './types';
export * from './mock';

/**
 * Hợp đồng giao tiếp (Interface) giữa Lõi (Kernel) và Các Module Nghiệp vụ (Plugins).
 * Mọi plugin BẮT BUỘC phải gọi qua API này để tương tác với dữ liệu.
 */
export interface IKernelAPI {
  /**
   * Truy vấn danh sách tài liệu theo loại
   */
  getDocuments<T = any>(type: string): Promise<DocumentNode<T>[]>;

  /**
   * Truy vấn một tài liệu cụ thể bằng ID
   */
  getDocument<T = any>(id: string): Promise<DocumentNode<T> | null>;

  /**
   * Thêm mới một tài liệu. Tự động sinh ID, timestamp.
   * @returns Trả về ID của tài liệu vừa tạo
   */
  insertDocument<T = any>(type: string, payload: T): Promise<string>;

  /**
   * Cập nhật nội dung tài liệu. Tự động cập nhật `updated_at`.
   * @returns true nếu thành công
   */
  updateDocument<T = any>(id: string, payload: Partial<T>): Promise<boolean>;

  /**
   * Xóa mềm (Soft delete) một tài liệu.
   * @returns true nếu thành công
   */
  deleteDocument(id: string): Promise<boolean>;

  /**
   * Kích hoạt đồng bộ đẩy lên Server ngay lập tức.
   */
  syncNow(): Promise<void>;

  /**
   * Đăng ký callback theo dõi trạng thái mạng (Online/Offline)
   */
  onNetworkChange(callback: (isOnline: boolean) => void): void;
}
