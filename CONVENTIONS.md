# CONVENTIONS.md - Quy chuẩn code DEMO Project

## 0. TỔNG QUAN PHONG CÁCH LẬP TRÌNH

Bạn là một kỹ sư lập trình có nhiều năm kinh nghiệm.

**Công nghệ sử dụng:**
- **Framework chính:** Sencha ExtJS 7.5.1.5 Classic Toolkit
- **Kiến trúc:** MVVM với ViewControllers
- **Ngôn ngữ:** JavaScript (ES2020)
- **Build tool:** Sencha Cmd
- **UI pattern:** Component-based, declarative config
- **Theming:** CSS Variables + SCSS

Bạn viết code chuẩn clean code, dễ hiểu, dễ bảo trì nâng cấp, áp dụng đúng các nguyên lý, các pattern thiết kế.

## 1. QUY CHUẨN MVVM (BẮT BUỘC)

### 1.1. Cấu trúc file bắt buộc

Mỗi màn hình/view module **PHẢI** có đủ 3 file trong một thư mục riêng:

```
classic/src/view/pages/{Feature}/
├── {Feature}_View.js              # View chính
├── {Feature}_ViewController.js    # Controller
├── {Feature}_ViewModel.js         # Model (ViewModel)
└── {Feature}_View*.js             # Các component con (nếu cần tách)
```

**Ví dụ:**
```
classic/src/view/pages/OrderList/
├── OrderList_View.js
├── OrderList_ViewController.js
├── OrderList_ViewModel.js
└── OrderList_ViewGrid.js          # Grid tách riêng

classic/src/view/pages/UserList/
├── UserList_View.js
├── UserList_ViewController.js
├── UserList_ViewModel.js
└── UserList_ViewGrid.js           # Grid tách riêng
```

### 1.1.0. Quy tắc đặt tên file/thư mục tiếng Việt không dấu

**Được phép** dùng tên tiếng Việt không dấu cho file và thư mục.

**Bảng chuyển đổi:**

| Ký tự có dấu | Không dấu | Ký tự có dấu | Không dấu |
|-------------|-----------|-------------|-----------|
| ă, â | a | ơ, ô, o | o |
| ê | e | ư | u |
| đ | d | á, à, ả, ã, ạ | a |

**Quy tắc viết:**
- Bỏ hết dấu tiếng Việt
- **PascalCase**: chữ hoa đầu mỗi từ, không có underscore giữa các từ chính
- Giữ nguyên hậu tố `_View`, `_ViewController`, `_ViewModel`, `_ViewGrid`...
- Alias dùng **thuận thang**: `controller.{ten-thap-thang}`, `viewmodel.{ten-thap-thang}`

**Ví dụ cụ thể:**

| Tiếng Việt gốc | Thư mục | File View | Alias |
|----------------|---------|-----------|-------|
| Tài liệu đính kèm | `TaiLieuDinhKem/` | `TaiLieuDinhKem_View.js` | `controller.tailieudinhkem` |
| Danh sách hồ sơ | `DanhSachHoSo/` | `DanhSachHoSo_View.js` | `controller.danhsachhoso` |
| Quản lý người dùng | `QuanLyNguoiDung/` | `QuanLyNguoiDung_View.js` | `controller.quanlynguoidung` |
| Phiên tòa | `PhienToa/` | `PhienToa_View.js` | `controller.phientoa` |
| Kiến nghị khởi tố | `KienNghiKhoiTo/` | `KienNghiKhoiTo_View.js` | `controller.kiennghikhoito` |
| Phân công điều tra | `PhanCongDieuTra/` | `PhanCongDieuTra_View.js` | `controller.phancongdieutra` |

**Namespace example:**
```javascript
// File: TaiLieuDinhKem/TaiLieuDinhKem_View.js
Ext.define('DEMO.view.pages.TaiLieuDinhKem.TaiLieuDinhKem_View', {
    extend: 'Ext.container.Container',
    xtype: 'TaiLieuDinhKem_View',
    controller: 'tailieudinhkem',
    viewModel: 'tailieudinhkem'
});

// File: TaiLieuDinhKem/TaiLieuDinhKem_ViewController.js
Ext.define('DEMO.view.pages.TaiLieuDinhKem.TaiLieuDinhKem_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tailieudinhkem'
});

// File: TaiLieuDinhKem/TaiLieuDinhKem_ViewModel.js
Ext.define('DEMO.view.pages.TaiLieuDinhKem.TaiLieuDinhKem_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tailieudinhkem'
});
```

### 1.1.1. Tách component con ra file riêng (BẮT BUỘC)

**NGUYÊN TẮC CỐT LÕI: KHÔNG viết thẳng grid/form phức tạp vào `_View.js`**

**Component con LUÔN nằm trong folder cha** — không tạo folder con riêng:

