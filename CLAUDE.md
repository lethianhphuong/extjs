# CLAUDE.md - DEMO Project

## Project Overview

Sencha ExtJS 7.5.1.5 Classic Toolkit application — Vietnamese-language dashboard & case management system. Namespace: `DEMO`.

## Tech Stack

- **Framework:** ExtJS 7.5.1.5 Classic Toolkit (local SDK at `ext/`)
- **Build:** Sencha Cmd (`sencha app build`, `sencha app watch`)
- **Architecture:** MVVM with ViewControllers
- **Linting:** ESLint (`.eslintrc.json`) — ECMAScript 2020, `sourceType: "script"`
- **No npm/bundler** — third-party libs loaded via `<script>` tags in `index.html`

## QUY TRÌNH BẮT BUỘC KHI VIẾT CODE (Plan → Code → Test/Review)

**Mọi task — dù lớn hay nhỏ — PHẢI tuân thủ đúng 3 bước sau:**

### Bước 1: LÊN PLAN TRƯỚC KHI VIẾT CODE (BẮT BUỘC)

Trước khi viết bất kỳ dòng code nào, PHẢI thực hiện:

1. **Phân tích yêu cầu** — Đọc kỹ yêu cầu, xác định scope, đọc thêm file liên quan trong project (overrides, ViewModel hiện tại, ViewController hiện tại...)
2. **Xây dựng plan cụ thể** — Liệt kê rõ ràng:
   - File nào cần tạo mới / sửa đổi (đường dẫn cụ thể)
   - Mỗi file cần thay đổi gì, thêm gì, xóa gì
   - Thứ tự thực hiện (file nào làm trước, file nào phụ thuộc)
   - Kiểm tra dependencies: file mới cần `requires` trong View cha không? Cần đăng ký trong MainModel.js không?
3. **Xác nhận plan** — Trình bày plan cho user xem trước khi bắt tay vào code

**KHÔNG được phép:**
- Nhảy thẳng vào viết code mà chưa có plan
- Tự ý thay đổi scope ngoài plan đã thống nhất
- Bỏ qua bước kiểm tra file overrides/conventions trước khi code

### Bước 2: VIẾT CODE THEO PLAN

- Viết code đúng theo plan đã thống nhất
- Tuân thủ nghiêm ngặt tất cả quy chuẩn trong CLAUDE.md và CONVENTIONS.md

### Bước 3: KIỂM TRA SAU KHI VIẾT CODE (BẮT BUỘC)

Sau khi viết xong code, **PHẢI thực hiện ít nhất 1 trong các cách sau** để đảm bảo code hoạt động đúng:

#### Cách 1: Lint kiểm tra lỗi cú pháp
```bash
npx eslint classic/src/view/pages/{Feature}/{Feature}*.js
```
- Kiểm tra tất cả file vừa tạo/sửa
- KHÔNG được bỏ qua lỗi linting

#### Cách 2: Review code thủ công (self-review)
Đọc lại từng file vừa viết, kiểm tra:
- **Syntax** — Có lỗi cú pháp JS nào không? (thiếu `}`, `)`, dấu phẩy thừa...)
- **Naming** — xtype có trùng tên file không? Namespace đúng pattern chưa?
- **Binding** — Store binding đúng ViewModel chưa? Reference có trùng không?
- **Logic** — Controller method có xử lý đúng flow không? Có thiếu case nào không?
- **Redundancy** — Có code thừa, init rỗng, property trùng override không?
- **Optimization** — Có thể tối ưu gì? Trùng lặp logic? Dead code? Có thể simplify không?
- **Security** — Có hardcode sensitive data? XSS via HTML templates?

#### Cách 3: So sánh với pattern có sẵn
- Đọc 1 file mẫu cùng loại trong project (ví dụ: đọc `OrderList/` trước khi viết `ProductList/`)
- Đảm bảo code mới tuân theo đúng pattern của project

