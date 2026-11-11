// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_TinhStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_TinhStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'T01', name: 'Tỉnh địa bàn mẫu A'},
        {code: 'T02', name: 'Tỉnh địa bàn mẫu B'}
    ]
});
