# Implementation: Lesson Planner

## Mục đích

Tài liệu này mô tả cách Feature **Lesson Planner** được hiện thực hóa ở mức thiết kế kỹ thuật.

Đây không phải tài liệu code chi tiết.

Mục tiêu:

* Xác định ranh giới nghiệp vụ.
* Xác định các thành phần chính.
* Hỗ trợ tạo GitHub Issues.
* Hỗ trợ đánh giá tác động kiến trúc.
* Giữ Domain độc lập với UI và Infrastructure.

---

# 1. Bounded Context

## Context

Lesson Planner thuộc:

```text
Workspace Context
```

Mục tiêu:

* Tạo giáo án.
* Chỉnh sửa giáo án.
* Tìm kiếm giáo án.
* Tái sử dụng giáo án.

---

## Quan hệ với Context khác

Lesson Planner không truy cập trực tiếp Repository của Context khác.

Giao tiếp thông qua Domain Events.

Ví dụ:

```text
LessonPlanCreated
LessonPlanUpdated
LessonPlanDuplicated
```

---

# 2. Aggregate Root

## LessonPlan

LessonPlan là Aggregate Root của Workspace Context.

Mọi thay đổi đối với giáo án phải đi qua Aggregate này.

```rust
struct LessonPlan {
    id: LessonPlanId,

    title: String,

    content: Content,

    subject: Option<Subject>,

    grade: Option<Grade>,

    is_template: bool,

    created_at: DateTime,

    updated_at: DateTime,
}
```

---

## Business Rules

### Rule 1

Title không được rỗng.

### Rule 2

LessonPlan phải có ID duy nhất.

### Rule 3

Mọi cập nhật nội dung phải cập nhật updated_at.

### Rule 4

Template là một LessonPlan đặc biệt.

---

## Domain Behaviors

```rust
LessonPlan::new()

LessonPlan::update_content()

LessonPlan::duplicate()

LessonPlan::make_template()
```

---

# 3. Value Objects

## LessonPlanId

Định danh duy nhất của LessonPlan.

```rust
struct LessonPlanId(String);
```

---

## Content

Nội dung giáo án.

```rust
struct Content {
    raw_markdown: String,
    html: String,
}
```

---

## Subject

Môn học.

Ví dụ:

```text
Toán
Ngữ Văn
Tiếng Anh
Vật Lý
```

---

## Grade

Khối lớp.

Ví dụ:

```text
6
7
8
9
10
11
12
```

---

# 4. Domain Events

Các sự kiện được phát ra bởi Aggregate.

---

## LessonPlanCreated

Được phát khi giáo án được tạo.

```text
LessonPlanCreated
```

---

## LessonPlanUpdated

Được phát khi giáo án thay đổi.

```text
LessonPlanUpdated
```

---

## LessonPlanDuplicated

Được phát khi nhân bản giáo án.

```text
LessonPlanDuplicated
```

---

## LessonPlanTemplateCreated

Được phát khi chuyển giáo án thành Template.

```text
LessonPlanTemplateCreated
```

---

# 5. Repository Contracts

Repository thuộc Domain Layer.

Infrastructure sẽ cung cấp implementation cụ thể.

---

## LessonPlanRepository

```rust
trait LessonPlanRepository {

    fn save(
        &self,
        lesson: LessonPlan
    );

    fn find_by_id(
        &self,
        id: LessonPlanId
    ) -> Option<LessonPlan>;

    fn search(
        &self,
        query: String
    ) -> Vec<LessonPlan>;

    fn delete(
        &self,
        id: LessonPlanId
    );
}
```

---

## Nguyên tắc

Domain không được biết:

* SQLite
* SQLCipher
* ORM
* File System

Domain chỉ biết Repository Contract.

---

# 6. Application Use Cases

Application Layer điều phối Domain.

Không chứa Business Rules.

---

## CreateLessonPlan

Tạo giáo án mới.

Input:

```text
Title
Content
Subject
Grade
```

Output:

```text
LessonPlan
```

---

## UpdateLessonPlan

Cập nhật giáo án.

---

## DuplicateLessonPlan

Nhân bản giáo án.

---

## SearchLessonPlan

Tìm kiếm giáo án.

---

## DeleteLessonPlan

Xóa giáo án.

---

# 7. MVP Scope

Các chức năng bắt buộc của MVP.

---

## Included

### Create Lesson

Tạo giáo án.

### Edit Lesson

Chỉnh sửa giáo án.

### Save Lesson

Lưu giáo án.

### Search Lesson

Tìm kiếm giáo án.

### Duplicate Lesson

Nhân bản giáo án.

---

## Success Criteria

Người dùng có thể:

* Tạo giáo án mới.
* Chỉnh sửa giáo án.
* Tìm lại giáo án cũ.
* Tái sử dụng giáo án.

mà không cần Internet.

---

# 8. Out of Scope

Không triển khai trong MVP.

---

## AI Generation

Ví dụ:

```text
Tạo giáo án bằng AI
```

---

## Cloud Sync

Ví dụ:

```text
Đồng bộ giữa nhiều thiết bị
```

---

## Realtime Collaboration

Ví dụ:

```text
Nhiều người cùng sửa giáo án
```

---

## Marketplace

Ví dụ:

```text
Mua bán giáo án
```

---

## Version History

Ví dụ:

```text
Khôi phục phiên bản cũ
```

---

# Liên kết

## Related Feature

```text
06_FEATURES/lesson-planner/feature.md
```

## Related Roadmap

```text
06_FEATURES/lesson-planner/roadmap.md
```

## Related Architecture

```text
05_ARCHITECTURE.md
```

## Related ADR

Hiện tại:

```text
Không có ADR riêng
```

Nếu sau này xuất hiện:

* Versioning
* AI Integration
* Plugin Runtime

thì phải tạo ADR tương ứng trước khi triển khai.