**Kết quả review PHẢI được trình bày cho user** — liệt kê:
- Các file đã tạo/sửa
- Kết quả kiểm tra (pass/fail)
- Các vấn đề tìm thấy (nếu có) và cách fix
- Gợi ý tối ưu (nếu có)

---

## Key Commands

```bash
sencha app build          # Production build
sencha app watch           # Dev server with live reload
sencha app build classic   # Classic toolkit only
```

## Project Structure

```
├── classic/                    # PRIMARY SOURCE CODE
│   ├── src/
│   │   ├── Application.js      # App entry, Vietnamese date locale
│   │   └── view/
│   │       ├── main/           # Viewport shell (Main, MainController, MainModel, Header, Sidebar, Settings)
│   │       ├── dashboard/      # Dashboard_View, Dashboard_ViewController, Dashboard_ViewModel + ViewGrids
│   │       └── pages/          # Feature pages — mỗi screen 1 subdir với 3+ file MVC
│   │           ├── Analytics/      # Analytics_View, _ViewController, _ViewModel
│   │           ├── Banking/        # Banking_View, _ViewController, _ViewModel
│   │           ├── BlogPage/       # BlogPage_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── Booking/        # Booking_View, _ViewController, _ViewModel, _ViewChart
│   │           ├── Course/         # Course_View, _ViewController, _ViewModel
│   │           ├── Ecommerce/      # Ecommerce_View, _ViewController, _ViewModel
│   │           ├── FilePage/       # FilePage_View, _ViewController, _ViewModel
│   │           ├── InvoiceList/    # InvoiceList_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── InvoicePage/    # InvoicePage_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── OrderList/      # OrderList_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── OrderPage/      # OrderPage_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── ProductCategories/ # ProductCategories_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── ProductList/    # ProductList_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── ProductPage/    # ProductPage_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── UserList/       # UserList_View, _ViewController, _ViewModel, _ViewGrid
│   │           ├── UserPage/       # UserPage_View, _ViewController, _ViewModel, _ViewGrid
│   │           └── UserRoles/      # UserRoles_View, _ViewController, _ViewModel, _ViewGrid
│   ├── overrides/              # Global ExtJS class overrides
│   │   ├── ComboBox.js, DateField.js, GridPanel.js, Store.js, ...
│   │   ├── proxy/Ajax.js       # Global Ajax interceptor (loading, timeout, pagination)
│   │   ├── vtype/              # Custom VTypes (SDT, MaxLen, Number, TextNumber, TextOnly)
│   │   └── menu/Item.js
│   ├── sass/                   # SCSS mapped to views by Sencha Cmd convention
│   └── resources/images/       # Image assets
├── resources/css/app.css       # Main custom stylesheet
├── lib/                        # Third-party: flatpickr, axios, pdf-lib, leaflet, maplibre-gl, gendong
├── ext/                        # ExtJS SDK (do NOT modify)
├── app.json                    # App manifest — namespace, required packages, build profiles
├── index.html                  # Entry HTML
├── build.xml                   # Ant build (Sencha Cmd integration)
├── CLAUDE.md                   # Project config + quy chuẩn bắt buộc
├── CONVENTIONS.md              # Quy chuẩn code chi tiết
└── .eslintrc.json              # Linting config
```

## Architecture & Patterns

### BẮT BUỘC: Quy chuẩn MVVM 3 file cho mọi màn hình

**Mỗi màn hình/view module PHẢI có đủ 3 file:**

| File | Vai trò | Mô tả |
|------|---------|-------|
| `{Feature}_View.js` | View | Giao diện, layout, items, bind data |
| `{Feature}_ViewController.js` | ViewController | Xử lý sự kiện, logic business, gọi API |
| `{Feature}_ViewModel.js` | ViewModel | Data binding, formulas, stores |

