# Kế hoạch đóng gói component và khớp UI HTML

Ngày: 04/10/2026 — **Đã được người dùng duyệt và triển khai source. Trạng thái nghiệm thu xem checklist; build và UI runtime còn bị chặn bởi môi trường/quyền trình duyệt.**

Kế hoạch này thay thế các phần cấu trúc folder và bố cục trong plan ngày 02/10. Phạm vi nghiệp vụ danh sách/Thêm mới, dữ liệu demo và validation đã thống nhất vẫn giữ nguyên.

## 1. Căn cứ và hiện trạng

- HTML gốc: `C:/Users/SV Store/Downloads/them-moi-con-nguoi-lien-quan.html`.
- Hai ảnh người dùng gửi ngày 04/10 thể hiện UI hiện tại; không phải mẫu đích mới.
- Đã đối chiếu source trong `classic/src/view/pages/ConNguoiLienQuan/`, `CONVENTIONS.md`, `CLAUDE.md`, đặc biệt quy định form layout `padding5`.
- Hiện có 16 file JS đặt cùng cấp, gồm ba bộ MVVM danh sách, Thêm mới, mối quan hệ và các view/helper phụ.
- Form Thêm mới và quan hệ vẫn kế thừa Window trực tiếp. Chưa áp dụng yêu cầu Controller mở Window chứa xtype như popup Tờ trình.
- Các quy định cũ trong cả hai tài liệu đang cấm folder con. Cần sửa đồng bộ khi duyệt cấu trúc mới, tránh chỉ thêm một đoạn quy định ngược với phần cũ.

## 2. Sai khác UI và hướng chỉnh

| Hạng mục | Hiện tại / ảnh gửi | Mục tiêu theo HTML |
| --- | --- | --- |
| Khung chung | Nội dung trải rộng, khoảng trắng lớn | Khung nội dung tối đa khoảng 1480px theo mẫu, co theo viewport; header xanh, footer Lưu/Đóng rõ ràng |
| Ghi chú tra cứu | Cạnh nút Tra cứu trên một hàng riêng | Ghi chú căn giữa phía trên lưới cá nhân |
| Ảnh | Nút Tải/đổi ảnh riêng, ảnh chỉ hiện sau chọn | Ô tải ảnh viền nét đứt luôn hiện, chiếm 2/12 hàng đầu, chiều cao tối thiểu khoảng 168px |
| Hàng đầu | Các ô rộng bằng nhau, Tên gọi khác dồn lên hàng đầu | Ảnh 2/12, họ tên 3/12, giới tính 2/12, ngày sinh 2/12, CCCD 3/12 |
| Hàng tiếp | Tự xuống dòng theo chiều rộng cố định | Tên khác 2/12, lý do không CCCD 3/12, ngày cấp 2/12, nơi cấp 3/12, Tra cứu 2/12 |
| Các hàng cá nhân còn lại | Dàn đều 5 cột | Theo span c2/c3/c10 và thứ tự HTML; tiền án 2/12 + nội dung 10/12 |
| Địa chỉ/nghiệp vụ | Địa chỉ toàn chiều ngang, nghiệp vụ nằm dưới | Địa chỉ trái 9/12; ma túy, lực lượng vũ trang, đối tượng nghiệp vụ, sức khỏe phải 3/12 |
| Sao chép địa chỉ | Nút có chữ rộng | Nút biểu tượng nhỏ cạnh cuối dòng, tooltip; dòng đầu không có nút sao chép |
| Khoảng cách | Field có margin riêng, xung đột override | Dòng hbox/column có `cls: 'padding5'`, tỷ lệ bằng flex/columnWidth; SCSS xử lý khoảng cách giữa các nhóm |
| Mối quan hệ | Cần đối chiếu phần ngoài ảnh | Tiêu đề trái, Thêm mới phải, bảng đủ 8 cột và trạng thái rỗng theo mẫu |
| Trốn/chết | Cần kiểm tra lại các trạng thái động | Giữ thứ tự nhóm đơn vị, trường hợp, bảng con, chi tiết; kiểm tra cả hai nhánh và Khác |

Dùng component ExtJS và layout rõ từng hàng; không biến toàn bộ danh sách field thành các ô bằng nhau tự wrap. Danh mục và logic thuộc ViewModel/Controller. Không nhúng nguyên HTML vào iframe.

### Responsive và style

