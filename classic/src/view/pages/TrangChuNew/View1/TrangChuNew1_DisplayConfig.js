Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig', {
    singleton: true,

    // Tên, icon, token màu và thứ tự hiển thị thuộc frontend, không lấy từ response.
    tieuChi: {
        tongQuan: {
            tongHoSo: { ten: 'Tổng số đối tượng', icon: 'folder', mau: 'blue', thuTu: 1 },
            dtcb: { ten: 'ĐTCB', icon: 'search', mau: 'green', thuTu: 2 },
            suuTra: { ten: 'Sưu tra', icon: 'clipboard', mau: 'amber', thuTu: 3 },
            hiemNghi: { ten: 'Hiềm nghi', icon: 'warning', mau: 'red', thuTu: 4 },
            chuyenAn: { ten: 'Chuyên án', icon: 'briefcase', mau: 'purple', thuTu: 5 },
            ctvbm: { ten: 'CTVBM', icon: 'users', mau: 'cyan', thuTu: 6 },
            htbm: { ten: 'HTBM', icon: 'envelope', mau: 'indigo', thuTu: 7 },
            vaiAo: { ten: 'Vai ảo NV', icon: 'identity', mau: 'muted', thuTu: 8 }
        },
        trangThai: {
            dangQuanLy: { ten: 'Đang quản lý', nhanTruc: 'Đang\nquản lý', mau: 'blue', thuTu: 1 },
            daKetThuc: { ten: 'Đã kết thúc', nhanTruc: 'Đã\nkết thúc', mau: 'amber', thuTu: 2 },
            lapMoi: { ten: 'Lập mới', nhanTruc: 'Lập\nmới', mau: 'orange', thuTu: 3 },
            chuaCoSoHoSo: { ten: 'Chưa có số ĐT', nhanTruc: 'Chưa có\nsố ĐT', mau: 'red', thuTu: 4 }
        },
        hieuQuaDtcb: {
            suuTra: { ten: 'ĐTCB → Sưu tra', mau: 'blue', thuTu: 1 },
            hiemNghi: { ten: 'ĐTCB → Hiềm nghi', mau: 'amber', thuTu: 2 },
            chuyenAn: { ten: 'ĐTCB → Chuyên án', mau: 'purple', thuTu: 3 },
            choDanhGia: { ten: 'Chờ đánh giá', mau: 'muted', thuTu: 4 },
            xacMinh: { ten: 'ĐTCB → Xác minh', mau: 'cyan', thuTu: 5 },
            boSung: { ten: 'ĐTCB → Bổ sung thông tin', mau: 'green', thuTu: 6 },
            theoDoi: { ten: 'ĐTCB → Theo dõi', mau: 'indigo', thuTu: 7 },
            raSoat: { ten: 'ĐTCB → Rà soát', mau: 'orange', thuTu: 8 },
            phoiHop: { ten: 'ĐTCB → Phối hợp', mau: 'blue', thuTu: 9 },
            danhGia: { ten: 'ĐTCB → Đánh giá', mau: 'purple', thuTu: 10 },
            deXuat: { ten: 'ĐTCB → Đề xuất xử lý', mau: 'amber', thuTu: 11 },
            luuTru: { ten: 'ĐTCB → Lưu trữ', mau: 'muted', thuTu: 12 }
        },
        hieuQuaSuuTra: {
            dtcb: { ten: 'Sưu tra → ĐTCB', mau: 'blue', thuTu: 1 },
            hiemNghi: { ten: 'Sưu tra → Hiềm nghi', mau: 'amber', thuTu: 2 },
            chuyenAn: { ten: 'Sưu tra → Chuyên án', mau: 'purple', thuTu: 3 },
            choDanhGia: { ten: 'Chờ đánh giá', mau: 'muted', thuTu: 4 }
        },
        heLucLuong: {
            tratTuXaHoi: { ten: 'Trật tự xã hội', mau: 'blue', thuTu: 1 },
            maTuy: { ten: 'Ma túy', mau: 'amber', thuTu: 2 },
            kinhTe: { ten: 'Kinh tế', mau: 'cyan', thuTu: 3 },
            moiTruong: { ten: 'Môi trường', mau: 'green', thuTu: 4 },
            khac: { ten: 'Khác', mau: 'muted', thuTu: 5 }
        },
        donVi: {
            haNoi: { ten: 'CA TP Hà Nội', mau: 'blue' },
            tpHcm: { ten: 'CA TP HCM', mau: 'amber' },
            thanhHoa: { ten: 'CA tỉnh Thanh Hóa', mau: 'orange' },
            ngheAn: { ten: 'CA tỉnh Nghệ An', mau: 'red' },
            dongNai: { ten: 'CA tỉnh Đồng Nai', mau: 'purple' },
            binhDuong: { ten: 'CA tỉnh Bình Dương', mau: 'green' },
            quangNinh: { ten: 'CA tỉnh Quảng Ninh', mau: 'cyan' },
            haiPhong: { ten: 'CA TP Hải Phòng', mau: 'indigo' },
            dakLak: { ten: 'CA tỉnh Đắk Lắk', mau: 'purple' },
            canTho: { ten: 'CA TP Cần Thơ', mau: 'muted' }
        }
    },

    /** Trả cấu hình mới; mã chưa khai báo vẫn hiển thị được bằng màu trung tính. */
    get: function (group, code) {
        const me = this;
        const definitions = me.tieuChi[group] || {};
        const definition = Object.prototype.hasOwnProperty.call(definitions, code) ? definitions[code] : {};

        return Object.assign({ ten: code, nhanTruc: code, icon: 'identity', mau: 'muted', thuTu: 999 }, definition);
    }
});
