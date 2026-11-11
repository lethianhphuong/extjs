// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_HuyenStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_HuyenStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'parentCode', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'H01', name: 'Huyện địa bàn mẫu A', parentCode: 'T01'},
        {code: 'H02', name: 'Huyện địa bàn mẫu B', parentCode: 'T02'}
    ]
});
