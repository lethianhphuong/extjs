// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_ListReportStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_ListReportStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'parentCode', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'BC01', name: 'Báo cáo tổng hợp mẫu', parentCode: 'TH'},
        {code: 'BC02', name: 'Báo cáo đơn vị mẫu', parentCode: 'DV'}
    ]
});
