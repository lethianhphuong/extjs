---
name: extjs-frontend
description: Triển khai hoặc sửa màn hình, popup, component, binding/store, navigation và style trong ứng dụng DEMO ExtJS Classic này. Dùng cho công việc source ExtJS; yêu cầu chỉ lập brief dùng task-brief.
---

# Phát triển giao diện ExtJS

Đọc [AGENTS.md](../../../AGENTS.md), [CONVENTIONS.md](../../../CONVENTIONS.md) và phần liên quan của [CLAUDE.md](../../../CLAUDE.md). Trình bày plan trước khi sửa, triển khai trong phạm vi đã được duyệt. Không tự bật lại lượt task-brief khi đã có plan được duyệt.

## Cấu trúc và dependencies — conventions mục 1, 6–7

- Màn hình/popup có MVVM độc lập đặt bộ `{Feature}_View.js`, `_ViewController.js`, `_ViewModel.js` trong folder riêng. Popup thuộc màn hình nào nằm trong folder màn hình đó; mẫu là `ConNguoiLienQuan/`.
- Khối trình bày dùng chung MVVM ở cùng folder chủ sở hữu, không tạo Controller/ViewModel rỗng. Component dùng qua nhiều màn hình đặt tại `classic/src/view/components/`, có MVVM riêng và trao đổi qua config/binding/events; không phụ thuộc state/controller của feature gọi.
- Namespace `DEMO` khớp đầy đủ đường dẫn dưới `classic/src/`; xtype trùng tên file không gồm `.js`, PascalCase và duy nhất toàn app. Alias Controller/ViewModel viết thường theo conventions.
- Theo mục 1.1.1: tách grid trên 100 dòng hoặc hơn 3 renderer phức tạp; filter trên 5 component hoặc có logic phức tạp; tab/chart phức tạp. Form dài tách theo khối nghiệp vụ. Actioncolumn đơn giản không tự tạo lý do tách.
- Ngoại lệ mục 1.1.2: một grid với filter đơn giản và paging có thể là View trực tiếp extends `Ext.grid.Panel`, filter dock top, paging bottom. Không tạo ViewGrid thừa. Nhiều panel/tab/chart dùng Container với component con phù hợp.
- Khai báo requires cho component tách ra và class cần nạp; kiểm tra alias resolution thực tế khi thêm Controller/ViewModel, không giả định class đã load.
- Page mới: thêm leaf `route` + `component` vào navigation tree ở MainModel, thêm class vào requires tại nơi cần. Theo MainController hiện có; không tạo map hay handler route trùng từ ví dụ cũ mục 6. Khi di chuyển file cập nhật namespace, requires, nơi dùng và SCSS; không sửa bootstrap/manifest sinh tự động.

## View, form và binding — mục 3, 5

- View chứa layout/items/config/bind; Controller xử lý sự kiện/nghiệp vụ/validation/API; ViewModel giữ data/stores/formulas, không thao tác UI hoặc gọi API trực tiếp trong method.
- Field khai báo trực tiếp tại nơi dùng, gồm xtype, name/reference, label, bind, validation và listener phù hợp. Không schema/factory/helper/vòng lặp dựng field tĩnh hoặc chuyển UI sang Controller/afterrender.
- Không override initComponent chỉ để gán items, Ext.apply hoặc callParent; chỉ dùng khi config/binding không đáp ứng khởi tạo theo instance, ghi lý do cụ thể.
- Dùng reference và lookupReference để tìm field; reset qua ViewModel. Gom filter trong `data.timKiemNangCao`, bind đường dẫn con, reset object theo giá trị mặc định.
- Store có tên mô tả camelCase, như `{entity}GridStore`, `{entity}ComboStore`, fields rõ ràng; kiểm tra binding và phạm vi ViewModel cha/con.
- Đặt `padding5` một lần trên component ngoài cùng chứa form; popup độc lập có form gốc riêng. Không inline margin trên field để tạo khoảng cách cột. Với columnWidth, container trung gian phải cấp chiều rộng, ví dụ vbox/stretch; không thêm wrapper từng field để vá layout.
- Field bắt buộc dùng `allowBlank: false` và `cls: 'field-csstyle required'`. Không chèn dấu sao qua HTML/CSS riêng; field thường giữ class mặc định override.

## Controller, popup và API — mục 4

- Handler/listener dạng tên method, prefix on; không inline button handler trong Window. Đảm bảo handler resolve đúng ViewController, kể cả popup.
- Controller mở Window chứa View/Form có MVVM riêng, trao đổi qua config/binding/events. Đọc Window override trước để tránh lặp defaults.
- Dùng notiCommon.show/showCustom cho thông báo và xác nhận; không gọi Ext.toast trực tiếp. Kiểm tra chữ ký tại `app/view/common/NotiCommon.js`.
- Đọc Ajax/Store override trước khi cấu hình request: timeout, loading, phân trang có hành vi chung. Không thêm cấu hình/listener trùng; truy vết URL/method/payload/reader/phân trang/ngày giờ/lỗi khi sửa API.
- Chỉ viết init khi có logic khởi tạo; cleanup tài nguyên/listener do component sở hữu khi cần. Không tạo init rỗng chỉ callParent.

## Style và cách viết — mục 2, 8–10

- JavaScript ES2020 dạng script, không import/export; let/const, single quotes, semicolon, không trailing comma, 4 spaces, `const me = this` trong method ExtJS. Không sao chép var hoặc selector down để tìm field từ snippet legacy.
- SCSS theo namespace đầy đủ trong `classic/sass/src/`; dùng class và theme variables/utilities ở `resources/css/app.css`, kiểm tra light/dark. Không hardcode màu trong JS/template.
- Đọc override liên quan trước khi viết component mới. Không lặp labelAlign, labelSeparator, date format, Grid width, Window defaults, Ajax timeout/loading nếu không cần giá trị khác. Required-field class là ngoại lệ có chủ đích ở trên.
- UI tiếng Việt có dấu; file/class PascalCase, biến/method camelCase có thể dùng tiếng Việt không dấu. Comment nghiệp vụ tiếng Việt, public methods có JSDoc. File dài dùng `//#region NOTE: Tên nhóm` và `//#endregion` theo nhóm thật, không từng field.
- Không refactor legacy ngoài phạm vi chỉ để áp chuẩn mới.

## Kiểm tra chạy và sửa lỗi

Sau khi code, bắt buộc thực thi kiểm tra theo AGENTS.md và extjs-verify. Với thay đổi giao diện/luồng ExtJS, chạy ứng dụng, thử luồng bị ảnh hưởng và kiểm tra console/request; lint hoặc build thành công chưa chứng minh runtime/UI hoạt động.

Nếu lỗi do thay đổi vừa làm hoặc ngăn chức năng được giao hoạt động, tìm nguyên nhân, sửa trong phạm vi đã duyệt rồi chạy lại kiểm tra thất bại và kiểm tra liên quan đến khi đạt. Không chỉ báo lỗi rồi bàn giao khi vẫn có thể sửa. Không xin phép lại từng vòng sửa lỗi trong phạm vi task. Nếu thiếu môi trường hoặc lỗi ngoài phạm vi chặn kiểm tra, thực hiện phần khả thi và báo rõ điều kiện cần để tiếp tục; không khẳng định chạy được khi chưa có bằng chứng.

## Bàn giao

Dùng [extjs-verify](../extjs-verify/SKILL.md) để chọn kiểm tra phù hợp. Báo file đã sửa, hành vi đạt được, kiểm tra đã chạy và giới hạn còn lại.
