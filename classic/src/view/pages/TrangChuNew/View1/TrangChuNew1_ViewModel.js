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
        chiSo: [],
        hieuQuaDtcb: [],
        hieuQuaSuuTra: [],
        lucLuong: [],
        gioiHanDonVi: 10,
        hienMoMoi: true,
        hienKetThuc: true
    },
    //#region NOTE: Dữ liệu hiển thị từ response backend
    formulas: {
        chiSoHienThi: function (get) {
            const me = this;
            const rawList = get('chiSo') || [];

            return rawList.map(function (row) {
                const code = row.code;
                const val = typeof row.val === 'number' ? row.val : 0;
                const typeLech = typeof row.typeLech === 'number' ? row.typeLech : 0;
                const valLech = typeof row.valLech === 'number' ? row.valLech : 0;
                const change = typeLech * valLech;
                const previous = val - change;
                const rate = previous > 0 ? change * 100 / previous : null;
                const sign = change > 0 ? '+' : (change < 0 ? '-' : '');
                const percentSign = rate > 0 ? '+' : '';
                const percentText = rate === null ? '—' : percentSign + me.formatPercent(rate, 1);
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('tongQuan', code);

                return Object.assign({}, row, display, {
                    code: code,
                    val: val,
                    typeLech: typeLech,
                    valLech: valLech,
                    mauIcon: display.mau,
                    giaTriText: me.formatNumber(val),
                    thayDoiText: sign + me.formatNumber(valLech),
                    phanTramText: percentText,
                    xuHuong: typeLech > 0 ? '↑' : (typeLech < 0 ? '↓' : '→'),
                    trangThai: typeLech > 0 ? 'up' : (typeLech < 0 ? 'down' : 'neutral'),
                    laTong: code === 'TONG'
                });
            }).sort((a, b) => a.thuTu - b.thuTu);
        },
        donViDangHienThi: {
            bind: { bindTo: '{donViTopStore}', deep: true },
            get: function (store) {
                return store ? store.getRange().map(function (record, index) {
                    const code = record.get('code');
                    const name = record.get('name');
                    const val = typeof record.get('val') === 'number' ? record.get('val') : 0;
                    const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('donVi', code, index);

                    return Object.assign({}, record.getData(), {
                        code: code,
                        ten: name || display.ten,
                        val: val,
                        mau: display.mau
                    });
                }) : [];
            }
        },
        tongHoSoLucLuong: function (get) {
            return (get('lucLuong') || []).reduce(function (sum, row) {
                return sum + (typeof row.val === 'number' ? row.val : 0);
            }, 0);
        },
        donViHienThi: function (get) {
            const me = this;
            const limit = get('gioiHanDonVi') === 5 ? 5 : 10;
            const rows = get('donViDangHienThi') || [];
            const total = rows.reduce((sum, row) => sum + (row.val || 0), 0);
            const all = get('tongHoSoLucLuong') || (get('lucLuong') || []).reduce(function (sum, row) {
                return sum + (typeof row.val === 'number' ? row.val : 0);
            }, 0);
            const maximum = rows.length ? (rows[0].val || 0) : 0;

            return {
                gioiHan: limit,
                tongSoText: me.formatNumber(total),
                tongQuocGiaText: me.formatNumber(all),
                tyTrongText: me.formatPercent(all ? total * 100 / all : 0, 1),
                items: rows.map(function (row, index) {
                    const val = row.val || 0;

                    return Object.assign({}, row, {
                        thuHang: row.thuHang || (index + 1),
                        soLuongText: me.formatNumber(val),
                        tyLeText: me.formatPercent(total ? val * 100 / total : 0),
                        doDai: maximum ? val * 100 / maximum : 0
                    });
                })
            };
        },
        hieuQuaDtcbHienThi: function (get) {
            const me = this;

            return me.formatConversionData(get('hieuQuaDtcb'), 'hieuQuaDtcb', 'HIEMNGHI');
        },
        hieuQuaSuuTraHienThi: function (get) {
            const me = this;

            return me.formatConversionData(get('hieuQuaSuuTra'), 'hieuQuaSuuTra', 'SL_KQ_B2');
        },
        lucLuongHienThi: function (get) {
            const me = this;
            const rows = get('lucLuong') || [];
            const total = get('tongHoSoLucLuong') || rows.reduce(function (sum, row) {
                return sum + (typeof row.val === 'number' ? row.val : 0);
            }, 0);

            return {
                items: rows.map(function (row, index) {
                    const code = row.code;
                    const name = row.name;
                    const val = typeof row.val === 'number' ? row.val : 0;
                    const percent = total ? val * 100 / total : 0;
                    const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('heLucLuong', code, index);

                    return Object.assign({}, row, display, {
                        code: code,
                        ten: name || display.ten,
                        val: val,
                        tyLe: percent,
                        tyLeText: me.formatPercent(percent, 1),
                        soLuongText: me.formatNumber(val)
                    });
                }).sort((a, b) => b.val - a.val || a.thuTu - b.thuTu),
                tongSoText: me.formatNumber(total),
                soHe: rows.length
            };
        }
    },
    //#endregion

    /** Định dạng số lượng theo giao diện tiếng Việt. */
    formatNumber: function (value) {
        return (value || 0).toLocaleString('vi-VN');
    },

    /** Định dạng tỷ lệ; các card chuyển hóa dùng một chữ số thập phân. */
    formatPercent: function (value, digits = 0) {
        return (value || 0).toLocaleString('vi-VN', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }) + '%';
    },

    /** Định dạng tỷ lệ cho hai card dùng chung template chuyển hóa. */
    formatConversionData: function (rows, group, mainCode) {
        const me = this;
        const list = rows || [];
        const total = list.reduce(function (sum, row) {
            return sum + (typeof row.val === 'number' ? row.val : 0);
        }, 0);
        const main = list.find(row => row.code === mainCode);
        const mainVal = main ? (typeof main.val === 'number' ? main.val : 0) : 0;

        return {
            items: list.map(function (row, index) {
                const code = row.code;
                const name = row.name;
                const val = typeof row.val === 'number' ? row.val : 0;
                const percent = total ? val * 100 / total : 0;
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get(group, code, index);

                return Object.assign({}, row, display, {
                    code: code,
                    ten: name || display.ten,
                    val: val,
                    soLuongText: me.formatNumber(val),
                    tyLe: percent,
                    tyLeText: me.formatPercent(percent, 1)
                });
            }).sort((a, b) => b.val - a.val || a.thuTu - b.thuTu),
            tyLeChinhText: me.formatPercent(total && main ? mainVal * 100 / total : 0, 1)
        };
    },

    stores: {
        trangThaiChartStore: { type: 'trangchunew1trangthai' },
        dienBienChartStore: { type: 'trangchunew1dienbien' },
        donViStore: { type: 'trangchunew1donvi' },
        donViTopStore: {
            type: 'trangchunew1donvitop',
            source: '{donViStore}',
            filters: [{ property: 'thuHang', operator: '<=', value: '{gioiHanDonVi}' }]
        }
    }
});
