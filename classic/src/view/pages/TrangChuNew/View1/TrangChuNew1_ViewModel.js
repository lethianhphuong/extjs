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
        timKiemNangCao: {
            thoiGian: 'Năm 2026',
            tuNgay: null,
            denNgay: null,
            donVi: 'Toàn quốc',
            cucTinh: null,
            loaiHoSo: 'Tất cả',
            heLucLuong: 'Tất cả',
            tinhTrang: 'Tất cả'
        },
        chiSo: [],
        hieuQuaDtcb: [],
        hieuQuaSuuTra: [],
        lucLuong: [],
        namThongKeDonVi: null,
        gioiHanDonVi: 10,
        hienMoMoi: true,
        hienKetThuc: true
    },
    //#region NOTE: Dữ liệu hiển thị từ số liệu minh họa
    formulas: {
        chiSoHienThi: function (get) {
            const me = this;

            return get('chiSo').map(function (row) {
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('tongQuan', row.ma);
                const change = row.thayDoi || 0;
                const previous = row.soLuong - change;
                const rate = previous > 0 ? change * 100 / previous : null;
                const sign = change > 0 ? '+' : '';
                const percentSign = rate > 0 ? '+' : '';
                const percentText = rate === null ? '—' : percentSign + me.formatPercent(rate, 1);

                return Object.assign({}, row, display, {
                    mauIcon: display.mau,
                    giaTriText: me.formatNumber(row.soLuong),
                    thayDoiText: sign + me.formatNumber(change),
                    phanTramText: percentText,
                    xuHuong: change > 0 ? '↑' : change < 0 ? '↓' : '→',
                    trangThai: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
                    laTong: row.ma === 'tongHoSo'
                });
            }).sort((a, b) => a.thuTu - b.thuTu);
        },
        donViDangHienThi: {
            bind: { bindTo: '{donViTopStore}', deep: true },
            get: function (store) {
                return store ? store.getRange().map(function (record) {
                    return Object.assign({}, record.getData(),
                        DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('donVi', record.get('ma')));
                }) : [];
            }
        },
        tongHoSoLucLuong: function (get) {
            return get('lucLuong').reduce((sum, row) => sum + row.soLuong, 0);
        },
        donViHienThi: function (get) {
            const me = this;
            const limit = get('gioiHanDonVi') === 5 ? 5 : 10;
            const rows = get('donViDangHienThi');
            const total = rows.reduce((sum, row) => sum + row.soLuong, 0);
            const all = get('tongHoSoLucLuong');
            const maximum = rows.length ? rows[0].soLuong : 0;

            return {
                nam: get('namThongKeDonVi'),
                gioiHan: limit,
                tongSoText: me.formatNumber(total),
                tongQuocGiaText: me.formatNumber(all),
                tyTrongText: me.formatPercent(all ? total * 100 / all : 0, 1),
                items: rows.map((row, index) => Object.assign({}, row, {
                    thuHang: index + 1,
                    soLuongText: me.formatNumber(row.soLuong),
                    tyLeText: me.formatPercent(total ? row.soLuong * 100 / total : 0),
                    doDai: maximum ? row.soLuong * 100 / maximum : 0
                }))
            };
        },
        hieuQuaDtcbHienThi: function (get) {
            const me = this;

            return me.formatConversionData(get('hieuQuaDtcb'), 'hieuQuaDtcb', 'suuTra');
        },
        hieuQuaSuuTraHienThi: function (get) {
            const me = this;

            return me.formatConversionData(get('hieuQuaSuuTra'), 'hieuQuaSuuTra', 'dtcb');
        },
        lucLuongHienThi: function (get) {
            const me = this;
            const rows = get('lucLuong');
            const total = get('tongHoSoLucLuong');

            return {
                items: rows.map(function (row) {
                    const percent = total ? row.soLuong * 100 / total : 0;
                    const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('heLucLuong', row.ma);

                    return Object.assign({}, row, display, {
                        tyLe: percent,
                        tyLeText: me.formatPercent(percent),
                        soLuongText: me.formatNumber(row.soLuong)
                    });
                }).sort((a, b) => a.thuTu - b.thuTu),
                tongSoText: me.formatNumber(total),
                soHe: rows.length
            };
        }
    },
    //#endregion

    /** Định dạng số lượng theo giao diện tiếng Việt. */
    formatNumber: function (value) {
        return value.toLocaleString('vi-VN');
    },

    /** Định dạng tỷ lệ; các card chuyển hóa dùng một chữ số thập phân. */
    formatPercent: function (value, digits = 0) {
        return value.toLocaleString('vi-VN', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }) + '%';
    },

    /** Định dạng tỷ lệ cho hai card dùng chung template chuyển hóa. */
    formatConversionData: function (rows, group, mainCode) {
        const me = this;
        const total = rows.reduce((sum, row) => sum + row.soLuong, 0);
        const main = rows.find(row => row.ma === mainCode);

        return {
            items: rows.map(function (row) {
                const percent = total ? row.soLuong * 100 / total : 0;
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get(group, row.ma);

                return Object.assign({}, row, display, {
                    tyLe: percent,
                    tyLeText: me.formatPercent(percent, 1)
                });
            }).sort((a, b) => a.thuTu - b.thuTu),
            tyLeChinhText: me.formatPercent(total && main ? main.soLuong * 100 / total : 0, 1)
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
