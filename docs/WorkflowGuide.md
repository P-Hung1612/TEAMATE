# Hướng Dẫn Git Workflow Dành Cho Collaborator

Tài liệu này quy chuẩn luồng làm việc với Git dành cho toàn bộ dự án TEAMATE, giúp tránh xung đột code (conflict) và giữ lịch sử gọn gàng.

## 🎯 1. Nguyên Tắc Cốt Lõi
- **KHÔNG BAO GIỜ** commit trực tiếp lên branch `main` hoặc `dev`.
- Mọi thay đổi phải được thực hiện trên một branch riêng biệt.
- Chỉ được đưa code vào `dev` thông qua **Pull Request (PR)**.
- **1 Feature = 1 Branch = 1 PR**: Không làm nhiều tính năng không liên quan trên cùng một branch.

---

## 🏗️ 2. Quản Lý Nhánh và Phiên Bản (Git Flow)

Dự án chỉ duy trì **2 nhánh vĩnh viễn**:
1. **`main` (Production):** Nhánh thiêng liêng nhất. Code trên này luôn phải chạy được 100% và là bản chính thức giao cho người dùng.
2. **`dev` (Staging/Integration):** Nhánh hội tụ code. Mọi tính năng từ Collaborator sẽ được gộp vào đây để test tổng thể trước khi release.

### 📌 Xử lý các cột mốc (Milestones / MVP) bằng Tag
Chúng ta **KHÔNG** tạo các nhánh dư thừa như `mvp` hay `version-1`. Để đánh dấu một cột mốc (ví dụ: đã xong tính năng cho bản MVP):
- Gom đủ code trên `dev` và merge vào `main`.
- Đánh một **Git Tag** ngay tại commit đó trên nhánh `main`:
  ```bash
  git tag -a v1.0.0-MVP -m "Release bản MVP đầu tiên"
  ```
- Cách này giúp lịch sử Git là một đường thẳng sạch sẽ và mở rộng (scale) vô hạn trong tương lai.

---

## 🔄 3. Luồng Làm Việc Chuẩn (Standard Workflow)

Mỗi khi bắt tay vào làm một task mới, hãy tuân thủ chính xác 5 bước sau:

### Bước 1: Cập nhật code mới nhất
Luôn bắt đầu từ branch `dev` và kéo code mới nhất về để đảm bảo branch mới của bạn không bị cũ (outdated).
```bash
git checkout dev
git pull origin dev
```

### Bước 2: Tạo nhánh (Branch) mới
Tạo một nhánh con tách ra từ `dev` để bắt đầu code:
```bash
git checkout -b feature/login-ui
```
**Quy tắc đặt tên branch:**
- Tính năng mới: `feature/<tên-tính-năng>` (VD: `feature/login-ui`, `feature/navbar`)
- Sửa lỗi: `fix/<tên-lỗi>` (VD: `fix/login-error`, `fix/mobile-navbar`)

### Bước 3: Code và Commit
Thực hiện code tính năng. Hãy nhớ: chỉ làm đúng tính năng đã nhận, không refactor lan man sang các file không liên quan.
```bash
git add .
git commit -m "feat: create login form ui"
```
**Quy tắc viết Commit Message:**
- `feat: [mô tả]` - Thêm tính năng mới
- `fix: [mô tả]` - Sửa một lỗi (bug)
- `refactor: [mô tả]` - Cấu trúc lại code nhưng không làm thay đổi logic

### Bước 4: Đẩy code (Push) lên GitHub
```bash
git push origin feature/login-ui
```

### Bước 5: Tạo Pull Request (PR)
1. Lên GitHub, hệ thống sẽ tự động hiện nút xanh **Compare & pull request**, hãy click vào.
2. Kiểm tra lại luồng merge: `feature/login-ui` ➔ `dev`.
3. Điền Tiêu đề và Mô tả PR rõ ràng (liệt kê gạch đầu dòng những việc bạn đã làm).
4. Nhấn **Create pull request** và chuyển sang task khác trong lúc chờ Maintainer review.
5. **Lưu ý:** Collaborator KHÔNG tự ý bấm Merge PR của mình.

---

## ✅ 4. Checklist Trước Khi Tạo PR
Để PR của bạn nhanh chóng được duyệt, hãy tự kiểm tra:
- [ ] Code được tạo từ nhánh `dev` mới nhất?
- [ ] App có đang chạy ổn định không (không bị crash do lỗi cú pháp)?
- [ ] PR này chỉ chứa **đúng một tính năng/bug** duy nhất?
- [ ] Đã dọn dẹp `console.log` và code rác dư thừa?
- [ ] Commit message đã tuân thủ đúng chuẩn (feat/fix/refactor)?
