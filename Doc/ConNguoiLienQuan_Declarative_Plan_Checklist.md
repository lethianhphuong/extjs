# Plan và checklist: khai báo form trực tiếp, chỉnh conventions đúng mục

Trạng thái: **Đã được duyệt và triển khai source. Kiểm tra UI/runtime còn chưa thực hiện; kết quả chi tiết ở cuối file.**

## 1. Mục tiêu và kết quả khảo sát

- Đã đọc toàn bộ `CONVENTIONS.md`, `CLAUDE.md`; đối chiếu cách khai báo trong `ConNguoiDemo2_View.js`, phần form của `ConNguoiDemo2_ViewPopup.js` và `ConNguoiDemo2_ViewQhPopup.js`.
- Mẫu dùng cấu hình `layout`, `items`, field viết trực tiếp trong `Ext.define`. Đây là cách viết sẽ áp dụng; vẫn giữ store trong ViewModel, handler trong Controller và các override chung.
- Hiện có 5 view dùng `initComponent` chỉ để dựng cấu hình: ViewFilter, ViewForm cá nhân, ViewDiaChi, ViewTronChet, ViewForm quan hệ. Chúng phụ thuộc `Shared/ConNguoiLienQuan_Fields.js` để sinh field/hàng/cột, khiến muốn đọc một field phải nhảy nhiều file.
- Phần “Quy chuẩn 04/10/2026” ở đầu CONVENTIONS và phần tương tự ở đầu CLAUDE là bổ sung sai vị trí, lặp với các mục có sẵn. Cần gộp nội dung cần giữ vào đúng mục, không thêm khối quy định theo ngày ở đầu.
- Các mục 1.1.1, 3.0, 10, 11 đang lặp quy tắc tách component với ngưỡng khác nhau; cần thống nhất phần liên quan tới form để không vừa cho viết trực tiếp vừa bắt tách máy móc theo số field.

## 2. Cách sửa tài liệu sau khi duyệt

| Tài liệu / vị trí hiện có | Thay đổi dự kiến |
| --- | --- |
| CONVENTIONS — khối “Quy chuẩn 04/10/2026” đầu file | Bỏ khối riêng sau khi chuyển nội dung cần thiết vào các mục dưới. |
| 1.1. Cấu trúc file bắt buộc | Bổ sung cây feature nhiều bộ MVVM ngay sau ví dụ cấu trúc hiện có; mỗi component độc lập một folder, view trình bày ở cùng folder chủ sở hữu. |
| 1.1.1. Tách component con | Làm rõ tách theo khối nghiệp vụ khi form dài/khó đọc; bên trong component con vẫn khai báo field trực tiếp. Không tạo bộ ba rỗng cho khối trình bày dùng chung MVVM. |
| 1.2. Namespace và Alias | Thêm một ví dụ namespace lồng thư mục, giữ xtype theo tên file. |
| 3.0. Tách component | Dẫn chiếu quy tắc tại 1.1.1, bỏ bảng tách form trùng lặp hoặc trái nghĩa. Không mở thêm quy chuẩn tổng hợp ở đầu. |
| 3.1. Cấu trúc View template | Thêm ví dụ form với `items` trực tiếp và quy tắc hạn chế `initComponent`; phân biệt cấu hình tĩnh với logic thật sự cần lúc khởi tạo. |
| 3.4. Form Layout | Giữ `padding5`, layout ExtJS, không margin field để tạo gutter. |
| 8.1. File SCSS mapping | Thêm ví dụ đường dẫn SCSS tương ứng component trong folder con. |
| 10. Lưu ý và 11. Checklist | Đồng bộ quy tắc form trực tiếp, tách theo khối, không field factory; kiểm tra lý do nếu còn override `initComponent`. |
| CLAUDE — khối bổ sung ở đầu | Bỏ khối riêng; chuyển phần cần giữ vào Architecture & Patterns, mục tách component, OVERRIDES/Window, Buttons trong Window và Coding Style Summary hiện có. Dẫn chiếu đúng mục CONVENTIONS. |

