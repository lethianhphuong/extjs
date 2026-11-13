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
                { code: 'DTCB', name: 'ĐTCB', val: 3000 },
                { code: 'SUUTRA', name: 'Sưu Tra', val: 4123 },
                { code: 'HIEMNGHI', name: 'Hiềm nghi', val: 2861 },
                { code: 'CHUYENAN', name: 'Chuyên án', val: 1647 },
                { code: 'CTVBM', name: 'CT VBM', val: 6555 },
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
                {
                    "code": 20251215,
                    "cuc": 1,
                    "name": "15",
                    "nameHover": "15/12",
                    "tinh": 11,
                    "xa": 1
                },
                {
                    "code": 20251216,
                    "cuc": 0,
                    "name": "16",
                    "nameHover": "16/12",
                    "tinh": 13,
                    "xa": 0
                },
                {
                    "code": 20251217,
                    "cuc": 0,
                    "name": "17",
                    "nameHover": "17/12",
                    "tinh": 12,
                    "xa": 0
                },
                {
                    "code": 20251218,
                    "cuc": 2,
                    "name": "18",
                    "nameHover": "18/12",
                    "tinh": 20,
                    "xa": 0
                },
                {
                    "code": 20251219,
                    "cuc": 0,
                    "name": "19",
                    "nameHover": "19/12",
                    "tinh": 18,
                    "xa": 0
                },
                {
                    "code": 20251220,
                    "cuc": 0,
                    "name": "20",
                    "nameHover": "20/12",
                    "tinh": 1,
                    "xa": 0
                },
                {
                    "code": 20251221,
                    "cuc": 1,
                    "name": "21",
                    "nameHover": "21/12",
                    "tinh": 0,
                    "xa": 0
                },
                {
                    "code": 20251222,
                    "cuc": 0,
                    "name": "22",
                    "nameHover": "22/12",
                    "tinh": 12,
                    "xa": 0
                },
                {
                    "code": 20251223,
                    "cuc": 3,
                    "name": "23",
                    "nameHover": "23/12",
                    "tinh": 32,
                    "xa": 0
                },
                {
                    "code": 20251224,
                    "cuc": 9,
                    "name": "24",
                    "nameHover": "24/12",
                    "tinh": 88,
                    "xa": 1
                },
                {
                    "code": 20251225,
                    "cuc": 1,
                    "name": "25",
                    "nameHover": "25/12",
                    "tinh": 19,
                    "xa": 0
                },
                {
                    "code": 20251226,
                    "cuc": 1,
                    "name": "26",
                    "nameHover": "26/12",
                    "tinh": 66,
                    "xa": 0
                },
                {
                    "code": 20251227,
                    "cuc": 1,
                    "name": "27",
                    "nameHover": "27/12",
                    "tinh": 10,
                    "xa": 0
                },
                {
                    "code": 20251228,
                    "cuc": 0,
                    "name": "28",
                    "nameHover": "28/12",
                    "tinh": 0,
                    "xa": 0
                },
                {
                    "code": 20251229,
                    "cuc": 0,
                    "name": "29",
                    "nameHover": "29/12",
                    "tinh": 13,
                    "xa": 0
                },
                {
                    "code": 20251230,
                    "cuc": 0,
                    "name": "30",
                    "nameHover": "30/12",
                    "tinh": 8,
                    "xa": 2
                },
                {
                    "code": 20251231,
                    "cuc": 1,
                    "name": "31",
                    "nameHover": "31/12",
                    "tinh": 7,
                    "xa": 0
                },
                {
                    "code": 20260101,
                    "cuc": 0,
                    "name": "01",
                    "nameHover": "1/01",
                    "tinh": 2,
                    "xa": 2
                },
                {
                    "code": 20260102,
                    "cuc": 0,
                    "name": "02",
                    "nameHover": "2/01",
                    "tinh": 2,
                    "xa": 0
                },
                {
                    "code": 20260103,
                    "cuc": 0,
                    "name": "03",
                    "nameHover": "3/01",
                    "tinh": 2,
                    "xa": 1
                },
                {
                    "code": 20260104,
                    "cuc": 0,
                    "name": "04",
                    "nameHover": "4/01",
                    "tinh": 1,
                    "xa": 0
                },
                {
                    "code": 20260105,
                    "cuc": 0,
                    "name": "05",
                    "nameHover": "5/01",
                    "tinh": 18,
                    "xa": 0
                },
                {
                    "code": 20260106,
                    "cuc": 1,
                    "name": "06",
                    "nameHover": "6/01",
                    "tinh": 18,
                    "xa": 9
                },
                {
                    "code": 20260107,
                    "cuc": 5,
                    "name": "07",
                    "nameHover": "7/01",
                    "tinh": 26,
                    "xa": 9
                },
                {
                    "code": 20260108,
                    "cuc": 3,
                    "name": "08",
                    "nameHover": "8/01",
                    "tinh": 14,
                    "xa": 4
                },
                {
                    "code": 20260109,
                    "cuc": 0,
                    "name": "09",
                    "nameHover": "9/01",
                    "tinh": 135,
                    "xa": 1
                },
                {
                    "code": 20260110,
                    "cuc": 0,
                    "name": "10",
                    "nameHover": "10/01",
                    "tinh": 15,
                    "xa": 0
                },
                {
                    "code": 20260111,
                    "cuc": 0,
                    "name": "11",
                    "nameHover": "11/01",
                    "tinh": 4,
                    "xa": 0
                },
                {
                    "code": 20260112,
                    "cuc": 0,
                    "name": "12",
                    "nameHover": "12/01",
                    "tinh": 21,
                    "xa": 185
                },
                {
                    "code": 20260113,
                    "cuc": 1,
                    "name": "13",
                    "nameHover": "13/01",
                    "tinh": 20,
                    "xa": 163
                },
                {
                    "code": 20260114,
                    "cuc": 2,
                    "name": "14",
                    "nameHover": "14/01",
                    "tinh": 25,
                    "xa": 0
                }
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
                {
                    "code": 20251215,
                    "ketThuc": 0,
                    "moMoi": 13,
                    "name": "15",
                    "nameHover": "15/12"
                },
                {
                    "code": 20251216,
                    "ketThuc": 0,
                    "moMoi": 13,
                    "name": "16",
                    "nameHover": "16/12"
                },
                {
                    "code": 20251217,
                    "ketThuc": 0,
                    "moMoi": 12,
                    "name": "17",
                    "nameHover": "17/12"
                },
                {
                    "code": 20251218,
                    "ketThuc": 5,
                    "moMoi": 27,
                    "name": "18",
                    "nameHover": "18/12"
                },
                {
                    "code": 20251219,
                    "ketThuc": 1,
                    "moMoi": 19,
                    "name": "19",
                    "nameHover": "19/12"
                },
                {
                    "code": 20251220,
                    "ketThuc": 0,
                    "moMoi": 1,
                    "name": "20",
                    "nameHover": "20/12"
                },
                {
                    "code": 20251221,
                    "ketThuc": 0,
                    "moMoi": 1,
                    "name": "21",
                    "nameHover": "21/12"
                },
                {
                    "code": 20251222,
                    "ketThuc": 1,
                    "moMoi": 13,
                    "name": "22",
                    "nameHover": "22/12"
                },
                {
                    "code": 20251223,
                    "ketThuc": 2,
                    "moMoi": 37,
                    "name": "23",
                    "nameHover": "23/12"
                },
                {
                    "code": 20251224,
                    "ketThuc": 6,
                    "moMoi": 104,
                    "name": "24",
                    "nameHover": "24/12"
                },
                {
                    "code": 20251225,
                    "ketThuc": 0,
                    "moMoi": 20,
                    "name": "25",
                    "nameHover": "25/12"
                },
                {
                    "code": 20251226,
                    "ketThuc": 8,
                    "moMoi": 75,
                    "name": "26",
                    "nameHover": "26/12"
                },
                {
                    "code": 20251227,
                    "ketThuc": 0,
                    "moMoi": 11,
                    "name": "27",
                    "nameHover": "27/12"
                },
                {
                    "code": 20251228,
                    "ketThuc": 0,
                    "moMoi": 0,
                    "name": "28",
                    "nameHover": "28/12"
                },
                {
                    "code": 20251229,
                    "ketThuc": 1,
                    "moMoi": 14,
                    "name": "29",
                    "nameHover": "29/12"
                },
                {
                    "code": 20251230,
                    "ketThuc": 1,
                    "moMoi": 11,
                    "name": "30",
                    "nameHover": "30/12"
                },
                {
                    "code": 20251231,
                    "ketThuc": 1,
                    "moMoi": 9,
                    "name": "31",
                    "nameHover": "31/12"
                },
                {
                    "code": 20260101,
                    "ketThuc": 0,
                    "moMoi": 4,
                    "name": "01",
                    "nameHover": "1/01"
                },
                {
                    "code": 20260102,
                    "ketThuc": 0,
                    "moMoi": 2,
                    "name": "02",
                    "nameHover": "2/01"
                },
                {
                    "code": 20260103,
                    "ketThuc": 0,
                    "moMoi": 3,
                    "name": "03",
                    "nameHover": "3/01"
                },
                {
                    "code": 20260104,
                    "ketThuc": 0,
                    "moMoi": 1,
                    "name": "04",
                    "nameHover": "4/01"
                },
                {
                    "code": 20260105,
                    "ketThuc": 1,
                    "moMoi": 19,
                    "name": "05",
                    "nameHover": "5/01"
                },
                {
                    "code": 20260106,
                    "ketThuc": 4,
                    "moMoi": 32,
                    "name": "06",
                    "nameHover": "6/01"
                },
                {
                    "code": 20260107,
                    "ketThuc": 5,
                    "moMoi": 45,
                    "name": "07",
                    "nameHover": "7/01"
                },
                {
                    "code": 20260108,
                    "ketThuc": 3,
                    "moMoi": 24,
                    "name": "08",
                    "nameHover": "8/01"
                },
                {
                    "code": 20260109,
                    "ketThuc": 8,
                    "moMoi": 144,
                    "name": "09",
                    "nameHover": "9/01"
                },
                {
                    "code": 20260110,
                    "ketThuc": 5,
                    "moMoi": 20,
                    "name": "10",
                    "nameHover": "10/01"
                },
                {
                    "code": 20260111,
                    "ketThuc": 0,
                    "moMoi": 4,
                    "name": "11",
                    "nameHover": "11/01"
                },
                {
                    "code": 20260112,
                    "ketThuc": 3,
                    "moMoi": 209,
                    "name": "12",
                    "nameHover": "12/01"
                },
                {
                    "code": 20260113,
                    "ketThuc": 4,
                    "moMoi": 188,
                    "name": "13",
                    "nameHover": "13/01"
                },
                {
                    "code": 20260114,
                    "ketThuc": 5,
                    "moMoi": 32,
                    "name": "14",
                    "nameHover": "14/01"
                }
            ],

            // Danh sách hồ sơ hiển thị ở grid DS_Hoso_GridView3 khi click biểu đồ (mock 1 danh sách dùng chung)
            danhSachHoSo: [
                { id: 1, maHoSo: 'HS-2026-0001', loaiHoSoCode: 'DTCB', tenLoaiHoSo: 'ĐTCB', ngayDuaVaoQuanLy: '2026-01-08', trangThaiCode: 'KET_THUC', trangThai: 'Đã kết thúc', tenDoiTuong: 'Vũ Minh Sơn' },
                { id: 2, maHoSo: 'HS-2026-0002', loaiHoSoCode: 'SUUTRA', tenLoaiHoSo: 'Sưu tra', ngayDuaVaoQuanLy: '2026-01-15', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Dương Quang Lan' },
                { id: 3, maHoSo: 'HS-2026-0003', loaiHoSoCode: 'HIEMNGHI', tenLoaiHoSo: 'Hiềm nghi', ngayDuaVaoQuanLy: '2026-01-22', trangThaiCode: 'QUA_HAN', trangThai: 'Quá hạn', tenDoiTuong: 'Phạm Thị Bích' },
                { id: 4, maHoSo: 'HS-2026-0004', loaiHoSoCode: 'CHUYENAN', tenLoaiHoSo: 'Chuyên án', ngayDuaVaoQuanLy: '2026-02-02', trangThaiCode: 'CHUYEN_MUC', trangThai: 'Chuyển mức', tenDoiTuong: 'Đỗ Đức Tâm' },
                { id: 5, maHoSo: 'HS-2026-0005', loaiHoSoCode: 'CTVBM', tenLoaiHoSo: 'CTVBM', ngayDuaVaoQuanLy: '2026-02-09', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Trần Ngọc Minh' },
                { id: 6, maHoSo: 'HS-2026-0006', loaiHoSoCode: 'HTBM', tenLoaiHoSo: 'HTBM', ngayDuaVaoQuanLy: '2026-02-16', trangThaiCode: 'KET_THUC', trangThai: 'Đã kết thúc', tenDoiTuong: 'Đặng Hoàng Cường' },
                { id: 7, maHoSo: 'HS-2026-0007', loaiHoSoCode: 'VANV', tenLoaiHoSo: 'Vai ảo NV', ngayDuaVaoQuanLy: '2026-03-23', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Lý Thu Uyên' },
                { id: 8, maHoSo: 'HS-2026-0008', loaiHoSoCode: 'NNV', tenLoaiHoSo: 'Nhà nghiệp vụ', ngayDuaVaoQuanLy: '2026-03-03', trangThaiCode: 'QUA_HAN', trangThai: 'Quá hạn', tenDoiTuong: 'Hoàng Văn Nam' },
                { id: 9, maHoSo: 'HS-2026-0009', loaiHoSoCode: 'DTCB', tenLoaiHoSo: 'ĐTCB', ngayDuaVaoQuanLy: '2026-03-10', trangThaiCode: 'CHUYEN_MUC', trangThai: 'Chuyển mức', tenDoiTuong: 'Ngô Minh Dũng' },
                { id: 10, maHoSo: 'HS-2026-0010', loaiHoSoCode: 'SUUTRA', tenLoaiHoSo: 'Sưu tra', ngayDuaVaoQuanLy: '2026-04-17', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Lê Quang Vinh' },
                { id: 11, maHoSo: 'HS-2026-0011', loaiHoSoCode: 'HIEMNGHI', tenLoaiHoSo: 'Hiềm nghi', ngayDuaVaoQuanLy: '2026-04-24', trangThaiCode: 'KET_THUC', trangThai: 'Đã kết thúc', tenDoiTuong: 'Bùi Thị Phương' },
                { id: 12, maHoSo: 'HS-2026-0012', loaiHoSoCode: 'CHUYENAN', tenLoaiHoSo: 'Chuyên án', ngayDuaVaoQuanLy: '2026-04-04', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Nguyễn Đức Hà' },
                { id: 13, maHoSo: 'HS-2026-0013', loaiHoSoCode: 'CTVBM', tenLoaiHoSo: 'CTVBM', ngayDuaVaoQuanLy: '2026-05-11', trangThaiCode: 'QUA_HAN', trangThai: 'Quá hạn', tenDoiTuong: 'Vũ Ngọc Yến' },
                { id: 14, maHoSo: 'HS-2026-0014', loaiHoSoCode: 'HTBM', tenLoaiHoSo: 'HTBM', ngayDuaVaoQuanLy: '2026-05-18', trangThaiCode: 'CHUYEN_MUC', trangThai: 'Chuyển mức', tenDoiTuong: 'Dương Hoàng Quân' },
                { id: 15, maHoSo: 'HS-2026-0015', loaiHoSoCode: 'VANV', tenLoaiHoSo: 'Vai ảo NV', ngayDuaVaoQuanLy: '2026-05-25', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Phạm Thu Khang' },
                { id: 16, maHoSo: 'HS-2026-0016', loaiHoSoCode: 'NNV', tenLoaiHoSo: 'Nhà nghiệp vụ', ngayDuaVaoQuanLy: '2026-06-05', trangThaiCode: 'KET_THUC', trangThai: 'Đã kết thúc', tenDoiTuong: 'Đỗ Văn An' },
                { id: 17, maHoSo: 'HS-2026-0017', loaiHoSoCode: 'DTCB', tenLoaiHoSo: 'ĐTCB', ngayDuaVaoQuanLy: '2026-06-12', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Trần Minh Sơn' },
                { id: 18, maHoSo: 'HS-2026-0018', loaiHoSoCode: 'SUUTRA', tenLoaiHoSo: 'Sưu tra', ngayDuaVaoQuanLy: '2026-06-19', trangThaiCode: 'QUA_HAN', trangThai: 'Quá hạn', tenDoiTuong: 'Đặng Quang Lan' },
                { id: 19, maHoSo: 'HS-2026-0019', loaiHoSoCode: 'HIEMNGHI', tenLoaiHoSo: 'Hiềm nghi', ngayDuaVaoQuanLy: '2026-07-26', trangThaiCode: 'CHUYEN_MUC', trangThai: 'Chuyển mức', tenDoiTuong: 'Lý Thị Bích' },
                { id: 20, maHoSo: 'HS-2026-0020', loaiHoSoCode: 'CHUYENAN', tenLoaiHoSo: 'Chuyên án', ngayDuaVaoQuanLy: '2026-07-06', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Hoàng Đức Tâm' },
                { id: 21, maHoSo: 'HS-2026-0021', loaiHoSoCode: 'CTVBM', tenLoaiHoSo: 'CTVBM', ngayDuaVaoQuanLy: '2026-07-13', trangThaiCode: 'KET_THUC', trangThai: 'Đã kết thúc', tenDoiTuong: 'Ngô Ngọc Minh' },
                { id: 22, maHoSo: 'HS-2026-0022', loaiHoSoCode: 'HTBM', tenLoaiHoSo: 'HTBM', ngayDuaVaoQuanLy: '2026-08-20', trangThaiCode: 'DANG_QUAN_LY', trangThai: 'Đang quản lý', tenDoiTuong: 'Lê Hoàng Cường' },
                { id: 23, maHoSo: 'HS-2026-0023', loaiHoSoCode: 'VANV', tenLoaiHoSo: 'Vai ảo NV', ngayDuaVaoQuanLy: '2026-08-27', trangThaiCode: 'QUA_HAN', trangThai: 'Quá hạn', tenDoiTuong: 'Bùi Thu Uyên' },
                { id: 24, maHoSo: 'HS-2026-0024', loaiHoSoCode: 'NNV', tenLoaiHoSo: 'Nhà nghiệp vụ', ngayDuaVaoQuanLy: '2026-08-07', trangThaiCode: 'CHUYEN_MUC', trangThai: 'Chuyển mức', tenDoiTuong: 'Nguyễn Văn Nam' }
            ]
        };
    }
});