**Cấu trúc thư mục bắt buộc — component con nằm TRONG folder cha:**
```
classic/src/view/pages/{Feature}/
├── {Feature}_View.js              # View chính — xtype: '{Feature}_View'
├── {Feature}_ViewController.js    # Controller
├── {Feature}_ViewModel.js         # Model (ViewModel)
├── {Feature}_ViewGrid.js          # Component con: Grid — xtype: '{Feature}_ViewGrid'
├── {Feature}_ViewForm.js          # Component con: Form — xtype: '{Feature}_ViewForm'
└── ...
```

**Ví dụ cụ thể:**
```
classic/src/view/pages/OrderList/               ← folder cha chứa TẤT CẢ
├── OrderList_View.js              # View chính — xtype: 'OrderList_View'
├── OrderList_ViewController.js    # Controller
├── OrderList_ViewModel.js         # Model
├── OrderList_ViewGrid.js          # Grid con — xtype: 'OrderList_ViewGrid'
└── OrderList_ViewForm.js          # Form con — xtype: 'OrderList_ViewForm'

classic/src/view/pages/UserList/
├── UserList_View.js               # xtype: 'UserList_View'
├── UserList_ViewController.js
├── UserList_ViewModel.js
└── UserList_ViewGrid.js           # xtype: 'UserList_ViewGrid'

classic/src/view/pages/TaiLieuDinhKem/
├── TaiLieuDinhKem_View.js         # xtype: 'TaiLieuDinhKem_View'
├── TaiLieuDinhKem_ViewController.js
├── TaiLieuDinhKem_ViewModel.js
└── TaiLieuDinhKem_ViewGrid.js     # xtype: 'TaiLieuDinhKem_ViewGrid'
```

**Quy tắc ràng buộc:**
- **xtype PHẢI trùng tên file** (PascalCase, có underscore): `OrderList_ViewGrid` chứ KHÔNG phải `orderlist-viewgrid`
- KHÔNG được dùng `xtype: 'component'` thừa trên component con — chỉ cần xtype trùng tên file
- KHÔNG được tạo view mới mà thiếu Controller hoặc Model
- KHÔNG được đặt logic business (gọi API, xử lý data) vào View
- KHÔNG được đặt UI layout vào Controller
- Nếu màn hình đơn giản (chỉ hiển thị), vẫn PHẢI tạo Controller và Model (dù rỗng)
- Namespace phải đúng theo pattern: `DEMO.view.pages.{FolderName}.{FeatureName}`
- Alias phải đúng theo pattern: `controller.{feature-lowercase}`, `viewmodel.{feature-lowercase}`

### Quy tắc đặt tên file/thư mục tiếng Việt không dấu

**Được phép** dùng tên tiếng Việt không dấu cho file và thư mục, viết hoa chữ cái đầu mỗi từ (PascalCase):

| Tiếng Việt có dấu | Tên file không dấu | Ví dụ |
|-------------------|--------------------| ------|
| Tài liệu đính kèm | `TaiLieuDinhKem_View.js` | `classic/src/view/pages/TaiLieuDinhKem/` |
| Danh sách hồ sơ | `DanhSachHoSo_View.js` | `classic/src/view/pages/DanhSachHoSo/` |
| Quản lý người dùng | `QuanLyNguoiDung_View.js` | `classic/src/view/pages/QuanLyNguoiDung/` |
| Phiên tòa | `PhienToa_View.js` | `classic/src/view/pages/PhienToa/` |

**Quy tắc:**
- Bỏ dấu tiếng Việt (ă → a, â → a, ê → e, ô → o, ơ → o, ư → u, đ → d)
- PascalCase: chữ hoa đầu mỗi từ, không có underscore giữa các từ (trừ hậu tố `_View`, `_ViewController`, `_ViewModel`)
- Namespace vẫn giữ nguyên pattern: `DEMO.view.pages.{TenThuMuc}.{TenFile}`
- Alias giữ nguyên: `controller.{ten-thap-thang}`, `viewmodel.{ten-thap-thang}`

### Chọn cách viết View — Đơn giản vs Phức tạp

**TRƯỚC KHI VIẾT View, PHẢI QUYẾT ĐỊNH:**