```
classic/src/view/pages/OrderList/                  ← folder cha chứa TẤT CẢ
├── OrderList_View.js                              # View chính
├── OrderList_ViewController.js                    # Controller
├── OrderList_ViewModel.js                         # ViewModel
├── OrderList_ViewGrid.js                          # Component con: Grid
├── OrderList_ViewForm.js                          # Component con: Form
└── OrderList_ViewFilter.js                        # Component con: Filter bar
```

Khi component có nhiều columns/fields hoặc logic phức tạp, **BẮT BUỘC** phải tách ra file riêng.

**Bảng quy định tách:**

| Component | Tên file tách | Điều kiện bắt buộc tách |
|-----------|--------------|------------------------|
| Grid | `{Feature}_ViewGrid.js` | Grid > 100 dòng code HOẶC nhiều custom renderer phức tạp (> 3 renderer) |
| Form | `{Feature}_ViewForm.js` | Form có > 5 fields HOẶC có conditional logic |
| Filter bar | `{Feature}_ViewFilter.js` | Filter có > 5 components HOẶC có logic filter phức tạp |
| Tab panel | `{Feature}_ViewTab.js` | Tab có nội dung phức tạp (grid/form bên trong) |
| Chart container | `{Feature}_ViewChart.js` | Chart có cấu hình phức tạp hoặc nhiều chart |

> **Lưu ý:** `actioncolumn` với few icon (view/edit/delete) là bình thường, KHÔNG bắt buộc tách file chỉ vì có actioncolumn. Chỉ tách khi grid overall quá phức tạp (> 100 dòng, nhiều renderer logic phức tạp).

```javascript
// SAI - Viết thẳng 100+ dòng grid vào _View.js
Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.container.Container',
    items: [{
        xtype: 'gridpanel',
        // ... 80 dòng columns, renderer, actioncolumn ...
    }]
});

// ĐÚNG - Tách grid ra file riêng (xtype TRÙNG TÊN file)
// File: OrderList_View.js
Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.container.Container',
    requires: [
        'DEMO.view.pages.OrderList.OrderList_ViewGrid'
    ],
    items: [{
        xtype: 'OrderList_ViewGrid'  // xtype = tên file (PascalCase, có underscore)
    }]
});

// File: OrderList_ViewGrid.js
Ext.define('DEMO.view.pages.OrderList.OrderList_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'OrderList_ViewGrid',  // xtype = tên file, KHÔNG viết thường/không dùng gạch ngang
    bind: { store: '{orderGridStore}' },
    columns: [
        // ... columns ở đây ...
    ]
});
```

### 1.1.2. Màn hình đơn giản — View trực tiếp là Grid (khi phù hợp)

**Khi màn hình CHỈ có grid + filter bar + pagination** (không có tab, chart, multi-panel), có thể viết `{Feature}_View.js` trực tiếp là `Ext.grid.Panel` với docked items, **KHÔNG cần tách ViewGrid riêng**.

**Điều kiện áp dụng:**
- Màn hình chỉ có 1 grid duy nhất
- Filter bar đơn giản (< 5 components)
- Chỉ có pagination ở dưới
- KHÔNG có tab, chart, multi-panel, sidebar

**Cấu trúc file:**
```
classic/src/view/pages/{Feature}/
├── {Feature}_View.js              # View = Ext.grid.Panel (filter docked top, paging docked bottom)
├── {Feature}_ViewController.js    # Controller
└── {Feature}_ViewModel.js         # ViewModel
```

**Ví dụ — ToTrinh (màn hình đơn giản):**

```javascript
// File: ToTrinh_View.js — View CHÍNH là Ext.grid.Panel
Ext.define('DEMO.view.pages.ToTrinh.ToTrinh_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ToTrinh_View',

    controller: 'totrinh',
    viewModel: 'totrinh',

    bind: { store: '{totrinhStore}' },

    // ── Filter bar (docked top) ──
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combobox',
                fieldLabel: 'Loại văn bản',
                emptyText: 'Tất cả',
                width: 180,
                editable: false,
                store: { /* ... */ },
                valueField: 'value',
                displayField: 'text'
            },
            {
                xtype: 'textfield',
                emptyText: 'Tìm kiếm...',
                flex: 1
            },
            {
                xtype: 'button',
                text: 'Tìm kiếm',
                iconCls: 'x-fa fa-search',
                handler: 'onTimKiem'
            }
        ]
    }],

    // ── Paging (docked bottom) ──
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'Không có dữ liệu'
    },

    // ── Columns ──
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 60, align: 'center' },
        { text: 'Số văn bản', dataIndex: 'soVanBan', width: 150 },
        { text: 'Tên văn bản', dataIndex: 'tenVanBan', flex: 1 },
        { text: 'Loại', dataIndex: 'loaiVanBan', width: 120 },
        { text: 'Trạng thái', dataIndex: 'trangThai', width: 140 },
        { text: 'Ngày tạo', dataIndex: 'ngayTao', width: 120, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 100,
            items: [
                { iconCls: 'x-fa fa-eye', tooltip: 'Xem', handler: 'onRowView' },
                { iconCls: 'x-fa fa-edit', tooltip: 'Sửa', handler: 'onRowEdit' }
            ]
        }
    ]
});
```

