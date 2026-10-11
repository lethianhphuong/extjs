# Checklist review và triển khai cấu trúc mới

Ngày 04/10/2026. Plan: [ConNguoiLienQuan_Restructure_Plan.md](ConNguoiLienQuan_Restructure_Plan.md).

## A. Đã khảo sát — người dùng đã duyệt

- [x] Đọc hai ảnh UI hiện tại và đối chiếu HTML gốc.
- [x] Kiểm tra danh sách 16 file JS cùng cấp và dependencies từ Main.
- [x] Đối chiếu quy định folder, namespace, popup và padding5 hiện tại.
- [x] Ghi cụ thể sai khác UI và bảng đường dẫn/namespace đích.
- [x] Bổ sung dự thảo convention vào tài liệu để review, chưa kích hoạt thay thế quy định cũ.
- [x] Người dùng review cây folder, phạm vi chỉnh UI và quy tắc tái sử dụng.

## B. Đồng bộ quy chuẩn trước khi refactor

- [x] Chuyển dự thảo đã duyệt thành quy định chính thức trong CONVENTIONS.md.
- [x] Thay các đoạn cấm folder con và các ví dụ/checklist liên quan trong CONVENTIONS.md.
- [x] Đồng bộ cấu trúc, namespace, sở hữu component và checklist trong CLAUDE.md.
- [x] Kiểm tra hai tài liệu không còn quy tắc trái nhau; giữ quy định padding5 và override.

## C. Di chuyển source và sửa liên kết

- [x] Kiểm tra Git, không ghi đè công việc khác đang thay đổi.
- [x] Tạo DanhSach/, ThemMoi/, ThemMoi/MoiQuanHe/, Shared/ theo plan.
- [x] Di chuyển bộ danh sách và ViewFilter vào DanhSach/.
- [x] Di chuyển bộ Thêm mới và bốn view con vào ThemMoi/.
- [x] Di chuyển bộ quan hệ và ViewForm vào ThemMoi/MoiQuanHe/.
- [x] Đưa helper dùng chung vào Shared/ hoặc loại nếu không còn cần sau tách danh mục.
- [x] Sửa Ext.define, requires, Ext.create và truy cập singleton theo namespace mới.
- [x] Đổi requires trong MainController; giữ route và xtype ở MainModel.
- [x] Di chuyển SCSS theo namespace mới.
- [x] Tìm toàn project để xác nhận không còn class references cũ hoặc khai báo trùng.
- [ ] Mở menu, mở trực tiếp route, reload và kiểm tra lỗi loader.

## D. Pattern popup và dữ liệu

- [x] Controller danh sách tạo Ext.window.Window với items chứa xtype rồi show.
- [x] ThemMoiConNguoi_View trở thành nội dung Form/Panel có MVVM riêng.
- [x] Popup quan hệ áp dụng cùng cách đóng gói và cách mở.
- [x] Toolbar Lưu/Đóng dùng string handler của Controller nội dung.
- [x] Sự kiện personsaved/relationsaved trả dữ liệu, không gọi xuyên field nội bộ.
- [x] Danh mục và store về ViewModel, tên rõ nghĩa, fields đầy đủ.
- [x] Bind địa chỉ và dữ liệu form; reset qua vm.set; reference rõ ràng.
- [ ] Kiểm tra đóng/mở lặp, hủy popup, cleanup ảnh/listener và trạng thái độc lập.

## E. Khớp UI HTML

