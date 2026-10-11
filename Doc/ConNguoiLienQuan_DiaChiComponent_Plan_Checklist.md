# Kế hoạch: component dùng chung ComBoDiaChi

**Trạng thái:** Đã triển khai theo phương án được duyệt; kiểm tra giao diện trực tiếp còn chờ môi trường trình duyệt.

## Mục tiêu

Tạo đúng **một loại component địa chỉ** `xtype: 'ComBoDiaChi'`, dùng được ngoài màn hình ConNguoiLienQuan. Năm địa chỉ trong form Thêm mới là năm **instance** với cấu hình khác nhau. Component tự quản lý field, hai chế độ địa chỉ, quan hệ tỉnh–xã và nút copy tùy chọn; không chứa tên `person`, `noiSinh`, `queQuan` hoặc logic lưu của màn hình gọi.

## Hiện trạng cần xét khi tích hợp

- Form đang dùng 5 view riêng, mỗi view có dòng hiện tại và dòng `_old`. Checkbox hiện **thêm** dòng `_old`, không thay thế dòng hiện tại.
- Copy hiện theo chuỗi Nơi sinh → Quê quán → ĐKTT → Tạm trú → Hiện tại, chỉ chép dòng hiện tại.
- `onSave` tạo `addresses` và `oldAddresses`. Store tỉnh/xã hiện dùng tên làm `value`, chưa có mã tỉnh/xã.

## Cấu trúc dự kiến

```text
classic/src/view/components/ComBoDiaChi/
├── ComBoDiaChi_View.js
├── ComBoDiaChi_ViewController.js
└── ComBoDiaChi_ViewModel.js
```

Đây là **một component MVVM độc lập**. Không tạo component riêng cho Nơi sinh/Quê quán/ĐKTT/Tạm trú/Hiện tại, cũng không tạo class View riêng cho trước/sau sáp nhập. `ComBoDiaChi_View.js` khai báo trực tiếp hai khối field trong `items` và ẩn/hiện theo chế độ. Chỉ tách file trình bày trong cùng folder nếu View quá dài; không sinh field bằng factory/vòng lặp và không override `initComponent` nếu cấu hình/binding đã đủ.

## Hợp đồng component đề xuất

- **Binding dữ liệu:** nhận giá trị địa chỉ chi tiết, `keyMaTinh`, `keyMaXa`, quốc gia từ ViewModel của màn hình gọi; nhận nhóm giá trị riêng cho địa chỉ trước sáp nhập nếu cần giữ cả hai. Màn hình gọi quyết định đường dẫn bind, component không tự nối `person.` hoặc `_old`.
- **Chế độ:** `isSapNhap` là config bind được. Khi `true`, hiện khối sáp nhập và ẩn/disable khối không sáp nhập; khi `false` thì ngược lại. Giữ dữ liệu của khối ẩn khi chuyển chế độ, nhưng không validate/save khối ẩn.
- **Copy:** `showCopy` quyết định có nút. Nút phát `copyaddress`; màn hình gọi quyết định nguồn và chuyển giá trị qua API công khai của hai instance. Component không tìm kiếm instance khác bằng `lookupReference` và không biết thứ tự năm địa chỉ.
- **Danh mục:** nhận/bind nguồn tỉnh, xã, quốc gia. Combo dùng mã (`maTinh`, `maXa`) làm `valueField`, tên làm `displayField`. Đổi tỉnh lọc xã và xóa xã không hợp lệ. Mỗi instance có dữ liệu xã lọc riêng, không làm ảnh hưởng instance khác.
- **Bố cục:** field khai báo trực tiếp với `columnWidth`/`formSpan`; container cha cấp chiều rộng. Không sửa `.cnlq-editor` để chỉnh input, không thêm `padding5` vào từng dòng.

Ví dụ **minh họa hợp đồng mong muốn**; tên config và cơ chế two-way binding sẽ được kiểm chứng với ExtJS trước khi code:

