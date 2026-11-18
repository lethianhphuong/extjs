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
            { text: 'Họ và tên', dataIndex: 'hoTen', flex: 1.4, minWidth: 210, renderer: 'renderHoTen' },
            { text: 'Số hiệu CBCS', dataIndex: 'soHieu', width: 130, align: 'center', tdCls: 'tcn7-cell-code' },
            { text: 'Chức vụ', dataIndex: 'chucVu', width: 170, align: 'center', renderer: 'renderChucVu' },
            { text: 'Đơn vị công tác', dataIndex: 'donVi', flex: 2, minWidth: 240, renderer: 'renderDonVi' },
            { text: 'Tổng số hồ sơ phụ trách', dataIndex: 'tongHoSo', width: 150, align: 'center', renderer: 'renderTongHoSo' },
            { text: 'Đang thực hiện', dataIndex: 'dangThucHien', width: 140, align: 'center', renderer: 'renderDangThucHien' }
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
