# Tầm nhìn chiến lược Dự án TEAMATE
(“Giảm tải cho thầy cô, xây dựng hệ sinh thái giáo dục mở”)

## 1. Tầm nhìn chiến lược
TEAMATE không chỉ là một phần mềm quản lý giảng dạy đơn thuần. Lấy cảm hứng từ triết lý hạt nhân của Linux, TEAMATE hướng tới việc trở thành một **Nền tảng mở (Open Platform) và Hệ sinh thái giáo dục**, nơi cung cấp một "Lõi hệ thống" (Kernel) siêu nhẹ, bền bỉ với khả năng hoạt động offline xuất sắc. 

Trên nền tảng lõi đó, mọi nghiệp vụ sư phạm (Sổ đầu bài, Giáo án, Chấm bài) đều là các **Module (Plugin)** có thể tùy ý tháo lắp. Cùng với đó là một cộng đồng giáo viên chia sẻ "mã nguồn mở" về mặt nội dung (giáo án mẫu, rubric, phương pháp dạy).

## 2. Giá trị cốt lõi
1. **Kiến trúc Lõi vi mô (Micro-kernel):** Hệ thống cốt lõi chỉ làm nhiệm vụ lưu trữ, mã hóa và đồng bộ dữ liệu. Nó siêu nhẹ, cực nhanh, không bao giờ sập và không bị ràng buộc bởi các nghiệp vụ phức tạp.
2. **Offline-first 100%:** Dữ liệu là của giáo viên, nằm trên máy giáo viên. Mọi thao tác được thực thi tức thì không độ trễ, giải quyết triệt để bài toán mạng internet ở trường học.
3. **Hệ sinh thái Mở (Open Ecosystem):** Mọi tính năng là các Module độc lập. Nội dung giáo dục (Template giáo án, Rubric) được chia sẻ tự do trong cộng đồng người dùng như một dạng "Open Source".
4. **Giảm tải triệt để:** Tự động hóa các khâu hành chính, giải phóng thời gian cho giáo viên để tập trung vào chuyên môn.

## 3. Lộ trình sản phẩm (Roadmap)
| Giai đoạn | Mục tiêu cốt lõi | Các tính năng / Module chính |
| :--- | :--- | :--- |
| **Giai đoạn 1 (Core & MVP)** | Hoàn thiện "Hạt nhân" và chứng minh tính khả thi của Plugin. | - Xây dựng **Data Kernel** (Quản lý Local DB, Sync Engine, Auth).<br>- Module **Sổ đầu bài điện tử** (Plugin chuẩn mực đầu tiên). |
| **Giai đoạn 2 (Ecosystem)** | Khởi tạo hệ sinh thái chia sẻ nội dung. | - Module **Soạn giáo án siêu nhanh**.<br>- Xây dựng **Marketplace Nội bộ** để giáo viên chia sẻ/tải về các Template giáo án (JSON format). |
| **Giai đoạn 3 (Expansion)** | Mở rộng quy mô module mà không chạm vào Kernel. | - Module **Chấm bài & Rubric** (cho phép share Rubric lên Marketplace).<br>- Phát hành tài liệu (API/Schema) để cộng đồng đề xuất Module mới. |

## 4. Các bên liên quan chính
- **Giáo viên (End-users & Contributors):** Người dùng cuối, đồng thời là người đóng góp nội dung (template, tài liệu) cho hệ sinh thái.
- **Đội ngũ phát triển (Core Maintainers):** Đóng vai trò kiểm soát "Kernel", đảm bảo tính ổn định, bảo mật và chuẩn hóa giao thức giao tiếp giữa các Module.
- **Nhà trường / Tổ trưởng:** Hưởng lợi từ các báo cáo được tổng hợp tự động từ các Module.

## 5. Ràng buộc cấp cao
- **Độc lập Nghiệp vụ (Decoupling):** Kernel tuyệt đối không chứa logic nghiệp vụ sư phạm. Mọi logic sư phạm phải nằm ở tầng Plugin.
- **Mọi thứ là Document:** Dữ liệu được cấu trúc dưới dạng JSON Document linh hoạt để hỗ trợ mọi loại Module trong tương lai.
- **Tiêu tốn ít tài nguyên:** Hoạt động mượt mà trên máy tính 4GB RAM, ổ cứng HDD cổ điển.
