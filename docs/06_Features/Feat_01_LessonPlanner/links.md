
---

## `lesson-planner/links.md` – Traceability

```markdown
# Links – Lesson Planner (Traceability)

Ma trận traceability dưới đây giúp kiểm tra mọi quyết định có được dẫn xuất từ các tầng trên (ESSENCE, GOALS, PRINCIPLES, PRODUCT, ARCHITECTURE, ADR) hay không.

## Từ Feature đến ESSENCE

| Quyết định / thành phần trong Lesson Planner | Liên kết đến ESSENCE (câu hỏi bộ lọc) |
|---------------------------------------------|----------------------------------------|
| MVP chỉ gồm tạo, sửa, tìm kiếm, xuất docx | Câu 1: “Giúp giáo viên tiết kiệm thời gian?” – Có |
| Không làm rich text, tags, import | Câu 5: “Lợi ích lâu dài cho cộng đồng?” – Không cần ở MVP |
| Cho phép xuất .docx ngay từ đầu | Câu 6: “10 năm sau có tự hào?” – Có, vì không khóa dữ liệu |

## Từ Feature đến GOALS

| Tính năng con | Goal tương ứng |
|---------------|----------------|
| Tạo / sửa nhanh, tìm kiếm | Goal 1: Nhiều thời gian hơn cho giảng dạy |
| Xuất .docx, lưu local | Goal 2: Giáo viên làm chủ công cụ |
| (Sau này) duplicate, template | Goal 3: Kho tri thức cộng đồng |

## Từ Feature đến PRINCIPLES

| Nguyên lý | Thể hiện trong implement.md |
|-----------|-----------------------------|
| Offline First | Repository dùng SQLite local, không API |
| User Owns Data | Domain có method export, .docx xuất ra không watermark |
| Simplicity | Domain model không có DTO trung gian |
| Local First | Dữ liệu lưu trên máy trước, đồng bộ là tuỳ chọn (chưa làm) |
| Event-Driven | Domain events được publish để update search index |

## Từ Feature đến ARCHITECTURE (05_Architecture)

| Khía cạnh kiến trúc | Áp dụng |
|---------------------|---------|
| Bounded Context | Workspace Context |
| Domain không phụ thuộc DB | Repository interface, impl ở infrastructure |
| Event Bus | Dùng để thông báo khi giáo án thay đổi |
| Module độc lập | Lesson Planner không gọi trực tiếp Gradebook |

## Từ Feature đến các ADR (08_ADR)

| ADR | Nội dung liên quan |
|-----|--------------------|
| ADR-001 (Rich text storage) | Dùng `Content` value object với markdown + html |
| ADR-003 (Full-text search) | Sẽ dùng FTS5, nhưng MVP chỉ search theo title – đánh dấu là technical debt |
| ADR-005 (Offline export) | Application service gọi infrastructure export, không qua cloud |

## Backward trace: Từ Code lên Feature (dành cho code review)

Mỗi module/class trong code phải có comment hoặc tên gợi nhớ đến một trong các mục trên. Ví dụ:
- `LessonPlan` → thuộc Workspace Context
- `LessonPlanRepository` → interface theo DDD-lite
- `export_to_docx` → liên quan ADR-005

## Ma trận hoàn chỉnh (dùng cho review)

| File / Decision | ESSENCE | GOALS | PRINCIPLES | ARCHITECTURE | ADR |
|----------------|---------|-------|------------|--------------|-----|
| feature.md (Lean Product) | ✓ | ✓ (Goal 1) | ✓ (Every feature earns its place) | – | – |
| roadmap.md (MVP + Impact Map) | ✓ (câu hỏi 6) | ✓ (Goal 1,5) | ✓ (Sustainable over fast) | – | – |
| implementation.md (DDD-lite) | ✓ (công nghệ phục vụ con người) | ✓ (Goal 2) | ✓ (Small pieces, clear responsibilities) | ✓ (Domain layer, Event Bus) | ✓ (001,003,005) |
| links.md | – | – | – | – | – |

**Ghi chú:** Nếu bất kỳ phần nào trong code hoặc design không trace được lên các tài liệu trên, cần xem lại quyết định đó.