# Checklist triển khai Con người liên quan

> Cập nhật 04/10/2026: ưu tiên [checklist refactor folder và UI](ConNguoiLienQuan_Restructure_Checklist.md), chờ review. Checklist cũ giữ lại để theo dõi phạm vi nghiệp vụ.

Thực hiện theo thứ tự từ trên xuống. Đánh dấu `[x]` sau khi công việc đã hoàn thành và được kiểm tra; ghi lại kết quả hoặc vấn đề ở cuối tài liệu.

Kế hoạch chi tiết: [ConNguoiLienQuan_Plan.md](ConNguoiLienQuan_Plan.md).

## Ưu tiên hiện tại: rà soát theo quy chuẩn và pattern popup

Bản code đã được tạo nhưng chưa nghiệm thu. Các mục triển khai phía dưới chưa đánh dấu không có nghĩa là chưa có file; cần đối chiếu và kiểm tra lại sau đợt chỉnh này.

- [x] Đọc lại CLAUDE.md và CONVENTIONS.md trước đợt chỉnh tiếp theo.
- [x] Đối chiếu onXemLichSu và LichSuToTrinh_ViewPopup của Tờ trình.
- [x] Ghi lại điểm chưa đúng và kế hoạch sửa từng file trong plan.
- [ ] Đổi onAdd sang tạo Ext.window.Window với items chứa xtype, sau đó win.show().
- [ ] Đổi ThemMoiConNguoi_View thành nội dung form/panel, không kế thừa Window.
- [ ] Đặt toolbar Lưu/Đóng trong view nội dung và dùng string handler.
- [ ] Sửa onClose/onSave để đóng đúng window cha và truyền đúng dữ liệu cho danh sách.
- [ ] Áp dụng cùng pattern cho popup thêm mối quan hệ.
- [ ] Rà requires của Controller mở popup và các component con.
- [ ] Chuyển danh mục/store về ViewModel, chuẩn hóa tên store và binding.
- [ ] Bind địa chỉ vào ViewModel, reset qua vm.set và dùng reference/lookupReference.
- [ ] Rà lại bộ lọc timKiemNangCao sau khi tách ViewFilter.
- [ ] Thay layout auto + CSS flex bằng layout ExtJS phù hợp và kiểm tra nhãn floating theo override.
- [ ] Rà lại SCSS và loại bỏ việc bảo trì hai nguồn style độc lập; xử lý rõ bản CSS tạm.
- [ ] Format lại các cấu hình dài để dễ đọc, dùng let/const, single quotes và dấu chấm phẩy.
- [ ] Review từng file: syntax, naming, binding, logic, cấu hình thừa, vòng đời và HTML encoding.
- [ ] Kiểm tra mở/đóng popup chính và popup con nhiều lần, không giữ dữ liệu cũ.
- [ ] Kiểm tra validation và Lưu thực tế trên trình duyệt; không chỉ xác nhận hết lỗi cú pháp.
- [ ] Kiểm tra hai nhánh trốn/chết, dữ liệu ẩn, ảnh, địa chỉ và quan hệ.
- [ ] Kiểm tra danh sách sau Lưu, tìm kiếm, đặt lại và phân trang.
- [ ] Kiểm tra bố cục khi thu nhỏ, cuộn form và vị trí toolbar.
- [ ] Ghi kết quả build riêng; chưa đánh dấu đạt khi Sencha vẫn thiếu catalog.json.
- [ ] Cập nhật tiến độ checklist gốc và báo cáo kết quả cuối cùng.

## 0. Chuẩn bị

- [x] Đọc HTML tham chiếu và xác định các trường, hành vi động.
- [x] Kiểm tra menu và cơ chế điều hướng hiện tại.
- [x] Lập kế hoạch và checklist trong thư mục Doc.
- [x] Rà soát lại CLAUDE.md, CONVENTIONS.md và hướng dẫn áp dụng trước khi code.
- [x] Đọc override GridPanel, Store, PagingToolBar, Window, ComboBox, DateField, TextField.
- [ ] Kiểm tra trạng thái Git, bảo toàn thay đổi hiện có.
- [ ] Xác định cấu trúc bản ghi, địa chỉ, quan hệ, dữ liệu trốn/chết và danh mục mẫu.

## 1. Danh sách và menu

