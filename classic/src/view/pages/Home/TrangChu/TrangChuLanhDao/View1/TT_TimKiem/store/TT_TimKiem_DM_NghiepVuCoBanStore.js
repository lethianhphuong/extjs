// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_NghiepVuCoBanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_DM_NghiepVuCoBanStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'ma', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'parentCode', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: 'AN', ma: 'AN', name: 'Hệ An ninh'},
        {code: 'CS', ma: 'CS', name: 'Hệ Cảnh sát'},
        {code: 'LV01', name: 'Lĩnh vực mẫu 1', parentCode: 'linhVuc'},
        {code: 'LV02', name: 'Lĩnh vực mẫu 2', parentCode: 'linhVuc'},
        {code: 'LH01', name: 'Loại hình mẫu 1', parentCode: 'loaiHinh'}
    ]
});
