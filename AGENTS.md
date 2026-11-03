# Hướng dẫn agent — DEMO ExtJS

Ứng dụng giao diện tiếng Việt dùng Sencha ExtJS 7.5.1.5 Classic Toolkit, namespace `DEMO`, kiến trúc MVVM với ViewController và build bằng Sencha Cmd.

## Nguồn quy chuẩn

- Đọc [CONVENTIONS.md](CONVENTIONS.md) trước khi thay đổi code; đây là nguồn chính về cấu trúc, naming, View, Controller, ViewModel và SCSS.
- Đối chiếu [CLAUDE.md](CLAUDE.md) để hiểu workflow, theme, global helpers và overrides của project. Chỉ đọc các phần liên quan khi đã nắm ngữ cảnh.
- Kiểm tra implementation và overrides thực tế trước khi áp dụng ví dụ trong tài liệu. Không refactor legacy ngoài phạm vi task.

Một số ví dụ cũ trong conventions chưa khớp quy tắc hiện hành. Dùng `let`/`const`, single quotes, semicolon, không trailing comma, indentation 4 spaces và `const me = this`; không sao chép `var`, selector theo label/text hoặc `init` rỗng từ ví dụ. Truy cập component bằng `itemId` theo quy tắc bên dưới. Tiêu chí tách component theo mục 1.1.1 và ngoại lệ màn hình đơn giản tại 1.1.2. Navigation hiện tại theo tree node `route` + `component` như CLAUDE.md và code, không tạo thêm route-to-xtype map từ ví dụ cũ ở mục 6. Nếu gặp mâu thuẫn khác ảnh hưởng hành vi, nêu rõ trong plan thay vì tự đổi kiến trúc.

## Quy tắc đặt tên View, ViewController và ViewModel — toàn project

Với View `{Feature}_View.js`, Controller phải là `{Feature}_ViewController.js` và ViewModel phải là `{Feature}_ViewModel.js`. Tên class cuối trong `Ext.define()` phải trùng tên file bỏ `.js`; namespace khớp đầy đủ đường dẫn thư mục.

Alias phải giữ nguyên tên file bỏ `.js`, kể cả chữ hoa/thường và dấu `_`, thêm tiền tố tương ứng:

- Controller: `alias: 'controller.{Feature}_ViewController'`.
- ViewModel: `alias: 'viewmodel.{Feature}_ViewModel'`.
- View sử dụng `controller: '{Feature}_ViewController'` và `viewModel: '{Feature}_ViewModel'`, không kèm tiền tố alias.
- `xtype` của View trùng tên file bỏ `.js`: `{Feature}_View`.

Ví dụ với `TrangChuNew1_View.js`:

```javascript
Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_View',
    controller: 'TrangChuNew1_ViewController',
    viewModel: 'TrangChuNew1_ViewModel'
});

Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew1_ViewController'
});

Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew1_ViewModel'
});
```

“Model” trong quy tắc này là `Ext.app.ViewModel`, không phải `Ext.data.Model`. Tên `{Feature}` phải đủ phân biệt để xtype/alias duy nhất toàn ứng dụng.

Áp dụng khi tạo mới hoặc sửa tên/alias của bộ MVVM trong phạm vi task; khi đổi alias phải cập nhật đồng bộ các nơi sử dụng, gồm `controller`, `viewModel`/`viewModel.type`, `requires` hiện có và tên class nếu liên quan. Không tự chuyển đổi hàng loạt source hiện có. Quy tắc này ưu tiên hơn ví dụ alias viết thường hoặc rút gọn cũ trong CLAUDE.md và skill.

## Quy tắc `requires` trong View và ViewController

Không bắt buộc khai báo `requires` trong View và ViewController. Không thêm `requires: []` hoặc danh sách dependency theo mẫu một cách máy móc, kể cả khi tách component con ra file riêng.

