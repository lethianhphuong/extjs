Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_MockData', {
    singleton: true,

    /** Dữ liệu mẫu cùng nội dung View4; màu không nằm trong dữ liệu mà map theo code ở DisplayConfig. */
    getData: function () {
        return {
            canBo: {
                hoTen: 'Nguyễn Văn D',
                chucVu: 'Đội trưởng',
                donVi: 'Đội Phòng ngừa, Phòng CSHS - Công an tỉnh A',
                linhVuc: 'Quản lý đối tượng, địa bàn trọng điểm'
            },
            kpiCards: [
                { key: 'tongSo', ten: 'Tổng số hồ sơ đang phụ trách', giaTri: 128, mau: 'blue', icon: 'folder', laTong: true },
                { key: 'moMoi', ten: 'Mở mới trong kỳ', giaTri: 18, mau: 'green', icon: 'plus' },
                { key: 'ketThuc', ten: 'Kết thúc trong kỳ', giaTri: 15, mau: 'purple', icon: 'check' },
                { key: 'chuyenMuc', ten: 'Chuyển mức trong kỳ', giaTri: 4, mau: 'orange', icon: 'swap' },
                { key: 'sapDenHan', ten: 'Sắp đến hạn', giaTri: 6, mau: 'amber', icon: 'clock', canhBao: true },
                { key: 'quaHan', ten: 'Quá hạn', giaTri: 3, mau: 'red', icon: 'alert', canhBao: true }
            ],
            loaiHoSo: [
                { code: 'DTCB', ten: 'ĐTCB', soLuong: 1 },
                { code: 'SUUTRA', ten: 'Sưu tra', soLuong: 4 },
                { code: 'HIEMNGHI', ten: 'Hiềm nghi', soLuong: 2 },
                { code: 'CHUYENAN', ten: 'Chuyên án', soLuong: 1 },
                { code: 'CTVBM', ten: 'CTVBM', soLuong: 5 },
                { code: 'HTBM', ten: 'HTBM', soLuong: 2 }
            ],
            trangThai: [
                { code: 'DANG_THUC_HIEN', name: 'Đang thực hiện', soLuong: 72 },
                { code: 'HOAN_THANH', name: 'Đã hoàn thành', soLuong: 15 },
                { code: 'SAP_DEN_HAN', name: 'Sắp đến hạn', soLuong: 6 },
                { code: 'QUA_HAN', name: 'Quá hạn', soLuong: 3 },
                { code: 'KHAC', name: 'Khác', soLuong: 32 }
            ],
            tienDoThang: [
                { thang: 'T8/2025', soLuong: 42 },
                { thang: 'T9/2025', soLuong: 63 },
                { thang: 'T10/2025', soLuong: 81 },
                { thang: 'T11/2025', soLuong: 98 },
                { thang: 'T12/2025', soLuong: 128 }
            ],
            dsHoSo: [
                { stt: 1, maDoiTuong: 'DT1111154', ngayDuaVaoQuanLy: '15/10/2025', loaiHsCode: 'SUUTRA', loaiHsText: 'Sưu tra', soDangKy: '35/ĐK-CSHS' },
                { stt: 2, maDoiTuong: 'DT3232352', ngayDuaVaoQuanLy: '22/10/2025', loaiHsCode: 'SUUTRA', loaiHsText: 'Sưu tra', soDangKy: '42/ĐK-CSHS' },
                { stt: 3, maDoiTuong: 'DT3535353', ngayDuaVaoQuanLy: '05/11/2025', loaiHsCode: 'HIEMNGHI', loaiHsText: 'Hiềm nghi', soDangKy: '18/ĐK-CSHS' },
                { stt: 4, maDoiTuong: 'DT3435435', ngayDuaVaoQuanLy: '18/11/2025', loaiHsCode: 'CHUYENAN', loaiHsText: 'Chuyên án', soDangKy: '09/ĐK-CSHS' },
                { stt: 5, maDoiTuong: 'DT4545456', ngayDuaVaoQuanLy: '25/11/2025', loaiHsCode: 'SUUTRA', loaiHsText: 'Sưu tra', soDangKy: '15/ĐK-CSHS' },
                { stt: 6, maDoiTuong: 'DT5656567', ngayDuaVaoQuanLy: '02/12/2025', loaiHsCode: 'HIEMNGHI', loaiHsText: 'Hiềm nghi', soDangKy: '24/ĐK-CSHS' },
                { stt: 7, maDoiTuong: 'DT6767678', ngayDuaVaoQuanLy: '08/12/2025', loaiHsCode: 'CHUYENAN', loaiHsText: 'Chuyên án', soDangKy: '31/ĐK-CSHS' },
                { stt: 8, maDoiTuong: 'DT7878789', ngayDuaVaoQuanLy: '14/12/2025', loaiHsCode: 'SUUTRA', loaiHsText: 'Sưu tra', soDangKy: '06/ĐK-CSHS' },
                { stt: 9, maDoiTuong: 'DT8989890', ngayDuaVaoQuanLy: '20/12/2025', loaiHsCode: 'HIEMNGHI', loaiHsText: 'Hiềm nghi', soDangKy: '53/ĐK-CSHS' },
                { stt: 10, maDoiTuong: 'DT9090901', ngayDuaVaoQuanLy: '27/12/2025', loaiHsCode: 'CHUYENAN', loaiHsText: 'Chuyên án', soDangKy: '11/ĐK-CSHS' }
            ]
        };
    }
});