**So sánh 2 cách:**

| | Cách cũ (Container + ViewGrid) | Cách mới (View = Grid) |
|--|--------------------------------|----------------------|
| Khi nào dùng | Grid phức tạp, nhiều panels, multi-component | Chỉ có 1 grid + filter + paging |
| Số file | 4+ (View, ViewGrid, Controller, ViewModel) | 3 (View, Controller, ViewModel) |
| Filter bar | Item trong Container | `dockedItems: [{ dock: 'top' }]` |
| Paging | Trong ViewGrid | `bbar: { xtype: 'pagingtoolbar' }` |
| Code nhiều hơn | Cần requires + gọi xtype con | Ít code hơn, tất cả trong 1 file |

### 1.2. Namespace và Alias

Mỗi file phải có đúng namespace và alias:

**View (`{Feature}_View.js`):**
```javascript
Ext.define('DEMO.view.pages.{Feature}.{Feature}_View', {
    extend: 'Ext.container.Container',
    xtype: '{Feature}_View',          // xtype = tên file (KHÔNG viết thường/không gạch ngang)
    controller: '{feature-lowercase}',
    viewModel: '{feature-lowercase}',
    // ...
});
```

**Controller (`{Feature}_ViewController.js`):**
```javascript
Ext.define('DEMO.view.pages.{Feature}.{Feature}_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.{feature-lowercase}',
    // ...
});
```

**Model (`{Feature}_ViewModel.js`):**
```javascript
Ext.define('DEMO.view.pages.{Feature}.{Feature}_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.{feature-lowercase}',
    // ...
});
```

> **Lưu ý:**	xtype dùng PascalCase trùng tên file. Alias (controller/viewmodel) vẫn giữ lowercase-kebab cho tiện.

### 1.3. Phân trách nhiệm

| Thành phần | Được phép | Không được phép |
|------------|-----------|----------------|
| **View** | Layout, items, UI config, bind data từ ViewModel | Gọi API, xử lý business logic, thao tác DOM phức tạp |
| **Controller** | Xử lý sự kiện, gọi API, logic business, validation | Định nghĩa UI layout, items phức tạp |
| **Model** | Stores, formulas, data binding, computed values | Gọi API trực tiếp, thao tác UI |

---

## 2. QUY CHUẨN CODE

### 2.1. JavaScript cơ bản

```javascript
// SAI
var name = 'test';
function() { }

// ĐÚNG
let name = 'test';
function () { }
```

- **Dùng `let` / `const`**, KHÔNG dùng `var`
- **Dùng single quotes** cho chuỗi: `'text'` thay vì `"text"`
- **Có dấu chấm phẩy** ở cuối mỗi câu lệnh
- **KHÔNG có trailing comma** ở cuối object/array
- **Cách viết function**: cách dấu `{` một khoảng trắng

```javascript
// SAI
function(){
function (){

// ĐÚNG
function () {
```

### 2.2. Pattern `me = this`

Luôn dùng `me = this` bên trong các method của ExtJS để tránh mất ngữ cảnh:

```javascript
Ext.define('DEMO.view.pages.OrderListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderlist',

    onSearch: function () {
        var me = this;
        var vm = me.getViewModel();
        var store = vm.getStore('orderStore');
        // ...
    }
});
```

### 2.3. Vari declarations trong method

Khi cần nhiều biến, dùng `var` chain với dấu phẩy:

```javascript
onSearch: function () {
    var me = this,
        vm = me.getViewModel(),
        store = vm.getStore('orderStore'),
        keyword = me.getView().down('#searchField').getValue();

    // ...
}
```

### 2.4. Indentation và Format

- **Dùng 4 khoảng trắng** cho indentation (KHÔNG dùng tab)
- **Mỗi statement trên một dòng**
- **Cách dòng**: 1 dòng trống giữa các method, 2 dòng trống giữa các section lớn

---

## 3. QUY CHUẨN VIEW

### 3.0. Tách component ra file riêng (BẮT BUỘC)

**NGUYÊN TẮC CỐT LÕI: KHÔNG viết thẳng grid/form phức tạp vào `_View.js`**

Khi component có nhiều columns/fields hoặc logic phức tạp, **BẮT BUỘC** phải tách ra file riêng.

**Bảng quy định tách:**