Cây ví dụ đưa vào **mục 1.1**, không đưa lên đầu tài liệu:

```text
ConNguoiLienQuan/
├── DanhSach/                 # Bộ ba ConNguoiLienQuan + ViewFilter
├── ThemMoi/                  # Bộ ba ThemMoiConNguoi + các view trình bày
│   └── MoiQuanHe/            # Bộ ba MoiQuanHe + ViewForm
└── Shared/                   # Chỉ khi có thành phần dùng chung thực sự
```

`Shared` là tùy chọn trong quy chuẩn. Với chức năng hiện tại, bỏ helper sinh field; không giữ folder/file rỗng cho đủ cây ví dụ.

Nội dung quy tắc dự kiến tại **3.1**:

> Khai báo trực tiếp `items`, `layout`, `defaults`, `columns`, `dockedItems` trong cấu hình View/Form. Field có đầy đủ `xtype`, `name`, `reference`, `fieldLabel`, `bind`, validation và listener ngay tại vị trí sử dụng. Form dài thì tách theo khối nghiệp vụ thành component có xtype; bên trong vẫn khai báo trực tiếp. Không dùng field factory/schema/helper hoặc vòng lặp để sinh các field tĩnh. Không override `initComponent` chỉ để gán `me.items`, `Ext.apply(me, config)` hoặc gọi `callParent`. Chỉ dùng khi thực sự có cấu hình phụ thuộc instance tại thời điểm khởi tạo mà config/binding không đáp ứng; phải nêu lý do. Không chuyển việc sinh field tĩnh sang `init`, `afterrender` hay Controller để thay thế.

Ví dụ hướng viết (chỉ minh họa trong plan):

```javascript
items: [{
    xtype: 'container',
    cls: 'padding5',
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        name: 'hoTen',
        reference: 'hoTen',
        fieldLabel: 'Họ và tên',
        allowBlank: false,
        flex: 1,
        bind: { value: '{person.hoTen}' }
    }, {
        xtype: 'combobox',
        name: 'gioiTinh',
        reference: 'gioiTinh',
        fieldLabel: 'Giới tính',
        allowBlank: false,
        editable: false,
        valueField: 'value',
        displayField: 'text',
        flex: 1,
        bind: {
            value: '{person.gioiTinh}',
            store: '{gioiTinhComboStore}'
        }
    }]
}]
```

## 3. Phạm vi sửa code sau khi duyệt

Đường dẫn dưới đây tính từ `classic/src/view/pages/ConNguoiLienQuan/`.

| File | Thay đổi dự kiến |
| --- | --- |
| `DanhSach/ConNguoiLienQuan_ViewFilter.js` | Khai báo toolbar và tất cả field trực tiếp; bỏ `initComponent`, `fields.create`, requires helper. |
| `ThemMoi/ThemMoiConNguoi_ViewForm.js` | Khai báo từng khối/hàng và field cá nhân trực tiếp; ảnh, tra cứu, validation/binding hiện rõ; bỏ `initComponent` và helper. |
| `ThemMoi/ThemMoiConNguoi_ViewDiaChi.js` | Khai báo trực tiếp 5 nhóm địa chỉ và dòng địa chỉ cũ; bỏ vòng lặp sinh UI. Tách nhóm nghiệp vụ phải thành `ThemMoiConNguoi_ViewNghiepVu.js`. |
| `ThemMoi/ThemMoiConNguoi_ViewTronChet.js` | Chỉ ghép phần bật/tắt, đơn vị, lựa chọn trường hợp và hai xtype nhánh; bỏ hàm `branch`, `field` và `initComponent`. |
| `ThemMoi/ThemMoiConNguoi_ViewTron.js` — mới | Khai báo trực tiếp field, bảng và chi tiết nhánh Trốn. Dùng MVVM của popup cha. |
| `ThemMoi/ThemMoiConNguoi_ViewChet.js` — mới | Khai báo trực tiếp field, bảng và chi tiết nhánh Chết. Dùng MVVM của popup cha. |
| `ThemMoi/MoiQuanHe/MoiQuanHe_ViewForm.js` | Khai báo trực tiếp 6 field; bỏ `initComponent` và helper. |
| `Shared/ConNguoiLienQuan_Fields.js` | Xóa sau khi đã chuyển đủ config/validation và không còn nơi sử dụng. Không tạo helper khác thay tên. |
| View cha và `requires` liên quan | Đăng ký các component mới. Giữ folder MVVM đã thống nhất, route và xtype đang dùng. |
| `ThemMoi/ThemMoiConNguoi_ViewController.js` | Rà reference/binding sau tách; chỉ chỉnh chỗ bị ảnh hưởng, xử lý resize bằng handler nếu cần. Không đưa field config sang Controller. |
| Các ViewModel | Giữ store và dữ liệu; chỉ sửa binding/formula nếu có nhu cầu cụ thể. Không đưa field schema vào ViewModel. |
| `scripts/check-con-nguoi.cjs` | Bỏ phụ thuộc vào singleton Fields và số lượng class cố định; kiểm tra dependency, binding và logic danh sách với cấu trúc mới. |
| SCSS của feature và CSS preview | Chỉ chỉnh selector/layout bị ảnh hưởng; đồng bộ preview bằng script hiện có. |

