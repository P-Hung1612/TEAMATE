# 03_PRINCIPLES.md

# Nguyên lý xây dựng TEAMATE

## Mục đích của tài liệu này

ESSENCE giải thích vì sao TEAMATE tồn tại.

GOALS mô tả những thay đổi TEAMATE muốn tạo ra.

PRINCIPLES mô tả cách chúng ta xây dựng TEAMATE để đạt được các mục tiêu đó.

Mọi quyết định về sản phẩm, kiến trúc, thiết kế và vận hành đều phải tuân thủ các nguyên lý dưới đây.

---

# 1. Offline First

## Nguyên lý

TEAMATE phải hoạt động đầy đủ ngay cả khi không có Internet.

Internet là một tính năng bổ sung, không phải điều kiện bắt buộc.

## Ý nghĩa

Giáo viên không nên bị gián đoạn công việc vì:

* Mất mạng
* Mạng yếu
* Máy chủ bên ngoài gặp sự cố

## Hệ quả

* Chức năng cốt lõi phải hoạt động offline.
* Dữ liệu được lưu cục bộ trước.
* Đồng bộ là bước bổ sung, không phải trung tâm hệ thống.

---

# 2. User Owns Data

## Nguyên lý

Dữ liệu thuộc về người dùng.

Không thuộc về TEAMATE.

## Ý nghĩa

Người dùng có quyền:

* Truy cập dữ liệu
* Sao lưu dữ liệu
* Xuất dữ liệu
* Di chuyển dữ liệu

bất kỳ lúc nào.

## Hệ quả

* Ưu tiên định dạng mở.
* Không khóa dữ liệu.
* Không tạo vendor lock-in.

---

# 3. Simplicity Over Cleverness

## Nguyên lý

Giải pháp đơn giản được ưu tiên hơn giải pháp thông minh nhưng phức tạp.

## Ý nghĩa

Mỗi lớp phức tạp bổ sung đều tạo ra:

* Chi phí bảo trì
* Lỗi tiềm ẩn
* Gánh nặng học tập

## Hệ quả

Khi có nhiều lựa chọn:

* Chọn thiết kế dễ hiểu hơn.
* Chọn quy trình ít bước hơn.
* Chọn giải pháp có thể giải thích cho thành viên mới trong vài phút.

---

# 4. Small Pieces, Clear Responsibilities

## Nguyên lý

Mỗi thành phần chỉ nên làm tốt một việc.

## Ý nghĩa

Lấy cảm hứng từ Unix:

"Do one thing and do it well."

## Hệ quả

* Module nhỏ.
* Feature tách biệt.
* Ít phụ thuộc lẫn nhau.
* Dễ thay thế khi cần.

---

# 5. Local First

## Nguyên lý

Máy tính của người dùng là trung tâm.

Không phải máy chủ.

## Ý nghĩa

TEAMATE phải ưu tiên:

* Hiệu năng cục bộ.
* Trải nghiệm cục bộ.
* Quyền kiểm soát cục bộ.

## Hệ quả

* Dữ liệu lưu trên thiết bị người dùng.
* Chức năng cốt lõi không phụ thuộc cloud.
* Đồng bộ phải là tùy chọn.

---

# 6. Privacy By Default

## Nguyên lý

Bảo vệ quyền riêng tư phải là mặc định.

Không phải tùy chọn nâng cao.

## Ý nghĩa

Người dùng không cần phải cấu hình thêm để được bảo vệ.

## Hệ quả

* Thu thập dữ liệu ở mức tối thiểu.
* Không theo dõi hành vi trái phép.
* Mã hóa dữ liệu nhạy cảm.
* Minh bạch về mọi dữ liệu được xử lý.

---

# 7. Open By Design

## Nguyên lý

Hệ thống phải được thiết kế để dễ hiểu, dễ kiểm tra và dễ đóng góp.

## Ý nghĩa

Tính minh bạch giúp tạo ra niềm tin.

## Hệ quả

* Quyết định kỹ thuật được ghi lại.
* Tài liệu được duy trì.
* Giao diện mở cho plugin và tích hợp.
* Ưu tiên tiêu chuẩn mở khi có thể.

---

# 8. Community Before Features

## Nguyên lý

Một tính năng chỉ có giá trị khi giải quyết vấn đề thực tế của cộng đồng.

## Ý nghĩa

Chúng ta không xây tính năng chỉ vì công nghệ mới xuất hiện.

## Hệ quả

Mỗi tính năng mới cần trả lời:

* Giáo viên nào cần nó?
* Vấn đề nào được giải quyết?
* Giá trị mang lại là gì?

---

# 9. Sustainable Over Fast

## Nguyên lý

Ưu tiên sự bền vững hơn tốc độ phát triển ngắn hạn.

## Ý nghĩa

TEAMATE được xây dựng cho nhiều năm, không phải vài tháng.

## Hệ quả

* Tránh phụ thuộc khó thay thế.
* Tránh giải pháp tạm thời kéo dài.
* Chấp nhận đi chậm hơn nếu đổi lại là ổn định hơn.

---

# 10. Every Feature Must Earn Its Place

## Nguyên lý

Không có tính năng nào được tồn tại chỉ vì nó "hay".

## Ý nghĩa

Mỗi tính năng đều làm tăng:

* Độ phức tạp
* Chi phí bảo trì
* Gánh nặng học tập

## Hệ quả

Trước khi thêm tính năng mới phải trả lời:

1. Nó giải quyết vấn đề gì?
2. Ai thực sự cần nó?
3. Có thể giải quyết bằng cách đơn giản hơn không?
4. Nếu không xây nó, điều gì xảy ra?

---

# Nguyên tắc ưu tiên khi xung đột

Khi các nguyên lý xung đột với nhau, ưu tiên theo thứ tự:

1. ESSENCE
2. Giá trị cho giáo viên
3. Quyền kiểm soát dữ liệu của người dùng
4. Offline First
5. Simplicity
6. Sustainability
7. Tốc độ phát triển

Nếu một quyết định giúp phát triển nhanh hơn nhưng làm suy giảm quyền lợi của giáo viên hoặc quyền kiểm soát dữ liệu của người dùng, quyết định đó không phù hợp với TEAMATE.