- [ ] Tạo ConNguoiLienQuan_ViewModel.js với store và bộ lọc.
- [ ] Tạo ConNguoiLienQuan_ViewController.js.
- [ ] Tạo ConNguoiLienQuan_View.js với grid, bộ lọc và các nút.
- [ ] Thêm dữ liệu mẫu đủ kiểm tra nhiều trang.
- [ ] Làm tìm kiếm theo họ tên/CCCD, lọc vai trò và giới tính.
- [ ] Làm Đặt lại và phân trang; reset về trang đầu khi đổi điều kiện lọc.
- [ ] Đăng ký menu trong nhóm TEST và nhãn màn hình trong MainModel.js.
- [ ] Thêm requires cần thiết trong MainController.js.
- [ ] Kiểm tra click menu, tải trực tiếp #con-nguoi-lien-quan và chuyển đi/quay lại.

## 2. Khung form và thông tin cá nhân

- [ ] Tạo ThemMoiConNguoi_ViewModel.js với giá trị mặc định và danh mục.
- [ ] Tạo ThemMoiConNguoi_ViewController.js.
- [ ] Tạo ThemMoiConNguoi_View.js với cửa sổ, vùng cuộn, Lưu/Đóng.
- [ ] Nối nút Thêm mới của danh sách để mở form.
- [ ] Tạo ThemMoiConNguoi_ViewForm.js đầy đủ các trường cá nhân và bổ sung.
- [ ] Làm chọn ảnh, xem trước và chọn lại ảnh.
- [ ] Làm quan hệ phụ thuộc CCCD và lý do không có CCCD.
- [ ] Làm tra cứu mô phỏng và kiểm tra bốn trường đầu vào.
- [ ] Kiểm tra requires, namespace, xtype và binding.

## 3. Địa chỉ và nghiệp vụ

- [ ] Tạo ThemMoiConNguoi_ViewDiaChi.js.
- [ ] Dựng năm nhóm địa chỉ: nơi sinh, quê quán, ĐKTT, tạm trú, nơi ở hiện tại.
- [ ] Thêm chi tiết, phường/xã, tỉnh/thành phố, quốc gia cho mỗi nhóm.
- [ ] Làm sao chép địa chỉ hiện tại từ dòng ngay phía trên.
- [ ] Làm checkbox hiển thị địa chỉ trước sáp nhập.
- [ ] Bổ sung ma túy, lực lượng vũ trang, đối tượng nghiệp vụ và sức khỏe.
- [ ] Kiểm tra dữ liệu các nhóm địa chỉ độc lập, sao chép không làm thay đổi dòng nguồn.

## 4. Mối quan hệ

- [ ] Tạo ThemMoiConNguoi_ViewQuanHe.js và store quan hệ trong form.
- [ ] Tạo bộ ba MoiQuanHe_View.js, MoiQuanHe_ViewController.js, MoiQuanHe_ViewModel.js.
- [ ] Dựng đầy đủ trường nhập theo mẫu.
- [ ] Kiểm tra bắt buộc họ tên và loại quan hệ.
- [ ] Lưu popup để thêm đúng một dòng vào grid quan hệ.
- [ ] Làm xóa dòng và trạng thái danh sách quan hệ rỗng.
- [ ] Kiểm tra Đóng không thêm dòng, mở lại popup có dữ liệu mới độc lập.

## 5. Thống kê trốn/chết

- [ ] Tạo ThemMoiConNguoi_ViewTronChet.js và các store con.
- [ ] Làm checkbox bật/tắt toàn bộ khối.
- [ ] Làm đơn vị nhiều cấp và reset lựa chọn con khi đổi đơn vị cha.
- [ ] Làm ô nhập cụ thể khi chọn đơn vị Khác.
- [ ] Làm chuyển giữa nhánh Trốn và Chết.
- [ ] Làm thêm/xóa hình thức trốn và xử lý cán bộ tương ứng.
- [ ] Làm thêm/xóa nguyên nhân chết và xử lý cán bộ tương ứng.
- [ ] Chặn thêm dòng rỗng hoặc trùng trong mỗi bảng.
- [ ] Hiển thị chi tiết sau khi có ít nhất một dòng trong bảng tương ứng.
- [ ] Dựng địa điểm, ngày, nội dung, kết quả giải quyết và xử lý cán bộ cho từng nhánh.
- [ ] Làm các ô nhập cụ thể khi hình thức/nguyên nhân/địa điểm là Khác.
- [ ] Kiểm tra xóa dòng cuối, đổi nhánh và tắt khối không gây lỗi validation.