- Màn hình rộng: giữ tỷ lệ 12 cột của HTML, đặc biệt hàng đầu và địa chỉ 9:3.
- Mốc khoảng 1100px: chuyển nhóm nhỏ sang hai cột, địa chỉ và nghiệp vụ xếp dọc như mẫu.
- Mốc khoảng 620px: một cột; grid được cuộn ngang, popup không vượt viewport.
- Header/footer, chữ, border, màu và mật độ bám HTML; field giữ cơ chế override chung. Nếu cần style khác mẫu chung, chỉ thay trong class của chức năng và nêu rõ lý do.
- Dùng SCSS đúng mapping namespace và CSS variables. Không ép flex vào DOM nội bộ của ExtJS hoặc sửa toàn cục `.field-csstyle` để chữa layout.
- Dòng cảnh báo demo không chiếm một khối lớn ở đầu; giữ thông báo mô phỏng rõ tại khu vực tra cứu/kết quả mà không phá bố cục mẫu.
- Chụp HTML gốc và bản ExtJS ở cùng viewport, mức zoom để so sánh trước nghiệm thu. Ảnh hiện tại chỉ cho thấy phần trên, chưa đủ kết luận phần dưới đúng.

## 3. Cấu trúc folder đề xuất

Mỗi component độc lập có một folder chứa bộ ba View–ViewController–ViewModel. Component trình bày dùng chung Controller/ViewModel nằm trong folder của component sở hữu; không tạo bộ ba rỗng cho từng hàng input.

```text
classic/src/view/pages/ConNguoiLienQuan/
├── DanhSach/
│   ├── ConNguoiLienQuan_View.js
│   ├── ConNguoiLienQuan_ViewController.js
│   ├── ConNguoiLienQuan_ViewModel.js
│   └── ConNguoiLienQuan_ViewFilter.js
├── ThemMoi/
│   ├── ThemMoiConNguoi_View.js
│   ├── ThemMoiConNguoi_ViewController.js
│   ├── ThemMoiConNguoi_ViewModel.js
│   ├── ThemMoiConNguoi_ViewForm.js
│   ├── ThemMoiConNguoi_ViewDiaChi.js
│   ├── ThemMoiConNguoi_ViewQuanHe.js
│   ├── ThemMoiConNguoi_ViewTronChet.js
│   └── MoiQuanHe/
│       ├── MoiQuanHe_View.js
│       ├── MoiQuanHe_ViewController.js
│       ├── MoiQuanHe_ViewModel.js
│       └── MoiQuanHe_ViewForm.js
└── Shared/
    └── ConNguoiLienQuan_Fields.js
```

`Shared` chỉ giữ cấu hình trình bày dùng chung thực sự. Chuyển dữ liệu danh mục/store ra khỏi helper về ViewModel. Nếu sau refactor helper không còn cần thiết thì xóa file và references, không giữ lớp trung gian thừa.

Không tạo ba folder chung tên `view/`, `controller/`, `model/`; ba file của một component phải ở cùng folder.

## 4. Bảng chuyển file và namespace

Tất cả đường dẫn nguồn dưới đây hiện nằm trực tiếp trong `classic/src/view/pages/ConNguoiLienQuan/`.

| File/nhóm file hiện tại | Folder đích | Namespace mới |
| --- | --- | --- |
| ConNguoiLienQuan_View, _ViewController, _ViewModel, _ViewFilter | DanhSach/ | DEMO.view.pages.ConNguoiLienQuan.DanhSach.{TênFile} |
| ThemMoiConNguoi_View, _ViewController, _ViewModel, _ViewForm, _ViewDiaChi, _ViewQuanHe, _ViewTronChet | ThemMoi/ | DEMO.view.pages.ConNguoiLienQuan.ThemMoi.{TênFile} |
| MoiQuanHe_View, _ViewController, _ViewModel, _ViewForm | ThemMoi/MoiQuanHe/ | DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.{TênFile} |
| ConNguoiLienQuan_Fields | Shared/ | DEMO.view.pages.ConNguoiLienQuan.Shared.ConNguoiLienQuan_Fields |

- Giữ tên file và xtype hiện tại để giảm ảnh hưởng; xtype vẫn phải duy nhất toàn ứng dụng.
- Cập nhật mọi `Ext.define`, `requires`, `Ext.create` và truy cập singleton có đường dẫn class cũ.
- `MainController.js`: đổi requires sang `...ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_View`.
- `MainModel.js`: giữ route `con-nguoi-lien-quan` và component `ConNguoiLienQuan_View`; kiểm tra menu sau chuyển.
- SCSS danh sách chuyển thành `classic/sass/src/view/pages/ConNguoiLienQuan/DanhSach/ConNguoiLienQuan_View.scss`.
- SCSS Thêm mới chuyển thành `classic/sass/src/view/pages/ConNguoiLienQuan/ThemMoi/ThemMoiConNguoi_View.scss`; nếu popup quan hệ cần style riêng, đặt dưới `ThemMoi/MoiQuanHe/MoiQuanHe_View.scss`.
- Rà dòng nạp `resources/css/con-nguoi-lien-quan.css` trong `index.html`: ưu tiên pipeline SCSS; nếu build chưa chạy được thì bản CSS phục vụ preview phải được sinh từ cùng nguồn, ghi rõ cách đồng bộ. Không tự sửa môi trường máy ngoài phạm vi.
- Không sửa tay bootstrap/manifest đã sinh chỉ để đổi đường dẫn. Kiểm tra cơ chế loader và rebuild khi môi trường cho phép; ghi rõ nếu lỗi Sencha catalog còn tồn tại.

