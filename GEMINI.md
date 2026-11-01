# Hướng dẫn Gemini — DEMO ExtJS

Áp dụng quy tắc truy cập component trong [AGENTS.md](AGENTS.md) cho toàn project: ưu tiên `itemId: 'ten_IdView'` và `me.getView().down('#ten_IdView')` với `const me = this;`, thay cho `reference`/`lookupReference()` khi tạo mới hoặc sửa phần truy cập component trong phạm vi task. Tên phải mô tả chức năng và duy nhất trong cây View được tìm kiếm. Không dùng `id` toàn cục hoặc selector theo label/text; chỉ dùng `up()` khi cần tìm component cha. Giữ binding/ViewModel cho cập nhật state và reset field.

Quy tắc này ưu tiên hơn hướng dẫn reference cũ trong CONVENTIONS.md, CLAUDE.md và skill, kể cả đoạn chỉ giới hạn itemId cho TrangChuNew. Không tự chuyển đổi hàng loạt source hiện có hoặc refactor ngoài phạm vi task.

Đọc và áp dụng [AGENTS.md](AGENTS.md) cho toàn repository. Quy chuẩn code chính nằm trong [CONVENTIONS.md](CONVENTIONS.md); [CLAUDE.md](CLAUDE.md) bổ sung ngữ cảnh ứng dụng, theme và overrides. Cách xử lý ví dụ legacy chưa thống nhất được ghi trong AGENTS.md.

Quy trình: khảo sát và trình bày plan trước khi thay đổi, triển khai sau khi plan được duyệt, kiểm tra và báo cáo kết quả. Tiếp tục plan đã duyệt mà không yêu cầu xác nhận lặp lại cho từng bước.

Sau khi code, bắt buộc thực thi kiểm tra để xác minh phần thay đổi chạy được theo mục “Bắt buộc kiểm tra chạy và sửa lỗi sau khi code” trong AGENTS.md. Với giao diện phải thử luồng runtime/UI liên quan. Nếu lỗi thuộc phạm vi task, sửa và kiểm tra lại đến khi đạt, không chỉ báo lỗi rồi dừng. Nếu môi trường hoặc lỗi ngoài phạm vi chặn việc xác minh, báo rõ bằng chứng đã kiểm tra và phần còn bị chặn; không khẳng định chạy được khi chưa thực thi.

Các quy trình dùng chung nằm trong `.agents/skills/`; mở file tương ứng khi công cụ không tự phát hiện skill:

- [task-brief](.agents/skills/task-brief/SKILL.md): chỉ phân tích và lập brief; dừng chờ phê duyệt sau khi trình bày.
- [extjs-frontend](.agents/skills/extjs-frontend/SKILL.md): phát triển ExtJS theo conventions của project.
- [extjs-verify](.agents/skills/extjs-verify/SKILL.md): xác minh thay đổi và báo rõ phần chưa kiểm tra.

Không duy trì quy chuẩn riêng khác với AGENTS.md hoặc tự sửa source khi người dùng chỉ yêu cầu plan/brief.