```js
{
    xtype: 'ComBoDiaChi',
    fieldLabel: 'Quê quán',
    showCopy: true,
    bind: {
        isSapNhap: '{isSapNhap}',
        keyMaTinh: '{person.queQuan_maTinh}',
        keyMaXa: '{person.queQuan_maXa}'
        // Các giá trị còn lại cũng bind tường minh; không suy ra từ prefix.
    },
    listeners: { copyaddress: 'onCopyQueQuan' }
}
```

Trong ví dụ, `keyMaTinh`/`keyMaXa` là **giá trị mã được bind**, không phải tên key. Nếu yêu cầu thực tế là tên thuộc tính/path để component tự bind động, cần đổi hợp đồng trước khi code.

## Tích hợp vào ConNguoiLienQuan

1. `classic/src/view/pages/ConNguoiLienQuan/ThemMoi/ThemMoiConNguoi_ViewDiaChi.js`: thay 5 xtype riêng bằng 5 cấu hình `ComBoDiaChi`. Nơi sinh `showCopy: false`; bốn instance còn lại `showCopy: true` và gắn handler copy nguồn tương ứng.
2. `ThemMoiConNguoi_ViewController.js`: dùng API công khai và sự kiện copy của component; cập nhật `onOldAddressChange`, `onLookup`, `onSave`. Copy đúng chế độ đang hiển thị, bao gồm mã tỉnh/xã; xác định tỉnh trước khi đặt xã.
3. `ThemMoiConNguoi_ViewModel.js`: cấp mã/tên địa bàn và state hai chế độ. Giữ cấu trúc kết quả `addresses`/`oldAddresses` nếu phía danh sách đang dùng; ghi rõ mọi thay đổi payload trước khi làm.
4. Chỉ bỏ 5 view cũ sau khi không còn tham chiếu. Cập nhật cấu trúc folder tại mục 1.1 của `CONVENTIONS.md`, không chèn quy chuẩn lên đầu file.

## Cần chốt khi review

1. “Sáp nhập” có nghĩa **chỉ hiện một trong hai khối** hay vẫn **hiện đồng thời** địa chỉ hiện tại và dòng “Trước đây là” như form đang làm? Kế hoạch này theo yêu cầu mới: chỉ hiện một khối.
2. `keyMaTinh`/`keyMaXa` là **giá trị mã bind vào component** hay **tên key/path** để component tự đọc ViewModel? Ví dụ trên dùng giá trị mã bind.
3. Hai chế độ khác nhau ở những field nào? Mã hiện tại có cùng bộ `dc/xa/tinh/qg` cho cả hai; nếu mẫu thực tế khác, cần chốt trước khi cố định field.

## Checklist theo thứ tự sau khi duyệt

- [x] Áp dụng phương án duyệt: một khối hiển thị mỗi lần; `keyMaTinh`/`keyMaXa` là giá trị mã bind; cả hai khối dùng bộ `dc/xa/tinh/qg`.
- [x] Tạo folder component dùng chung cùng View–Controller–ViewModel; thêm namespace/`requires` cần thiết.
- [x] Khai báo trực tiếp field hai chế độ trong một View; xử lý ẩn/hiện, disable, phụ thuộc tỉnh–xã và nút copy tùy chọn.
- [x] Thay 5 view địa chỉ bằng 5 instance `ComBoDiaChi`; nối binding và sự kiện copy cho từng instance.
- [x] Cập nhật dữ liệu mẫu, tra cứu, validation và save để dùng mã tỉnh/xã; danh sách đọc được chế độ địa chỉ đang chọn.
- [x] Bỏ 5 view cũ và reference/`requires` không dùng; cập nhật `CONVENTIONS.md` đúng mục cấu trúc folder.
- [x] Kiểm tra cú pháp và `scripts/check-con-nguoi.cjs`.
- [ ] Kiểm tra trực tiếp trên trình duyệt: binding hai chiều, chuyển chế độ, copy, đổi tỉnh/xã, lưu và layout ở các chiều rộng.