## 5. Pattern popup và giao tiếp component

Controller danh sách tạo `Ext.window.Window`, `items: [{ xtype: 'ThemMoiConNguoi_View' }]`, rồi `win.show()` theo ví dụ người dùng. Nội dung popup là Form/Panel có Controller và ViewModel riêng, không kế thừa Window.

- Popup chỉ nhận dữ liệu đầu vào cần thiết và phát `personsaved`; danh sách nhận kết quả, cập nhật store.
- Popup quan hệ áp dụng cùng pattern và phát `relationsaved` cho form Thêm mới.
- Nút Lưu/Đóng nằm trong nội dung popup, dùng string handler; đóng window cha qua `up('window')`.
- Dùng reference/lookupReference trong phạm vi component; không gọi xuyên vào field nội bộ của popup khác.
- Store/form state độc lập cho mỗi lần mở. Component trình bày nhận binding từ component cha; không tự tạo dữ liệu nghiệp vụ.
- Không lặp mặc định modal, closeAction, resizable đã có trong override Window.

## 6. Thay đổi convention để tái sử dụng

Bản dự thảo quy tắc mới được bổ sung vào đầu `CONVENTIONS.md` để review cùng kế hoạch này. Sau khi duyệt:

1. Thay quy tắc “không tạo folder con” bằng “component có vòng đời/MVVM độc lập phải có folder riêng trong feature”.
2. Quy định component trình bày dùng chung MVVM ở trong folder chủ; component độc lập lồng trong folder cha theo quan hệ sở hữu, không dồn mọi bộ ba ở gốc feature.
3. Namespace phản ánh đầy đủ đường dẫn thư mục; tên file/xtype giữ PascalCase và duy nhất.
4. Helper dùng chung đặt Shared khi có nhiều nơi sử dụng; không đặt store nghiệp vụ vào helper UI.
5. SCSS mirror đường dẫn namespace; khi move phải kiểm tra cả class references và SCSS.
6. Chuẩn hóa Window chứa xtype, sự kiện giao tiếp, scope Controller và cleanup.
7. Giữ `padding5`, theme variables, reference, timKiemNangCao, let/const và không sửa SDK.
8. Sửa đồng bộ phần cấu trúc, namespace, component con, ví dụ và checklist trong CONVENTIONS.md và CLAUDE.md; không để hai quy định trái nhau.
9. Áp dụng cho chức năng mới và chức năng đang refactor; không tự di chuyển toàn bộ module cũ.

## 7. Trình tự thực hiện sau review

1. Chốt cây folder và quy tắc đóng gói; cập nhật hai tài liệu quy chuẩn đồng bộ.
2. Di chuyển 16 file theo bảng, sửa namespace/requires/SCSS, kiểm tra load menu trước khi sửa UI.
3. Đổi pattern popup chính và popup quan hệ; kiểm tra mở/đóng/sự kiện.
4. Chuẩn hóa ViewModel, store danh mục, binding/reference và bỏ helper thừa.
5. Dựng lại từng hàng cá nhân theo HTML, thêm ô ảnh đúng vị trí và nút Tra cứu đúng hàng.
6. Dựng địa chỉ 9:3, grid quan hệ và phần trốn/chết; dùng padding5 và layout ExtJS.
7. Hoàn thiện style/responsive, xử lý nguồn SCSS/preview CSS thống nhất.
8. Kiểm thử nghiệp vụ và so sánh ảnh ở cùng viewport, cập nhật checklist/nhật ký.

## 8. Tiêu chí duyệt kết quả

- Gốc feature chỉ chứa các folder chức năng; mỗi bộ ba MVVM thuộc đúng một folder.
- Không còn reference class cũ, duplicate alias/xtype hoặc lỗi loader.
- Mở popup theo đúng Window chứa xtype; đóng/mở lại không giữ dữ liệu cũ.
- UI khớp bố cục HTML, không chỉ đủ trường; ô ảnh, hàng đầu, nút Tra cứu, tỷ lệ địa chỉ/nghiệp vụ đúng.
- Không chồng nhãn, thừa khoảng trắng lớn, tràn field hoặc cuộn ngang toàn form ở các viewport kiểm tra.
- Validation, ảnh, địa chỉ, quan hệ, trốn/chết, Lưu và danh sách hoạt động sau di chuyển.
- Hai tài liệu quy chuẩn không còn mâu thuẫn về folder và có ví dụ dùng lại được.
- Báo cáo rõ kiểm tra đạt/chưa đạt và lỗi môi trường; không xem lỗi build là đã pass.