Không sửa `ConNguoiDemo2` vì đây là mẫu tham khảo. Không sửa SDK, manifest/bootstrap sinh tự động hoặc refactor các feature khác. Không chuẩn hóa hàng loạt những mục tài liệu ngoài nội dung đang yêu cầu.

## 4. Các điểm cần giữ khi chuyển đổi

- Giữ `name`, `reference`, giá trị store, binding, required/validation; lập bảng đối chiếu field trước khi bỏ helper để tránh mất cấu hình.
- View trình bày mới không tạo Controller/ViewModel riêng hoặc referenceHolder mới; handler/reference vẫn resolve về popup sở hữu.
- Giữ mẫu mở Window chứa xtype, nút Lưu/Đóng dùng string handler.
- Giữ giao diện theo HTML đã gửi: cách viết lấy từ ConNguoiDemo2, bố cục/nghiệp vụ đối chiếu HTML; không tự thay đổi yêu cầu UI.
- Chuyển responsive khỏi helper theo cấu hình layout hoặc handler resize cụ thể; kiểm tra lại ở 1440/1100/620px, không bỏ responsive khi xóa helper.
- Vòng lặp xử lý dữ liệu ở Controller vẫn được dùng; yêu cầu bỏ vòng lặp ở đây áp dụng cho việc dựng các field tĩnh.

## 5. Checklist tuần tự

### Đã khảo sát

- [x] Đọc toàn bộ CONVENTIONS và CLAUDE.
- [x] Đối chiếu cách khai báo trực tiếp trong mẫu ConNguoiDemo2.
- [x] Xác định 5 view cần bỏ initComponent và helper liên quan.
- [x] Gộp plan + checklist trong một file này.
- [x] Người dùng review và duyệt kế hoạch trước khi sửa.

### Triển khai sau khi được duyệt

