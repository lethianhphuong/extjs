Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewQuanHe', {
    extend: 'Ext.grid.Panel',
    xtype: 'ThemMoiConNguoi_ViewQuanHe',
    height: 220,
    margin: '16 0',
    bind: { store: '{relationsGridStore}' },
    tbar: [
        { xtype: 'tbtext', text: 'Mối quan hệ' },
        '->',
        { text: 'Thêm mới', iconCls: 'x-fa fa-plus', handler: 'onAddRelation' }
    ],
    viewConfig: { emptyText: 'Chưa có thông tin mối quan hệ.', deferEmptyText: false },
    columns: [
        { xtype: 'rownumberer', text: 'TT', width: 45 },
        {
            text: 'Họ tên',
            dataIndex: 'qhTen',
            flex: 1,
            minWidth: 140,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Năm sinh',
            dataIndex: 'qhNam',
            width: 90,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Giới tính',
            dataIndex: 'qhGt',
            width: 85,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'CCCD/CMT',
            dataIndex: 'qhCccd',
            width: 130,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Quan hệ',
            dataIndex: 'qhQuanHe',
            width: 110,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Nơi ở hiện nay',
            dataIndex: 'qhNoiO',
            flex: 1,
            minWidth: 150,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 85,
            items: [
                { iconCls: 'x-fa fa-trash', tooltip: 'Xóa quan hệ', handler: 'onRemoveRow' }
            ]
        }
    ]
});
