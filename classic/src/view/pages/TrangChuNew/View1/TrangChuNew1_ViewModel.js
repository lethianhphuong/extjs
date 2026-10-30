Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.trangchunew1',

    // Số liệu minh họa giữ theo HTML tham chiếu, không đại diện dữ liệu backend.
    data: {
        dienBien: {
            moMoi: '50,170 90,150 130,120 170,145 210,122 250,120 290,110 330,122 370,80 410,105 450,125 485,135',
            ketThuc: '50,185 90,180 130,165 170,155 210,145 250,145 290,145 330,142 370,118 410,130 450,145 485,150',
            thang: [
                { ten: 'T1', x: 50 },
                { ten: 'T2', x: 90 },
                { ten: 'T3', x: 130 },
                { ten: 'T4', x: 170 },
                { ten: 'T5', x: 210 },
                { ten: 'T6', x: 250 },
                { ten: 'T7', x: 290 },
                { ten: 'T8', x: 330 },
                { ten: 'T9', x: 370 },
                { ten: 'T10', x: 410 },
                { ten: 'T11', x: 450 },
                { ten: 'T12', x: 485 }
            ]
        },
        timKiemNangCao: { thoiGian: 'Năm 2026', tuNgay: null, denNgay: null, donVi: 'Toàn quốc', cucTinh: null, loaiHoSo: 'Tất cả', heLucLuong: 'Tất cả', tinhTrang: 'Tất cả' },
        chiSo: [
            { ten: 'Tổng số hồ sơ', giaTri: '12.568', xuHuong: '↑', mau: 'blue' },
            { ten: 'ĐTCB', giaTri: '9.142', xuHuong: '↑', mau: 'blue' },
            { ten: 'Sưu Tra', giaTri: '4.123', xuHuong: '↑', mau: 'blue' },
            { ten: 'Hiềm nghi', giaTri: '2.861', xuHuong: '↑', mau: 'blue' },
            { ten: 'Chuyên án', giaTri: '1.647', xuHuong: '↓', mau: 'red' },
            { ten: 'CTVBM', giaTri: '511', xuHuong: '↑', mau: 'green' },
            { ten: 'HTBM', giaTri: '3.42', xuHuong: '↑', mau: 'blue' },
            { ten: 'Vai ảo NV', giaTri: '3.426', xuHuong: '↑', mau: 'blue' }
        ],
        trangThai: [
            { ten: 'Đang quản lý', giaTri: '4.123', tyLe: 90, mau: 'blue' },
            { ten: 'Đã kết thúc', giaTri: '2.861', tyLe: 65, mau: 'amber' },
            { ten: 'Lập mới', giaTri: '1.647', tyLe: 40, mau: 'orange' },
            { ten: 'Chưa có số HS', giaTri: '511', tyLe: 20, mau: 'red' }
        ],
        dtcb: [{ ten: 'ĐTCB → Sưu tra', giaTri: '72,7%' }, { ten: 'ĐTCB → Hiềm nghi', giaTri: '20,1%' }, { ten: 'ĐTCB → Chuyên án', giaTri: '5,2%' }, { ten: 'Chờ đánh giá', giaTri: '2,0%' }],
        suuTra: [{ ten: 'Sưu tra → ĐTCB', giaTri: '72,7%' }, { ten: 'Sưu tra → Hiềm nghi', giaTri: '20,1%' }, { ten: 'Sưu tra → Chuyên án', giaTri: '5,2%' }, { ten: 'Chờ đánh giá', giaTri: '2,0%' }],
        lucLuong: [
            { ten: 'Ma túy', giaTri: '3.482' },
            { ten: 'Kinh tế', giaTri: '2.156' },
            { ten: 'Môi trường', giaTri: '1.042' },
            { ten: 'Trật tự xã hội', giaTri: '928' },
            { ten: 'Khác', giaTri: '883' }
        ],
        thongKeDonVi: [
            { ten: 'CA TP. Hà Nội', giaTri: '1.242', m3: 186, m4: 52, tyLe: 100 },
            { ten: 'CA TP. Hồ Chí Minh', giaTri: '1.087', m3: 163, m4: 41, tyLe: 88 },
            { ten: 'CA tỉnh Thanh Hóa', giaTri: '685', m3: 98, m4: 28, tyLe: 55 },
            { ten: 'CA tỉnh Nghệ An', giaTri: '592', m3: 76, m4: 21, tyLe: 48 },
            { ten: 'CA tỉnh Đồng Nai', giaTri: '518', m3: 69, m4: 17, tyLe: 42 },
            { ten: 'CA tỉnh Bình Dương', giaTri: '452', m3: 61, m4: 16, tyLe: 36 },
            { ten: 'CA tỉnh Quảng Ninh', giaTri: '401', m3: 54, m4: 14, tyLe: 32 },
            { ten: 'CA tỉnh Hải Phòng', giaTri: '378', m3: 46, m4: 12, tyLe: 30 }
        ],
        hoatDong: [
            { ten: 'Thu thập, xác minh thông tin', giaTri: '1.243', quaHan: 86 },
            { ten: 'Theo dõi, giám sát đối tượng', giaTri: '3.562', quaHan: 124 },
            { ten: 'Triển khai biện pháp nghiệp vụ', giaTri: '1.025', quaHan: 52 },
            { ten: 'Báo cáo, đánh giá định kỳ', giaTri: '678', quaHan: 17 },
            { ten: 'Chưa hoàn thành công tác hồ sơ', giaTri: '421', quaHan: 9 }
        ],
        canhBao: [
            { ten: 'Tăng nhanh số lượng lĩnh vực ma túy', moTa: 'Địa bàn vùng cao / Cần kiểm tra', mucDo: 'Lạng Sơn - Cao', mau: 'red' },
            { ten: 'Nhiều hồ sơ cùng liên quan một địa bàn', moTa: 'Mạng lưới phức tạp / Trọng điểm', mucDo: 'Tây Ninh - 96 - Cao', mau: 'red' },
            { ten: 'Hồ sơ Sưu tra lâu chưa cập nhật', moTa: 'Yêu cầu đôn đốc cán bộ thụ lý', mucDo: 'Cục CSHS - 74 - Trung bình', mau: 'amber' },
            { ten: 'Báo cáo định kỳ quá hạn trên 15 ngày', moTa: 'Cần phê bình tiến độ', mucDo: 'Hà Nội - 112 - Trung bình', mau: 'amber' }
        ],
        kyBieuDo: 'Theo tháng'
    },
    stores: {
        hoSoChiDaoStore: {
            fields: ['ma', 'moTa'],
            data: [
                { ma: 'PN-TH-2026-001', moTa: 'Nhóm đối tượng mua bán ma túy | Hà Nội | Sưu tra | PTNV' },
                { ma: 'PN-KT-2026-015', moTa: 'Đường dây buôn lậu qua biên giới | Tây Ninh | Sưu tra | Nhiều liên quan' },
                { ma: 'PN-MT-2026-008', moTa: 'Khai thác khoáng sản trái phép | Lâm Đồng | Hiềm nghi | Quá hạn' },
                { ma: 'PN-CNC-2026-021', moTa: 'Lừa đảo công nghệ cao | Cục C02 | Chuyên án | Mức cao' }
            ]
        }
    }
});
