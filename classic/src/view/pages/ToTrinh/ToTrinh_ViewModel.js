Ext.define('DEMO.view.pages.ToTrinh.ToTrinh_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.totrinh',

    data: {
        timKiemNangCao: {
            loaiVanBan: 'all',
            tuKhoa: '',
            trangThai: null,
            tuNgay: null,
            denNgay: null
        }
    },

    stores: {
        toTrinhStore: {
            fields: ['stt', 'soVanBan', 'tenVanBan', 'maVuAn', 'loaiVanBan', 'vanBanTongThuc', 'canBoTao', 'ngayTao', 'lanhDaoXuLy', 'noiDungChinhSua', 'trangThai', 'trangThaiKey'],
            data: [
                {
                    stt: 1,
                    soVanBan: 'DX-2025-0041',
                    tenVanBan: 'Đề xuất gia hạn thời hạn điều tra vụ án hình sự liên quan đến vi phạm quy định về phòng ngừa, ứng phó, khắc phục sự cố môi trường',
                    maVuAn: 'VA-2025-0018',
                    loaiVanBan: 'de_xuat',
                    vanBanTongThuc: 2,
                    canBoTao: 'Nguyễn Thị B',
                    ngayTao: '08/12/2025',
                    lanhDaoXuLy: 'Trần Văn B',
                    noiDungChinhSua: '—',
                    trangThai: 'Chỉ tập nhận',
                    trangThaiKey: 'chi_tap_nhan'
                },
                {
                    stt: 2,
                    soVanBan: 'DX-2025-0039',
                    tenVanBan: 'Đề xuất áp dụng biện pháp...',
                    maVuAn: 'VA-2025-0015',
                    loaiVanBan: 'de_xuat',
                    vanBanTongThuc: 1,
                    canBoTao: 'Lê Văn D',
                    ngayTao: '06/12/2025',
                    lanhDaoXuLy: 'Nguyễn Văn C',
                    noiDungChinhSua: '—',
                    trangThai: 'Đã tiếp nhận',
                    trangThaiKey: 'da_tiep_nhan'
                },
                {
                    stt: 3,
                    soVanBan: 'DX-2025-0037',
                    tenVanBan: 'Đề xuất trung cầu giám định...',
                    maVuAn: 'VA-2025-0012',
                    loaiVanBan: 'de_xuat',
                    vanBanTongThuc: 1,
                    canBoTao: 'Phạm Thị E',
                    ngayTao: '04/12/2025',
                    lanhDaoXuLy: 'Lê Thị D',
                    noiDungChinhSua: 'Cần bổ sung báo cáo đánh giá tác động và làm rõ căn cứ pháp lý tại mục 3.2',
                    trangThai: 'Yêu cầu chỉnh sửa',
                    trangThaiKey: 'yeu_cau_chinh_sua'
                },
                {
                    stt: 4,
                    soVanBan: 'DX-2025-0034',
                    tenVanBan: 'Đề xuất ý kiến VKS và k...',
                    maVuAn: 'VV-2025-0088',
                    loaiVanBan: 'de_xuat',
                    vanBanTongThuc: 1,
                    canBoTao: 'Nguyễn Thị B',
                    ngayTao: '01/12/2025',
                    lanhDaoXuLy: 'Phạm Văn E',
                    noiDungChinhSua: '—',
                    trangThai: 'Chờ ý kiến',
                    trangThaiKey: 'cho_y_kien'
                },
                {
                    stt: 5,
                    soVanBan: 'DX-2025-0031',
                    tenVanBan: 'Đề xuất ủy thác điều tra địa...',
                    maVuAn: 'VA-2025-0009',
                    loaiVanBan: 'de_xuat',
                    vanBanTongThuc: 1,
                    canBoTao: 'Lê Văn D',
                    ngayTao: '28/11/2025',
                    lanhDaoXuLy: 'Hoàng Văn F',
                    noiDungChinhSua: '—',
                    trangThai: 'Đã tiếp nhận',
                    trangThaiKey: 'da_tiep_nhan'
                }
            ]
        }
    }
});
