Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TrangChuNew7_ViewGrid',
    requires: [
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox'
    ],
    cls: 'tcn7-grid',
    border: false,
    columnLines: false,
    // Không giữ dòng được chọn: xem chi tiết bằng link tên cán bộ
    disableSelection: true,
    bind: { store: '{dsCanBoStore}' },
    listeners: { cellclick: 'onGridCellClick' },
    columns: {
        defaults: { menuDisabled: true },
        items: [
            { xtype: 'rownumberer', text: 'STT', width: 64, align: 'center', tdCls: 'tcn7-cell-stt' },
            { text: 'Họ và tên', dataIndex: 'HO_TEN', flex: 1.4, minWidth: 210, renderer: 'renderHoTen' },
            { text: 'Số hiệu CBCS', dataIndex: 'SO_HIEU_CAND', width: 130, align: 'center', tdCls: 'tcn7-cell-code' },
            { text: 'Chức vụ', dataIndex: 'TEN_CHUC_VU', width: 200, align: 'center', renderer: 'renderChucVu' },
            { text: 'Đơn vị công tác', dataIndex: 'TEN_DON_VI', flex: 2, minWidth: 240, tdCls: 'tcn7-cell-donvi', renderer: 'renderDonVi' },
            { text: 'Tổng số hồ sơ phụ trách', dataIndex: 'SO_HO_SO_PHU_TRACH', width: 150, align: 'center', renderer: 'renderTongHoSo' },
            { text: 'Đang thực hiện', dataIndex: 'SO_HO_SO_DANG_THUC_HIEN', width: 140, align: 'center', renderer: 'renderDangThucHien' }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        cls: 'tcn7-paging',
        bind: { store: '{dsCanBoStore}' },
        displayInfo: true,
        displayMsg: 'Tổng {2} cán bộ',
        emptyMsg: 'Không có cán bộ',
        beforePageText: 'Trang',
        afterPageText: '/ {0}',
        items: ['-', { xtype: 'tbtext', text: 'Hiển thị' }, {
            xtype: 'combobox',
            cls: 'tcn7-pagesize',
            width: 72,
            editable: false,
            queryMode: 'local',
            value: 10,
            store: [10, 20, 50],
            listeners: { select: 'onPageSizeChange' }
        }, { xtype: 'tbtext', text: 'dòng/trang' }]
    }
});
