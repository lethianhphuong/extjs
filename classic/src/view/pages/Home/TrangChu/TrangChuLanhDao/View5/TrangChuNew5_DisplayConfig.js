Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_DisplayConfig', {
    singleton: true,
    // Mã biểu đồ View5 theo dataKey của chart — gửi lên API danh sách hồ sơ (maThongKe) khi click
    maBieuDo: {
        tongQuan: 'D5_C01',
        loaiHoSo: 'D5_C02',
        bienDongHoSoTheoDonVi: 'D5_C04',
        dienBienMoMoiVaKetThuc: 'D5_C07',
        bienDongHoSoTheoCapDonVi: 'D5_C05',
        capXa: 'D5_C06',
        dienBienMoMoiVaKetThucLucLuong: 'D5_C08'
    },
    // Biểu đồ có code là kỳ báo cáo (YYYYKK): khi click gửi thêm fromDate / toDate của kỳ
    maBieuDoTheoKy: ['D5_C05', 'D5_C07', 'D5_C08'],
    groups: {
        chiSo: {
            DANG_QUAN_LY: { icon: 'folder', mau: 'blue', thuTu: 1 },
            LAP_MOI: { icon: 'plus', mau: 'green', thuTu: 2 },
            DA_KET_THUC: { icon: 'check', mau: 'purple', thuTu: 3 },
            CHUYEN_MUC: { icon: 'exchange-alt', mau: 'orange', thuTu: 4 },
            PER_LAP_MOI: { icon: 'chart-line', mau: 'cyan', thuTu: 5 },
            PER_DA_KET_THUC: { icon: 'history', mau: 'indigo', thuTu: 6 },
            SAP_DEN_HAN: { icon: 'clock', mau: 'orange', thuTu: 7 },
            QUA_HAN: { icon: 'exclamation-triangle', mau: 'red', thuTu: 8 }
        },
        // Biểu đồ "Số lượng hồ sơ theo 8 loại hồ sơ": name là nhãn trục ngắn, mau là màu cột
        loaiHoSo: {
            DTCB: { name: 'ĐTCB', icon: 'file-alt', mau: 'green', thuTu: 1 },
            SUUTRA: { name: 'Sưu tra', icon: 'clipboard', mau: 'amber', thuTu: 2 },
            HIEMNGHI: { name: 'Hiềm nghi', icon: 'exclamation-triangle', mau: 'red', thuTu: 3 },
            CHUYENAN: { name: 'Chuyên án', icon: 'briefcase', mau: 'purple', thuTu: 4 },
            CTVBM: { name: 'CTVBM', icon: 'users', mau: 'cyan', thuTu: 5 },
            HTBM: { name: 'HTBM', icon: 'envelope', mau: 'indigo', thuTu: 6 },
            VANV: { name: 'Vai ảo NV', icon: 'id-card', mau: 'violet', thuTu: 7 },
            NNV: { name: 'Nhà nghiệp vụ', icon: 'home', mau: 'pink', thuTu: 8 }
        },
        // Hệ lực lượng: tên hiển thị lấy từ data (trường name), cấu hình FE chỉ giữ màu và thứ tự
        lucLuong: {
            DTCB: { mau: 'blue', thuTu: 1 },
            SUUTRA: { mau: 'green', thuTu: 2 },
            HIEMNGHI: { mau: 'amber', thuTu: 3 },
            CHUYENAN: { mau: 'orange', thuTu: 4 },
            CTVBM: { mau: 'violet', thuTu: 5 },
            HTBM: { mau: 'pink', thuTu: 6 },
            VANV: { mau: 'cyan', thuTu: 7 },
            NNV: { mau: 'muted', thuTu: 8 }
        }
    },
    /** Tra cấu hình bằng mã ổn định, không phụ thuộc vị trí response. */
    get: function (group, code) {
        const me = this;
        return (me.groups[group] || {})[code] || { mau: 'muted', icon: 'file-alt', thuTu: 999 };
    }
});