Khi gặp lỗi tải class thực tế, kiểm tra cơ chế nạp dependency hiện có và chỉ bổ sung khai báo cần thiết để giải quyết lỗi đã xác định. Không mặc định rằng alias luôn bảo đảm class đã được tải. Nếu thay đổi dependency trong source, phải thử runtime/UI của luồng liên quan và sửa lỗi → kiểm tra lại đến khi đạt; nếu bị chặn bởi môi trường thì báo rõ bằng chứng và phần chưa xác minh.

Quy tắc này áp dụng cho View/ViewController, ưu tiên hơn hướng dẫn bắt buộc `requires` trong ví dụ cũ của CLAUDE.md và skill. Giữ nguyên quy định của ViewModel và cấu hình package trong `app.json`; không tự xóa hàng loạt `requires` trong source hiện có.

## Quy tắc truy cập component — toàn project

Ưu tiên `itemId` theo mẫu `ten_IdView` (tên chức năng camelCase + `_IdView`), ví dụ `donViChart_IdView`. Controller dùng `const me = this;` và `me.getView().down('#donViChart_IdView')`; tên dùng động cũng phải giữ hậu tố này. Dùng cách này thay cho `reference`/`lookupReference()` khi tạo mới hoặc sửa phần truy cập component trong phạm vi task.

`itemId` phải mô tả chức năng và duy nhất trong cây View được tìm kiếm. Không dùng `id` toàn cục hoặc selector theo label/text. `down()` chỉ tìm hậu duệ, không gồm chính View; dùng `up()` khi thực sự cần tìm component cha. Giữ binding/ViewModel cho cập nhật state và reset field.

Quy tắc này áp dụng cho toàn repository và ưu tiên hơn hướng dẫn reference cũ trong CONVENTIONS.md, CLAUDE.md và skill, kể cả đoạn chỉ giới hạn itemId cho TrangChuNew. Không tự chuyển đổi hàng loạt source hiện có hoặc refactor ngoài phạm vi task.

## Bản đồ project

- `classic/src/Application.js`: application của Classic toolkit.
- `classic/src/view/main/`: shell, navigation trong `MainModel.js`, xử lý chuyển màn hình và dependencies trong `MainController.js`.
- `classic/src/view/pages/`: màn hình nghiệp vụ; mẫu đóng gói là `ConNguoiLienQuan/`.
- `classic/src/view/components/`: component dùng qua nhiều màn hình, ví dụ `ComBoDiaChi/`.
- `app/`: code dùng chung, gồm `Common.js` và `view/common/NotiCommon.js`.
- `classic/overrides/`: hành vi mặc định toàn cục; đọc override liên quan trước khi cấu hình component/proxy.
- `classic/sass/src/`: SCSS theo namespace; `resources/css/app.css`: theme variables và utility classes.
- `app.json`, `workspace.json`, `index.html`: cấu hình và entry; thư viện bên thứ ba nằm trong `lib/`, được nạp qua HTML.
- `scripts/`, `tests/`: kiểm tra hiện có; đọc phạm vi và điều kiện chạy trước khi dùng.

## Quy trình làm việc

1. Khảo sát đủ file liên quan, trình bày plan trước khi sửa: đường dẫn, nội dung, thứ tự phụ thuộc, tác động và cách xác minh. Chờ người dùng duyệt plan; nếu đã có plan được duyệt thì tiếp tục trong phạm vi đó, không xin lại cho từng bước.
2. Triển khai theo plan và conventions. Nêu thay đổi phạm vi đáng kể để người dùng quyết định trước khi thực hiện.
3. Chạy kiểm tra phù hợp, đọc lại diff, báo file đã sửa, kết quả và phần chưa xác minh. Không coi kiểm tra cú pháp là kiểm chứng UI.

### Bắt buộc kiểm tra chạy và sửa lỗi sau khi code

