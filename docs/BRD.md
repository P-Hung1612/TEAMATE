# Tài liệu Yêu cầu Nghiệp vụ (BRD – Business Requirements Document)
Dự án: TEAMATE (Phiên bản: 1.0 - Theo kiến trúc Micro-kernel & Open Ecosystem)
Ngày: 15/05/2026

## 1. Mục tiêu nghiệp vụ (đo lường được)
| Mã | Mục tiêu | Chỉ số thành công |
| :--- | :--- | :--- |
| **BR‑GOAL1** | Hệ thống cốt lõi vững chắc | 100% dữ liệu hoạt động offline độc lập; đồng bộ thành công khi kết nối lại mạng (không mất dữ liệu). |
| **BR‑GOAL2** | Giảm thời gian hành chính | Sổ đầu bài: giảm 80% thời gian. Chấm bài: giảm 60% thời gian. |
| **BR‑GOAL3** | Phát triển cộng đồng nội dung | Đạt 1.000 lượt chia sẻ/tải về các Template giáo án và Rubric trong 3 tháng đầu. |

## 2. Yêu cầu hệ thống cốt lõi (The Kernel)
Hạt nhân của ứng dụng không chứa nghiệp vụ, chỉ phục vụ các yêu cầu kỹ thuật nền tảng để các Plugin chạy trên đó.

| Mã | Mô tả | Ghi chú |
| :--- | :--- | :--- |
| **BR-K01** | **Quản lý dữ liệu cục bộ (Local DB):** Lưu trữ linh hoạt dạng Document (JSON) để không giới hạn cấu trúc dữ liệu của các Plugin sau này. | Hoạt động 100% offline. |
| **BR-K02** | **Đồng bộ ngầm (Sync Engine):** Tự động phát hiện trạng thái mạng và đồng bộ dữ liệu hai chiều (Local ↔ Server) theo cơ chế "Last Write Wins". | Xử lý hoàn toàn trong background. |
| **BR-K03** | **Quản lý Plugin (Plugin Manager):** Cho phép kích hoạt/vô hiệu hóa các Module nghiệp vụ (VD: Tắt module Chấm bài nếu không cần). | Giao diện quản lý chung. |
| **BR-K04** | **Bảo mật & Định danh:** Mã hóa dữ liệu cục bộ. Quản lý phiên đăng nhập của giáo viên. | Mã hóa AES-256. |

## 3. Yêu cầu các Module Nghiệp vụ (The Plugins - MVP)

### 3.1. Plugin: Sổ đầu bài điện tử (Class Register)
| Mã | Mô tả | Ghi chú |
| :--- | :--- | :--- |
| **BR‑P1.1** | Ghi nội dung tiết học (ngày, tiết, bài dạy) và điểm danh học sinh. | Lưu trữ qua giao thức của Kernel. |
| **BR‑P1.2** | Tổng hợp báo cáo chuyên cần theo tuần/tháng. Sinh sổ dạng bảng Excel mẫu Bộ GD&ĐT. |  |

### 3.2. Plugin: Soạn giáo án thông minh & Cộng đồng (Lesson Planner)
| Mã | Mô tả | Ghi chú |
| :--- | :--- | :--- |
| **BR‑P2.1** | Trình soạn thảo văn bản giàu tính năng theo khung Công văn 5512. Xuất DOCX/PDF. | Chạy offline. |
| **BR‑P2.2** | **Marketplace Nội bộ:** Chức năng cho phép giáo viên "Đóng gói" giáo án thành Template và chia sẻ lên Server cộng đồng. | Nền tảng Open Content. |
| **BR‑P2.3** | Tìm kiếm và tải Template từ cộng đồng về Local DB để sử dụng ngoại tuyến. Gợi ý nội dung siêu nhanh. |  |

### 3.3. Plugin: Chấm bài & Rubric (Grading Module)
| Mã | Mô tả | Ghi chú |
| :--- | :--- | :--- |
| **BR‑P3.1** | Cho phép tạo cấu trúc Rubric (Thang điểm). Chấm điểm tự luận/trắc nghiệm đơn giản. |  |
| **BR‑P3.2** | **Chia sẻ Rubric:** Cho phép chia sẻ các cấu trúc Rubric tiêu chuẩn lên Marketplace để giáo viên khác tải về dùng. |  |

## 4. Yêu cầu phi chức năng (NFRs)
- **NFR-1 (Kiến trúc linh hoạt):** Cấu trúc dữ liệu phải hỗ trợ Dynamic Schema. Việc thêm một Plugin mới (VD: Quản lý quỹ lớp) trong tương lai KHÔNG ĐƯỢC yêu cầu phải cập nhật lại database schema của Kernel.
- **NFR-2 (Hiệu năng Lõi):** Kernel khởi động dưới 2 giây. Các Plugin được load bất đồng bộ (Lazy Load) để không làm chậm quá trình khởi động.
- **NFR-3 (Bảo toàn dữ liệu):** Trong mọi trường hợp xung đột dữ liệu đa thiết bị, không được xóa trắng dữ liệu mà phải áp dụng quy tắc lưu phiên bản (Version retention) theo thời gian.