| Component | Tên file tách | Điều kiện bắt buộc tách |
|-----------|--------------|------------------------|
| Grid | `{Feature}_ViewGrid.js` | Grid > 100 dòng code HOẶC nhiều custom renderer phức tạp (> 3 renderer) |
| Form | `{Feature}_ViewForm.js` | Form có > 5 fields HOẶC có conditional logic |
| Filter bar | `{Feature}_ViewFilter.js` | Filter có > 5 components HOẶC có logic filter phức tạp |
| Tab panel | `{Feature}_ViewTab.js` | Tab có nội dung phức tạp (grid/form bên trong) |
| Chart container | `{Feature}_ViewChart.js` | Chart có cấu hình phức tạp hoặc nhiều chart |

> **Lưu ý:** `actioncolumn` với few icon (view/edit/delete) là bình thường, KHÔNG bắt buộc tách file chỉ vì có actioncolumn. Chỉ tách khi grid overall quá phức tạp.

**Quy tắc đặt tên component tách ra:**
- File: `{Feature}_View{LoaiComponent}.js` (VD: `OrderList_ViewGrid.js`)
- **xtype: `{Feature}_View{LoaiComponent}`** (VD: `OrderList_ViewGrid`) — xtype PHẢI trùng tên file, viết PascalCase
- Namespace: `DEMO.view.pages.{Feature}.{Feature}_View{LoaiComponent}`
- Component con LUÔN nằm trong folder cha: `classic/src/view/pages/{Feature}/{Feature}_View{Loai}.js`

**Ví dụ tách Grid:**

```javascript
// File: OrderList_ViewGrid.js — component con nằm trong folder cha: OrderList/
Ext.define('DEMO.view.pages.OrderList.OrderList_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'OrderList_ViewGrid',  // xtype = tên file PascalCase

    bind: { store: '{orderGridStore}' },

    columns: [
        { text: 'Mã đơn', dataIndex: 'orderId', width: 120 },
        { text: 'Khách hàng', dataIndex: 'customerName', flex: 1 },
        { text: 'Trạng thái', dataIndex: 'status', width: 120,
            renderer: function (value) {
                var color = value === 'Completed' ? '#10b981' : '#f97316';
                return '<span style="color:' + color + ';font-weight:600;">' + value + '</span>';
            }
        },
        { text: 'Tổng tiền', dataIndex: 'totalAmount', width: 140, align: 'right',
            renderer: function (value) {
                return Ext.util.Format.number(value, '0,000') + ' VNĐ';
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 100,
            items: [
                { iconCls: 'x-fa fa-eye', tooltip: 'Xem', handler: 'onRowView' },
                { iconCls: 'x-fa fa-edit', tooltip: 'Sửa', handler: 'onRowEdit' }
            ]
        }
    ]
});
```

**Ví dụ gọi trong View chính:**

```javascript
// File: OrderList_View.js
Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.container.Container',
    xtype: 'OrderList_View',        // xtype = tên file
    controller: 'orderlist',
    viewModel: 'orderlist',

    requires: [
        'DEMO.view.pages.OrderList.OrderList_ViewGrid'
    ],

    layout: { type: 'vbox', align: 'stretch' },
    items: [
        // Header, Filter...
        {
            xtype: 'OrderList_ViewGrid',  // Gọi component con — xtype = tên file
            flex: 1
        }
    ]
});
```

### 3.0.1. Quy tắc kiểm tra trước khi viết code

**TRƯỚC KHI VIẾT, PHẢI QUYẾT ĐỊNH: View dùng cách nào?**

1. **Màn hình đơn giản?** → Viết `{Feature}_View.js` = `Ext.grid.Panel` (docked filter top, paging bottom)
   - CHỈ có 1 grid + filter bar + paging
   - KHÔNG có tab, chart, KPI cards, multi-panel
2. **Màn hình phức tạp?** → Viết `{Feature}_View.js` = `Ext.container.Container` + tách `{Feature}_ViewGrid.js`
   - Có nhiều panels, tabs, charts
   - Grid phức tạp (> 50 dòng, actioncolumn, renderer phức tạp)

**TRƯỚC KHI VIẾT BẤT KỲ COMPONENT NÀO, PHẢI KIỂM TRA:**

1. **Component này có quá phức tạp để đặt trong `_View.js` không?**
   - Nếu > 100 dòng code trong grid → BẮT BUỘC tách ra
   - Nếu có nhiều custom renderer phức tạp (> 3 renderer logic phức tạp) → tách ra
   - **`actioncolumn` đơn giản (view/edit/delete) KHÔNG phải lý do tách file**

2. **Kiểm tra ảnh hưởng:**
   - Component tách ra có cần binding store từ ViewModel không? → Đảm bảo store name đúng
   - Component tách ra có cần gọi handler trong Controller không? → Đảm bảo handler name đúng
   - Component tách ra có cần truy cập element khác trong View không? → Dùng `up()` hoặc `reference`

