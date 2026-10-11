# Plan refactor toàn repo: code lặp, CSS không dùng và file sinh tự động

**Trạng thái:** Đang thực hiện. Đã hoàn tất lô ConNguoiLienQuan; audit toàn repo đang phân loại các ứng viên cần bằng chứng runtime.

## Phạm vi và kết quả kiểm tra ban đầu

Phạm vi mở rộng **toàn repo**: `classic/src/`, `app/`, `classic/sass/`, `resources/`, `scripts/`, cấu hình Sencha, `index.html` và các file build đang được Git theo dõi. Khoảng 140 file trong `classic/src`/`app` và 21 file trong `classic/sass`/`resources/css` cần được phân nhóm để rà soát; các phát hiện dưới đây mới là kết quả kiểm tra ban đầu của ConNguoiLienQuan, chưa phải kết luận cho toàn repo. Bảo toàn thay đổi hiện có của người dùng trong các file staged.

| Phát hiện | Bằng chứng hiện tại | Hướng xử lý đề xuất |
| --- | --- | --- |
| `.cnlq-editor` **đang dùng** | Gắn vào hai window ConNguoiLienQuan và hai window trong `ConNguoiDemo2` | Giữ class và các rule thực sự cần; không xóa chỉ vì xuất hiện ở nhiều file. |
| Style `.cnlq-editor` xuất hiện ở nhiều CSS | Nguồn `ThemMoiConNguoi_View.scss`; bản preview `resources/css/con-nguoi-lien-quan.css`; bản build `DEMO-all_2.css`; bản copy trong `build/development/DEMO/resources/css/` | Chọn **một nguồn chỉnh sửa là SCSS**. Kiểm tra đường tải CSS theo chế độ chạy; tránh nạp cùng rule hai lần. Bản build/copy chỉ tái tạo từ nguồn. |
| Có khả năng nạp trùng CSS lúc phát triển | `index.html` link trực tiếp `resources/css/con-nguoi-lien-quan.css`; `bootstrap.css` import `DEMO-all.css` chứa cùng rule từ SCSS | Xác nhận trong Network/Computed Styles. Nếu cả hai cùng nạp, giữ một đường tải cho từng chế độ chạy; không bỏ link preview trước khi chắc source mode vẫn có style. |
| `.cnlq-copy-cell` và `.cnlq-relation-titlebar` có rule nhưng không thấy `cls` trong source JS hiện tại | Chỉ thấy ở `ThemMoiConNguoi_View.scss` và CSS sinh ra; `ComBoDiaChi` hiện dùng container riêng không có `cnlq-copy-cell` | Ứng viên xóa khỏi SCSS sau khi kiểm tra runtime/template ngoài JS. |
| `cnlq-address-columns`, `cnlq-list-filter` được gắn `cls` nhưng không thấy rule tương ứng | Trong `ThemMoiConNguoi_ViewDiaChi.js`, `ConNguoiLienQuan_ViewFilter.js` | Nếu không được dùng bởi selector bên ngoài, bỏ `cls` rỗng; không tạo CSS mới chỉ để giữ tên. |
| Các class như `cnlq-row`, `cnlq-photo-*`, `cnlq-primary`, `cnlq-footer`, `cnlq-list` đang có nơi dùng | Được khai báo trong các View/Controller tương ứng | Giữ và kiểm tra trạng thái hiển thị trước khi chỉnh giá trị CSS. |
| Logic resize dòng form lặp | `onFormRowResize` trong `ThemMoiConNguoi_ViewController.js` và `MoiQuanHe_ViewController.js` gần như giống nhau; `ComBoDiaChi_ViewController.js` có bản khác ngưỡng và đo theo chiều rộng dòng | Đối chiếu breakpoint/hành vi thực tế. Chỉ gom khi cùng một hợp đồng; không dùng helper chung nếu khác ngữ nghĩa. |
| Bốn handler copy địa chỉ gần như giống nhau | `onCopyQueQuan`, `onCopyDktt`, `onCopyTamTru`, `onCopyHienTai` chỉ khác reference nguồn | Có thể chuyển nguồn thành config của từng instance và dùng một handler tại màn hình gọi, vẫn giữ `ComBoDiaChi` độc lập. |
| File sinh tự động cũng đang staged | `classic.json`, `classic.jsonp`, ba `DEMO-all_*.css`; `build/temp/development/...` có các bản xóa staged; `.gitignore` mới có `build/temp/` | Đối chiếu nguồn tạo ra chúng và trạng thái Git trước khi quyết định tái tạo, giữ, bỏ theo dõi hay hoàn tất xóa. |
| Quy ước hiện tại không khuyến khích chỉnh tay manifest/bootstrap | `CLAUDE.md` mục auto-generated và `CONVENTIONS.md` mục cấu trúc folder | Theo yêu cầu mới, bổ sung bước **xem xét chỉnh tay có kiểm soát** khi generator không thể tạo đúng cấu hình; ghi rõ ngoại lệ, file, lý do và cách duy trì sau lần build tiếp theo. |

## Thứ tự thực hiện sau khi duyệt

