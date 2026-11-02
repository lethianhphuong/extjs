Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tt_timkiem',
    data: {
        timKiemNangCao: {
            thoiGian: 'nam2026',
            tuNgay: null,
            denNgay: null,
            donVi: [],
            cucTinh: [],
            loaiHoSo: [],
            heLucLuong: [],
            tinhTrang: []
        }
    },
    // Danh mục minh họa local; không nạp hoặc giả lập kết quả thống kê.
    stores: {
        thoiGianStore: {
            fields: ['ma', 'ten', 'thangBatDau', 'thangKetThuc'],
            data: [
                { ma: 'nam2026', ten: 'Năm 2026', thangBatDau: 0, thangKetThuc: 11 },
                { ma: 'quy1', ten: 'Quý I/2026', thangBatDau: 0, thangKetThuc: 2 },
                { ma: 'quy2', ten: 'Quý II/2026', thangBatDau: 3, thangKetThuc: 5 },
                { ma: 'quy3', ten: 'Quý III/2026', thangBatDau: 6, thangKetThuc: 8 },
                { ma: 'quy4', ten: 'Quý IV/2026', thangBatDau: 9, thangKetThuc: 11 },
                { ma: 'tuyChon', ten: 'Tùy chọn' }
            ]
        },
        donViStore: {
            fields: ['ma', 'ten'],
            data: [
                { ma: 'cuc', ten: 'Cấp Cục' },
                { ma: 'tinh', ten: 'Cấp Tỉnh/Thành phố' },
                { ma: 'xa', ten: 'Cấp Xã/Phường' }
            ]
        },
        cucTinhStore: {
            fields: ['ma', 'ten'],
            data: [
                { ma: 'c02', ten: 'Cục Cảnh sát hình sự' },
                { ma: 'c03', ten: 'Cục Cảnh sát kinh tế' },
                { ma: 'c04', ten: 'Cục Cảnh sát điều tra tội phạm về ma túy' },
                { ma: 'haNoi', ten: 'CA TP Hà Nội' },
                { ma: 'tpHcm', ten: 'CA TP Hồ Chí Minh' },
                { ma: 'thanhHoa', ten: 'CA tỉnh Thanh Hóa' },
                { ma: 'ngheAn', ten: 'CA tỉnh Nghệ An' },
                { ma: 'dongNai', ten: 'CA tỉnh Đồng Nai' }
            ]
        },
        loaiHoSoStore: {
            fields: ['ma', 'ten'],
            data: [
                { ma: 'dtcb', ten: 'ĐTCB' },
                { ma: 'suuTra', ten: 'Sưu tra' },
                { ma: 'hiemNghi', ten: 'Hiềm nghi' },
                { ma: 'chuyenAn', ten: 'Chuyên án' },
                { ma: 'ctvbm', ten: 'CTVBM' },
                { ma: 'htbm', ten: 'HTBM' },
                { ma: 'vaiAo', ten: 'Vai ảo NV' }
            ]
        },
        heLucLuongStore: {
            fields: ['ma', 'ten'],
            data: [
                { ma: 'tratTuXaHoi', ten: 'Trật tự xã hội' },
                { ma: 'maTuy', ten: 'Ma túy' },
                { ma: 'kinhTe', ten: 'Kinh tế' },
                { ma: 'moiTruong', ten: 'Môi trường' },
                { ma: 'khac', ten: 'Khác' }
            ]
        },
        tinhTrangStore: {
            fields: ['ma', 'ten'],
            data: [
                { ma: 'dangQuanLy', ten: 'Đang quản lý' },
                { ma: 'daKetThuc', ten: 'Đã kết thúc' },
                { ma: 'lapMoi', ten: 'Lập mới' },
                { ma: 'chuaCoSoHoSo', ten: 'Chưa có số HS' }
            ]
        }
    }
});
