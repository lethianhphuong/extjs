Ext.define('DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ConNguoiLienQuan_View',
    requires: [
        'DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewController',
        'DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewModel',
        'DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewFilter',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_View'
    ],
    controller: 'connguoilienquan',
    viewModel: 'connguoilienquan',
    cls: 'cnlq-list',
    title: 'Danh sách con người liên quan',
    bind: { store: '{peopleGridStore}' },
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 60 },
        { text: 'Họ tên', dataIndex: 'hoTen', flex: 1, minWidth: 200, renderer: Ext.util.Format.htmlEncode },
        { text: 'Vai trò', dataIndex: 'vaiTro', width: 180, renderer: Ext.util.Format.htmlEncode },
        { text: 'Ngày sinh', dataIndex: 'ngaySinh', xtype: 'datecolumn', format: 'd/m/Y', width: 110 },
        { text: 'Giới tính', dataIndex: 'gioiTinh', width: 85, renderer: Ext.util.Format.htmlEncode },
        { text: 'CCCD/CMT', dataIndex: 'cccd', width: 135, renderer: Ext.util.Format.htmlEncode },
        { text: 'Điện thoại', dataIndex: 'soDt', width: 120, renderer: Ext.util.Format.htmlEncode },
        { text: 'Nơi ở hiện tại', dataIndex: 'noiO', flex: 1, minWidth: 200, renderer: Ext.util.Format.htmlEncode }
    ],
    bbar: {
        xtype: 'pagingtoolbar', bind: { store: '{peopleGridStore}' }, displayInfo: true,
        displayMsg: 'Hiển thị {0} - {1} / {2} người', beforePageText: 'Trang', afterPageText: '/ {0}'
    },
    tbar: { xtype: 'ConNguoiLienQuan_ViewFilter' }
});
