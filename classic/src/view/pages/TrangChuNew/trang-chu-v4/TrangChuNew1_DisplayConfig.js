Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig', {
    singleton: true,

    // Tên, icon, token màu và thứ tự hiển thị frontend theo đúng DATA_MOCK
    paletteColors: ['blue', 'amber', 'orange', 'red', 'purple', 'green', 'cyan', 'indigo', 'purple', 'muted'],

    tieuChi: {
        tongQuan: {
            TONG: { ten: 'Tổng số đối tượng', icon: 'folder', mau: 'blue', thuTu: 1 },
            DTCB: { ten: 'ĐTCB', icon: 'search', mau: 'green', thuTu: 2 },
            SUUTRA: { ten: 'Sưu tra', icon: 'clipboard', mau: 'amber', thuTu: 3 },
            HIEMNGHI: { ten: 'Hiềm nghi', icon: 'warning', mau: 'red', thuTu: 4 },
            CHUYENAN: { ten: 'Chuyên án', icon: 'briefcase', mau: 'purple', thuTu: 5 },
            CTVBM: { ten: 'CTVBM', icon: 'users', mau: 'cyan', thuTu: 6 },
            HTBM: { ten: 'HTBM', icon: 'envelope', mau: 'indigo', thuTu: 7 },
            VANV: { ten: 'Vai ảo NV', icon: 'identity', mau: 'muted', thuTu: 8 }
        },
        trangThai: {
            'Đang quản lý': { ten: 'Đang quản lý', nhanTruc: 'Đang\nquản lý', mau: 'blue', thuTu: 1 },
            'Đã kết thúc': { ten: 'Đã kết thúc', nhanTruc: 'Đã\nkết thúc', mau: 'amber', thuTu: 2 },
            'Lập mới': { ten: 'Lập mới', nhanTruc: 'Lập\nmới', mau: 'orange', thuTu: 3 },
            'Chưa có hồ sơ': { ten: 'Chưa có hồ sơ', nhanTruc: 'Chưa có\nhồ sơ', mau: 'red', thuTu: 4 }
        },
        hieuQuaDtcb: {
            HIEMNGHI: { mau: 'blue', thuTu: 1 },
            SUUTRA: { mau: 'amber', thuTu: 2 },
            CHUYENAN: { mau: 'purple', thuTu: 3 },
            CTVBM: { mau: 'cyan', thuTu: 4 },
            HINHSU: { mau: 'red', thuTu: 5 },
            HANHCHINH: { mau: 'orange', thuTu: 6 },
            TGD: { mau: 'green', thuTu: 7 },
            CSCNBB: { mau: 'indigo', thuTu: 8 },
            CSGD: { mau: 'muted', thuTu: 9 },
            VANBAN: { mau: 'blue', thuTu: 10 }
        },
        hieuQuaSuuTra: {
            SL_KQ_B1: { mau: 'blue', thuTu: 1 },
            SL_KQ_B2: { mau: 'amber', thuTu: 2 },
            SL_KQ_B3: { mau: 'purple', thuTu: 3 },
            SL_KQ_B4: { mau: 'red', thuTu: 4 },
            SL_KQ_B5: { mau: 'orange', thuTu: 5 },
            SL_KQ_B6: { mau: 'cyan', thuTu: 6 },
            SL_KQ_B7: { mau: 'green', thuTu: 7 },
            SL_KQ_B8: { mau: 'indigo', thuTu: 8 },
            SL_KQ_B9: { mau: 'muted', thuTu: 9 },
            SL_KQ_B10: { mau: 'muted', thuTu: 10 }
        },
        heLucLuong: {
            '017001': { mau: 'blue', thuTu: 1 },
            '017002': { mau: 'amber', thuTu: 2 },
            '017003': { mau: 'red', thuTu: 3 },
            '017004': { mau: 'cyan', thuTu: 4 },
            '017005': { mau: 'orange', thuTu: 5 },
            '017006': { mau: 'green', thuTu: 6 },
            '017007': { mau: 'indigo', thuTu: 7 },
            '017008': { mau: 'purple', thuTu: 8 },
            '017009': { mau: 'blue', thuTu: 9 },
            '017010': { mau: 'amber', thuTu: 10 },
            '017011': { mau: 'muted', thuTu: 11 },
            '017012': { mau: 'green', thuTu: 12 },
            '017013': { mau: 'cyan', thuTu: 13 },
            '017014': { mau: 'indigo', thuTu: 14 }
        },
        donVi: {
            '500101032': { mau: 'blue', thuTu: 1 },
            '500101030': { mau: 'amber', thuTu: 2 },
            '500101031': { mau: 'orange', thuTu: 3 },
            '500101011': { mau: 'red', thuTu: 4 },
            '500101439': { mau: 'purple', thuTu: 5 },
            '500101033': { mau: 'green', thuTu: 6 },
            '500101400': { mau: 'cyan', thuTu: 7 },
            '500101452': { mau: 'indigo', thuTu: 8 },
            '500101402': { mau: 'purple', thuTu: 9 },
            '500101055': { mau: 'muted', thuTu: 10 }
        }
    },

    /** Trả cấu hình hiển thị; tự động fallback theo palette nếu mã chưa khai báo */
    get: function (group, code, index = 0) {
        const me = this;
        const definitions = me.tieuChi[group] || {};
        const definition = Object.prototype.hasOwnProperty.call(definitions, code) ? definitions[code] : null;

        if (definition) {
            return Object.assign({
                ten: code,
                nhanTruc: code,
                icon: 'identity',
                mau: me.paletteColors[index % me.paletteColors.length],
                thuTu: index + 1
            }, definition);
        }

        return {
            ten: code,
            nhanTruc: code,
            icon: 'identity',
            mau: me.paletteColors[index % me.paletteColors.length],
            thuTu: index + 1
        };
    }
});