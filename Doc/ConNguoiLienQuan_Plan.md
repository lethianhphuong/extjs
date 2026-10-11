# Kế hoạch chức năng Con người liên quan

> Cập nhật 04/10/2026: cấu trúc folder và UI đang được đề xuất lại trong [kế hoạch refactor](ConNguoiLienQuan_Restructure_Plan.md), chờ người dùng review. Tham chiếu tài liệu mới trước khi triển khai tiếp.

Ngày lập: 02/10/2026

Trạng thái: Đã có bản triển khai ban đầu, đang rà soát và cần chỉnh lại theo pattern popup của project. Chưa nghiệm thu.

## Điều chỉnh sau rà soát ngày 02/10/2026

Yêu cầu mới của người dùng: đọc lại `CONVENTIONS.md`, `CLAUDE.md`, lập plan/checklist trước khi chỉnh tiếp; cách mở popup phải giống `onXemLichSu` trong `classic/src/view/pages/ToTrinh/ToTrinh_ViewController.js`.

### Kết quả đối chiếu

- Đã đọc lại hai tài liệu và popup `LichSuToTrinh_ViewPopup` cùng Controller gọi popup.
- Bản hiện tại tạo trực tiếp class kế thừa `Ext.window.Window`. Cần đổi sang Controller tạo `Ext.window.Window`, `items` chỉ tham chiếu xtype của nội dung popup, rồi gọi `win.show()` theo yêu cầu người dùng.
- Quy chuẩn có ví dụ cũ dùng `var`, nhưng phần quy định viết code yêu cầu `let`/`const`. Áp dụng cấu trúc mở popup theo ví dụ và dùng `const win`.
- Bộ lọc đã được gom vào `timKiemNangCao`; filter bar và form quan hệ đã tách file, nhưng cần kiểm tra lại sau khi đổi cấu trúc popup.
- Các nhóm đang dùng `layout: 'auto'` kết hợp CSS flex và sửa nhãn floating của project. Cần thay bằng layout ExtJS phù hợp, kiểm tra định vị field và thu hẹp CSS tùy chỉnh để sử dụng override chung.
- Các store danh mục đang nằm trong cấu hình helper `ConNguoiLienQuan_Fields.js`, cần chuyển sang ViewModel và bind store; helper chỉ giữ cấu hình trình bày nếu vẫn cần.
- Dữ liệu địa chỉ và một số thao tác reset đang dùng `setValue()` trực tiếp. Cần bind về ViewModel, reset bằng `vm.set()`, truy cập field qua `reference/lookupReference()`.
- SCSS đã được khôi phục làm nguồn; đang có bản CSS sao chép được nạp từ `index.html` để xem trong môi trường build lỗi. Đây là giải pháp tạm, cần thống nhất đường nạp style và ghi rõ giới hạn build, không duy trì hai nguồn style độc lập.
- Đã kiểm tra cú pháp JS và mở được danh sách/form; đã thấy form hết chồng nhãn sau sửa tạm. Chưa xác nhận toàn bộ luồng Lưu, các nhánh động và responsive.
- Sencha Cmd hiện báo thiếu `C:/Users/SV Store/bin/Sencha/Cmd/repo/pkgs/catalog.json`; chưa xác nhận build thành công. Không sửa SDK hoặc tự khởi tạo lại project để che lỗi môi trường.

### Kế hoạch chỉnh sửa theo thứ tự

