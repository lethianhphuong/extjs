// Dữ liệu giả phục vụ demo, không gọi API.
Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.store.TT_TimKiem_Ds_DonViStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TT_TimKiem_Ds_DonViStore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'maHeLucLuong', type: 'string'},
        {name: 'parentCode', type: 'string'}
    ],
    proxy: { type: 'memory' },
    data: [
        {code: '500001', name: 'Tỉnh mẫu A'},
        {code: '500002', name: 'Tỉnh mẫu B'},
        {code: '100001', name: 'Cục mẫu A', maHeLucLuong: 'AN'},
        {code: '100002', name: 'Cục mẫu B', maHeLucLuong: 'CS'},
        {code: '500001001', name: 'Phòng mẫu 1 - Tỉnh mẫu A', parentCode: '500001'},
        {code: '500001002', name: 'Phòng mẫu 2 - Tỉnh mẫu A', parentCode: '500001'},
        {code: '500002001', name: 'Phòng mẫu 1 - Tỉnh mẫu B', parentCode: '500002'},
        {code: '500002002', name: 'Phòng mẫu 2 - Tỉnh mẫu B', parentCode: '500002'},
        {code: '100001001', name: 'Phòng mẫu 1 - Cục mẫu A', parentCode: '100001'},
        {code: '100001002', name: 'Phòng mẫu 2 - Cục mẫu A', parentCode: '100001'},
        {code: '100002001', name: 'Phòng mẫu 1 - Cục mẫu B', parentCode: '100002'},
        {code: '100002002', name: 'Phòng mẫu 2 - Cục mẫu B', parentCode: '100002'},
        {code: '500001001001', name: 'Đội mẫu 1 - Phòng 1', parentCode: '500001001'},
        {code: '500001001002', name: 'Đội mẫu 2 - Phòng 1', parentCode: '500001001'},
        {code: '500001002001', name: 'Đội mẫu 1 - Phòng 2', parentCode: '500001002'},
        {code: '500001002002', name: 'Đội mẫu 2 - Phòng 2', parentCode: '500001002'},
        {code: '500002001001', name: 'Đội mẫu 1 - Phòng 1', parentCode: '500002001'},
        {code: '500002001002', name: 'Đội mẫu 2 - Phòng 1', parentCode: '500002001'},
        {code: '500002002001', name: 'Đội mẫu 1 - Phòng 2', parentCode: '500002002'},
        {code: '500002002002', name: 'Đội mẫu 2 - Phòng 2', parentCode: '500002002'},
        {code: '100001001001', name: 'Đội mẫu 1 - Phòng 1', parentCode: '100001001'},
        {code: '100001001002', name: 'Đội mẫu 2 - Phòng 1', parentCode: '100001001'},
        {code: '100001002001', name: 'Đội mẫu 1 - Phòng 2', parentCode: '100001002'},
        {code: '100001002002', name: 'Đội mẫu 2 - Phòng 2', parentCode: '100001002'},
        {code: '100002001001', name: 'Đội mẫu 1 - Phòng 1', parentCode: '100002001'},
        {code: '100002001002', name: 'Đội mẫu 2 - Phòng 1', parentCode: '100002001'},
        {code: '100002002001', name: 'Đội mẫu 1 - Phòng 2', parentCode: '100002002'},
        {code: '100002002002', name: 'Đội mẫu 2 - Phòng 2', parentCode: '100002002'}
    ]
});
