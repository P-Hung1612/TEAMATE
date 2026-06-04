# ADR-003: Sử dụng SQLite làm Local Database

## Bối cảnh
TEAMATE theo đuổi Local First và Offline First. Tất cả dữ liệu phải được lưu cục bộ và người dùng sở hữu hoàn toàn.

## Lựa chọn cân nhắc
- SQLite: Nhẹ, không server, file-based, ACID compliant.
- IndexedDB (web): Không phù hợp cho dữ liệu phức tạp và domain logic.
- PostgreSQL/MySQL local: Quá nặng, cần server.
- DuckDB: Tốt cho analytics nhưng chưa phổ biến cho OLTP.

## Quyết định
**Sử dụng SQLite** làm database chính, kết hợp với SQLx hoặc Diesel trong Rust.

## Hệ quả
- Dữ liệu là file đơn giản, dễ backup và sync.
- Hỗ trợ mạnh Offline First.
- Domain Layer không phụ thuộc vào DB vendor (sử dụng Repository pattern).
- Dễ migrate schema qua migrations.