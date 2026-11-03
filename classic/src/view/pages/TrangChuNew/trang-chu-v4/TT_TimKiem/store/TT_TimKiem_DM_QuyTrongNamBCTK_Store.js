// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.store.TT_TimKiem_DM_QuyTrongNamBCTK_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_QuyTrongNamBCTK_Store',
    fields: [
        {name: 'id', type: 'auto'},
        {name: 'name', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {id: 1, name: 'Quý 1'},
        {id: 2, name: 'Quý 2'},
        {id: 3, name: 'Quý 3'},
        {id: 4, name: 'Quý 4'}
    ]
});
