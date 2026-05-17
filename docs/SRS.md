# Tài liệu Đặc tả Yêu cầu Kỹ thuật (SRS – Software Requirements Specification)
Dự án: TEAMATE (Phiên bản: 1.0 - Kiến trúc Micro-kernel)
Ngày: 15/05/2026

## 1. Kiến trúc hệ thống tổng quan (Micro-kernel Architecture)

Ứng dụng không được xây dựng như một khối Monolith nguyên khối. Thay vào đó, kiến trúc được chia làm 2 tầng rõ rệt:

1. **The Kernel (Lõi hệ thống):** Cung cấp các dịch vụ nền tảng (Lưu trữ, Đồng bộ, Mã hóa, Quản lý Plugin). Viết bằng Rust (qua Tauri) hoặc một lõi JS siêu nhẹ kết nối với SQLite/WatermelonDB.
2. **The User Space (Các Plugin):** Các tính năng nghiệp vụ như Sổ đầu bài, Giáo án, Chấm điểm được viết dưới dạng các thành phần UI (React Components) tải động (Lazy Load) và giao tiếp với Kernel qua một API chuẩn.

*   **Công nghệ đề xuất:** Tauri + React + TypeScript + SQLite (hoặc WatermelonDB).
*   **Mục tiêu:** Cài đặt dễ dàng như Desktop App, chạy siêu nhẹ (RAM < 500MB), lưu dữ liệu siêu tốc trên HDD.

## 2. Mô hình Dữ liệu Lõi (The Kernel Data Model)

Khác với các ứng dụng truyền thống, Kernel **KHÔNG** chứa các bảng như `Students`, `Lessons`. Để các Plugin có thể tự do mở rộng, toàn bộ dữ liệu nghiệp vụ được lưu dưới dạng Document (NoSQL-style) bên trong SQLite.

### 2.1. Cấu trúc Bảng `Documents` (Nơi chứa mọi thứ)
```typescript
interface DocumentNode {
  id: string;             // UUID v4. VD: 'doc_123'
  type: string;           // Xác định Plugin xử lý. VD: 'student', 'lesson_plan', 'rubric'
  payload: string;        // Chuỗi JSON chứa dữ liệu thực tế do Plugin định nghĩa
  created_at: number;     // Unix timestamp
  updated_at: number;     // Dùng để xử lý xung đột đồng bộ (Last-write-wins)
  deleted_at: number | null; // Soft-delete
  is_synced: boolean;     // Trạng thái đẩy lên Server
  owner_id: string;       // ID của giáo viên tạo ra dữ liệu này
}
```

### 2.2. Schema của các Plugin (Được lưu trong `payload`)
Các Plugin phải tự định nghĩa và parse cấu trúc JSON của mình.
*   **Plugin Sổ đầu bài (`type: 'lesson_log'`):**
    `payload`: `{ classId: "...", date: "...", period: 3, subject: "Toán", attendance: [...], notes: "..." }`
*   **Plugin Giáo án (`type: 'lesson_plan'`):**
    `payload`: `{ subject: "Văn", topic: "Chiều tối", content: "<html>...", fromTemplateId: "..." }`

## 3. Đặc tả Yêu cầu cho The Kernel

### 3.1. Dịch vụ Lưu trữ & Trạng thái Offline (SRS-K01)
*   Kernel phải cung cấp API chuẩn cho các Plugin: `insert(type, payload)`, `query(type, filters)`, `update(id, payload)`.
*   Mọi thao tác ghi phải mất `< 10ms` và hoàn toàn offline.

### 3.2. Cơ chế Đồng bộ (The Sync Engine) (SRS-K02)
*   **Background Worker:** Khi có mạng, Kernel ngầm quét các `DocumentNode` có `is_synced == false` và đẩy lên Server.
*   **Conflict Resolution:** Nếu Server báo ID tài liệu đó đã bị sửa đổi ở một thiết bị khác, Kernel so sánh `updated_at`. Phiên bản nào có timestamp lớn hơn (mới nhất) sẽ được giữ lại.
*   Dữ liệu đồng bộ là chuỗi JSON, Server không cần quan tâm bên trong JSON có gì.

### 3.3. Dịch vụ Quản lý Plugin (SRS-K03)
*   Hệ thống có một trang "Marketplace" nội bộ. Cho phép giáo viên bật/tắt các Plugin.
*   Khi tắt Plugin "Sổ đầu bài", các `DocumentNode` thuộc type `lesson_log` vẫn nằm an toàn trong DB, chỉ là UI của Plugin đó bị ẩn đi.

## 4. Đặc tả Yêu cầu cho The Plugins (User Space)

### 4.1. Plugin: Sổ đầu bài điện tử (MVP)
*   **Giao diện:** React Component render lịch tuần.
*   **Hành động:** Khi giáo viên điểm danh, Plugin tạo ra cục JSON payload mới và gọi `Kernel.update(id, newPayload)`.

### 4.2. Plugin: Soạn giáo án cộng đồng (MVP)
*   **Trình soạn thảo:** Tích hợp TipTap hoặc QuillJS (hoạt động offline).
*   **Hành động xuất bản:** Giáo viên bấm "Chia sẻ làm mẫu". Plugin tạo một `DocumentNode` với type `shared_template` và gọi lệnh đẩy lên Server Cộng Đồng để người khác tải về.
*   **Gợi ý siêu nhanh:** Tìm kiếm chuỗi (Full-text search) trong các JSON payload của kho template local.

### 4.3. Plugin: Chấm bài & Rubric (MVP)
*   Cho phép thiết kế Rubric (thêm bớt tiêu chí, định mức điểm).
*   Lưu toàn bộ bảng điểm của một lớp trong một `DocumentNode` duy nhất để tối ưu đọc/ghi cục bộ.

## 5. Ràng buộc Kỹ thuật
*   **Bảo mật:** Dữ liệu trong SQLite phải được mã hóa ở cấp độ file (vd: SQLCipher) bằng key hash từ mật khẩu đăng nhập của giáo viên.
*   **Độc lập hạ tầng:** Server đóng vai trò như một cái "Hub" ngu ngốc (Dumb Server). Server chỉ nhận JSON, lưu JSON và trả JSON, không can thiệp logic nghiệp vụ. Logic sinh ra HTML xuất Excel hay Word phải nằm ở Plugin dưới Client.
