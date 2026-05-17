TEAMATE/
├── kernel/                  # [CỦA BẠN] Lõi hệ thống (Không chứa UI)
│   ├── src/
│   │   ├── storage/         # Xử lý SQLite/IndexedDB
│   │   ├── sync/            # Cơ chế đồng bộ Last-write-wins
│   │   └── api/             # Giao thức "Hợp đồng" (Interface) cho Plugins
│   └── package.json
│
├── plugins/                 # [CỦA DEV] Các module nghiệp vụ
│   ├── class-register/      # Plugin: Sổ đầu bài điện tử (React)
│   ├── lesson-planner/      # Plugin: Soạn giáo án (React)
│   └── grading/             # Plugin: Chấm điểm (React)
│
├── app/                     # Ứng dụng chính (Nơi ghép Kernel và Plugins lại với nhau)
│   ├── src/
│   │   └── main.tsx         # Khởi tạo Kernel, Load Plugins, Render UI vỏ bọc
│   ├── package.json
│   └── src-tauri/           # (Tùy chọn) Mã nguồn Rust nếu dùng Desktop App
│
├── server/                  # Backend xử lý đồng bộ (Node.js/PostgreSQL)
│   └── src/                 # API nhận và trả JSON Payload
│
├── docs/                    # Tài liệu dự án
│   ├── BRD.md
│   ├── SRS.md
│   ├── Vision.md
│   └── PHILOSOPHY.md
│
├── pnpm-workspace.yaml      # File định nghĩa Monorepo
└── package.json             # Root package (quản lý script chạy chung)