1. [x] Kiểm tra lại thay đổi hiện có, đọc overrides và lập bảng đối chiếu field/validation/binding.
2. [x] Chuyển nội dung quy chuẩn từ đầu tài liệu vào đúng mục; bổ sung cây folder tại 1.1.
3. [x] Bổ sung mẫu khai báo trực tiếp và giới hạn initComponent tại 3.1; đồng bộ các đoạn liên quan của CLAUDE.
4. [x] Sửa ViewFilter và form quan hệ theo cấu hình trực tiếp.
5. [x] Sửa form cá nhân theo cấu hình trực tiếp.
6. [x] Sửa khối địa chỉ, tách nghiệp vụ và giữ copy/địa chỉ cũ.
7. [x] Tách nhánh Trốn/Chết, khai báo trực tiếp, cập nhật requires.
8. [x] Rà reference, binding, validation, trạng thái hidden/disabled và responsive.
9. [x] Xóa helper sau khi xác nhận không còn phụ thuộc; cập nhật script kiểm tra.
10. [x] Kiểm tra cú pháp, namespace, xtype, handler, stores và không còn initComponent để dựng UI tĩnh.
11. [ ] Kiểm tra mở/đóng popup, danh mục, ảnh, tra cứu, copy địa chỉ, quan hệ, nhánh Trốn/Chết và lưu về danh sách.
12. [ ] So sánh UI với HTML ở 1440/1100/620px; kiểm tra footer, scroll và không mất field.
13. [x] Chạy build nếu môi trường cho phép; ghi rõ lỗi môi trường, không đánh dấu đạt khi chưa chạy được.
14. [x] Review diff conventions: không còn khối theo ngày ở đầu, không trùng quy tắc hoặc phát sinh mâu thuẫn trong phần vừa sửa.
15. [x] Cập nhật kết quả thực tế vào chính file này, báo cáo bằng chứng và phần còn chưa kiểm chứng.

## 6. Điều kiện nghiệm thu

- Đọc một file form/khối thấy ngay cấu hình từng field, không phải tìm trong bảng schema/helper.
- Không còn 5 override initComponent hiện tại; component mới khai báo items trực tiếp.
- Component tách theo khối nghiệp vụ, không tạo file hoặc bộ MVVM cho từng field.
- Cây thư mục nằm đúng mục 1.1, mẫu form nằm đúng mục 3.1; đầu tài liệu trở lại cấu trúc sẵn có.
- Kiểm tra runtime và hình ảnh được ghi riêng với kiểm tra source. Lỗi Sencha thiếu catalog.json và việc trình duyệt từng bị từ chối quyền là các hạn chế hiện biết; chỉ kết luận đạt khi kiểm tra thực tế thành công.

**Kết quả triển khai:** xem mục 7. Các mục 11–12 chưa đánh dấu vì chưa kiểm tra được trên trình duyệt.

## 7. Kết quả triển khai

- Đã chuyển 5 view thành cấu hình items trực tiếp; không còn initComponent hoặc lời gọi helper tạo field trong feature.
- Đã tách ViewNghiepVu, ViewTron, ViewChet; các component này dùng MVVM của popup cha. Xóa Shared/ConNguoiLienQuan_Fields.js và folder Shared rỗng.
- Đã đối chiếu đủ 58 field từ cấu hình cũ trước khi xóa helper: giữ tên/reference/binding và ràng buộc kiểu field, max/min length, mask/regex/vtype nếu có. Resize hàng chuyển sang handler của Controller, không dựng lại items.
- CONVENTIONS: cây folder ở 1.1, mẫu form trực tiếp ở 3.1; đồng bộ phần tách form, lưu ý và checklist. CLAUDE đã đưa nội dung vào các mục hiện có. Đã bỏ hai khối quy chuẩn theo ngày ở đầu tài liệu.
- `node scripts/check-con-nguoi.cjs`: PASS 18 class, namespace/dependency, view khai báo trực tiếp, store binding, lọc kết hợp, đưa dữ liệu vào danh sách và reset phân trang.
- `node --check` toàn bộ JS feature: PASS. CSS preview đã đồng bộ ở thời điểm kiểm tra này; từ đợt refactor 11/10, SCSS được biên dịch qua Sencha Cmd vào `DEMO-all`.
- Sencha build đã chạy nhưng FAIL do thiếu `C:\Users\SV Store\bin\Sencha\Cmd\repo\pkgs\catalog.json`; đây không phải kết quả build đạt.
- UI/runtime và ảnh so sánh 1440/1100/620px: CHƯA KIỂM TRA. Quyền trình duyệt localhost đã bị từ chối ở lần trước; không thử truy cập lại bằng cách khác. Không kết luận UI đã nghiệm thu.
- Không sửa ConNguoiDemo2, SDK hoặc manifest/bootstrap sinh tự động trong đợt này. Script chuyển đổi tạm đã xóa; source form là cấu hình trực tiếp, không phụ thuộc script sinh code.
