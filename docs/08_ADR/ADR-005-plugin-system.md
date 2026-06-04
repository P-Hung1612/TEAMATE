# ADR-005: Thiết kế Plugin System

## Bối cảnh
TEAMATE muốn cho phép cộng đồng và bên thứ ba mở rộng chức năng mà không cần sửa core (AI plugins, import/export, community features...).

## Lựa chọn cân nhắc
- Dynamic loading (DLL/so): Phức tạp, rủi ro bảo mật.
- WebAssembly (Wasm): An toàn, portable, phù hợp với Rust.
- Script-based (Lua/JS): Dễ nhưng kém hiệu suất.

## Quyết định
**Xây dựng Plugin System dựa trên WebAssembly** kết hợp với Rust trait system và Event Bus.

## Hệ quả
- Plugin là công dân hạng nhất.
- Core giữ nhỏ và ổn định.
- Bảo mật cao (Wasm sandbox).
- Dễ phân phối plugin qua marketplace sau này.
- Hỗ trợ Offline First (plugins có thể chạy local).