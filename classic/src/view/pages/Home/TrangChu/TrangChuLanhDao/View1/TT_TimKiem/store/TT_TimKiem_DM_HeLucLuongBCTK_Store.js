// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_HeLucLuongBCTK_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_HeLucLuongBCTK_Store',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'maHeLucLuong', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: '100001', name: 'Cục mẫu A', maHeLucLuong: 'AN'},
        {code: '100002', name: 'Cục mẫu B', maHeLucLuong: 'CS'}
    ]
});
