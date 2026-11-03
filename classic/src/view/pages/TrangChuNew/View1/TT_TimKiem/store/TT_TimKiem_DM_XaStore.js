// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.store.TT_TimKiem_DM_XaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_XaStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'parentCode', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'X01', name: 'Xã địa bàn mẫu A', parentCode: 'H01'},
        {code: 'X02', name: 'Xã địa bàn mẫu B', parentCode: 'H02'}
    ]
});
