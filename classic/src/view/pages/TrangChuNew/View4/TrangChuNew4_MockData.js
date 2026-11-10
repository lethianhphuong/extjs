Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_MockData', {
    singleton: true,

    getData: function () {
        return {
            canBo: {
                hoTen: 'Nguyễn Văn D',
                chucVu: 'Đội trưởng',
                donVi: 'Đội Phòng ngừa, Phòng CSHS - Công an tỉnh A',
                linhVuc: 'Quản lý đối tượng, địa bàn trọng điểm'
            },

            kpiCards: [
                {
                    key: 'tongSo',
                    ten: 'Tổng số hồ sơ đang phụ trách',
                    giaTri: 128,
                    giaTriText: '128',
                    mau: 'blue',
                    icon: 'folder',
                    laTong: true
                },
                {
                    key: 'moMoi',
                    ten: 'Mở mới trong kỳ',
                    giaTri: 18,
                    giaTriText: '18',
                    mau: 'green',
                    icon: 'plus'
                },
                {
                    key: 'ketThuc',
                    ten: 'Kết thúc trong kỳ',
                    giaTri: 15,
                    giaTriText: '15',
                    mau: 'purple',
                    icon: 'check'
                },
                {
                    key: 'chuyenMuc',
                    ten: 'Chuyển mức trong kỳ',
                    giaTri: 4,
                    giaTriText: '4',
                    mau: 'orange',
                    icon: 'swap'
                },
                {
                    key: 'sapDenHan',
                    ten: 'Sắp đến hạn',
                    giaTri: 6,
                    giaTriText: '6',
                    mau: 'amber',
                    icon: 'clock'
                },
                {
                    key: 'quaHan',
                    ten: 'Quá hạn',
                    giaTri: 3,
                    giaTriText: '3',
                    mau: 'red',
                    icon: 'alert'
                }
            ],

            loaiHoSoCards: [
                { code: 'DTCB', ten: 'ĐTCB', soLuong: 1, soLuongText: '1' },
                { code: 'SUUTRA', ten: 'Sưu Tra', soLuong: 4, soLuongText: '4' },
                { code: 'HIEMNGHI', ten: 'Hiềm nghi', soLuong: 2, soLuongText: '2' },
                { code: 'CHUYENAN', ten: 'Chuyên án', soLuong: 1, soLuongText: '1' },
                { code: 'CTVBM', ten: 'CTVBM', soLuong: 5, soLuongText: '5' },
                { code: 'HTBM', ten: 'HTBM', soLuong: 2, soLuongText: '2' }
            ],

            trangThaiDonut: [
                { name: 'Đang thực hiện', soLuong: 72, tyLe: '56,3%', mau: '#2563eb' },
                { name: 'Đã hoàn thành', soLuong: 15, tyLe: '11,7%', mau: '#16a34a' },
                { name: 'Sắp đến hạn', soLuong: 6, tyLe: '4,7%', mau: '#f59e0b' },
                { name: 'Quá hạn', soLuong: 3, tyLe: '2,3%', mau: '#dc2626' },
                { name: 'Khác', soLuong: 32, tyLe: '25,0%', mau: '#94a3b8' }
            ],

            tienDoThang: [
                { thang: 'T8/2025', soLuong: 42 },
                { thang: 'T9/2025', soLuong: 63 },
                { thang: 'T10/2025', soLuong: 81 },
                { thang: 'T11/2025', soLuong: 98 },
                { thang: 'T12/2025', soLuong: 128 }
            ],

            dsHoSo: [
                {
                    stt: 1,
                    maDoiTuong: 'DT1111154',
                    ngayDuaVaoQuanLy: '15/10/2025',
                    loaiHsCode: 'SUUTRA',
                    loaiHsText: 'Sưu tra',
                    soDangKy: '35/ĐK-CSHS'
                },
                {
                    stt: 2,
                    maDoiTuong: 'DT3232352',
                    ngayDuaVaoQuanLy: '22/10/2025',
                    loaiHsCode: 'SUUTRA',
                    loaiHsText: 'Sưu tra',
                    soDangKy: '42/ĐK-CSHS'
                },
                {
                    stt: 3,
                    maDoiTuong: 'DT3535353',
                    ngayDuaVaoQuanLy: '05/11/2025',
                    loaiHsCode: 'HIEMNGHI',
                    loaiHsText: 'Hiềm nghi',
                    soDangKy: '18/ĐK-CSHS'
                },
                {
                    stt: 4,
                    maDoiTuong: 'DT3435435',
                    ngayDuaVaoQuanLy: '18/11/2025',
                    loaiHsCode: 'CHUYENAN',
                    loaiHsText: 'Chuyên án',
                    soDangKy: '09/ĐK-CSHS'
                },
                {
                    stt: 5,
                    maDoiTuong: 'DT4545456',
                    ngayDuaVaoQuanLy: '25/11/2025',
                    loaiHsCode: 'SUUTRA',
                    loaiHsText: 'Sưu tra',
                    soDangKy: '15/ĐK-CSHS'
                },
                {
                    stt: 6,
                    maDoiTuong: 'DT5656567',
                    ngayDuaVaoQuanLy: '02/12/2025',
                    loaiHsCode: 'HIEMNGHI',
                    loaiHsText: 'Hiềm nghi',
                    soDangKy: '24/ĐK-CSHS'
                },
                {
                    stt: 7,
                    maDoiTuong: 'DT6767678',
                    ngayDuaVaoQuanLy: '08/12/2025',
                    loaiHsCode: 'CHUYENAN',
                    loaiHsText: 'Chuyên án',
                    soDangKy: '31/ĐK-CSHS'
                },
                {
                    stt: 8,
                    maDoiTuong: 'DT7878789',
                    ngayDuaVaoQuanLy: '14/12/2025',
                    loaiHsCode: 'SUUTRA',
                    loaiHsText: 'Sưu tra',
                    soDangKy: '06/ĐK-CSHS'
                },
                {
                    stt: 9,
                    maDoiTuong: 'DT8989890',
                    ngayDuaVaoQuanLy: '20/12/2025',
                    loaiHsCode: 'HIEMNGHI',
                    loaiHsText: 'Hiềm nghi',
                    soDangKy: '53/ĐK-CSHS'
                },
                {
                    stt: 10,
                    maDoiTuong: 'DT9090901',
                    ngayDuaVaoQuanLy: '27/12/2025',
                    loaiHsCode: 'CHUYENAN',
                    loaiHsText: 'Chuyên án',
                    soDangKy: '11/ĐK-CSHS'
                }
            ]
        };
    }
});