- Sau khi code, phải thực thi kiểm tra để xác minh phần đã thay đổi chạy được. Với thay đổi giao diện/luồng ExtJS, chạy ứng dụng và thử luồng bị ảnh hưởng, kiểm tra lỗi console và request liên quan; lint, đọc code hoặc build thành công không thay thế kiểm thử runtime/UI.
- Nếu kiểm tra phát hiện lỗi do thay đổi vừa làm hoặc lỗi ngăn chức năng được giao hoạt động, phải tìm nguyên nhân, sửa trong phạm vi task rồi chạy lại kiểm tra đã thất bại và các kiểm tra liên quan. Tiếp tục vòng kiểm tra → sửa → kiểm tra lại đến khi đạt; không chỉ báo lỗi rồi bàn giao khi vẫn có thể sửa trong phạm vi đã duyệt.
- Việc chạy ứng dụng/kiểm tra và sửa lỗi trong phạm vi task là một phần của triển khai đã được duyệt, không cần xin phép lại từng vòng. Không áp dụng cho lượt chỉ lập plan/brief hoặc review chỉ đọc.
- Nếu thiếu công cụ, backend, dữ liệu/quyền truy cập hoặc bị chặn bởi lỗi ngoài phạm vi, thực hiện các kiểm tra còn khả thi, báo rõ nguyên nhân và bước cần để tiếp tục; không lặp cùng lệnh thất bại khi điều kiện không đổi, không tự mở rộng phạm vi. Không khẳng định “chạy được” hoặc hoàn tất kiểm chứng khi chưa có bằng chứng thực thi.
- Báo cáo cuối nêu kiểm tra/lệnh/luồng đã chạy, kết quả, lỗi đã sửa và kết quả kiểm tra lại; ghi rõ phần còn bị chặn.

## Skill dùng chung

- [task-brief](.agents/skills/task-brief/SKILL.md): khi được gọi để chuẩn hóa yêu cầu lớn/chưa rõ; chỉ lập brief và dừng chờ duyệt.
- [extjs-frontend](.agents/skills/extjs-frontend/SKILL.md): triển khai hoặc sửa giao diện, MVVM, navigation, store/API hay style của ứng dụng ExtJS này.
- [extjs-verify](.agents/skills/extjs-verify/SKILL.md): chọn và thực hiện kiểm tra cho thay đổi ExtJS trước khi bàn giao hoặc khi được yêu cầu kiểm tra.

## Ranh giới

- Không sửa SDK `ext/`, thư viện vendor `lib/`, secret hoặc môi trường thật nếu task không yêu cầu.
- Không sửa tay output `build/`, `bootstrap.js`, `bootstrap.css`, `classic.json`, `classic.jsonp`; kiểm tra diff sau lệnh Sencha có sinh file.
- **Không tự ý build (dev hoặc prod)**: Tuyệt đối không tự động chạy các lệnh build (`sencha app build`, `sencha app build development`, `sencha app build production`, `sencha app build classic`...). Chỉ khi nào người dùng có yêu cầu/lệnh trực tiếp mới được chạy lệnh build. Không tự ý dùng lệnh build làm bước kiểm tra code vì sẽ sinh ra file rác trong `build/`, `classic.jsonp`.
- Không chuyển sang React/MUI, ES modules hoặc thêm bundler. `package.json` hiện không có scripts lint/test/build; không giả định có `npm run build` hoặc tự cài dependency chỉ để kiểm tra.
- Các lệnh Sencha được tài liệu hiện tại ghi nhận: `sencha app watch`, `sencha app build`, `sencha app build classic`. Kiểm tra công cụ/profile phù hợp trước khi chạy; không chạy server hoặc build khi task chỉ lập brief hoặc khi chưa có lệnh build rõ ràng từ người dùng.
- Truy vết URL, method, request/response, phân trang, định dạng ngày và lỗi khi thay đổi cách gọi API. Backend không nằm trong repository này; không khẳng định đã kiểm chứng backend nếu chưa có bằng chứng.
