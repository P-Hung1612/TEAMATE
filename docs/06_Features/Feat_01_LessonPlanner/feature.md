# Feature: Lesson Planner – Lean Product

## Giả thuyết giá trị (Value Hypothesis)
**Chúng tôi tin rằng** nếu giáo viên có một công cụ soạn thảo giáo án hoạt động offline, không cấu hình phức tạp, có thể tái sử dụng nội dung cũ và xuất ra file .docx/.pdf,  
**thì** họ sẽ tiết kiệm được ít nhất 30% thời gian so với dùng Word hiện tại,  
**khi** họ soạn giáo án hàng tuần.

## Sản phẩm tối thiểu cần học (MLP – Minimum Learnable Product)
Chỉ xây dựng những gì cần để kiểm chứng giả thuyết:
- Tạo / sửa / xoá giáo án (text đơn giản, chưa cần rich text phức tạp)
- Tìm kiếm theo tiêu đề (chưa cần full‑text nội dung)
- Xuất ra .docx (đủ dùng, chưa cần PDF)
- Không có import tài liệu, không có template, không có thẻ

**Loại bỏ (Waste):** Mọi thứ không trực tiếp kiểm chứng giả thuyết – tags, rich text, import file, gradebook, cộng đồng.

## Vòng lặp Build – Measure – Learn
1. **Build:** MVP cực kỳ đơn giản (2–3 tuần)
2. **Measure:** 
   - Thời gian từ lúc mở app đến khi xuất được giáo án đầu tiên
   - Số lần người dùng quay lại soạn giáo án thứ hai
   - Phỏng vấn 5 giáo viên: “Có nhanh hơn Word không?”
3. **Learn:** Nếu không đạt 30% tiết kiệm → pivot (thay đổi giao diện hoặc workflow) hoặc thay đổi giả thuyết.

## Tiêu chí thành công theo Lean
- **Hành vi:** Giáo viên tự nguyện dùng lại lần thứ hai mà không cần nhắc.
- **Kết quả:** Họ nói “tôi làm nhanh hơn” (không cần tính giây chính xác).
- **Học được:** Điều gì thực sự quan trọng (tìm kiếm? duplicate? hay chỉ cần gõ nhanh?).

## Liên kết đến các nguyên lý (trace)
- ESSENCE: “trao thời gian cho giáo viên” – giả thuyết có thể đo được.
- PRINCIPLES: “Every feature must earn its place” – chỉ làm khi cần kiểm chứng.