3. **Optimization check:**
   - Code có bị trùng lặp không? → Tạo method chung hoặc component tái sử dụng
   - Có thể simplify logic không? → Loại bỏ nested if phức tạp
   - Binding có efficient không? → Tránh bind không cần thiết

```javascript
// TRƯỚC KHI VIẾT, đặt câu hỏi:
// 1. Component này bao nhiêu dòng? > 50 → tách ra
// 2. Có cần store binding không? → Kiểm tra store name trong ViewModel
// 3. Có cần controller handler không? → Kiểm tra handler name có tồn tại chưa
// 4. Có ảnh hưởng component khác không? → Kiểm tra itemId, reference không trùng
```

### 3.1. Cấu trúc View template

**Cách 1: Màn hình phức tạp — Container wrapper + ViewGrid tách riêng**

```javascript
// File: OrderList_View.js
Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.container.Container',
    xtype: 'OrderList_View',       // xtype = tên file PascalCase

    controller: 'orderlist',
    viewModel: 'orderlist',

    requires: [
        'DEMO.view.pages.OrderList.OrderList_ViewGrid'
    ],

    scrollable: 'y',
    padding: 20,
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // 1. Filter bar (container)
        // 2. { xtype: 'OrderList_ViewGrid', flex: 1 }
    ]
});
```

**Cách 2: Màn hình đơn giản — View CHÍNH là Ext.grid.Panel**

```javascript
// File: ToTrinh_View.js — CHỈ dùng khi: 1 grid + filter + paging, KHÔNG có tab/chart/multi-panel
Ext.define('DEMO.view.pages.ToTrinh.ToTrinh_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ToTrinh_View',

    controller: 'totrinh',
    viewModel: 'totrinh',

    bind: { store: '{totrinhStore}' },

    // Filter bar → docked top
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            { xtype: 'combobox', emptyText: 'Loại...', width: 160 },
            { xtype: 'textfield', emptyText: 'Tìm kiếm...', flex: 1 },
            { xtype: 'button', text: 'Tìm kiếm', handler: 'onTimKiem' }
        ]
    }],

    // Paging → docked bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'Không có dữ liệu'
    },

    columns: [
        { text: 'STT', dataIndex: 'stt', width: 60 },
        { text: 'Tên', dataIndex: 'ten', flex: 1 },
        // ...
    ]
});
```

> **Quy tắc chọn:** Chỉ có 1 grid + filter đơn giản → Cách 2. Có nhiều panels, tabs, charts → Cách 1.

### 3.2. Quy tắc truy cập component — PHẢI dùng `reference`

**BẮT BUỘC:** Dùng `reference` + `lookupReference()` trong Controller, **KHÔNG được** dùng `down()` với selector string.

```javascript
// SAI —脆弱, dễ break khi đổi fieldLabel
view.down('combobox[fieldLabel="Loại văn bản"]').getValue();
view.down('#myItemId').getValue();

// ĐÚNG — reference rõ ràng, không phụ thuộc label/text
me.lookupReference('cboLoaiVanBan').getValue();
```

**Cách dùng:**
- Trong View: khai báo `reference: 'cboLoaiVanBan'`
- Trong Controller: `me.lookupReference('cboLoaiVanBan')`
- Reset value: dùng ViewModel bind + `vm.set('tenData', giaTri)` thay vì `setValue()` trực tiếp

```javascript
// View
{ xtype: 'combobox', reference: 'cboTrangThai', bind: { value: '{timKiemNangCao.trangThai}' } }

// Controller — reset 1 field
me.getViewModel().set('timKiemNangCao.trangThai', null);

// Controller — reset tất cả filter
me.getViewModel().set('timKiemNangCao', {
    loaiVanBan: 'all',
    tuKhoa: '',
    trangThai: null,
    tuNgay: null,
    denNgay: null
});
```

### 3.2.1. Group filter fields vào object (BẮT BUỘC)

**KHÔNG được** đặt filter fields riêng lẻ ở root ViewModel data. **PHẢI** group vào object `timKiemNangCao`:

```javascript
// SAI — filter fields riêng lẻ, khó quản lý
data: {
    loaiVanBan: 'all',
    tuKhoa: '',
    trangThai: null
}

// ĐÚNG — group vào object, dễ reset cùng lúc
data: {
    timKiemNangCao: {
        loaiVanBan: 'all',
        tuKhoa: '',
        trangThai: null,
        tuNgay: null,
        denNgay: null
    }
}
```

**Bind trong View:** `{timKiemNangCao.loaiVanBan}` thay vì `{loaiVanBan}`