1. **Chốt baseline toàn repo:** lưu danh sách file staged/unstaged, nhóm file nguồn với file sinh tự động; rà import/`requires`, xtype, selector CSS, script tạo file và luồng tải CSS. Kiểm tra repo theo từng feature, bắt đầu với ConNguoiLienQuan và ComBoDiaChi rồi đến các feature còn lại. Ghi báo cáo `đang dùng / trùng / ứng viên không dùng / chưa đủ chứng cứ`, tránh kết luận chỉ bằng một lần `rg`.
2. **Refactor code nguồn theo feature:** tìm handler, store, View, component và helper lặp; hợp nhất chỉ khi cùng dữ liệu đầu vào/hành vi. Gỡ code chết sau khi kiểm tra tham chiếu tĩnh, đăng ký menu/router, Ext `requires` và trường hợp tạo động. Giữ quy chuẩn MVVM và field khai báo trực tiếp; không sinh field tĩnh bằng factory.
3. **Dọn CSS toàn repo:** đối chiếu các SCSS trong `classic/sass`, CSS thủ công trong `resources/css` và class thực tế trong JS/HTML. Bắt đầu với `cnlq-editor`: giữ vì đang dùng; xóa selector con chỉ khi xác nhận không có hook runtime. Kiểm tra CSS preview và `DEMO-all` có cùng rule, chọn một đường tải cho mỗi chế độ chạy. Chỉnh nguồn, sau đó đồng bộ/build lại file sinh.
4. **Rà manifest/bootstrap:** kiểm tra `app.json`, classpath và output Sencha trước. Nếu cần chỉnh tay `classic.json`, `classic.jsonp`, `bootstrap.js`, `bootstrap.css` hoặc file manifest khác theo yêu cầu, lập bảng từng key/path cần đổi, kiểm tra JSON/JSONP và chạy lại app. Ghi nhận rõ chỉnh tay sẽ bị Sencha Cmd ghi đè; chuyển thay đổi về cấu hình nguồn hoặc script hậu build khi có thể. Không cập nhật hàng loạt path/hash bằng tìm-thay mù.
5. **Xử lý build/temp đang staged:** kiểm kê từng file `D` dưới `build/temp/development/DEMO` và `NVCB`, kiểm tra có tác vụ Sencha đang dùng chúng không và `.gitignore` mới có hiệu lực thế nào với file đã được Git theo dõi. Sau đó quyết định hoàn tất xóa khỏi repo hay tái tạo/giữ file cần thiết. Kiểm tra `git diff --cached --name-status` trước/sau để không cuốn theo xóa `SenchaCmd-7.5.1.20-windows-64bit.zip` hoặc thay đổi khác không liên quan nếu chưa đánh giá.
6. **Kiểm tra theo từng lô:** syntax/lint, script kiểm tra feature, CSS sync/build, kiểm tra classpath/manifest và smoke test các menu/popup. Riêng ConNguoiLienQuan kiểm tra popup Thêm mới, Mối quan hệ, danh sách, hai chế độ `ComBoDiaChi` và resize. Đối chiếu CSS Network/Computed Styles ở source mode và build mode. Mỗi lô hoàn tất có danh sách file, hành vi giữ nguyên và kết quả kiểm tra để review.

## Checklist review và thực hiện

- [x] Liệt kê file đang thay đổi và đọc quy chuẩn SCSS/MVVM liên quan.
- [x] Phân biệt `.cnlq-editor` đang dùng với các selector ứng viên không dùng.
- [x] Xác định CSS nguồn, preview, build và hai đường nạp có khả năng trùng.
- [x] Kiểm kê sơ bộ file staged, gồm manifest/build CSS và các bản xóa `build/temp`.
- [x] Quét 137 file JS và 20 file SCSS/CSS; có 303 tên class chưa thấy tham chiếu trực tiếp trong JS/HTML. Đây là danh sách ứng viên, không phải bằng chứng có thể xóa; class động và template ngoài repo cần kiểm tra thêm.
- [ ] Phân nhóm sâu các feature còn lại và xác minh class động/runtime trước khi xóa diện rộng.
- [ ] Xác nhận bằng trình duyệt class runtime và đường nạp CSS trước khi xóa.
- [ ] Refactor code lặp/không dùng theo từng feature; ghi lại các trường hợp không nên gộp.
- [x] Dọn hai selector ConNguoiLienQuan chắc chắn không dùng trong SCSS nguồn; CSS build đã cập nhật.
- [x] Bỏ hai class JS ConNguoiLienQuan không có rule hoặc hook.
- [x] Gộp bốn handler copy thành một; ngưỡng resize của `ComBoDiaChi` khác hai popup nên giữ riêng. Hai popup có thể chia sẻ logic sau khi kiểm tra giao diện.
- [x] Kiểm tra manifest: cả ba class `ComBoDiaChi` và 20 class ConNguoiLienQuan đã có trong `classic.json`; `bootstrap.js` dùng manifest. Không cần chỉnh tay. Lệnh `sencha app refresh` bị thiếu catalog package của Sencha Cmd.
- [x] Kiểm kê `build/temp`: tám bản xóa đã staged, không còn file nào được Git theo dõi trong thư mục; `.gitignore` đã có `build/temp/`.
- [x] Xóa CSS preview nạp trùng khỏi `index.html` và xóa bản preview; SCSS vẫn được build vào `DEMO-all`. Xóa hai selector chắc chắn không có nơi dùng trong source và hai `cls` rỗng.
- [x] Chạy kiểm tra cú pháp 137 JS, feature script, CSS build và đối chiếu manifest/JSONP.
- [ ] Kiểm tra giao diện trước/sau và full build sau khi môi trường browser/Sencha Cmd khả dụng.
