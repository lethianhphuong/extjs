Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TrangChuNew6_ViewGrid',
    itemId: 'dsHoSoGrid_IdView',
    cls: 'tcn6-grid',
    border: false,
    columnLines: false,
    bind: { store: '{dsHoSoStore}' },
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 64, align: 'center' },
        {
            text: 'Mã đối tượng',
            dataIndex: 'maDoiTuong',
            flex: 1,
            minWidth: 150,
            renderer: function (val) {
                return '<span class="tcn6-code">' + Ext.String.htmlEncode(val || '') + '</span>';
            }
        },
        {
            text: 'Loại hồ sơ',
            dataIndex: 'loaiHsText',
            flex: 1,
            minWidth: 140,
            renderer: function (val, meta, record) {
                return '<span class="tcn6-badge tcn6-tone-' + Ext.String.htmlEncode(record.get('loaiHsTone')) + '">' + Ext.String.htmlEncode(val || '') + '</span>';
            }
        },
        { text: 'Ngày đưa vào quản lý', dataIndex: 'ngayDuaVaoQuanLy', flex: 1, minWidth: 170 },
        { text: 'Số đăng ký', dataIndex: 'soDangKy', flex: 1, minWidth: 150 }
    ]
});