**Reset trong Controller:** `vm.set('timKiemNangCao', { ...defaults })` để reset tất cả cùng lúc
- Có ý nghĩa, mô tả chức năng: KHÔNG dùng `#field1`, `#button2`

### 3.3. Quy tắc binding

```javascript
// Trong View - bind từ ViewModel
{
    xtype: 'gridpanel',
    bind: {
        store: '{orderStore}'
    }
}

// Trong View - bind data đơn giản
{
    xtype: 'displayfield',
    bind: '{totalOrders}'
}
```

---

## 4. QUY CHUẨN CONTROLLER

### 4.1. Cấu trúc Controller template

```javascript
Ext.define('DEMO.view.pages.OrderList.OrderList_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderlist',

    // ── Khai báo ──────────────────────────────────────────
    requires: [],

    // ── Lifecycle ─────────────────────────────────────────
    init: function () {
        var me = this;
        me.callParent(arguments);
        // Initialization logic
    },

    // ── Event Handlers ────────────────────────────────────
    onSearch: function () {
        var me = this;
        // ...
    },

    onAddNew: function () {
        var me = this;
        // ...
    },

    onRowEdit: function (grid, rowIndex, colIndex) {
        var me = this,
            rec = grid.getStore().getAt(rowIndex);
        // ...
    },

    // ── Private Methods ──────────────────────────────────
    loadData: function () {
        var me = this;
        // ...
    }
});
```

### 4.2. Quy tắc đặt tên event handler

- **Prefix `on`** + tên sự kiện: `onSearch`, `onAddNew`, `onRowEdit`, `onRowDelete`
- **Grid row action**: `onRowView`, `onRowEdit`, `onRowDelete`, `onRowMore`
- **Button click**: `on{FunctionName}`: `onSave`, `onCancel`, `onExport`
- **Combo change**: `on{FieldName}Change`: `onStatusChange`, `onCategoryChange`

### 4.3. Template method trong Controller

```javascript
// Luôn có init template
init: function () {
    var me = this;
    me.callParent(arguments);
    // Code khởi tạo
},

// Luôn có destroy template nếu cần cleanup
destroy: function () {
    var me = this;
    // Cleanup logic
    me.callParent(arguments);
}
```

---

## 5. QUY CHUẨN MODEL (VIEWMODEL)

### 5.1. Cấu trúc Model template

```javascript
Ext.define('DEMO.view.pages.OrderList.OrderList_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orderlist',

    data: {
        // Dữ liệu binding đơn giản
        title: 'Danh sách đơn hàng',
        totalOrders: 0
    },

    formulas: {
        // Computed values
        totalAmount: {
            bind: '{orderStore}',
            get: function (store) {
                if (!store) return 0;
                var total = 0;
                store.each(function (rec) {
                    total += rec.get('amount');
                });
                return total;
            }
        }
    },

    stores: {
        orderStore: {
            fields: ['id', 'name', 'status', 'amount', 'createdDate'],
            data: [
                // Dữ liệu mẫu hoặc cấu hình proxy để load từ API
            ]
        }
    }
});
```

### 5.2. Quy tắc đặt tên store

- **Store name**: descriptive, camelCase: `orderStore`, `userListStore`, `invoiceGridStore`
- **KHÔNG dùng tên chung chung**: `myStore`, `store1`, `data`
- **Store cho grid**: `{entity}GridStore`: `orderGridStore`, `invoiceGridStore`
- **Store cho combobox**: `{entity}ComboStore`: `statusComboStore`, `categoryComboStore`

### 5.3. Store fields

Luôn khai báo `fields` rõ ràng, KHÔNG dùng `fields: []` rỗng:

```javascript
// SAI
fields: [],

// ĐÚNG
fields: ['id', 'name', 'status', 'createdDate'],
```

---

## 6. QUY CHUẨN NAVIGATION

### 6.1. Đăng ký route trong MainController

Khi thêm màn hình mới, PHẢI đăng ký route:

```javascript
// Trong MainController.js
routes: {
    'order-list': 'onOrderList',
    'invoice-list': 'onInvoiceList'
},

onOrderList: function () {
    var me = this;
    me.navigateTo('order-list', 'OrderList_View');   // xtype = tên file
},

onInvoiceList: function () {
    var me = this;
    me.navigateTo('invoice-list', 'InvoiceList_View');   // xtype = tên file
}
```

### 6.2. Đăng ký trong tree store (menu)

```javascript
// Trong MainModel.js hoặc tree store
{
    text: 'Order List',
    leaf: true,
    route: 'order-list',
    xtype: 'OrderList_View'       // xtype = tên file
}
```

---

## 7. QUY CHUẨN IMPORT/REQUIRES

### 7.1. Trong View

