# Kế hoạch di chuyển và đồng bộ namespace `TrangChuNew` → `pages/Home/TrangChu/TrangChuLanhDao`

## Goal Description

Chuyển toàn bộ module `TrangChuNew` (gồm shell `TrangChuNew_View*`, `View1`–`View6` và `TT_TimKiem`, bao gồm `View3`) từ `classic/src/view/pages/TrangChuNew/` sang `classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/` và đồng bộ toàn bộ `Ext.define`, `requires`, tham chiếu tĩnh từ `DEMO.view.pages.TrangChuNew.*` sang `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.*`. Đồng thời chuyển toàn bộ 5 file mock `NVCB.view.Home.TrangChu.TrangChuLanhDao.*` (`DATA_MOCK.js`, `data.js`, `DataView2.js`, `DataView5.js`, `DataView6.js`) sang `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.ViewX.<TenFile>`. Giữ nguyên bản sao `classic/src/view/pages/TrangChuNew - Copy/`.

Giữ nguyên tên file và tên class cuối (`TrangChuNew_View`, `TrangChuNew1_View`, ..., `TrangChuNew3_View`, `TT_TimKiem_View`), `xtype`, alias `controller`/`viewmodel`/`store` và các CSS class prefix (`.trang-chu-new*`, `.tcn3-*`) để khớp đúng yêu cầu `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_View` và không phá vỡ binding/navigation hiện có.

## User Review Required

> [!WARNING]
> **Không chạy `sencha app refresh` / `sencha app build`**: Theo xác nhận, kế hoạch **không** chạy `sencha app refresh` hay sửa tay `classic.json`, `bootstrap.js`, `bootstrap.css`, `classic.jsonp`. Lưu ý rằng `classic.json` hiện vẫn lưu 88 mục `loadOrder` cũ trỏ vào `classic/src/view/pages/TrangChuNew/...` nên khi chạy qua `bootstrap.js` sẽ phát sinh 404 cho tới khi bạn chủ động chạy `sencha app refresh` hoặc `sencha app watch` ở môi trường của mình.

> [!NOTE]
> **Thư mục `TrangChuNew - Copy/`**: Giữ nguyên trạng, không di chuyển hay sửa đổi.

## Proposed Changes

Thứ tự thực hiện: (1) Di chuyển thư mục source & SCSS → (2) Cập nhật namespace/tham chiếu nội bộ và 5 file mock trong `pages/Home/TrangChu/TrangChuLanhDao/` → (3) Cập nhật tham chiếu ngoài module (`MainController.js`, `BanDo_ViewModel.js`, `package.json`) → (4) Kiểm tra `git grep`, `node --check` và `eslint`.

---

### 1. Di chuyển cấu trúc thư mục và SCSS

#### [MOVE] `classic/src/view/pages/TrangChuNew/` → `classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/`
Di chuyển toàn bộ nội dung (gồm root `TrangChuNew_View*`, `View1/` kèm `TT_TimKiem/`, `View2/`, `View3/` kèm ảnh bản đồ & `Store/`, `View4/`, `View5/`, `View6/`) sang `classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/`.

#### [MOVE] SCSS trong `classic/sass/src/`
- `classic/sass/src/view/pages/TrangChuNew/TrangChuNew_View.scss` → `classic/sass/src/view/pages/Home/TrangChu/TrangChuLanhDao/TrangChuNew_View.scss`
- `classic/sass/src/view/pages/TrangChuNew/View1/TT_TimKiem/TT_TimKiem_View.scss` → `classic/sass/src/view/pages/Home/TrangChu/TrangChuLanhDao/View1/TT_TimKiem/TT_TimKiem_View.scss`

---

### 2. Đồng bộ namespace trong `View3` (trọng tâm yêu cầu)

#### [MODIFY] 15 file JS của View3 + `DataView2.js` tại `classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3/`
Cập nhật `Ext.define`, `requires` và lời gọi class tĩnh từ `DEMO.view.pages.TrangChuNew.View3.*` (và `View1.TT_TimKiem.*`) sang `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.*`:

