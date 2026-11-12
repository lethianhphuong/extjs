Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData', {
    singleton: true,

    /**
     * Dữ liệu mock chuẩn hóa 100% theo hợp đồng dữ liệu từ DataView2
     * Khi có API thật, response trả về cấu trúc tương đương với đối tượng này.
     */
    getData: function () {
        return {
            tongQuan: [
                {
                    code: 'DANG_QUAN_LY',
                    name: 'Tổng số hồ sơ đang quản lý',
                    typeLech: 1,
                    val: 256842,
                    valLech: null
                },
                {
                    code: 'LAP_MOI',
                    name: 'Mở mới trong kỳ',
                    typeLech: 1,
                    val: 12436,
                    valLech: 681
                },
                {
                    code: 'DA_KET_THUC',
                    name: 'Kết thúc trong kỳ',
                    typeLech: 1,
                    val: 10978,
                    valLech: 757
                },
                {
                    code: 'CHUYEN_MUC',
                    name: 'Chuyển mức trong kỳ',
                    typeLech: -1,
                    val: 1203,
                    valLech: 26
                },
                { code: 'PER_LAP_MOI', name: 'Phần trăm mở mới trong kỳ', typeLech: 1, val: 552, valLech: 547 },
                { code: 'PER_DA_KET_THUC', name: 'Phần trăm kết thúc trong kỳ', typeLech: 1, val: 16, valLech: 16 }
            ],

            loaiHoSo: [
                { code: 'DTCB', name: 'ĐTCB', val: 9142 },
                { code: 'SUUTRA', name: 'Sưu Tra', val: 4123 },
                { code: 'HIEMNGHI', name: 'Hiềm nghi', val: 2861 },
                { code: 'CHUYENAN', name: 'Chuyên án', val: 1647 },
                { code: 'CTVBM', name: 'CT VBM', val: 511 },
                { code: 'HTBM', name: 'HTBM', val: 342 },
                { code: 'VANV', name: 'VANV', val: 400 },
                { code: 'NNV', name: 'NNV', val: 600 }
            ],

            coCauHoSoTheoDonVi: [
                { capDonVi: 'CUC', val: 547 },
                { capDonVi: 'TINH', val: 9371 },
                { capDonVi: 'XA', val: 2014 }
            ],

            bienDongHoSoTheoDonVi: [
                { code: 202511, cuc: 0, name: 'T 9', nameHover: 'Tháng 9/2025', tinh: 27, xa: 0 },
                { code: 202512, cuc: 0, name: 'T 10', nameHover: 'Tháng 10/2025', tinh: 26, xa: 0 },
                { code: 202601, cuc: 2, name: 'T 11', nameHover: 'Tháng 11/2025', tinh: 141, xa: 5 },
                { code: 202602, cuc: 62, name: 'T 12', nameHover: 'Tháng 12/2025', tinh: 244, xa: 17 },
                { code: 202603, cuc: 32, name: 'T 1', nameHover: 'Tháng 1/2026', tinh: 633, xa: 378 },
                { code: 202604, cuc: 238, name: 'T 2', nameHover: 'Tháng 2/2026', tinh: 1226, xa: 1328 },
                { code: 202605, cuc: 44, name: 'T 3', nameHover: 'Tháng 3/2026', tinh: 125, xa: 29 },
                { code: 202606, cuc: 50, name: 'T 4', nameHover: 'Tháng 4/2026', tinh: 336, xa: 78 },
                { code: 202607, cuc: 22, name: 'T 5', nameHover: 'Tháng 5/2026', tinh: 414, xa: 70 },
                { code: 202608, cuc: 43, name: 'T 6', nameHover: 'Tháng 6/2026', tinh: 259, xa: 31 },
                { code: 202609, cuc: 23, name: 'T 7', nameHover: 'Tháng 7/2026', tinh: 147, xa: 22 },
                { code: 202610, cuc: 6, name: 'T 8', nameHover: 'Tháng 8/2026', tinh: 99, xa: 26 },
                { code: 202611, cuc: 11, name: 'T 9', nameHover: 'Tháng 9/2026', tinh: 62, xa: 20 },
                { code: 202612, cuc: 4, name: 'T 10', nameHover: 'Tháng 10/2026', tinh: 88, xa: 9 }
            ],

            loaiDoiTuong: [
                { code: '029', name: 'Hình sự', val: 972 },
                { code: '030', name: 'Kinh tế', val: 154 },
                { code: '031', name: 'Ma túy', val: 563 },
                { code: '032', name: 'Môi trường', val: 58 },
                { code: '033', name: 'Môi trường 1', val: 48 },
                { code: '034', name: 'Môi trường 2', val: 25 },
                { code: '035', name: 'Môi trường 3', val: 54 },
                { code: '036', name: 'Môi trường 4', val: 45 },
                { code: '037', name: 'Môi trường 5', val: 65 },
                { code: '038', name: 'Môi trường 6', val: 65 },
                { code: '039', name: 'Môi trường 7', val: 65 },
                { code: '040', name: 'Môi trường 8', val: 46 },
                { code: '-1', name: 'Khác', val: 477 }
            ],

            dienBienMoMoiVaKetThuc: [
                { code: 202511, ketThuc: 18, moMoi: 120, name: 'T 11', nameHover: 'Tháng 11/2025' },
                { code: 202512, ketThuc: 25, moMoi: 210, name: 'T 12', nameHover: 'Tháng 12/2025' },
                { code: 202601, ketThuc: 64, moMoi: 1107, name: 'T 1', nameHover: 'Tháng 1/2026' },
                { code: 202602, ketThuc: 164, moMoi: 2956, name: 'T 2', nameHover: 'Tháng 2/2026' },
                { code: 202603, ketThuc: 63, moMoi: 261, name: 'T 3', nameHover: 'Tháng 3/2026' },
                { code: 202604, ketThuc: 33, moMoi: 497, name: 'T 4', nameHover: 'Tháng 4/2026' },
                { code: 202605, ketThuc: 25, moMoi: 531, name: 'T 5', nameHover: 'Tháng 5/2026' },
                { code: 202606, ketThuc: 110, moMoi: 443, name: 'T 6', nameHover: 'Tháng 6/2026' },
                { code: 202607, ketThuc: 94, moMoi: 286, name: 'T 7', nameHover: 'Tháng 7/2026' },
                { code: 202608, ketThuc: 86, moMoi: 217, name: 'T 8', nameHover: 'Tháng 8/2026' },
                { code: 202609, ketThuc: 28, moMoi: 121, name: 'T 9', nameHover: 'Tháng 9/2026' },
                { code: 202610, ketThuc: 40, moMoi: 141, name: 'T 10', nameHover: 'Tháng 10/2026' }
            ],

            tabList: [
                {
                    type: 'cuc',
                    total: 537,
                    list: [
                        {
                            chuyenan: 7,
                            ctvbm: 119,
                            dtcb: 21,
                            hiemnghi: 0,
                            htbm: 2,
                            ketThuc: 0,
                            maDonVi: '100040',
                            moMoi: 155,
                            nnv: 0,
                            suutra: 0,
                            tenDonVi: 'Cục Cảnh sát quản lý trại giam, cở sở giáo dục bắt buộc, trường giáo dưỡng',
                            tongQuanLy: 155,
                            vanv: 6
                        },
                        {
                            chuyenan: 14,
                            ctvbm: 30,
                            dtcb: 28,
                            hiemnghi: 2,
                            htbm: 5,
                            ketThuc: 7,
                            maDonVi: '100055',
                            moMoi: 106,
                            nnv: 3,
                            suutra: 11,
                            tenDonVi: 'Cục Hồ sơ nghiệp vụ',
                            tongQuanLy: 99,
                            vanv: 6
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 18,
                            dtcb: 16,
                            hiemnghi: 6,
                            htbm: 6,
                            ketThuc: 2,
                            maDonVi: '100032',
                            moMoi: 100,
                            nnv: 0,
                            suutra: 51,
                            tenDonVi: 'Cục Cảnh sát điều tra tội phạm về tham nhũng, kinh tế, buôn lậu',
                            tongQuanLy: 98,
                            vanv: 1
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 43,
                            dtcb: 15,
                            hiemnghi: 0,
                            htbm: 14,
                            ketThuc: 0,
                            maDonVi: '100046',
                            moMoi: 72,
                            nnv: 0,
                            suutra: 0,
                            tenDonVi: 'Bộ Tư lệnh Cảnh sát cơ động',
                            tongQuanLy: 72,
                            vanv: 0
                        },
                        {
                            chuyenan: 2,
                            ctvbm: 11,
                            dtcb: 7,
                            hiemnghi: 4,
                            htbm: 5,
                            ketThuc: 4,
                            maDonVi: '100030',
                            moMoi: 43,
                            nnv: 1,
                            suutra: 5,
                            tenDonVi: 'Văn phòng Cơ quan Cảnh sát điều tra',
                            tongQuanLy: 39,
                            vanv: 4
                        }
                    ]
                },
                {
                    type: 'tinh',
                    total: 3774,
                    list: [
                        {
                            chuyenan: 353,
                            ctvbm: 361,
                            dtcb: 297,
                            hiemnghi: 353,
                            htbm: 118,
                            ketThuc: 610,
                            maDonVi: '500101',
                            moMoi: 2647,
                            nnv: 71,
                            suutra: 352,
                            tenDonVi: 'Công an thành phố Hà Nội',
                            tongQuanLy: 2037,
                            vanv: 132
                        },
                        {
                            chuyenan: 7,
                            ctvbm: 216,
                            dtcb: 46,
                            hiemnghi: 5,
                            htbm: 23,
                            ketThuc: 3,
                            maDonVi: '500815',
                            moMoi: 323,
                            nnv: 0,
                            suutra: 9,
                            tenDonVi: 'Công an thành phố Cần Thơ',
                            tongQuanLy: 320,
                            vanv: 14
                        },
                        {
                            chuyenan: 7,
                            ctvbm: 139,
                            dtcb: 34,
                            hiemnghi: 43,
                            htbm: 18,
                            ketThuc: 7,
                            maDonVi: '500215',
                            moMoi: 299,
                            nnv: 0,
                            suutra: 44,
                            tenDonVi: 'Công an tỉnh Thái Nguyên',
                            tongQuanLy: 292,
                            vanv: 7
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 34,
                            dtcb: 99,
                            hiemnghi: 54,
                            htbm: 8,
                            ketThuc: 6,
                            maDonVi: '500703',
                            moMoi: 234,
                            nnv: 0,
                            suutra: 25,
                            tenDonVi: 'Công an tỉnh Lâm Đồng',
                            tongQuanLy: 228,
                            vanv: 8
                        },
                        {
                            chuyenan: 4,
                            ctvbm: 55,
                            dtcb: 25,
                            hiemnghi: 7,
                            htbm: 9,
                            ketThuc: 15,
                            maDonVi: '500409',
                            moMoi: 141,
                            nnv: 0,
                            suutra: 16,
                            tenDonVi: 'Công an tỉnh Quảng Trị',
                            tongQuanLy: 126,
                            vanv: 10
                        }
                    ]
                },
                {
                    type: 'xa',
                    total: 2013,
                    list: [
                        {
                            chuyenan: 1,
                            ctvbm: 17,
                            dtcb: 33,
                            hiemnghi: 36,
                            htbm: 6,
                            ketThuc: 2,
                            maDonVi: '500117400',
                            moMoi: 151,
                            nnv: 0,
                            suutra: 32,
                            tenDonVi: 'Công an xã Gia Viễn',
                            tongQuanLy: 149,
                            vanv: 24
                        },
                        {
                            chuyenan: 1,
                            ctvbm: 7,
                            dtcb: 13,
                            hiemnghi: 1,
                            htbm: 3,
                            ketThuc: 2,
                            maDonVi: '500101439',
                            moMoi: 29,
                            nnv: 0,
                            suutra: 1,
                            tenDonVi: 'Công an phường Long Biên',
                            tongQuanLy: 27,
                            vanv: 1
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 11,
                            dtcb: 2,
                            hiemnghi: 4,
                            htbm: 2,
                            ketThuc: 0,
                            maDonVi: '500703470',
                            moMoi: 23,
                            nnv: 0,
                            suutra: 1,
                            tenDonVi: 'Công an xã Hòa Thắng',
                            tongQuanLy: 23,
                            vanv: 3
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 10,
                            dtcb: 2,
                            hiemnghi: 3,
                            htbm: 1,
                            ketThuc: 2,
                            maDonVi: '500815417',
                            moMoi: 25,
                            nnv: 0,
                            suutra: 5,
                            tenDonVi: 'Công an xã Nhơn Ái',
                            tongQuanLy: 23,
                            vanv: 2
                        },
                        {
                            chuyenan: 0,
                            ctvbm: 1,
                            dtcb: 3,
                            hiemnghi: 5,
                            htbm: 0,
                            ketThuc: 0,
                            maDonVi: '500703456',
                            moMoi: 21,
                            nnv: 0,
                            suutra: 12,
                            tenDonVi: 'Công an phường La Gi',
                            tongQuanLy: 21,
                            vanv: 0
                        }
                    ]
                }
            ]
        };
    }
});
