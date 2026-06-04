# ADR-001: Sử dụng Tauri cho Desktop Application

## Bối cảnh
TEAMATE là một ứng dụng desktop dành cho giáo viên, cần chạy offline-first, local-first, nhẹ và bảo mật cao. Chúng ta cần một framework cho phép xây dựng desktop app sử dụng web technologies (HTML, CSS, JS/TS) nhưng có hiệu suất tốt và kích thước nhỏ.

## Lựa chọn cân nhắc
- Electron: Dễ phát triển nhưng nặng (khoảng 100-200MB), tiêu tốn RAM cao.
- Tauri: Nhẹ (khoảng 5-10MB), sử dụng Rust backend, WebView native, bảo mật tốt hơn.
- Native frameworks (Qt, .NET MAUI): Khó phát triển UI phức tạp, curve học dốc.
- Flutter Desktop: Tốt cho UI nhưng kém linh hoạt với plugin hệ thống.

## Quyết định
**Sử dụng Tauri** làm nền tảng chính cho ứng dụng desktop.

## Hệ quả
- Kích thước ứng dụng nhỏ, hiệu suất cao.
- Dễ tích hợp Rust cho core logic.
- Hỗ trợ Offline First xuất sắc.
- Phải tuân thủ Tauri security model (IPC).
- Team cần quen với Rust + TypeScript.