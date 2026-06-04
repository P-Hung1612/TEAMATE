# Kiến trúc hệ thống TEAMATE

## Mục đích của tài liệu này

ESSENCE mô tả lý do TEAMATE tồn tại.

GOALS mô tả những thay đổi TEAMATE muốn tạo ra.

PRINCIPLES mô tả cách TEAMATE được xây dựng.

PRODUCT mô tả vấn đề người dùng.

ARCHITECTURE mô tả cách hệ thống được tổ chức để hỗ trợ các mục tiêu đó.

Tài liệu này không mô tả chi tiết implementation.

Các quyết định kỹ thuật cụ thể được lưu trong thư mục ADR.

---

# Triết lý kiến trúc

TEAMATE theo đuổi kiến trúc:

* Offline First
* Local First
* Domain Driven Design
* Event Driven Communication
* Modular Monolith

Chúng tôi ưu tiên:

* Đơn giản
* Dễ hiểu
* Dễ bảo trì
* Dễ mở rộng

hơn là sự phức tạp không cần thiết.

---

# Mô hình tổng thể

```text
UI
↓
Application Layer
↓
Domain Layer
↓
Infrastructure Layer
```

Nguyên tắc:

* Domain không phụ thuộc UI.
* Domain không phụ thuộc Database.
* Domain không phụ thuộc Framework.
* Business Rules phải tồn tại độc lập.

---

# Bounded Contexts

TEAMATE được chia thành các miền nghiệp vụ độc lập.

Mỗi miền chịu trách nhiệm cho một nhóm vấn đề cụ thể.

---

## Workspace Context

Mục tiêu:

Quản lý tài liệu và không gian làm việc của giáo viên.

Ví dụ:

* Giáo án
* Tài liệu giảng dạy
* Ghi chú

---

## Assessment Context

Mục tiêu:

Hỗ trợ đánh giá học sinh.

Ví dụ:

* Điểm số
* Rubric
* Nhận xét

---

## Classroom Context

Mục tiêu:

Quản lý hoạt động lớp học.

Ví dụ:

* Danh sách học sinh
* Chuyên cần
* Hồ sơ lớp học

---

## Resource Context

Mục tiêu:

Quản lý và tái sử dụng tài nguyên.

Ví dụ:

* Mẫu giáo án
* Đề kiểm tra
* Tài liệu chia sẻ

---

## Plugin Context

Mục tiêu:

Cho phép mở rộng hệ thống mà không làm thay đổi lõi.

Ví dụ:

* Plugin AI
* Plugin Import/Export
* Plugin Community

---

# Kiến trúc Module

Nguyên tắc:

Mỗi module làm tốt một việc.

Lấy cảm hứng từ Unix:

> Do one thing and do it well.

Mỗi module:

* Có domain riêng.
* Có dữ liệu riêng.
* Có service riêng.
* Có test riêng.

Module không được truy cập trực tiếp dữ liệu nội bộ của module khác.

---

# Event-Driven Communication

Các module giao tiếp thông qua Event Bus.

Ví dụ:

```text
LessonCreated

StudentAdded

AssessmentCompleted
```

Lợi ích:

* Giảm phụ thuộc trực tiếp.
* Dễ mở rộng.
* Dễ bổ sung plugin.

---

# Data Architecture

Nguyên tắc:

Dữ liệu cục bộ là nguồn sự thật chính.

```text
Local Database
      ↓
Synchronization (optional)
      ↓
External Services
```

Không có thành phần nào được giả định rằng Internet luôn tồn tại.

---

# Plugin Architecture

Plugin là công dân hạng nhất.

Mọi khả năng mở rộng nên được ưu tiên thông qua Plugin API thay vì sửa đổi trực tiếp Core.

Nguyên tắc:

Core nhỏ.

Extension lớn.

---

# Dependency Rules

## Allowed

```text
UI
↓
Application
↓
Domain
↓
Infrastructure
```

---

## Not Allowed

```text
Domain
↓
UI
```

```text
Domain
↓
Framework
```

```text
Domain
↓
Database Vendor
```

---

# Architectural Priorities

Khi có xung đột giữa các lựa chọn kiến trúc:

Ưu tiên theo thứ tự:

1. ESSENCE
2. User Value
3. Offline First
4. Data Ownership
5. Simplicity
6. Maintainability
7. Extensibility
8. Development Speed

---

# Architectural Decision Records

Mọi quyết định kiến trúc quan trọng phải được ghi lại dưới dạng ADR.

Ví dụ:

```text
adr/

ADR-001-use-tauri.md

ADR-002-use-rust.md

ADR-003-use-sqlite.md

ADR-004-event-driven.md

ADR-005-plugin-system.md
```

Một ADR phải trả lời:

* Bối cảnh là gì?
* Những lựa chọn nào đã được cân nhắc?
* Quyết định cuối cùng là gì?
* Hệ quả của quyết định đó là gì?

Không được đưa ra quyết định kiến trúc lớn mà không có ADR tương ứng.

---

# Tiêu chuẩn thành công

Một kiến trúc tốt là kiến trúc mà:

* Thành viên mới có thể hiểu nhanh.
* Module mới có thể được thêm vào dễ dàng.
* Công nghệ có thể thay thế khi cần.
* Dữ liệu vẫn thuộc về người dùng.
* Hệ thống vẫn hoạt động khi không có Internet.

Nếu một thay đổi làm suy giảm các tiêu chí trên, thay đổi đó cần được xem xét lại.