- `TrangChuNew3_View.js`:
```javascript
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_View',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewController',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewModel',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewThongKe',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewCharts',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewMapAlerts',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewGrid'
    ],
```
- `TrangChuNew3_ViewController.js`: cập nhật `Ext.define`, `requires` (`MockData`, `DisplayConfig`) và các lời gọi tĩnh `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig` / `TrangChuNew3_MockData`.
- `TrangChuNew3_ViewModel.js`: cập nhật `Ext.define`, `requires` (`DisplayConfig` và 6 Store) và các lời gọi `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig`.
- `TrangChuNew3_ViewCharts.js`: cập nhật `Ext.define` và tham chiếu `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig` trong renderer.
- `TrangChuNew3_ViewThongKe.js`, `TrangChuNew3_ViewMapAlerts.js`, `TrangChuNew3_ViewGrid.js`, `TrangChuNew3_MockData.js`: cập nhật `Ext.define` sang `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.*`.
- `TrangChuNew3_DisplayConfig.js`: cập nhật `Ext.define` và đường dẫn ảnh bản đồ:
```diff
-Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig', {
+Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig', {
...
-    bandoImgUrl: 'classic/src/view/pages/TrangChuNew/View3/1268_transparent.png',
-    // bandoImgUrlGoc: 'classic/src/view/pages/TrangChuNew/View3/1268.jpg',
+    bandoImgUrl: 'classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3/1268_transparent.png',
+    // bandoImgUrlGoc: 'classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3/1268.jpg',
```
- 6 file trong `Store/` (`TrangChuNew3_BienDongStore.js`, `TrangChuNew3_CoCauStore.js`, `TrangChuNew3_DienBienStore.js`, `TrangChuNew3_GridStore.js`, `TrangChuNew3_LoaiDoiTuongStore.js`, `TrangChuNew3_TopDiaBanStore.js`): cập nhật `Ext.define` sang `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.*`.
- `DataView2.js`:
```diff
-Ext.define('NVCB.view.Home.TrangChu.TrangChuLanhDao.View2.data', {
+Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DataView2', {
```

---

### 3. Đồng bộ namespace cho phần còn lại của `TrangChuNew` và các file mock `NVCB.*`

Thay `DEMO.view.pages.TrangChuNew.` → `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.` ở toàn bộ các file còn lại trong module:

- **Root (`pages/Home/TrangChu/TrangChuLanhDao/`)**:
  - `TrangChuNew_View.js` (`Ext.define` + `requires`)
  - `TrangChuNew_ViewController.js` (`Ext.define`)
  - `TrangChuNew_ViewModel.js` (`Ext.define`)
  - `TrangChuNew_ViewTab.js` (`Ext.define` + `requires` cho `View1`, `View2`, `View3`, `View5`, `View6`)
- **`View1/` (và `View1/Store/`, `View1/TT_TimKiem/`, `View1/TT_TimKiem/store/`)**:
  - Toàn bộ file View, Controller, ViewModel, DisplayConfig, MockData, Store và `TT_TimKiem`.
  - `View1/DATA_MOCK.js`: đổi `NVCB.view.Home.TrangChu.TrangChuLanhDao.View1.data` → `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.DATA_MOCK`.
- **`View2/`**:
  - Toàn bộ file JS (`TrangChuNew2_View.js`, `_ViewController.js`, `_ViewModel.js`, `_ViewCoCau.js`, `_ViewDonut.js`, `_ViewSoLuong.js`, `_ViewSuuTra.js`, `_MockData.js`).
  - `View2/data.js`: đổi `NVCB.view.Home.TrangChu.TrangChuLanhDao.View1.data` → `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.data`.
- **`View4/`**:
  - `TrangChuNew4_ViewKetQua.js` (`Ext.define`).
- **`View5/`**:
  - Toàn bộ file JS (`TrangChuNew5_View.js`, `_ViewController.js`, `_ViewModel.js`, `_DisplayConfig.js`, `_MockData.js` và các component con).
  - `View5/DataView5.js`: đổi `NVCB.view.Home.TrangChu.TrangChuLanhDao.View2.data` → `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.DataView5`.