| | Đơn giản | Phức tạp |
|---|---------|---------|
| **Điều kiện** | Chỉ 1 grid + filter + paging | Nhiều panels, tabs, charts, KPI cards |
| **View extends** | `Ext.grid.Panel` | `Ext.container.Container` |
| **Filter** | `dockedItems: [{ dock: 'top' }]` | Item trong Container |
| **Paging** | `bbar: { xtype: 'pagingtoolbar' }` | Trong ViewGrid |
| **Số file** | 3 (View, Controller, ViewModel) | 4+ (View, Controller, ViewModel, ViewGrid...) |
| **Ví dụ** | OrderList, ProductList, Tờ Trình | BlogPage, Analytics, UserList, Dashboard |

**Đơn giản — View = grid trực tiếp:**
```javascript
// File: OrderList/OrderList_View.js
// View CHÍNH LÀ grid, KHÔNG cần file ViewGrid riêng
Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.grid.Panel',  // ← Extend grid trực tiếp
    xtype: 'OrderList_View',
    controller: 'orderlist',
    viewModel: 'orderlist',
    bind: { store: '{orderStore}' },

    // Filter = dockedItems dock top
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            { xtype: 'combobox', emptyText: 'Trạng thái...' },
            { xtype: 'textfield', emptyText: 'Tìm kiếm...' },
            { text: 'Tìm kiếm', iconCls: 'x-fa fa-search' }
        ]
    }],

    // Paging = bbar
    bbar: { xtype: 'pagingtoolbar', displayInfo: true },

    columns: [
        // ... grid columns ...
    ]
});
```

**Phức tạp — View = Container + tách ViewGrid:**
```javascript
// File: UserList/UserList_View.js
// View là Container bọc grid đã tách riêng
Ext.define('DEMO.view.pages.UserList.UserList_View', {
    extend: 'Ext.container.Container',  // ← Extend Container
    xtype: 'UserList_View',
    controller: 'userlist',
    viewModel: 'userlist',
    requires: ['DEMO.view.pages.UserList.UserList_ViewGrid'],
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'component', html: '<h2>User List</h2>' },
        { xtype: 'UserList_ViewGrid', flex: 1 }  // ← Gọi grid tách riêng
    ]
});

// File: UserList/UserList_ViewGrid.js
// Grid tách riêng, KHÔNG có controller/model
Ext.define('DEMO.view.pages.UserList.UserList_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserList_ViewGrid',
    bind: { store: '{userStore}' },
    columns: [ /* ... */ ]
});
```

### Tách component con ra file riêng (BẮT BUỘC khi phức tạp)

**KHÔNG được viết thẳng grid/form phức tạp vào `_View.js` khi dùng cách Container wrapper.** Các component lớn phải được tách ra file riêng **trong cùng folder cha**:

| Component | File tách ra | xtype (= tên file) | Khi nào tách |
|-----------|-------------|---------------------|--------------|
| Grid | `{Feature}_ViewGrid.js` | `{Feature}_ViewGrid` | Grid > 100 dòng code hoặc nhiều renderer phức tạp (> 3) |
| Form | `{Feature}_ViewForm.js` | `{Feature}_ViewForm` | Form có > 5 fields |
| Filter bar | `{Feature}_ViewFilter.js` | `{Feature}_ViewFilter` | Filter có > 5 components |
| Tab panel | `{Feature}_ViewTab.js` | `{Feature}_ViewTab` | Tab có nội dung phức tạp |

> **Lưu ý:** `actioncolumn` đơn giản (view/edit/delete) KHÔNG bắt buộc tách file. Chỉ tách khi grid overall quá phức tạp.

**Quy tắc tách:**
- Component tách ra **nằm trong folder cha** (không tạo folder con riêng)
- **xtype PHẢI trùng tên file** (PascalCase): `OrderList_ViewGrid` chứ KHÔNG phải `orderlist-viewgrid`
- KHÔNG viết `xtype: 'component'` thừa — chỉ cần xtype trùng tên file
- Component tách ra bind store từ ViewModel của parent View
- Component tách ra **KHÔNG có** Controller/Model riêng, vẫn dùng chung của parent
- Namespace: `DEMO.view.pages.{Feature}.{Feature}_{LoaiComponent}`
- Component tách ra **PHẢI** được requires trong `_View.js`

