Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoXem.BanDoXem_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BanDoXem_ViewModel',

    data: {
        // Màu riêng của bản đồ này, dạng { id tỉnh: '#màu' }; để trống thì các tỉnh hiện màu nền
        mauTinh: {},
        // Radar quét giữa bản đồ: true = bật khi mở tab
        hienRadar: true,
        // Tỉnh đang chọn: { id, name, fullName, code, region, regionName, color } hoặc null
        tinhDangChon: null
    },

    formulas: {
        tieuDeTinh: function (get) {
            const tinh = get('tinhDangChon');
            return tinh ? Ext.String.htmlEncode(tinh.fullName) : 'Chưa chọn tỉnh';
        },

        moTaTinh: function (get) {
            const tinh = get('tinhDangChon');
            return tinh ? Ext.String.htmlEncode('Mã ' + tinh.code + ', ' + tinh.regionName) : 'Bấm vào một tỉnh trên bản đồ để xem thông tin';
        },

        lopTinhDangChon: function (get) {
            return get('tinhDangChon') ? 'is-active' : '';
        }
    }
});
