// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_ReportTypeTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.TT_TimKiem_ReportTypeTreeStore',
    fields: ['code', 'name', 'text'],
    proxy: { type: 'memory' },
    root: {
        expanded: true,
        children: [
            { code: 'TH', name: 'Tổng hợp', text: 'Tổng hợp', leaf: true },
            { code: 'DV', name: 'Đơn vị', text: 'Đơn vị', leaf: true }
        ]
    }
});
