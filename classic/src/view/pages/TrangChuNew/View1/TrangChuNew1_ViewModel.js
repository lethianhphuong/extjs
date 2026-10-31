Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.trangchunew1',
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
        // Số liệu KPI minh họa theo thiết kế, chưa kết nối API.
        chiSo: [
            { ma: 'tongHoSo', ten: 'Tổng số hồ sơ', giaTri: 12568, thayDoi: 342, icon: 'folder', mauIcon: 'blue' },
            { ma: 'dtcb', ten: 'ĐTCB', giaTri: 9142, thayDoi: 185, icon: 'search', mauIcon: 'green' },
            { ma: 'suuTra', ten: 'Sưu tra', giaTri: 4123, thayDoi: 64, icon: 'clipboard', mauIcon: 'amber' },
            { ma: 'hiemNghi', ten: 'Hiềm nghi', giaTri: 2861, thayDoi: -38, icon: 'warning', mauIcon: 'red' },
            { ma: 'chuyenAn', ten: 'Chuyên án', giaTri: 1647, thayDoi: 12, icon: 'briefcase', mauIcon: 'purple' },
            { ma: 'ctvbm', ten: 'CTVBM', giaTri: 511, thayDoi: 19, icon: 'users', mauIcon: 'cyan' },
            { ma: 'htbm', ten: 'HTBM', giaTri: 3420, thayDoi: -15, icon: 'envelope', mauIcon: 'indigo' },
            { ma: 'vaiAo', ten: 'Vai ảo NV', giaTri: 3426, thayDoi: 52, icon: 'identity', mauIcon: 'muted' }
        ],
        chuyenHoa: [
            { tenDtcb: 'ĐTCB → Sưu tra', tenSuuTra: 'Sưu tra → ĐTCB', tyLe: 72.7, mau: 'blue' },
            { tenDtcb: 'ĐTCB → Hiềm nghi', tenSuuTra: 'Sưu tra → Hiềm nghi', tyLe: 20.1, mau: 'amber' },
            { tenDtcb: 'ĐTCB → Chuyên án', tenSuuTra: 'Sưu tra → Chuyên án', tyLe: 5.2, mau: 'purple' },
            { tenDtcb: 'Chờ đánh giá', tenSuuTra: 'Chờ đánh giá', tyLe: 2, mau: 'muted' }
        ],
        lucLuong: [
            { ten: 'Trật tự xã hội', soLuong: 3482, mau: 'blue' },
            { ten: 'Ma túy', soLuong: 2156, mau: 'amber' },
            { ten: 'Kinh tế', soLuong: 1042, mau: 'cyan' },
            { ten: 'Môi trường', soLuong: 928, mau: 'green' },
            { ten: 'Khác', soLuong: 683, mau: 'muted' }
        ],
        namThongKeDonVi: 2026,
        gioiHanDonVi: 10,
        thongKeDonVi: [
            { ten: 'CA TP Hà Nội', soLuong: 1242, mau: 'blue' },
            { ten: 'CA TP HCM', soLuong: 1087, mau: 'amber' },
            { ten: 'CA tỉnh Thanh Hóa', soLuong: 685, mau: 'orange' },
            { ten: 'CA tỉnh Nghệ An', soLuong: 592, mau: 'red' },
            { ten: 'CA tỉnh Đồng Nai', soLuong: 518, mau: 'purple' },
            { ten: 'CA tỉnh Bình Dương', soLuong: 452, mau: 'green' },
            { ten: 'CA tỉnh Quảng Ninh', soLuong: 401, mau: 'cyan' },
            { ten: 'CA TP Hải Phòng', soLuong: 378, mau: 'indigo' },
            { ten: 'CA tỉnh Đắk Lắk', soLuong: 312, mau: 'purple' },
            { ten: 'CA TP Cần Thơ', soLuong: 282, mau: 'muted' }
        ],
        hienMoMoi: true,
        hienKetThuc: true,
        dienBienThang: [
            {
                ky: 'T1',
                moMoi: 250,
                ketThuc: 175
            },
            {
                ky: 'T2',
                moMoi: 350,
                ketThuc: 200
            },
            {
                ky: 'T3',
                moMoi: 500,
                ketThuc: 275
            },
            {
                ky: 'T4',
                moMoi: 375,
                ketThuc: 325
            },
            {
                ky: 'T5',
                moMoi: 490,
                ketThuc: 375
            },
            {
                ky: 'T6',
                moMoi: 500,
                ketThuc: 375
            },
            {
                ky: 'T7',
                moMoi: 550,
                ketThuc: 375
            },
            {
                ky: 'T8',
                moMoi: 490,
                ketThuc: 390
            },
            {
                ky: 'T9',
                moMoi: 700,
                ketThuc: 510
            },
            {
                ky: 'T10',
                moMoi: 575,
                ketThuc: 450
            },
            {
                ky: 'T11',
                moMoi: 475,
                ketThuc: 375
            },
            {
                ky: 'T12',
                moMoi: 425,
                ketThuc: 350
            }
        ]
    },
    //#region NOTE: Dữ liệu hiển thị từ số liệu minh họa
    formulas: {
        chiSoHienThi: function (get) {
            const me = this;

            return get('chiSo').map(function (row) {
                const previous = row.giaTri - row.thayDoi;
                const rate = previous > 0 ? row.thayDoi * 100 / previous : null;
                const sign = row.thayDoi > 0 ? '+' : '';
                const percentSign = rate > 0 ? '+' : '';
                const percentText = rate === null ? '—' : percentSign + me.formatPercent(rate, 1);

                return Object.assign({}, row, {
                    giaTriText: me.formatNumber(row.giaTri),
                    thayDoiText: sign + me.formatNumber(row.thayDoi),
                    phanTramText: percentText,
                    xuHuong: row.thayDoi > 0 ? '↑' : row.thayDoi < 0 ? '↓' : '→',
                    trangThai: row.thayDoi > 0 ? 'up' : row.thayDoi < 0 ? 'down' : 'neutral',
                    laTong: row.ma === 'tongHoSo'
                });
            });
        },
        donViXepHang: function (get) {
            return get('thongKeDonVi').slice().sort((a, b) => b.soLuong - a.soLuong);
        },
        tongHoSoLucLuong: function (get) {
            return get('lucLuong').reduce((sum, row) => sum + row.soLuong, 0);
        },
        donViHienThi: function (get) {
            const me = this;
            const limit = get('gioiHanDonVi') === 5 ? 5 : 10;
            const rows = get('donViXepHang').slice(0, limit);
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
        chuyenHoaHienThi: function (get) {
            const me = this;
            const rows = get('chuyenHoa');

            return {
                dtcbItems: me.formatConversionRows(rows, 'tenDtcb'),
                suuTraItems: me.formatConversionRows(rows, 'tenSuuTra'),
                tyLeChinhText: me.formatPercent(rows.length ? rows[0].tyLe : 0, 1)
            };
        },
        lucLuongHienThi: function (get) {
            const me = this;
            const rows = get('lucLuong');
            const total = get('tongHoSoLucLuong');

            return {
                items: rows.map(function (row) {
                    const percent = total ? row.soLuong * 100 / total : 0;

                    return Object.assign({}, row, {
                        tyLe: percent,
                        tyLeText: me.formatPercent(percent),
                        soLuongText: me.formatNumber(row.soLuong)
                    });
                }),
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

    /** Chuẩn hóa tên chỉ tiêu để hai card dùng cùng một template. */
    formatConversionRows: function (rows, nameField) {
        const me = this;

        return rows.map(row => ({
            ten: row[nameField],
            tyLe: row.tyLe,
            mau: row.mau,
            tyLeText: me.formatPercent(row.tyLe, 1)
        }));
    },

    stores: {
        donViChartStore: {
            fields: [
                { name: 'ten', type: 'string' },
                { name: 'soLuong', type: 'int' },
                { name: 'mau', type: 'string' },
                { name: 'tyLeText', type: 'string' }
            ],
            data: '{donViHienThi.items}'
        },
        trangThaiChartStore: {
            fields: [
                {
                    name: 'ten',
                    type: 'string'
                },
                {
                    name: 'soLuong',
                    type: 'int'
                }
            ],
            data: [
                {
                    ten: 'Đang quản lý',
                    soLuong: 4123
                },
                {
                    ten: 'Đã kết thúc',
                    soLuong: 2861
                },
                {
                    ten: 'Lập mới',
                    soLuong: 1647
                },
                {
                    ten: 'Chưa có số HS',
                    soLuong: 511
                }
            ]
        },
        dienBienChartStore: {
            fields: [
                {
                    name: 'ky',
                    type: 'string'
                },
                {
                    name: 'moMoi',
                    type: 'int'
                },
                {
                    name: 'ketThuc',
                    type: 'int'
                }
            ],
            data: '{dienBienThang}'
        }
    }
});