- **`View6/`**:
  - Toàn bộ file JS (`TrangChuNew6_View.js`, `_ViewController.js`, `_ViewModel.js`, `_DisplayConfig.js`, `_MockData.js`, `_ViewCanBo.js`, `_ViewGrid.js`, `_ViewKetQua.js`).
  - `View6/DataView6.js`: đổi `NVCB.view.Home.TrangChu.TrangChuLanhDao.View2.data` → `DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.DataView6`.

---

### 4. Cập nhật tham chiếu ngoài thư mục và cấu hình lint

#### [MODIFY] `classic/src/view/main/MainController.js`
```diff
     requires: [
-        'DEMO.view.pages.TrangChuNew.TrangChuNew_View',
+        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.TrangChuNew_View',
```
*(Lưu ý: `MainModel.js` đang trỏ `component: 'TrangChuNew_View'` theo `xtype`, không đổi.)*

#### [MODIFY] `classic/src/view/pages/BanDo/BanDo_ViewModel.js`
```diff
     data: {
-        bandoImgUrl: 'classic/src/view/pages/TrangChuNew/View3/1268_transparent.png',
+        bandoImgUrl: 'classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3/1268_transparent.png',
```

#### [MODIFY] `package.json`
```diff
   "scripts": {
-    "lint": "eslint classic/src/view/pages/TrangChuNew/View1",
-    "lint:fix": "eslint classic/src/view/pages/TrangChuNew/View1 --fix",
-    "lint:view1": "eslint classic/src/view/pages/TrangChuNew/View1",
-    "lint:view1:fix": "eslint classic/src/view/pages/TrangChuNew/View1 --fix"
+    "lint": "eslint classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View1",
+    "lint:fix": "eslint classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View1 --fix",
+    "lint:view1": "eslint classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View1",
+    "lint:view1:fix": "eslint classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View1 --fix"
   },
```

## Verification Plan

### Automated Checks
1. **Kiểm tra không còn tham chiếu cũ** (trừ `TrangChuNew - Copy/`):
   ```powershell
   git grep -n -E "DEMO\.view\.pages\.TrangChuNew|pages/TrangChuNew|NVCB\.view\.Home\.TrangChu\.TrangChuLanhDao" -- classic/ app/ resources/ sass/ package.json | Where-Object { $_ -notmatch "TrangChuNew - Copy" }
   ```
2. **Kiểm tra cú pháp Node** trên toàn bộ file JS đã sửa/di chuyển:
   ```powershell
   Get-ChildItem -Recurse classic/src/view/pages/Home/TrangChu/TrangChuLanhDao -Filter *.js | ForEach-Object { node --check $_.FullName }
   ```
3. **Chạy ESLint** (`npx eslint`) trên các file JS đã sửa trong `View3`, `MainController.js`, `BanDo_ViewModel.js` và `npm run lint`:
   ```powershell
   npx eslint classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3 classic/src/view/main/MainController.js classic/src/view/pages/BanDo/BanDo_ViewModel.js
   npm run lint
   ```
   *(Nếu các file code hiện hữu trong `View3` / `View1` có cảnh báo sẵn ngoài phạm vi đổi namespace, ghi nhận rõ; không tự sửa logic ngoài phạm vi.)*

### Manual Verification (sau khi bạn chạy `sencha app refresh` / `sencha app watch`)
1. Chạy `sencha app refresh` hoặc `sencha app watch` để cập nhật `classic.json`/`bootstrap.js`, rồi mở ứng dụng trên trình duyệt.
2. Kiểm tra Console & Network không có lỗi 404 / `Ext.Loader` / `Ext.ClassManager`.
3. Mở mục **Trang chủ NEW** (`#trang-chu-new`), chuyển qua tất cả các tab (`view1`, `view2`, `view3`, `view5`, `view6`) và mở trang **Bản đồ** (`BanDo_ViewModel`) để xác nhận toàn bộ view và ảnh `1268_transparent.png` hiển thị bình thường.
