# Cương lĩnh Kỹ thuật và Triết lý Dự án (The TEAMATE Philosophy)
Văn bản này đóng vai trò như "kim chỉ nam" cho mọi quyết định thiết kế kiến trúc, viết code và phát triển sản phẩm của TEAMATE hiện tại và tương lai.

## Đạo luật 1: Tôn trọng Kernel (The Kernel is Sacred)
*   Lõi hệ thống (Kernel) chỉ làm việc với byte, JSON, storage và mạng internet.
*   **Tuyệt đối cấm** việc viết code logic nghiệp vụ (như tính toán điểm số, xếp thời khóa biểu) vào tầng Kernel.
*   Kernel phải nhẹ, bất tử (chống crash) và là nơi an toàn tuyệt đối chứa dữ liệu của người dùng. Mọi lỗi nghiệp vụ chỉ được phép làm sập Plugin, không được làm sập ứng dụng.

## Đạo luật 2: Mọi thứ là Document (Everything is a JSON Document)
*   Để giữ cho Kernel không bị dính chặt vào nghiệp vụ, mọi dữ liệu sinh ra bởi người dùng đều được lưu dưới dạng các chuỗi JSON linh hoạt (Schema-less).
*   Bạn muốn thêm trường "Ghi chú ẩn" vào Giáo án? Không cần viết lệnh `ALTER TABLE` trong cơ sở dữ liệu. Hãy để Plugin của bạn tự thêm key "hiddenNote" vào cục JSON payload. Kernel sẽ vui vẻ lưu lại.

## Đạo luật 3: Offline là Trạng thái Tự nhiên (Offline is the Default State)
*   Internet là một sự xa xỉ, không phải là sự hiển nhiên.
*   Giao diện ứng dụng phải phản hồi ngay lập tức (dưới 50ms) sau cú click của người dùng. Mọi thao tác phải chọc thẳng vào Local DB.
*   Việc đồng bộ (Sync) lên máy chủ là công việc dọn dẹp âm thầm phía sau (Background task). Mạng chậm, mạng rớt? Không sao cả, giáo viên vẫn tiếp tục làm việc.

## Đạo luật 4: Nội dung muốn được tự do (Content Wants to be Free)
*   Các tính năng không chỉ giải quyết công việc mà còn phải tạo ra cơ hội chia sẻ.
*   Giáo án, Rubric chấm điểm, Đề kiểm tra phải được thiết kế dưới dạng có thể "đóng gói" và chia sẻ lên Marketplace Cộng đồng.
*   Biến TEAMATE từ một phần mềm đơn lẻ (Standalone Software) thành một Hệ sinh thái chia sẻ tri thức (Open Knowledge Ecosystem).

## Đạo luật 5: Làm một việc và làm thật tốt (The Unix Philosophy)
*   Mỗi Plugin chỉ nên giải quyết một vấn đề duy nhất và giải quyết nó một cách xuất sắc.
*   Plugin "Sổ đầu bài" không ôm đồm việc xếp lịch dạy. Plugin "Chấm điểm" không cố gắng trở thành một phần mềm quản lý nhà trường.
*   Sự lỏng lẻo trong liên kết (Loose coupling) giữa các Plugin tạo ra sự vững chãi cho toàn hệ thống. Mọi Plugin đều có thể bị thay thế hoặc nâng cấp độc lập.
