// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_ThangTrongNamBCTK_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_ThangTrongNamBCTK_Store',
    fields: [
        {name: 'id', type: 'auto'},
        {name: 'name', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {id: 1, name: 'Tháng 1'},
        {id: 2, name: 'Tháng 2'},
        {id: 3, name: 'Tháng 3'},
        {id: 4, name: 'Tháng 4'},
        {id: 5, name: 'Tháng 5'},
        {id: 6, name: 'Tháng 6'},
        {id: 7, name: 'Tháng 7'},
        {id: 8, name: 'Tháng 8'},
        {id: 9, name: 'Tháng 9'},
        {id: 10, name: 'Tháng 10'},
        {id: 11, name: 'Tháng 11'},
        {id: 12, name: 'Tháng 12'}
    ]
});