```javascript
requires: [
    // Chỉ import các class KHÔNG được tự động resolve
    // View, Controller, Model KHÔNG cần khai báo ở đây (đã khai qua alias)
    'Ext.grid.column.Action',
    'Ext.form.field.Date'
],
```

### 7.2. Trong Controller

```javascript
requires: [
    // Các class cần thiết cho controller logic
    'DEMO.view.some.SharedComponent'
],
```

### 7.3. Trong Model

```javascript
requires: [
    // Các store hoặc model con cần thiết
],
```

---

## 8. QUY CHUẨN STYLE (SCSS)

### 8.1. File SCSS mapping

Theo convention của Sencha Cmd, file SCSS phải đặt đúng vị trí:

```
classic/sass/src/view/{Feature}/{Feature}_View.scss
```

Ví dụ:
```
classic/sass/src/view/pages/OrderList/OrderList_View.scss
```

### 8.2. Viết SCSS

```scss
// SAI - dùng inline style trong View
{ style: { color: 'red' } }

// ĐÚNG - dùng class và style trong SCSS
.my-button {
    color: #ef4444;
    font-weight: 600;
    border-radius: 8px;
}
```

**Ưu tiên**: Dùng SCSS thay vì inline style khi có thể. Chỉ dùng inline style cho các style động hoặc nhỏ lẻ.

---

## 9. QUY CHUẨN TIẾNG VIỆT

### 9.1. UI text

- Tất cả text hiển thị cho user **PHẢI** bằng tiếng Việt
- Không capitalize cả dòng (trừ title abbreviation)
- Dùng Unicode tiếng Việt có dấu đúng cách

```javascript
// SAI
text: 'TIM KIEM',
text: 'tim kiem',

// ĐÚNG
text: 'Tìm kiếm'
```

### 9.2. Đặt tên biến, function, file bằng tiếng Việt không dấu

**Được phép** dùng tên tiếng Việt không dấu cho:
- Tên file, thư mục (đã quy định ở mục 1.1.0)
- Tên biến local trong function
- Tên function/method
- Tên store, model
- Tên xtype: **PascalCase trùng tên file** (VD: `OrderList_ViewGrid`, `TaiLieuDinhKem_View`)

**Quy tắc:**
- Bỏ dấu tiếng Việt (ă→a, â→a, ê→e, ô→o, ơ→o, ư→u, đ→d)
- **camelCase** cho biến/function: chữ thường đầu, hoa chữ cái đầu mỗi từ mới
- **PascalCase** cho class name, file name: hoa chữ đầu mỗi từ

**Ví dụ:**

| Tiếng Việt có dấu | Tên biến/function không dấu |
|-------------------|----------------------------|
| danh sách hồ sơ | `danhSachHoSo` |
| tài liệu đính kèm | `taiLieuDinhKem` |
| tìm kiếm | `timKiem` |
|加载 dữ liệu | `taiDuLieu` |
| số lượng hồ sơ | `soLuongHoSo` |
| ngày hết hạn | `ngayHetHan` |
| trạng thái xử lý | `trangThaiXuLy` |

```javascript
// Ví dụ trong Controller
onTimKiem: function () {
    var me = this,
        vm = me.getViewModel(),
        tuKhoa = me.getView().down('#txtTuKhoa').getValue(),
        trangThai = me.getView().down('#cboTrangThai').getValue(),
        store = vm.getStore('danhSachHoSoStore');

    store.clearFilter(true);
    if (tuKhoa) {
        store.filter('tenHoSo', tuKhoa);
    }
    if (trangThai && trangThai !== 'all') {
        store.filter('trangThai', trangThai);
    }
},

onXuatBaoCao: function () {
    var me = this,
        ngayBatDau = me.getView().down('#dfNgayBatDau').getValue(),
        ngayKetThuc = me.getView().down('#dfNgayKetThuc').getValue();

    // Logic xuất báo cáo
}
```

```javascript
// Ví dụ命名 store
stores: {
    danhSachHoSoStore: { ... },
    trangThaiComboStore: { ... },
    loaiHoSoStore: { ... }
},

// Ví dụ命名 variable
data: {
    tongSoHoSo: 0,
    soLuongDangXuLy: 0,
    ngayHienTai: new Date()
}
```

### 9.3. Tên UI text phải có dấu

Lưu ý: **Tên file/ biến không dấu**, nhưng **text hiển thị cho user PHẢI có dấu**:

```javascript
// SAI - text không dấu
text: 'Tim kiem',
text: 'Danh sach',

// ĐÚNG - text có dấu
text: 'Tìm kiếm',
text: 'Danh sách',
text: 'Tài liệu đính kèm'
```

### 9.4. Comments

- Comment tiếng Việt cho business logic
- Comment tiếng Anh cho technical note quốc tế
- Luôn có JSDoc cho public methods

