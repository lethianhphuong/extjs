# Hướng dẫn Gemini — DEMO ExtJS

Áp dụng quy tắc đặt tên MVVM trong [AGENTS.md](AGENTS.md) cho toàn project: View `{Feature}_View.js` đi cùng `{Feature}_ViewController.js` và `{Feature}_ViewModel.js`; tên class cuối trong `Ext.define()` trùng tên file bỏ `.js`, namespace khớp đường dẫn. Alias giữ nguyên chữ hoa/thường và dấu `_`: `controller.{Feature}_ViewController`, `viewmodel.{Feature}_ViewModel`. View dùng `controller: '{Feature}_ViewController'` và `viewModel: '{Feature}_ViewModel'` (không kèm tiền tố alias); xtype là `{Feature}_View`.

Ví dụ: `TrangChuNew1_View` dùng `TrangChuNew1_ViewController` và `TrangChuNew1_ViewModel`, với alias tương ứng `controller.TrangChuNew1_ViewController` và `viewmodel.TrangChuNew1_ViewModel`. Model ở đây là ViewModel, không phải `Ext.data.Model`. Quy tắc ưu tiên hơn ví dụ alias viết thường/rút gọn cũ trong CLAUDE.md và skill. Khi sửa tên/alias trong phạm vi task phải cập nhật đồng bộ nơi sử dụng; không tự chuyển đổi hàng loạt source hiện có.

Áp dụng quy tắc `requires` trong View/ViewController tại [AGENTS.md](AGENTS.md): không bắt buộc khai báo, không thêm `requires: []` hoặc danh sách dependency theo mẫu một cách máy móc. Khi có lỗi tải class thực tế, kiểm tra cơ chế nạp hiện có và chỉ bổ sung dependency cần thiết; không mặc định alias bảo đảm class đã được tải. Thay đổi dependency trong source phải được kiểm thử runtime/UI theo AGENTS.md. Quy tắc này ưu tiên hơn ví dụ bắt buộc `requires` cũ trong CLAUDE.md và skill; giữ nguyên quy định ViewModel, package trong `app.json` và không tự xóa hàng loạt source.

Áp dụng quy tắc truy cập component trong [AGENTS.md](AGENTS.md) cho toàn project: ưu tiên `itemId: 'ten_IdView'` và `me.getView().down('#ten_IdView')` với `const me = this;`, thay cho `reference`/`lookupReference()` khi tạo mới hoặc sửa phần truy cập component trong phạm vi task. Tên phải mô tả chức năng và duy nhất trong cây View được tìm kiếm. Không dùng `id` toàn cục hoặc selector theo label/text; chỉ dùng `up()` khi cần tìm component cha. Giữ binding/ViewModel cho cập nhật state và reset field.

Quy tắc này ưu tiên hơn hướng dẫn reference cũ trong CONVENTIONS.md, CLAUDE.md và skill, kể cả đoạn chỉ giới hạn itemId cho TrangChuNew. Không tự chuyển đổi hàng loạt source hiện có hoặc refactor ngoài phạm vi task.

Đọc và áp dụng [AGENTS.md](AGENTS.md) cho toàn repository. Quy chuẩn code chính nằm trong [CONVENTIONS.md](CONVENTIONS.md); [CLAUDE.md](CLAUDE.md) bổ sung ngữ cảnh ứng dụng, theme và overrides. Cách xử lý ví dụ legacy chưa thống nhất được ghi trong AGENTS.md.

Quy trình: khảo sát và trình bày plan trước khi thay đổi, triển khai sau khi plan được duyệt, kiểm tra và báo cáo kết quả. Tiếp tục plan đã duyệt mà không yêu cầu xác nhận lặp lại cho từng bước.

Không tự ý build (dev hoặc prod): Tuyệt đối không tự động chạy các lệnh build (`sencha app build`, `sencha app build development`, `sencha app build production`, `sencha app build classic`...). Chỉ khi nào người dùng có yêu cầu/lệnh rõ ràng mới được chạy lệnh build. Không tự ý dùng lệnh build làm bước kiểm tra xác minh code để tránh phát sinh file rác vào `build/`, `classic.jsonp`.

Sau khi code, bắt buộc thực thi kiểm tra để xác minh phần thay đổi chạy được theo mục “Bắt buộc kiểm tra chạy và sửa lỗi sau khi code” trong AGENTS.md. Với giao diện phải thử luồng runtime/UI liên quan. Nếu lỗi thuộc phạm vi task, sửa và kiểm tra lại đến khi đạt, không chỉ báo lỗi rồi dừng. Nếu môi trường hoặc lỗi ngoài phạm vi chặn việc xác minh, báo rõ bằng chứng đã kiểm tra và phần còn bị chặn; không khẳng định chạy được khi chưa thực thi.

Các quy trình dùng chung nằm trong `.agents/skills/`; mở file tương ứng khi công cụ không tự phát hiện skill:

- [task-brief](.agents/skills/task-brief/SKILL.md): chỉ phân tích và lập brief; dừng chờ phê duyệt sau khi trình bày.
- [extjs-frontend](.agents/skills/extjs-frontend/SKILL.md): phát triển ExtJS theo conventions của project.
- [extjs-verify](.agents/skills/extjs-verify/SKILL.md): xác minh thay đổi và báo rõ phần chưa kiểm tra.

Không duy trì quy chuẩn riêng khác với AGENTS.md hoặc tự sửa source khi người dùng chỉ yêu cầu plan/brief.
