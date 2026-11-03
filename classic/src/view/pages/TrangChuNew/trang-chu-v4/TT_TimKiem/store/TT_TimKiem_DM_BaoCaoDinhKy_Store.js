// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.store.TT_TimKiem_DM_BaoCaoDinhKy_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_BaoCaoDinhKy_Store',
    fields: [
        {name: 'id', type: 'auto'},
        {name: 'name', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {id: 'month', name: 'Theo tháng'},
        {id: 'quarter', name: 'Theo quý'},
        {id: 'year', name: 'Theo năm'}
    ]
});