- [x] Khung/header/footer đúng bố cục mẫu, kích thước không vượt viewport.
- [x] Ghi chú tra cứu căn giữa phía trên lưới cá nhân.
- [x] Ô tải ảnh nét đứt luôn hiện ở đầu hàng, không thay bằng nút rời.
- [x] Hàng đầu đúng tỷ lệ 2–3–2–2–3 trên hệ 12 cột.
- [x] Hàng tiếp đúng tỷ lệ 2–3–2–3–2, Tra cứu cuối hàng.
- [x] Các hàng còn lại đúng thứ tự và span HTML, không chia đều toàn bộ field.
- [x] Tiền án 2/12, nội dung 10/12.
- [x] Địa chỉ trái 9/12, nhóm nghiệp vụ phải 3/12.
- [x] Sao chép địa chỉ bằng nút icon nhỏ, tooltip, không có ở dòng đầu.
- [x] Dòng địa chỉ cũ hiển thị đúng bên dưới mỗi địa chỉ khi bật checkbox.
- [x] Tiêu đề quan hệ trái, Thêm mới phải, bảng và trạng thái rỗng đúng mẫu.
- [x] Đơn vị và nhánh trốn/chết đúng thứ tự, trường Khác và bảng con đầy đủ.
- [x] Dòng form dùng padding5 và layout ExtJS, bỏ margin field thủ công/CSS flex vào DOM nội bộ.
- [x] SCSS scoped, dùng biến theme; một nguồn style, preview CSS không chỉnh độc lập.

## F. Kiểm tra nghiệm thu

- [x] Kiểm tra cú pháp/requires/naming/binding từng file sau di chuyển.
- [ ] Build Classic; ghi riêng nếu môi trường Sencha vẫn thiếu catalog.json.
- [ ] Chụp và so sánh HTML gốc với UI tại cùng viewport 1440px và 1100px.
- [ ] Kiểm tra một cột ở 620px trở xuống, scroll grid và nút Lưu/Đóng.
- [ ] Kiểm tra tất cả danh mục hiển thị dữ liệu và trường mặc định.
- [ ] Kiểm tra chọn/đổi ảnh, tra cứu mô phỏng, CCCD và lý do không có CCCD.
- [ ] Kiểm tra copy địa chỉ, bật/tắt địa chỉ cũ và dữ liệu sau Lưu.
- [ ] Kiểm tra thêm/xóa quan hệ và đóng popup không lưu.
- [ ] Kiểm tra Trốn/Chết/Khác, trùng dòng, ngày không hợp lệ và bỏ dữ liệu nhánh ẩn.
- [ ] Lưu tạo đúng một bản ghi; tìm kiếm, đặt lại, phân trang vẫn đúng.
- [ ] Kiểm tra màn hình khác không bị ảnh hưởng CSS hoặc namespace.
- [x] Báo cáo bằng chứng UI, file thay đổi, kết quả đạt/chưa đạt và cập nhật tài liệu.

## Kết quả thực hiện 04/10/2026

- Đã triển khai cấu trúc 16 file, namespace, hai popup theo Window chứa xtype, store/binding và các bố cục mục E trong source. Dấu hoàn thành ở mục E xác nhận code, chưa xác nhận ảnh render tương đương HTML.
- `node scripts/check-con-nguoi.cjs`: PASS namespace theo đường dẫn, dependency nội bộ, binding store danh mục; chạy logic controller lọc kết hợp, đưa dữ liệu đã lưu vào danh sách, reset tìm kiếm/phân trang. Không thay thế test ExtJS runtime.
- `node --check` cho cả 16 file: PASS.
- Tại thời điểm 04/10, `node scripts/sync-con-nguoi-styles.cjs --check` đã PASS. Từ đợt refactor 11/10, CSS preview riêng đã được bỏ; SCSS được biên dịch qua Sencha Cmd vào `DEMO-all`.
- Tìm reference namespace phẳng cũ trong classic/src: không còn kết quả.
- Sencha build chưa đạt: thiếu `C:\Users\SV Store\bin\Sencha\Cmd\repo\pkgs\catalog.json`. Không sửa tay manifest để thay thế build.
- Chưa kiểm tra UI/runtime: công cụ trình duyệt từ chối localhost do quyền truy cập đã bị từ chối. Các mục nghiệm thu thủ công còn bỏ trống cần kiểm tra sau khi quyền trình duyệt được cấp lại.
- Chưa có ảnh xác nhận ở 1440/1100/620px; không kết luận UI đã giống hoàn toàn HTML gốc.
