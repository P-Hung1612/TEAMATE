# Roadmap: Lesson Planner – MVP Thinking & Impact Mapping

## Impact Map (chiến lược)

**Mục tiêu (Goal):** Giáo viên tiết kiệm 30% thời gian soạn giáo án so với Word.

| Ai (Actor) | Hành vi thay đổi (Impact) | Sản phẩm tối thiểu (Deliverable) | Đo lường (Metric) |
|------------|---------------------------|----------------------------------|-------------------|
| Giáo viên THCS | Soạn giáo án ngay trong app, không chuyển qua Word | Màn hình soạn thảo đơn giản, lưu tự động | Thời gian từ mở app → lưu giáo án đầu tiên |
| Giáo viên THPT | Tìm lại giáo án cũ để sửa | Ô tìm kiếm theo tiêu đề | Tỷ lệ dùng tìm kiếm trong phiên thứ 2 |
| Giáo viên chủ nhiệm | Nộp giáo án cho tổ trưởng | Nút xuất .docx (giữ nguyên bố cục) | Số lần xuất thành công / số lần thử |

## MVP (Smallest Valuable Product)

**Chỉ bao gồm:**
- Tạo giáo án (tiêu đề + nội dung text thuần)
- Sửa / xoá
- Danh sách giáo án (hiển thị tiêu đề)
- Tìm kiếm theo tiêu đề (lọc)
- Xuất .docx (nội dung thô, không cần format phức tạp)

**Không có trong MVP:**
- Rich text (đậm, nghiêng, bảng)
- Tags, thư mục
- Import tài liệu
- Template, duplicate
- PDF export
- Đồng bộ, plugin

## Lộ trình sau MVP (theo Impact)

### Vòng 1 (sau 2 tuần học từ MVP)
- **Nếu tìm kiếm theo tiêu đề ít được dùng:** Thay bằng full-text search (Pivot)
- **Nếu xuất .docx bị lỗi font:** Ưu tiên sửa ngay
- **Nếu giáo viên muốn format đơn giản:** Thêm Markdown (ưu tiên hơn rich text WYSIWYG)

### Vòng 2 (Impact: tái sử dụng)
- Duplicate giáo án (giảm gõ lại)
- Lưu làm mẫu (template cá nhân)

### Vòng 3 (Impact: làm việc với tài liệu có sẵn)
- Import file .docx / .md (không cần PDF, ảnh)

### Vòng 4 (Impact: chia sẻ cộng đồng)
- Export/Import mẫu từ cộng đồng (nhưng vẫn offline-first)

## Nguyên tắc ưu tiên
- **Bất kỳ tính năng nào không làm thay đổi hành vi của giáo viên theo hướng tiết kiệm thời gian đều bị loại.**
- **Mỗi phiên bản phải deliver được một impact có thể đo lường.**