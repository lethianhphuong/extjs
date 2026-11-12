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
