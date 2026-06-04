# ADR-004: Áp dụng Event-Driven Communication giữa các Modules

## Bối cảnh
TEAMATE được thiết kế theo Modular Monolith với nhiều Bounded Contexts (Workspace, Assessment, Classroom, v.v.). Cần cách giao tiếp lỏng lẻo giữa các module.

## Lựa chọn cân nhắc
- Direct function calls: Tight coupling, khó mở rộng.
- Message Queue (Kafka, RabbitMQ): Quá nặng cho desktop app.
- In-process Event Bus: Nhẹ, phù hợp.

## Quyết định
**Sử dụng In-process Event Bus** (dựa trên Rust) để các module giao tiếp qua Domain Events.

## Hệ quả
- Giảm coupling giữa các Bounded Contexts.
- Dễ thêm Plugin và extension.
- Hỗ trợ Event Sourcing trong tương lai nếu cần.
- Phải thiết kế events cẩn thận (immutable, versioned).