**Trước khi viết code, PHẢI kiểm tra:**
1. Component này có quá phức tạp để đặt trong `_View.js` không?
2. Nếu grid > 100 dòng code → tách ra file riêng
3. **`actioncolumn` đơn giản (view/edit/delete) KHÔNG phải lý do tách file**
4. Kiểm tra xem tách ra có ảnh hưởng binding, controller references không

### Kiến trúc chung

- **Lazy view creation** — views are created on demand in a card layout (`centerRegion`) and cached
- **Navigation** — tree store drives card switching. Mỗi leaf node chứa `route` + `component` (xtype). MainController đọc trực tiếp từ record tree — KHÔNG dùng map riêng
- **Global overrides** — modify ExtJS base class behavior globally (ComboBox, Store, Ajax proxy, etc.)
- **Global helpers** — `common`, `config`, `constant`, `DTHS`, `notiCommon`, etc. are global objects (see ESLint globals)

### Quy tắc tối ưu code (BẮT BUỘC)

**Trước khi viết code, PHẢI kiểm tra:**
1. **Có cách tối hơn không?** — Check xem logic đã efficient chưa, có thể simplify không
2. **Có bị trùng lặp không?** — Check xem code có đang duplicate logic ở nhiều chỗ không
3. **Có ảnh hưởng chỗ khác không?** — Check xem thay đổi có break component khác không
4. **Có thừa không?** — Loại bỏ code dead, init rỗng, map trùng lặp

**Các pattern tối ưu đã áp dụng:**
- Navigation: tree store chứa `component` field → MainController đọc trực tiếp từ record, KHÔNG cần `getViewXtype()` map riêng
- Khi thêm page mới: chỉ cần thêm leaf node trong MainModel.js tree store (có `route` + `component`) + add class vào `requires` — KHÔNG sửa MainController logic
- Component con (Grid, Form, Chart...) tách ra file riêng dùng xtype PascalCase trùng tên file → clean, easy to find

## Important Notes

- All UI text is in Vietnamese
- Dashboard data is currently hardcoded in ViewModel stores (not API-driven)
- The Ajax proxy override adds a 90-second timeout and automatic loading indicators for all requests
- Third-party libs are NOT managed via npm — they live in `lib/` and are loaded in `index.html`
- Do NOT modify files under `ext/` (framework SDK)
- Auto-generated files: `bootstrap.js`, `bootstrap.css`, `classic.json`, `classic.jsonp`

## ESLint Globals (available without declaration)

`Ext`, `axios`, `flatpickr`, `L`, `maplibregl`, `DTHS`, `DEMO`, `config`, `common`, `commonBieuMau`, `commonDoiTuong`, `commonHoSo`, `commonCbb`, `notiCommon`, `constant`, `constantHoSo`, `trangThai`, `GenDong`, `vgca_sign_approved`, `vgca_sign_income`, `vgca_comment`, `vgca_sign_appendix`, `vgca_sign_copy`

## THEMING — CSS Variables (BẮT BUỘC)

**KHÔNG được hardcode màu sắc** trong JS views. PHẢI dùng CSS custom properties.

### CSS Variables có sẵn (定义 trong `app.css`)

