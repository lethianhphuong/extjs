Ext.define('DEMO.view.pages.ToTrinh.LichSuToTrinh_ViewPopup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.lichSuToTrinhPopup',

    stores: {
        lichSuStore: {
            fields: ['stt', 'hanhDong', 'nguoiThucHien', 'chucDanh', 'thoiGian', 'trangThaiCu', 'trangThaiMoi', 'moTa'],
            data: [
                {
                    stt: 1,
                    hanhDong: 'Gửi lãnh đạo thành công',
                    nguoiThucHien: 'Nguyễn Văn A',
                    chucDanh: 'Điều tra viên',
                    thoiGian: '25/06/2026 08:35:30',
                    trangThaiCu: 'ĐÃ TIẾP NHẬN',
                    trangThaiMoi: 'YÊU CẦU CHỈNH SỬA',
                    moTa: 'Văn bản cần làm rõ thêm các tình tiết liên quan đến hành vi vi phạm quy định về phòng ngừa, ứng phó sự cố môi trường. Cần bổ sung báo cáo đánh giá tác động chi tiết và danh mục các hộ kỹ thuật kèm theo để làm cơ sở vững chắc cho việc phê duyệt. Đề nghị cán bộ thụ lý phối hợp chặt chẽ với các đơn vị liên quan để hoàn thiện nội dung này trước thời hạn quy định.'
                },
                {
                    stt: 2,
                    hanhDong: 'Gửi lãnh đạo thành công',
                    nguoiThucHien: 'Nguyễn Văn A',
                    chucDanh: 'Điều tra viên',
                    thoiGian: '25/06/2026 08:35:30',
                    trangThaiCu: 'DỰ THẢO',
                    trangThaiMoi: 'CHỜ TIẾP NHẬN',
                    moTa: ''
                },
                {
                    stt: 3,
                    hanhDong: 'Ký số thành công',
                    nguoiThucHien: 'Nguyễn Văn A',
                    chucDanh: 'Điều tra viên',
                    thoiGian: '25/06/2026 08:35:12',
                    trangThaiCu: 'DỰ THẢO',
                    trangThaiMoi: 'ĐÃ KÝ SỐ',
                    moTa: ''
                },
                {
                    stt: 4,
                    hanhDong: 'Cập nhật Văn bản đề xuất',
                    nguoiThucHien: 'Nguyễn Văn B',
                    chucDanh: 'Điều tra viên',
                    thoiGian: '25/06/2026 08:35:12',
                    trangThaiCu: '',
                    trangThaiMoi: 'DỰ THẢO',
                    moTa: ''
                },
                {
                    stt: 5,
                    hanhDong: 'Soạn thảo văn bản đề xuất',
                    nguoiThucHien: 'Nguyễn Văn A',
                    chucDanh: 'Điều tra viên',
                    thoiGian: '25/06/2026 08:35:12',
                    trangThaiCu: '',
                    trangThaiMoi: 'DỰ THẢO',
                    moTa: ''
                }
            ]
        }
    }
});