## 6. Validation và Lưu

- [ ] Kiểm tra đầy đủ trường bắt buộc của form chính.
- [ ] Kiểm tra lý do khi thiếu CCCD.
- [ ] Kiểm tra đơn vị, trường hợp, ít nhất một hình thức/nguyên nhân khi bật trốn/chết.
- [ ] Kiểm tra các trường Khác chỉ khi đang hoạt động.
- [ ] Kiểm tra ngày bắt lại không trước ngày trốn.
- [ ] Đưa focus đến trường lỗi đầu tiên và hiển thị thông báo phù hợp.
- [ ] Tổng hợp cá nhân, ảnh, địa chỉ, quan hệ và thống kê vào bản ghi.
- [ ] Loại dữ liệu nhánh không hoạt động khỏi phần dữ liệu lưu.
- [ ] Lưu vào store danh sách, đóng form và hiển thị bản ghi mới.
- [ ] Chặn tạo bản ghi trùng do nhấn Lưu liên tiếp.
- [ ] Kiểm tra tổng số bản ghi và phân trang sau Lưu.
- [ ] Kiểm tra Đóng form không lưu không làm thay đổi danh sách.

## 7. Giao diện và vòng đời component

- [ ] Tạo ConNguoiLienQuan_View.scss và ThemMoiConNguoi_View.scss.
- [ ] Giới hạn style bằng class của chức năng.
- [ ] Kiểm tra bố cục trên màn hình lớn và cửa sổ thu nhỏ.
- [ ] Kiểm tra form cuộn được và nút Lưu/Đóng luôn truy cập được.
- [ ] Kiểm tra tiếng Việt, nhãn, dấu bắt buộc, định dạng ngày và dữ liệu rỗng.
- [ ] Mã hóa nội dung người dùng khi render bằng HTML/template.
- [ ] Giải phóng tài nguyên ảnh, timer và listener khi đóng form nếu có.
- [ ] Kiểm tra đóng/mở nhiều lần không giữ dữ liệu cũ hoặc nhân đôi sự kiện.

## 8. Kiểm tra và bàn giao

- [ ] Kiểm tra cú pháp/lint các file mới và file sửa bằng công cụ sẵn có.
- [ ] Chạy build Classic nếu môi trường có Sencha Cmd; ghi rõ kết quả.
- [ ] Kiểm tra luồng thêm người có CCCD.
- [ ] Kiểm tra luồng thêm người không có CCCD, có lý do.
- [ ] Kiểm tra ảnh, địa chỉ cũ và sao chép địa chỉ.
- [ ] Kiểm tra thêm/xóa nhiều quan hệ.
- [ ] Kiểm tra nhánh Trốn, ngày không hợp lệ và các lựa chọn Khác.
- [ ] Kiểm tra nhánh Chết và các lựa chọn Khác.
- [ ] Kiểm tra đổi nhánh, tắt thống kê và xác minh dữ liệu lưu.
- [ ] Kiểm tra tìm kiếm, kết quả rỗng, đặt lại và phân trang sau thêm mới.
- [ ] Kiểm tra console và ảnh hưởng tới các màn hình hiện có.
- [ ] Review diff, đảm bảo không sửa SDK hoặc ghi đè thay đổi ngoài phạm vi.
- [ ] Cập nhật checklist, ghi các hạn chế chưa xử lý và báo cáo file thay đổi/kết quả kiểm tra.

## Nhật ký thực hiện

| Ngày | Công việc | Kết quả / ghi chú |
| --- | --- | --- |
| 02/10/2026 | Đọc mẫu, khảo sát menu, tạo kế hoạch và checklist | Hoàn thành tài liệu; chưa triển khai code chức năng |
| 02/10/2026 | Tạo bản code ban đầu, kiểm tra cú pháp, mở danh sách/form | Cú pháp đạt; form từng bị vỡ layout, đã sửa tạm; chưa nghiệm thu luồng Lưu |
| 02/10/2026 | Đọc lại quy chuẩn và đối chiếu popup Tờ trình theo yêu cầu người dùng | Đã cập nhật kế hoạch/checklist; việc đổi sang Window chứa xtype chưa thực hiện |