| Variable | Light | Dark | Dùng cho |
|----------|-------|------|----------|
| `--theme-bg-page` | `#f4f6fa` | `#0f172a` | Nền trang |
| `--theme-bg-card` | `#ffffff` | `#1e293b` | Nền card, panel, header |
| `--theme-bg-card-hover` | `#f9fafb` | `#334155` | Hover state |
| `--theme-bg-input` | `#ffffff` | `#0f172a` | Input, combobox |
| `--theme-text-primary` | `#1e293b` | `#e2e8f0` | Text chính |
| `--theme-text-secondary` | `#64748b` | `#94a3b8` | Text phụ |
| `--theme-text-muted` | `#94a3b8` | `#64748b` | Text mờ |
| `--theme-border` | `#e2e8f0` | `#334155` | Border chính |
| `--theme-border-light` | `#f1f5f9` | `#1e293b` | Border nhẹ |
| `--theme-shadow` | `0 4px 6px -1px rgba(0,0,0,0.05)` | `0 4px 6px -1px rgba(0,0,0,0.3)` | Shadow card |

### CSS Utility Classes có sẵn

| Class | Mô tả |
|-------|-------|
| `.dash-page` | Nền trang (dùng `--theme-bg-page`) |
| `.dash-card` | Card container (background + border + shadow) |
| `.dash-card-body` | Panel body (background + shadow, không border) |
| `.dash-card-header` | Panel header (background, không border-bottom) |
| `.dash-panel-header` | Grid/form header (background + border-bottom) |
| `.dash-toolbar` | Toolbar bottom (background + border-top) |
| `.dash-btn-outline` | Nút outline (dùng theme border/text) |

### Quy tắc khi viết View mới

```javascript
// ✅ ĐÚNG — dùng CSS classes / variables
{
    xtype: 'panel',
    cls: 'dash-card',
    bodyStyle: { padding: '16px' }
}

// ❌ SAI — hardcode màu
{
    xtype: 'panel',
    bodyStyle: {
        background: '#ffffff',     // ← KHÔNG được hardcode
        borderRadius: '8px',
        boxShadow: '...'
    }
}

// ✅ Đúng — trong itemTpl HTML, dùng var()
'<div style="background: var(--theme-bg-card); color: var(--theme-text-primary);">'

// ❌ SAI — hardcode trong itemTpl
'<div style="background: #ffffff; color: #1e293b;">'
```

**Dark mode tự động hoạt động** khi body có class `dark-mode` — tất cả element dùng `var(--theme-*)` sẽ chuyển màu mà KHÔNG cần JavaScript hack.

## OVERRIDES — KHÔNG viết thừa (BẮT BUỘC)

Dự án có `classic/overrides/` set了很多全局默认值. Khi viết View/Controller MỚI, PHẢI kiểm tra bảng dưới rồi **KHÔNG-declare lại** các property đã có override.

### Window (Ext.window.Window)

Override set: `closable: true`, `closeAction: 'destroy'`, `modal: true`, `resizable: false`, `bodyStyle: 'background-color:transparent'`, `layout: { type: 'fit', padding: 5 }`

```javascript
// ✅ ĐÚNG — chỉ viết property cần thiết
Ext.create('Ext.window.Window', {
    title: 'My Dialog',
    width: 500,
    items: [{ xtype: 'mygrid' }]
});

// ❌ SAI — thừa modal, closable, closeAction (override đã set)
Ext.create('Ext.window.Window', {
    title: 'My Dialog',
    width: 500,
    modal: true,        // ← THỪA
    closable: true,     // ← THỪA
    closeAction: 'destroy', // ← THỪA
    resizable: false,   // ← THỪA
    items: [{ xtype: 'mygrid' }]
});
```

### Form Fields (TextField, NumberField, ComboBox, DateField, TextArea)

Override set: `labelAlign: 'top'`, `labelSeparator: ''`, `cls: 'field-csstyle'`, `readOnlyCls: 'readOnlyCls'`, `inputAttrTpl: ['spellcheck=false']`

DateField override additionally set: `format: 'd/m/Y'`

```javascript
// ✅ ĐÚNG
{ xtype: 'datefield', fieldLabel: 'Từ ngày', width: 150 }

// ❌ SAI — format, labelAlign, labelSeparator đều thừa
{ xtype: 'datefield', fieldLabel: 'Từ ngày', format: 'd/m/Y', labelAlign: 'top', labelSeparator: '', width: 150 }
```

### Grid Panel (Ext.grid.Panel)

