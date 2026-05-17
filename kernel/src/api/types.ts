/**
 * Giao thức lưu trữ vạn năng cho mọi Plugin.
 * Dữ liệu nghiệp vụ sẽ nằm bên trong thuộc tính `payload`.
 */
export interface DocumentNode<T = Record<string, any>> {
  id: string;               // UUID v4. VD: 'doc_123...'
  type: string;             // Xác định Plugin nào quản lý. VD: 'lesson_log', 'rubric'
  payload: T;               // Dữ liệu thực tế của Plugin dưới dạng JSON object
  owner_id: string;         // ID của giáo viên tạo (cho chức năng Auth sau này)
  created_at: number;       // Unix timestamp (milliseconds)
  updated_at: number;       // Unix timestamp (Dùng cho Last-write-wins resolution)
  deleted_at: number | null; // Unix timestamp nếu bị xóa (Soft delete)
  is_synced: boolean;       // Trạng thái đã đẩy lên server thành công chưa
}
