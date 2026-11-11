Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.trangchunew1',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig',
        'DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_TrangThaiStore',
        'DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_DienBienStore',
        'DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_DonViStore',
        'DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_DonViTopStore'
    ],
    data: {
        anFooterHieuQua: true,
        nhanDoiTuong: { dayDu: 'đối tượng', vietTat: 'ĐT' },
        trangThaiData: [],
        donViData: [],
        chiSo: [],
        hieuQuaDtcb: [],
        hieuQuaSuuTra: [],
        lucLuong: [],
        gioiHanDonVi: 5,
        hienMoMoi: true,
        hienKetThuc: true
    },
    //#region NOTE: Dữ liệu hiển thị từ response backend
    formulas: {
        nhanDoiTuongVietHoa: function (get) {
            const label = get('nhanDoiTuong.dayDu');

            return label.charAt(0).toUpperCase() + label.slice(1);
        },
        chiSoHienThi: function (get) {
            const me = this;
            const label = get('nhanDoiTuong.dayDu');
            const rawList = get('chiSo') || [];

            return rawList
                .map(row => me.formatMetricItem(row, label))
                .sort((a, b) => a.thuTu - b.thuTu);
        },
        trangThaiHienThi: function (get) {
            const me = this;
            const label = get('nhanDoiTuong.dayDu');

            return (get('trangThaiData') || []).map(function (row, index) {
                const display = me.getDisplayConfig('trangThai', row.name, index);

                return Object.assign({}, row, display, {
                    ten: me.formatObjectLabel(display.ten, label),
                    nhanTruc: me.formatObjectLabel(display.nhanTruc, label),
                    nhanDonVi: get('nhanDoiTuong.dayDu')
                });
            }).sort((a, b) => a.thuTu - b.thuTu);
        },
        donViDataHienThi: function (get) {
            const me = this;
            const label = get('nhanDoiTuong.vietTat');

            return (get('donViData') || [])
                .slice()
                .sort((a, b) => b.val - a.val)
                .map(function (row, index) {
                    const display = me.getDisplayConfig('donVi', row.code, index);

                    return Object.assign({}, row, display, {
                        ten: row.name || display.ten,
                        kyHieu: (row.kyHieu || '').trim() || display.kyHieu || row.code,
                        nhanDonVi: label,
                        thuHang: index + 1
                    });
                });
        },
        donViDangHienThi: {
            bind: {
                bindTo: '{donViTopStore}',
                deep: true
            },
            get: function (store) {
                return store ? store.getRange().map(function (record) {
                    return record.getData();
                }) : [];
            }
        },
        donViHienThi: function (get) {
            const me = this;
            const title = get('nhanDoiTuongVietHoa');
            const limit = get('gioiHanDonVi') === 5 ? 5 : 10;
            const rows = get('donViDangHienThi') || [];
            const allRows = get('donViDataHienThi') || [];
            const allTotal = allRows.reduce((sum, row) => sum + (row.val || 0), 0);
            const total = rows.reduce((sum, row) => sum + (row.val || 0), 0);
            const maximum = rows.length ? (rows[0].val || 0) : 0;

            return {
                gioiHan: limit,
                nhanDoiTuong: title,
                tongSoText: me.formatNumber(total),
                nhanDonVi: get('nhanDoiTuong.vietTat'),
                tyLeTongText: me.formatPercent(allTotal ? (total * 100) / allTotal : 0, 1),
                items: rows.map((row, index) => me.formatUnitItem(row, index, total, maximum))
            };
        },
        hieuQuaDtcbHienThi: function (get) {
            const me = this;
            const label = get('nhanDoiTuong.dayDu');

            return me.formatConversionData(get('hieuQuaDtcb'), 'hieuQuaDtcb', label);
        },
        hieuQuaSuuTraHienThi: function (get) {
            const me = this;
            const label = get('nhanDoiTuong.dayDu');

            return me.formatConversionData(get('hieuQuaSuuTra'), 'hieuQuaSuuTra', label);
        },
        lucLuongHienThi: function (get) {
            const me = this;
            const title = get('nhanDoiTuongVietHoa');
            const rows = get('lucLuong') || [];
            const total = rows.reduce(function (sum, row) {
                return sum + (typeof row.val === 'number' ? row.val : 0);
            }, 0);

            return {
                items: rows
                    .map((row, index) => me.formatForceItem(row, index, total))
                    .sort((a, b) => b.val - a.val || a.thuTu - b.thuTu),
                soHe: rows.length,
                tongTyTrongText: me.formatPercent(total ? 100 : 0),
                tongSoText: me.formatNumber(total),
                nhanDonVi: get('nhanDoiTuong.vietTat'),
                nhanDoiTuong: title
            };
        }
    },
    //#endregion

    /** Định dạng từng chỉ số thống kê tổng quan. */
    formatMetricItem: function (row, label) {
        const me = this;
        const code = row.code;
        const val = typeof row.val === 'number' ? row.val : 0;
        const typeLech = typeof row.typeLech === 'number' ? row.typeLech : 0;
        const valLech = typeof row.valLech === 'number' ? row.valLech : 0;
        const display = me.getDisplayConfig('tongQuan', code);
        const trend = me.calculateTrend(val, typeLech, valLech);

        return Object.assign({}, row, display, {
            code: code,
            val: val,
            typeLech: typeLech,
            valLech: valLech,
            ten: me.formatObjectLabel(display.ten, label),
            mauIcon: display.mau,
            giaTriText: me.formatNumber(val),
            thayDoiText: trend.thayDoiText,
            phanTramText: trend.phanTramText,
            xuHuong: trend.xuHuong,
            trangThai: trend.trangThai,
            laTong: code === 'TONG'
        });
    },

    /** Tính toán xu hướng biến động và định dạng dấu không dùng ternary lồng nhau. */
    calculateTrend: function (val, typeLech, valLech) {
        const me = this;
        const change = typeLech * valLech;
        const previous = val - change;
        const rate = previous > 0 ? (change * 100) / previous : null;
        let sign = '';
        let xuHuong = '→';
        let trangThai = 'neutral';

        if (change > 0) {
            sign = '+';
        } else if (change < 0) {
            sign = '-';
        }

        if (typeLech > 0) {
            xuHuong = '↑';
            trangThai = 'up';
        } else if (typeLech < 0) {
            xuHuong = '↓';
            trangThai = 'down';
        }

        const percentSign = rate > 0 ? '+' : '';
        const percentText = rate === null ? '—' : percentSign + me.formatPercent(rate, 1);

        return {
            thayDoiText: sign + me.formatNumber(valLech),
            phanTramText: percentText,
            xuHuong: xuHuong,
            trangThai: trangThai
        };
    },

    /** Định dạng dòng đơn vị cho bảng xếp hạng. */
    formatUnitItem: function (row, index, total, maximum) {
        const me = this;
        const val = row.val || 0;

        return Object.assign({}, row, {
            kyHieu: (row.kyHieu || '').trim() || row.name || row.ten,
            thuHang: row.thuHang || (index + 1),
            soLuongText: me.formatNumber(val),
            tyLeText: me.formatPercent(total ? (val * 100) / total : 0),
            doDai: maximum ? (val * 100) / maximum : 0
        });
    },

    /** Định dạng một dòng hệ lực lượng. */
    formatForceItem: function (row, index, total) {
        const code = row.code;
        const name = row.name;
        const val = typeof row.val === 'number' ? row.val : 0;
        const percent = total ? (val * 100) / total : 0;
        const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('heLucLuong', code, index);

        return Object.assign({}, row, display, {
            code: code,
            ten: name || display.ten,
            val: val,
            tyLe: percent,
            tyLeText: this.formatPercent(percent, 1),
            soLuongText: this.formatNumber(val)
        });
    },

    /** Định dạng một dòng trong thẻ chuyển hóa. */
    formatConversionItem: function (row, group, label, index, total) {
        const me = this;
        const code = row.code;
        const name = row.name;
        const val = typeof row.val === 'number' ? row.val : 0;
        const percent = total ? (val * 100) / total : 0;
        const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get(group, code, index);

        return Object.assign({}, row, display, {
            code: code,
            ten: me.formatObjectLabel(name || display.ten, label),
            val: val,
            soLuongText: me.formatNumber(val),
            tyLe: percent,
            tyLeText: me.formatPercent(percent, 1)
        });
    },

    /** Đầu mối duy nhất tra cấu hình hiển thị cho các formulas. */
    getDisplayConfig: function (group, code, index = 0) {
        return DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get(group, code, index);
    },

    /** Áp dụng thuật ngữ cho nhãn hiển thị, giữ nguyên key tra cứu. */
    formatObjectLabel: function (text, label) {
        return text.replace(/hồ sơ|đối tượng/gi, match => {
            return match.charAt(0) === match.charAt(0).toUpperCase()
                ? label.charAt(0).toUpperCase() + label.slice(1)
                : label;
        });
    },

    /** Định dạng số lượng theo giao diện tiếng Việt. */
    formatNumber: function (value) {
        return (value || 0).toLocaleString('vi-VN');
    },

    /** Định dạng tỷ lệ theo giao diện tiếng Việt. */
    formatPercent: function (value, digits = 0) {
        return (value || 0).toLocaleString('vi-VN', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }) + '%';
    },

    /** Chuẩn bị nhãn và thứ tự cho hai thẻ chuyển hóa. */
    formatConversionData: function (rows, group, label) {
        const me = this;
        const list = rows || [];
        const total = list.reduce(function (sum, row) {
            return sum + (typeof row.val === 'number' ? row.val : 0);
        }, 0);

        return {
            items: list
                .map((row, index) => me.formatConversionItem(row, group, label, index, total))
                .sort((a, b) => b.val - a.val || a.thuTu - b.thuTu),
            tongSoText: me.formatNumber(total),
            tongTyTrongText: me.formatPercent(total ? 100 : 0)
        };
    },

    stores: {
        hieuQuaDtcbTableStore: {
            fields: ['ten', 'soLuongText', 'tyLeText', 'tyLe'],
            data: '{hieuQuaDtcbHienThi.items}'
        },
        hieuQuaSuuTraTableStore: {
            fields: ['ten', 'soLuongText', 'tyLeText', 'tyLe'],
            data: '{hieuQuaSuuTraHienThi.items}'
        },
        lucLuongTableStore: {
            fields: ['ten', 'soLuongText', 'tyLeText', 'tyLe'],
            data: '{lucLuongHienThi.items}'
        },
        trangThaiChartStore: {
            type: 'trangchunew1trangthai',
            data: '{trangThaiHienThi}'
        },
        dienBienChartStore: { type: 'trangchunew1dienbien' },
        donViStore: {
            type: 'trangchunew1donvi',
            data: '{donViDataHienThi}'
        },
        donViTopStore: {
            type: 'trangchunew1donvitop',
            source: '{donViStore}',
            filters: [{ property: 'thuHang', operator: '<=', value: '{gioiHanDonVi}' }]
        }
    }
});