1. **Controller danh sách:** sửa `ConNguoiLienQuan_ViewController.js` để `Ext.create('Ext.window.Window', {... items: [{ xtype: 'ThemMoiConNguoi_View' }] })`, rồi `win.show()`. Chỉ cấu hình vỏ popup: tiêu đề, kích thước, cuộn và xtype; không đặt nội dung form trong Controller. Khai báo requires cho nội dung popup.
2. **Nội dung popup Thêm mới:** đổi `ThemMoiConNguoi_View.js` thành `Ext.form.Panel` hoặc Container chứa form, vẫn giữ Controller/ViewModel riêng. Chuyển Lưu/Đóng thành toolbar của nội dung popup để string handler resolve đúng Controller. Không khai báo lại mặc định Window đã có override.
3. **Controller form:** sửa `ThemMoiConNguoi_ViewController.js` để đóng bằng `me.getView().up('window').close()`, phát sự kiện Lưu từ nội dung popup và để Controller danh sách nhận kết quả. Đảm bảo listener, ảnh và cửa sổ con được dọn đúng vòng đời mới.
4. **Popup quan hệ:** sửa `MoiQuanHe_View.js` thành nội dung popup; phần mở trong Controller form dùng `Ext.create('Ext.window.Window', { items: [{ xtype: 'MoiQuanHe_View' }] })`. Sửa `MoiQuanHe_ViewController.js` để lưu/đóng đúng window cha; giữ `MoiQuanHe_ViewForm.js` là component con.
5. **ViewModel và reference:** rà `ConNguoiLienQuan_ViewModel.js`, `ThemMoiConNguoi_ViewModel.js`, `MoiQuanHe_ViewModel.js`, `ConNguoiLienQuan_Fields.js` và các component con. Chuẩn hóa tên store, bind danh mục/dữ liệu, reference và reset qua ViewModel. Tách xử lý UI khỏi dữ liệu.
6. **Layout và style:** sửa `ThemMoiConNguoi_ViewForm.js`, `ThemMoiConNguoi_ViewDiaChi.js`, `ThemMoiConNguoi_ViewTronChet.js`, `MoiQuanHe_ViewForm.js`, `ConNguoiLienQuan_ViewFilter.js`. Dùng bố cục ExtJS, field không chồng nhãn, grid không tràn; SCSS theo đúng mapping. Rà `resources/css/con-nguoi-lien-quan.css` và dòng nạp trong `index.html` để xử lý bản style tạm một cách rõ ràng.
7. **Kiểm tra chức năng:** kiểm tra mở/đóng nhiều lần, popup con, validation, dữ liệu nhánh ẩn, Lưu đúng một bản ghi, tìm kiếm/phân trang, cuộn và kích thước cửa sổ. Chỉ đánh dấu hoàn thành khi có kết quả kiểm tra.
8. **Bàn giao:** cập nhật checklist và kết quả review, tách rõ phần đạt, chưa kiểm tra và bị chặn bởi môi trường build.

Pattern mục tiêu cho nút Thêm mới (kích thước sẽ giới hạn theo viewport):

```javascript
const win = Ext.create('Ext.window.Window', {
    title: 'Thêm mới thông tin con người liên quan',
    width: 1380,
    autoHeight: true,
    maxHeight: 900,
    scrollable: 'y',
    items: [{
        xtype: 'ThemMoiConNguoi_View'
    }]
});

win.show();
```

Phần này thay thế thiết kế kế thừa Window trực tiếp ở bản kế hoạch ban đầu bên dưới.

## 1. Mục tiêu và tài liệu tham chiếu

Xây dựng chức năng danh sách và Thêm mới thông tin con người liên quan bằng ExtJS Classic, theo kiến trúc MVVM và quy chuẩn của project.

- Giao diện tham chiếu: `C:/Users/SV Store/Downloads/them-moi-con-nguoi-lien-quan.html`.
- Quy chuẩn: `CLAUDE.md`, `CONVENTIONS.md`.
- Checklist thực hiện: [ConNguoiLienQuan_Checklist.md](ConNguoiLienQuan_Checklist.md).

File HTML là mẫu giao diện và hành vi để chuyển sang component ExtJS. Mẫu chưa có danh sách; Lưu chỉ hiện thông báo và tra cứu dân cư là mô phỏng.

## 2. Phạm vi và giả định

- Thêm mục **Con người liên quan** vào nhóm `TEST` đang chứa các chức năng Demo. Hiện chưa có nhóm riêng tên `Demo`.
- Route: `#con-nguoi-lien-quan`.
- Danh sách có tìm kiếm, lọc, phân trang và nút Thêm mới.
- Form giữ các nhóm thông tin và hành vi động của mẫu.
- Dữ liệu lưu trong bộ nhớ phiên chạy; tải lại trang sẽ reset.
- Danh mục và tra cứu sử dụng dữ liệu mẫu, ghi rõ tra cứu mô phỏng.
- Chưa tích hợp API dân cư, API lưu hồ sơ, upload ảnh lên server hoặc danh mục hành chính thực tế.
- Sửa/xóa bản ghi danh sách, xuất Excel và phân quyền không thuộc phạm vi hiện tại. Xóa dòng quan hệ và hình thức/nguyên nhân trong form vẫn thuộc phạm vi.

## 3. Luồng sử dụng

Menu → Danh sách → Thêm mới → Nhập thông tin → Kiểm tra dữ liệu → Lưu → Đóng form và cập nhật danh sách.

Đóng form khi chưa lưu không thêm bản ghi. Mở form mới phải có dữ liệu độc lập, không giữ lại dữ liệu của lần nhập trước. Nếu bộ lọc hiện tại che bản ghi mới, đưa danh sách về trạng thái phù hợp để người dùng thấy kết quả vừa lưu.

## 4. Danh sách

