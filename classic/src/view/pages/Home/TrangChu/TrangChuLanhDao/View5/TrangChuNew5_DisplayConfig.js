Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_DisplayConfig', {
    singleton: true,
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
        donVi: {
            P1: { mau: 'blue', thuTu: 1 },
            P2: { mau: 'indigo', thuTu: 2 },
            P3: { mau: 'cyan', thuTu: 3 },
            P4: { mau: 'purple', thuTu: 4 },
            P5: { mau: 'muted', thuTu: 5 }
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
