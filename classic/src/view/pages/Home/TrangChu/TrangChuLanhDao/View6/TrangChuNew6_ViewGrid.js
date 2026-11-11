Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TrangChuNew6_ViewGrid',
    itemId: 'dsHoSoGrid_IdView',
    cls: 'tcn6-grid',
    border: false,
    columnLines: true,
    bind: { store: '{dsHoSoStore}' },
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 56, align: 'center' },
        {
            text: 'Mã đối tượng',
            dataIndex: 'maDoiTuong',
            flex: 1.2,
            minWidth: 160,
            renderer: function (val) {
                return '<span class="tcn6-code">' + Ext.String.htmlEncode(val || '') + '</span>';
            }
        },
        {
            text: 'Loại hồ sơ',
            dataIndex: 'tenLoaiDoituongMoi',
            flex: 2,
            minWidth: 220,
            renderer: function (val, meta, record) {
                const text = Ext.String.htmlEncode(val || '');
                meta.tdAttr = 'data-qtip="' + text + '"';
                return '<span class="tcn6-badge tcn6-tone-' + Ext.String.htmlEncode(record.get('loaiTone')) + '">' + text + '</span>';
            }
        },
        { text: 'Ngày ký duyệt', dataIndex: 'ngayKyDuyetText', flex: 1, minWidth: 140, align: 'center' },
        {
            text: 'Số đăng ký',
            dataIndex: 'soDangKy',
            flex: 1,
            minWidth: 130,
            renderer: function (val) {
                return val ? Ext.String.htmlEncode(val) : '<span class="tcn6-muted">—</span>';
            }
        }
    ]
});
