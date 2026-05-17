# Danh Sách Công Việc (Task List) - Giai Đoạn MVP

Bảng phân chia công việc dưới đây được thiết kế để **Bạn (Product Owner/Kernel Developer)** và **Collab Dev (Plugin Developer)** có thể làm việc song song hoàn toàn, không ai phải đợi ai. 

Chìa khóa để làm việc song song là định nghĩa trước **Kernel API Contract** (Giao thức giao tiếp giữa Lõi và Plugin). Collab Dev sẽ dùng Mock API (dữ liệu giả) để code UI, trong khi bạn code Lõi thực tế.

---

## 🚀 PHASE 1: Thiết Lập Nền Tảng (1-2 Ngày)

| Người phụ trách | Task (Tên nhánh đề xuất) | Mô tả công việc |
| :--- | :--- | :--- |
| **Bạn** | `feature/kernel-api-contract` | - Định nghĩa Interface (TypeScript) cho Kernel API (VD: `insertDocument()`, `getDocuments()`).<br>- Viết một "Mock Kernel" trả về dữ liệu giả để đưa cho Collab Dev. |
| **Collab Dev** | `feature/plugin-scaffolding` | - Khởi tạo React (Vite) bên trong thư mục `plugins/class-register` và `plugins/lesson-planner`.<br>- Cài đặt TailwindCSS / UI Library (MUI, Radix, v.v.). |

*(Sau Phase 1, hai người thống nhất cái Hợp đồng API và bắt đầu code tách biệt).*

---

## 🚀 PHASE 2: Phát Triển Độc Lập (1-2 Tuần)

### Phần việc của Bạn (The Kernel)
Trọng tâm: Đảm bảo dữ liệu lưu được offline và cấu trúc vững chắc.
- [ ] **Task:** Thiết lập Local Database (`feature/kernel-storage`)
  - Tích hợp SQLite hoặc WatermelonDB vào thư mục `/kernel`.
  - Tạo bảng `Documents` linh hoạt (như đã quy định trong SRS).
- [ ] **Task:** Xử lý logic CRUD (`feature/kernel-crud`)
  - Viết code thực thi các lệnh Thêm/Đọc/Sửa/Xóa cho bảng `Documents`.
- [ ] **Task:** Cơ chế Sync ngầm (`feature/kernel-sync-engine`)
  - Viết logic theo dõi trạng thái mạng. Đánh dấu `is_synced` khi mất mạng.

### Phần việc của Collab Dev (The Plugins)
Trọng tâm: Làm UI thật đẹp, luồng đi thật mượt. Cứ dùng Mock API để lấy dữ liệu.
- [ ] **Task:** Giao diện Sổ Đầu Bài (`feature/class-register-ui`)
  - Giao diện lịch tuần, form nhập điểm danh, ghi chú tiết học.
- [ ] **Task:** Giao diện Giáo Án 5512 (`feature/lesson-planner-ui`)
  - Tích hợp Text Editor (Quill/TipTap). Form nhập khung giáo án.
- [ ] **Task:** Giao diện Chấm Bài (`feature/grading-ui`)
  - Giao diện tạo Rubric kéo thả, bảng nhập điểm học sinh.

---

## 🚀 PHASE 3: Tích Hợp (Integration) (3-5 Ngày)

Đây là lúc ghép "Lõi thật" của Bạn vào "Giao diện thật" của Dev.

| Người phụ trách | Task | Mô tả công việc |
| :--- | :--- | :--- |
| **Cùng làm** | Gỡ bỏ Mock API | Thay thế các lời gọi hàm Mock bằng Kernel API thực sự. |
| **Bạn** | Tích hợp vào `/app` | Lắp ráp Kernel và các Plugins vào ứng dụng vỏ bọc chính (`/app/src/main.tsx`). Đảm bảo routing hoạt động. |
| **Cùng làm** | Test Offline | Tắt Wifi. Mở app lên thử viết sổ đầu bài, soạn giáo án xem Local DB có lưu đúng không. Bật Wifi xem trạng thái sync. |

---

## 💡 Mẹo để hoàn thành MVP nhanh nhất:
1. **Bỏ qua Đồng bộ Server (Sync) ở tuần đầu tiên.** Hãy tập trung 100% làm cho app chạy mượt Offline trên Local DB trước. Tính năng "Đẩy lên Server" làm sau cùng.
2. **Collab Dev không cần biết SQL.** Dev cứ tạo object JSON rồi gọi `Kernel.insert("lesson", { object JSON })`. Mọi chuyện lưu trữ phức tạp là việc của bạn.
