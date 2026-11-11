// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.store.TT_TimKiem_PhamViThongKeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_PhamViThongKeStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'toanQuoc', name: 'Toàn quốc'},
        {code: 'capCuc', name: 'Cấp Cục'},
        {code: 'tinhThanh', name: 'Tỉnh/Thành phố'}
    ]
});
