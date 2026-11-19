Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoSaBan.BanDoSaBan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BanDoSaBan_ViewModel',

    data: {
        // Tên chỉ số đang hiển thị thành chiều cao khối
        tenChiSo: 'Số hồ sơ',
        // Số liệu MẪU theo mã hành chính tỉnh; sau này thay bằng dữ liệu từ API
        soLieu: {
            '01': 1350, '04': 110, '08': 260, '11': 120, '12': 90, '14': 240, '15': 230, '19': 310,
            '20': 180, '22': 380, '24': 560, '25': 520, '31': 620, '33': 470, '37': 430, '38': 640,
            '40': 610, '42': 290, '44': 330, '46': 300, '48': 540, '51': 420, '52': 450, '56': 480,
            '66': 440, '68': 500, '75': 700, '79': 1480, '80': 520, '82': 470, '86': 460, '91': 510,
            '92': 490, '96': 280
        },
        // Góc nhìn: bearing = góc xoay (độ), tilt = độ nghiêng (1 = nhìn thẳng từ trên xuống)
        gocXoay: -18,
        doNghieng: 0.58,
        // Tỉnh đang chọn: { id, code, name, fullName, value } hoặc null
        tinhDangChon: null
    },

    formulas: {
        tieuDeTinh: function (get) {
            const tinh = get('tinhDangChon');
            return tinh ? Ext.String.htmlEncode(tinh.fullName) : 'Chưa chọn tỉnh';
        },

        moTaTinh: function (get) {
            const tinh = get('tinhDangChon');
            if (!tinh) return 'Bấm vào một tỉnh để xem ' + get('tenChiSo').toLowerCase() + ' (dữ liệu mẫu)';
            return Ext.String.htmlEncode(get('tenChiSo') + ': ' + Ext.util.Format.number(tinh.value, '0,000') + ' (dữ liệu mẫu)');
        },

        lopTinhDangChon: function (get) {
            return get('tinhDangChon') ? 'is-active' : '';
        }
    }
});