- Bộ lọc: từ khóa họ tên/CCCD, vai trò, giới tính.
- Nút: Tìm kiếm, Đặt lại, Thêm mới.
- Cột: STT, họ tên, vai trò, ngày sinh, giới tính, CCCD/CMT, số điện thoại, nơi ở hiện tại.
- Có phân trang, tổng số bản ghi và trạng thái không có dữ liệu.
- Dữ liệu mẫu đủ để kiểm tra bộ lọc và phân trang.
- Grid bind store từ ViewModel; xử lý tìm kiếm và mở popup đặt trong Controller.

## 5. Form Thêm mới

Controller tạo `Ext.window.Window` lớn, vừa vùng hiển thị, chứa xtype nội dung popup; nội dung có bộ ba MVVM riêng, vùng cuộn và toolbar Lưu/Đóng. Giữ thứ tự các nhóm trong mẫu; ưu tiên giao diện và override chung của project, bố cục thích ứng khi cửa sổ thu nhỏ.

| Nhóm | Nội dung |
| --- | --- |
| Vai trò | Vai trò người tham gia tố tụng |
| Cá nhân | Ảnh, họ tên, giới tính, ngày sinh, CCCD/CMT, tên khác, lý do không có CCCD, ngày và nơi cấp CCCD |
| Thông tin bổ sung | Dân tộc, quốc tịch, hộ chiếu và thông tin cấp, trình độ văn hóa, nghề nghiệp, chức vụ, nơi làm việc, điện thoại, thành phần gia đình, tôn giáo, Đảng viên, tiền án/tiền sự và nội dung |
| Địa chỉ | Nơi sinh, quê quán, ĐKTT, tạm trú, nơi ở hiện tại; mỗi địa chỉ có chi tiết, phường/xã, tỉnh/thành phố, quốc gia |
| Địa chỉ cũ | Checkbox bật các dòng địa chỉ trước sáp nhập; sao chép địa chỉ hiện tại từ dòng phía trên theo mẫu |
| Nghiệp vụ | Tệ nạn ma túy, lực lượng vũ trang, đối tượng nghiệp vụ, tình trạng sức khỏe |
| Mối quan hệ | Grid và popup thêm quan hệ; cho phép xóa dòng |
| Trốn/chết | Checkbox bật khai báo, đơn vị nhiều cấp, chọn nhánh Trốn hoặc Chết, bảng hình thức/nguyên nhân và các thông tin chi tiết |

### Mối quan hệ

Popup có họ tên, năm sinh, giới tính, CCCD/CMT, quan hệ và nơi ở hiện nay. Bắt buộc họ tên và quan hệ. Lưu thêm dòng vào store của form chính; đóng popup không thêm dòng.

### Trốn/chết

- Đơn vị: Trại tạm giam, Nhà tạm giữ, Trụ sở công an hoặc Khác.
- Trại/Nhà tạm giữ: chọn đơn vị chi tiết. Trụ sở công an: chọn loại cơ quan rồi chọn đơn vị cấp tiếp theo. Khác: nhập cụ thể.
- Nhánh Trốn: thêm/xóa nhiều hình thức trốn và xử lý cán bộ; địa điểm, ngày trốn, ngày bắt lại, nội dung, kết quả giải quyết và xử lý cán bộ.
- Nhánh Chết: thêm/xóa nhiều nguyên nhân và xử lý cán bộ; địa điểm, ngày chết, nội dung, kết quả giải quyết và xử lý cán bộ.
- Chi tiết từng nhánh hiển thị khi có ít nhất một dòng hình thức/nguyên nhân, theo mẫu.
- Chỉ kiểm tra và đưa vào dữ liệu lưu nhánh đang được chọn. Không gửi dữ liệu nhánh ẩn hoặc khối đã tắt.

## 6. Validation và xử lý

- Bắt buộc: vai trò, họ tên, giới tính, ngày sinh, nghề nghiệp, Đảng viên, tiền án/tiền sự, ma túy, lực lượng vũ trang và đối tượng nghiệp vụ.
- Có CCCD thì xóa và khóa lý do không có CCCD; thiếu CCCD thì bắt buộc lý do.
- Tra cứu yêu cầu đủ họ tên, giới tính, ngày sinh và CCCD; thông báo rõ đây là dữ liệu mô phỏng.
- Ảnh: kiểm tra là ảnh, xem trước, chọn lại được và giải phóng tài nguyên xem trước khi thay ảnh/đóng form.
- Khi bật trốn/chết: bắt buộc đơn vị, trường hợp và ít nhất một hình thức/nguyên nhân tương ứng.
- Các lựa chọn Khác yêu cầu nhập nội dung cụ thể khi trường đó đang hoạt động.
- Không thêm hình thức/nguyên nhân rỗng hoặc trùng; so sánh sau khi loại khoảng trắng thừa và không phân biệt hoa thường.
- Ngày bắt lại không trước ngày trốn, chỉ áp dụng trong nhánh Trốn.
- Báo lỗi đúng trường và đưa người dùng đến trường lỗi đầu tiên.
- Tổng hợp đầy đủ dữ liệu cá nhân, ảnh trong phiên, địa chỉ, quan hệ và thống kê vào bản ghi mới.
- Mỗi lần Lưu hợp lệ chỉ tạo một bản ghi; thông báo bằng cơ chế chung của project.