```javascript
/**
 * Xử lý sự kiện tìm kiếm hồ sơ.
 * Lấy giá trị từ filter fields và áp dụng vào store.
 */
onTimKiem: function () {
    // Lấy tham chiếu từ view
    var me = this,
        view = me.getView(),
        store = me.getViewModel().getStore('danhSachHoSoStore');
    // ...
}
```

---

## 10. LƯU Ý QUAN TRỌNG

### 10.1. KHÔNG làm những việc sau

- KHÔNG sửa file trong thư mục `ext/` (SDK framework)
- KHÔNG dùng `var` để khai báo biến
- KHÔNG dùng ES modules (`import` / `export`)
- KHÔNG đặt logic business trong View
- KHÔNG đặt UI layout trong Controller
- KHÔNG tạo view mới mà thiếu Controller hoặc Model
- KHÔNG dùng double quotes thay cho single quotes
- KHÔNG dùng trailing comma
- KHÔNG viết thẳng grid/form phức tạp (> 50 dòng) vào `_View.js` → BẮT BUỘC tách ra file `{Feature}_ViewGrid.js`, `{Feature}_ViewForm.js`
- KHÔNG viết code mà không kiểm tra ảnh hưởng đến các component khác
- **KHÔNG viết `xtype: 'component'` thừa** — `xtype: 'component'` là mặc định, chỉ dùng khi render raw HTML
- **KHÔNG viết `init` override rỗng** — nếu init chỉ `callParent` thì bỏ luôn, không khai báo

### 10.2. LUÔN làm những việc sau

- LUÔN dùng `me = this` trong ExtJS methods
- LUÔN có đủ 3 file (View, Controller, Model) cho mỗi màn hình
- LUÔN khai báo `fields` rõ ràng trong stores
- LUÔN dùng `itemId` có ý nghĩa khi cần truy cập element
- LUÔN có `requires` đầy đủ trong mỗi file
- LUÔN format code theo quy chuẩn đã định
- LUÔN test UI bằng tiếng Việt trước khi commit
- LUÔN kiểm tra trước khi viết code: component có phức tạp không? Có cần tách file không? Có ảnh hưởng chỗ khác không?

---

## 11. CHECKLIST KHI TẠO MÀN HÌNH MỚI

- [ ] Tạo thư mục: `classic/src/view/pages/{Feature}/`
- [ ] **Quyết định cách viết View:** Đơn giản (1 grid + filter + paging) → View = `Ext.grid.Panel` | Phức tạp → View = `Ext.container.Container`
- [ ] Tạo `{Feature}_View.js` với namespace đúng, **xtype = tên file** (`{Feature}_View`), có `controller` và `viewModel` alias
- [ ] Tạo `{Feature}_ViewController.js` với `alias: 'controller.{feature}'`
- [ ] Tạo `{Feature}_ViewModel.js` với `alias: 'viewmodel.{feature}'`
- [ ] Nếu dùng cách Container: Kiểm tra có component phức tạp (> 50 dòng) cần tách file không?
- [ ] Nếu có Grid phức tạp → tạo `{Feature}_ViewGrid.js` trong **cùng folder cha**, **xtype = tên file**
- [ ] Nếu có Form phức tạp → tạo `{Feature}_ViewForm.js` trong **cùng folder cha**, **xtype = tên file**
- [ ] Component con KHÔNG có Controller/Model riêng — dùng chung của parent
- [ ] Đảm bảo component tách ra đã được `requires` trong `_View.js`
- [ ] Đăng ký route trong MainController.js (dùng xtype = tên file)
- [ ] Đăng ký menu item trong tree store (MainModel.js) (dùng xtype = tên file)
- [ ] Tạo file SCSS: `classic/sass/src/view/pages/{Feature}/{Feature}_View.scss`
- [ ] Kiểm tra ESLint không có lỗi
- [ ] Kiểm tra UI hiển thị đúng tiếng Việt
- [ ] Kiểm tra binding store, controller handler không bị trùng/lỗi

---

## 12. QUICK REFERENCE — xtype = tên file

```
File name                          xtype               Namespace
─────────────────────────────────────────────────────────────────────────
OrderList_View.js                  OrderList_View       DEMO.view.pages.OrderList.OrderList_View
OrderList_ViewGrid.js              OrderList_ViewGrid   DEMO.view.pages.OrderList.OrderList_ViewGrid
OrderList_ViewForm.js              OrderList_ViewForm   DEMO.view.pages.OrderList.OrderList_ViewForm
TaiLieuDinhKem_View.js             TaiLieuDinhKem_View  DEMO.view.pages.TaiLieuDinhKem.TaiLieuDinhKem_View
```

**Nguyên tắc:**	xtype luôn **PascalCase trùng tên file**, KHÔNG viết thường, KHÔNG dùng gạch ngang.
