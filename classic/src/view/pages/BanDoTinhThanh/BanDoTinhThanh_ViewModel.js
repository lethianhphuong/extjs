Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoTinhThanh_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BanDoTinhThanh_ViewModel',

    data: {
        mauDangChon: '#2f86e8',
        soTinhDaTo: 0,
        // Radar quét giữa bản đồ: true = bật khi mở trang
        hienRadar: true
    },

    stores: {
        // Bảng màu tô (màu dữ liệu do người dùng chọn, không phải màu giao diện)
        bangMauStore: {
            fields: ['mau', 'ten'],
            data: [
                { mau: '#f5a524', ten: 'Cam' },
                { mau: '#f26d6d', ten: 'Đỏ hồng' },
                { mau: '#34b04a', ten: 'Xanh lá' },
                { mau: '#2f86e8', ten: 'Xanh dương' },
                { mau: '#a548d6', ten: 'Tím' },
                { mau: '#e8338f', ten: 'Hồng đậm' },
                { mau: '#13a3a0', ten: 'Xanh ngọc' },
                { mau: '#7a5640', ten: 'Nâu' }
            ]
        },

        // 34 tỉnh thành, nạp từ thư viện VnMap trong controller
        tinhThanhStore: {
            fields: [
                'id', 'name', 'region', 'regionName', 'code', 'fullName',
                { name: 'mau', type: 'string', defaultValue: '' },
                { name: 'daTo', type: 'boolean', defaultValue: false }
            ],
            groupField: 'regionName',
            data: []
        }
    }
});