## 7. Thiết kế file

Thư mục nguồn: `classic/src/view/pages/ConNguoiLienQuan/`.

| File mới trong thư mục nguồn | Trách nhiệm |
| --- | --- |
| `ConNguoiLienQuan_View.js` | Grid danh sách, bộ lọc, phân trang |
| `ConNguoiLienQuan_ViewController.js` | Tìm kiếm, mở form, nhận kết quả Lưu |
| `ConNguoiLienQuan_ViewModel.js` | Store danh sách và điều kiện lọc |
| `ThemMoiConNguoi_View.js` | Cửa sổ chính và bố cục các phần |
| `ThemMoiConNguoi_ViewController.js` | Tương tác, validation, tra cứu mô phỏng, tổng hợp dữ liệu |
| `ThemMoiConNguoi_ViewModel.js` | Dữ liệu form, danh mục, store con và trạng thái hiển thị |
| `ThemMoiConNguoi_ViewForm.js` | Cá nhân và thông tin bổ sung |
| `ThemMoiConNguoi_ViewDiaChi.js` | Các nhóm địa chỉ và địa chỉ cũ |
| `ThemMoiConNguoi_ViewQuanHe.js` | Grid mối quan hệ |
| `ThemMoiConNguoi_ViewTronChet.js` | Khối trốn/chết và các bảng con |
| `MoiQuanHe_View.js` | Popup nhập quan hệ |
| `MoiQuanHe_ViewController.js` | Kiểm tra và trả kết quả nhập quan hệ |
| `MoiQuanHe_ViewModel.js` | Dữ liệu popup quan hệ |

Các component con của form dùng chung Controller/ViewModel của form. Popup quan hệ có bộ ba MVVM riêng. Namespace theo thư mục, xtype trùng tên file; khai báo `requires` đầy đủ từ view cha.

| File khác | Thay đổi |
| --- | --- |
| `classic/src/view/main/MainModel.js` | Thêm menu, route, component và tên màn hình |
| `classic/src/view/main/MainController.js` | Thêm requires cho màn hình; dùng lại điều hướng hiện tại |
| `classic/sass/src/view/pages/ConNguoiLienQuan/ConNguoiLienQuan_View.scss` | Style danh sách |
| `classic/sass/src/view/pages/ConNguoiLienQuan/ThemMoiConNguoi_View.scss` | Style form, các khối con và popup quan hệ với class giới hạn phạm vi |

Đọc các override GridPanel, Store, PagingToolBar, Window, ComboBox, DateField và TextField trước khi triển khai; không lặp lại cấu hình đã được override. Không sửa SDK `ext/` hoặc ghi đè thay đổi đang có của người dùng.

## 8. Thứ tự triển khai

1. Rà soát quy chuẩn, override và chốt cấu trúc dữ liệu.
2. Tạo bộ ba MVVM danh sách, dữ liệu mẫu và menu.
3. Dựng bộ ba form Thêm mới, phần cá nhân, ảnh và địa chỉ.
4. Làm grid/popup mối quan hệ.
5. Làm chọn đơn vị và hai nhánh trốn/chết.
6. Hoàn thiện validation, tổng hợp dữ liệu và cập nhật danh sách.
7. Hoàn thiện style, bố cục và vòng đời popup.
8. Kiểm tra cú pháp, build nếu môi trường hỗ trợ, kiểm tra giao diện và báo cáo.

## 9. Tiêu chí hoàn thành

- Menu và mở trực tiếp route đều hiển thị đúng danh sách.
- Bộ lọc và phân trang phối hợp đúng; thêm mới phản ánh đúng số lượng.
- Form có đầy đủ các trường của mẫu và các tương tác động hoạt động đúng.
- Không bị chặn Lưu bởi trường thuộc nhánh ẩn; dữ liệu nhánh ẩn không lẫn vào bản ghi.
- Lưu hợp lệ tạo đúng một bản ghi có đầy đủ dữ liệu; đóng không lưu không làm thay đổi danh sách.
- Mở lại form không còn dữ liệu cũ; chọn lại ảnh và thêm/xóa các bảng con hoạt động ổn định.
- Style không ảnh hưởng các màn hình khác; không phát sinh lỗi console trong các luồng đã kiểm tra.
- Báo cáo rõ kiểm tra đã chạy, kết quả và hạn chế môi trường nếu có. Chỉ đánh dấu checklist khi đã thực hiện và xác minh.
