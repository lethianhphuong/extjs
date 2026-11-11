Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'TrangChuNew3_ViewGrid',
    requires: [
        'Ext.grid.Panel',
        'Ext.tab.Bar'
    ],
    cls: 'tcn3-card tcn3-grid-tabpanel',
    margin: '12 0 16 0',
    layout: { type: 'vbox', align: 'stretch' },
    dockedItems: [{
        //#region NOTE: Tab cấp đơn vị dạng segmented
        xtype: 'container',
        dock: 'top',
        cls: 'tcn3-grid-toolbar',
        layout: { type: 'hbox', align: 'middle' },
        items: [{
            xtype: 'tabbar',
            cls: 'tcn3-tabbar',
            itemId: 'gridTabBar_IdView',
            // Đăng ký tab mặc định với tabbar qua setActiveTab; 'active: true' trên tab chỉ gắn class
            // mà không cập nhật tabbar.activeTab nên lần chuyển tab đầu tiên không bỏ active tab cũ.
            listeners: { afterrender: 'onGridTabBarReady' },
            defaults: { closable: false, handler: 'onGridTabClick' },
            items: [
                { xtype: 'tab', itemId: 'cucTab_IdView', text: 'Cấp Cục', iconCls: 'x-fa fa-university', capDonVi: 'CUC' },
                { xtype: 'tab', itemId: 'tinhTab_IdView', text: 'Cấp Tỉnh', iconCls: 'x-fa fa-map-marker-alt', capDonVi: 'TINH' },
                { xtype: 'tab', itemId: 'xaTab_IdView', text: 'Cấp Xã', iconCls: 'x-fa fa-sitemap', capDonVi: 'XA' }
            ]
        }]
        //#endregion
    }],
    items: [{
        xtype: 'grid',
        itemId: 'tinhHinhDonViGrid_IdView',
        cls: 'tcn3-main-grid',
        maxHeight: 520,
        bind: { store: '{gridStore}' },
        enableColumnHide: true,
        enableColumnMove: true,
        columnLines: true,
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true,
            getRowClass: function (record) {
                return record.get('isSummary') || record.get('maDonVi') === 'TONG' ? 'tcn3-summary-row' : '';
            }
        },
        columns: {
            defaults: { align: 'right', renderer: 'renderSoLieuGrid' },
            items: [
                { text: 'STT', dataIndex: 'stt', width: 50, align: 'center', renderer: 'renderSttGrid' },
                { text: 'Đơn vị', dataIndex: 'tenDonVi', align: 'left', minWidth: 220, flex: 1.5, renderer: 'renderDonViGrid' },
                { text: 'Tổng số hồ sơ<br>đang quản lý', dataIndex: 'tongHoSo', width: 135, tdCls: 'tcn3-col-total' },
                {
                    text: 'Biến động trong kỳ',
                    align: 'center',
                    defaults: { align: 'right', renderer: 'renderSoLieuGrid' },
                    columns: [
                        { text: 'Mở mới', dataIndex: 'moMoi', width: 88 },
                        { text: 'Kết thúc', dataIndex: 'ketThuc', width: 88 },
                        { text: 'Chuyển mức', dataIndex: 'chuyenMuc', width: 95 }
                    ]
                },
                {
                    text: 'Theo loại hồ sơ',
                    align: 'center',
                    defaults: { align: 'right', width: 85, renderer: 'renderSoLieuGrid' },
                    columns: [
                        { text: 'ĐTCB', dataIndex: 'dtcb' },
                        { text: 'Sưu tra', dataIndex: 'suuTra' },
                        { text: 'Hiềm nghi', dataIndex: 'hiemNghi' },
                        { text: 'Chuyên án', dataIndex: 'chuyenAn' },
                        { text: 'CTVBM', dataIndex: 'ctvbm' },
                        { text: 'HTBM', dataIndex: 'htbm' },
                        { text: 'VANV', dataIndex: 'vanv' },
                        { text: 'NNV', dataIndex: 'nnv' }
                    ]
                }
            ]
        }
    }]
});