Override set: `width: '100%'`, `viewConfig: { stripeRows: true, columnLines: true, ... }`, `emptyText: 'Không có dữ liệu'`

```javascript
// ✅ ĐÚNG
Ext.define('MyGrid', { extend: 'Ext.grid.Panel', columns: [...] });

// ❌ SAI — width: '100%' thừa
Ext.define('MyGrid', { extend: 'Ext.grid.Panel', width: '100%', columns: [...] });
```

### Proxy Ajax

Override set: `timeout: 90000` + auto loading spinner + POST pagination helper. **KHÔNG cần** set `timeout` hay `listeners` cho loading trên store/proxy riêng.

### VTypes có sẵn (kh cần定义 lại)

| VType | Dùng cho |
|-------|----------|
| `sdt` | Số điện thoại VN (0xxxxxxxxx, 10-11 số) |
| `number` | Chỉ nhập số |
| `maxlen` | Kiểm tra byte-length |
| `textonly` | Chỉ chữ cái, không dấu |
| `textnumber` | Chữ + số, không ký tự đặc biệt |

### Quy tắc chung

- **Đọc `classic/overrides/` trước** khi viết component mới
- **KHÔNG-set lại** property đã có trong override (trừ khi cần value KHÁC override)
- **KHÔNG-set lại** `labelAlign`, `labelSeparator`, `cls`, `readOnlyCls` trên form fields
- **KHÔNG-set lại** `format: 'd/m/Y'` trên DateField (trừ format khác)
- **KHÔNG-set lại** `modal`, `closable`, `closeAction`, `resizable` trên Window
- **KHÔNG-set lại** `width: '100%'` trên Grid
- **KHÔNG-set lại** `timeout` hay loading listener trên Ajax proxy/store

## Buttons trong Window — KHÔNG để inline handler (BẮT BUỘC)

Khi tạo Window có buttons, **KHÔNG được** viết `handler: function() { ... }` inline. PHẢI dùng `handler: 'methodName'` để ViewController xử lý.

```javascript
// ✅ ĐÚNG — handler trỏ đến ViewController method
buttons: [{
    text: 'ĐÓNG',
    ui: 'soft-red',
    handler: 'onClosePopup'
}]
// Trong ViewController:
onClosePopup: function (btn) {
    btn.up('window').close();
}

// ❌ SAI — inline function, khó maintain, không test được
buttons: [{
    text: 'ĐÓNG',
    handler: function () {
        win.close();  // ← closure, dễ leak
    }
}]
```

**Tại sao:**
- `handler: 'methodName'` ViewController tự resolve — MVVM pattern đúng
- Tránh closure leak `win` reference
- Dễ test, dễ override, dễ tái sử dụng
- Nhiều buttons → mỗi button 1 method riêng, clean hơn inline

## Coding Style Summary

- Single quotes, semicolons, no trailing commas, no `var` (use `let`/`const`)
- `sourceType: "script"` (NOT ES modules — no `import`/`export`)
- `me = this` pattern inside ExtJS methods
- **xtype PHẢI trùng tên file** (PascalCase): `OrderList_ViewGrid` chứ KHÔNG phải `orderlist-viewgrid`
- **KHÔNG viết `xtype: 'component'` thừa** — chỉ dùng khi render raw HTML
- **KHÔNG viết `init` override rỗng** — nếu init chỉ `callParent` thì bỏ luôn
- Component con **LUÔN nằm trong folder cha**, không tạo folder con riêng
- **Màn hình đơn giản** (1 grid + filter + paging): View = `Ext.grid.Panel` trực tiếp, docked filter top, paging bottom — không cần file ViewGrid riêng
- **Dùng `reference` + `lookupReference()`** thay vì `down('fieldLabel=...')` hoặc `down('#itemId')`
- **Group filter fields vào `timKiemNangCao` object** trong ViewModel — KHÔNG đặt riêng lẻ ở root
- **Xem `CONVENTIONS.md` để biết đầy đủ quy chuẩn code**
