# ADR-002: Sử dụng Rust cho Core Backend

## Bối cảnh
TEAMATE cần core engine ổn định, an toàn bộ nhớ, hiệu suất cao cho Domain Logic, Event Bus, và Plugin System. Ứng dụng phải chạy mượt mà trên nhiều thiết bị (kể cả máy yếu).

## Lựa chọn cân nhắc
- TypeScript/Node.js: Dễ phát triển nhưng kém an toàn bộ nhớ, hiệu suất thấp hơn.
- Python: Dễ viết nhưng chậm và tiêu tốn tài nguyên.
- Go: Tốt nhưng garbage collector có thể gây latency.
- Rust: Memory safety, zero-cost abstraction, hiệu suất native.

## Quyết định
**Sử dụng Rust** cho tất cả core logic (Domain, Application Services, Infrastructure).

## Hệ quả
- Hiệu suất và an toàn cao.
- Tích hợp hoàn hảo với Tauri.
- Khúc học dốc ban đầu cho team.
- Dễ viết test và maintain lâu dài.
- Hỗ trợ mạnh cho Modular Monolith và Plugin System.
