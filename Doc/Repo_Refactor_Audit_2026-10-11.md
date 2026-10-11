# Kiểm kê refactor repo – 11/10/2026

## Kết quả đã xác nhận

- Đã kiểm tra cú pháp 137 file JS trong `classic/src` và `app`: không có lỗi `node --check`.
- Đã quét 20 file SCSS/CSS nguồn. Có 522 tên class ứng viên; 303 tên không có chuỗi trùng trực tiếp trong JS/HTML đang quét. Số này **không chứng minh class không dùng**: nhiều class đến từ ExtJS, HTML sinh động, template hoặc dữ liệu ngoài repo. Không xóa hàng loạt theo kết quả quét chuỗi.
- `.cnlq-editor` dùng ở hai popup ConNguoiLienQuan và hai popup ConNguoiDemo2. Giữ rule này.
- `.cnlq-copy-cell` và `.cnlq-relation-titlebar` không có class/hook trong JS source; đã xóa hai rule. `cnlq-address-columns` và `cnlq-list-filter` không có selector CSS hoặc hook khác; đã bỏ class rỗng.
- Bốn handler copy địa chỉ chỉ khác nguồn đã gộp thành `onCopyAddress`; từng instance `ComBoDiaChi` cung cấp `copyFrom`.
- CSS preview của ConNguoiLienQuan từng được link riêng trong `index.html`, trong khi manifest Sencha cũng tải `DEMO-all` có cùng rule. Đã bỏ link và hai bản CSS preview; giữ SCSS là nguồn và kiểm tra CSS build vẫn chứa `.cnlq-editor`.
- `classic.json` và `classic.jsonp` cùng hash, có 3 class ComBoDiaChi và 20 class ConNguoiLienQuan; không phát hiện key/path cần chỉnh tay. `bootstrap.js` chọn `classic.json`. `sencha app refresh` không chạy được vì thiếu `repo/pkgs/catalog.json` trong Sencha Cmd.
- Tám bản xóa `build/temp` đã staged; `git ls-files build/temp` không còn file. `.gitignore` đã thêm `build/temp/` để file tạm không được thêm lại. Bản xóa file ZIP Sencha Cmd là thay đổi staged riêng, chưa đụng tới trong đợt này.
- `.gitignore` từng bỏ qua toàn bộ `scripts/`, làm script kiểm tra feature không được Git theo dõi. Đã bỏ ignore quá rộng và đưa `scripts/check-con-nguoi.cjs` vào thay đổi staged.

## Kiểm tra đã chạy

- `node scripts/check-con-nguoi.cjs`: PASS, gồm mapping 5 địa chỉ, nguồn copy và logic danh sách.
- `node --check` trên 137 file JS: 0 lỗi.
- CSS build `_2` còn `.cnlq-editor`; không còn hai selector đã xóa. `index.html` không còn link preview.
- `git diff --cached --check` cho các file vừa sửa: PASS.

## Giới hạn kiểm chứng

- Chưa kiểm tra giao diện/runtime trực tiếp. Quyền truy cập localhost từ công cụ trình duyệt đã bị từ chối ở lượt trước; không thử dùng công cụ khác để vượt hạn chế đó.
- Các class không có tham chiếu tĩnh cần kiểm tra theo từng màn hình hoặc nguồn template trước khi xóa. Không thay đổi code ở các feature khác chỉ dựa vào quét chuỗi.
- Sencha Cmd không refresh/build được khi thiếu package catalog; CSS được kiểm tra trên file build hiện có và SCSS nguồn, chưa xác nhận bằng một full build mới.
