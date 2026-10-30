Ext.define('DEMO.view.pages.YeuCauTraCuu.DanhSach.YeuCauTraCuu_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.yeucautracuu',

    data: {
        filters: {
            keyword: '',
            loaiTraCuu: '',
            mucDoUuTien: '',
            trangThai: ''
        }
    },

    stores: {
        ticketGridStore: {
            fields: [
                'id',
                'maPhieu',
                'hoTen',
                'maNguoi',
                'cccd',
                'loaiTraCuu',
                'mucDoUuTien',
                'ngayYeuCau',
                'donViYeuCau',
                'noiDung',
                'trangThai'
            ],
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            },
            data: [
                {
                    id: 1,
                    maPhieu: 'PYC-20261024-0001',
                    hoTen: 'Trần Thị Bích Ngọc',
                    maNguoi: 'ND-000131',
                    cccd: '001192067890',
                    loaiTraCuu: 'Tra cứu lịch sử vi phạm',
                    mucDoUuTien: 'Hoả tốc',
                    ngayYeuCau: '24/10/2026',
                    donViYeuCau: 'Phòng Cảnh sát Hình sự',
                    noiDung: 'Xác minh tiền án tiền sự và các quyết định xử phạt vi phạm hành chính',
                    trangThai: 'Mới tạo'
                },
                {
                    id: 2,
                    maPhieu: 'PYC-20261023-0008',
                    hoTen: 'Nguyễn Văn An',
                    maNguoi: 'ND-000124',
                    cccd: '001085012345',
                    loaiTraCuu: 'Tra cứu nhân thân',
                    mucDoUuTien: 'Thường',
                    ngayYeuCau: '23/10/2026',
                    donViYeuCau: 'Công an Phường Bến Nghé',
                    noiDung: 'Tra cứu xác minh thông tin hộ khẩu thường trú và các mối quan hệ nhân thân',
                    trangThai: 'Đang xử lý'
                },
                {
                    id: 3,
                    maPhieu: 'PYC-20261022-0005',
                    hoTen: 'Lê Minh Quân',
                    maNguoi: 'ND-000147',
                    cccd: '001078034567',
                    loaiTraCuu: 'Tra cứu tài sản',
                    mucDoUuTien: 'Khẩn',
                    ngayYeuCau: '22/10/2026',
                    donViYeuCau: 'Đội Điều tra Tổng hợp',
                    noiDung: 'Rà soát thông tin bất động sản, tài khoản ngân hàng và phương tiện giao thông',
                    trangThai: 'Hoàn thành'
                },
                {
                    id: 4,
                    maPhieu: 'PYC-20261021-0002',
                    hoTen: 'Phạm Thu Hà',
                    maNguoi: 'ND-000152',
                    cccd: '001301089012',
                    loaiTraCuu: 'Tra cứu nhân thân',
                    mucDoUuTien: 'Thường',
                    ngayYeuCau: '21/10/2026',
                    donViYeuCau: 'Phòng Quản lý Xuất nhập cảnh',
                    noiDung: 'Kiểm tra thông tin cấp hộ chiếu và lịch sử xuất nhập cảnh',
                    trangThai: 'Hoàn thành'
                },
                {
                    id: 5,
                    maPhieu: 'PYC-20261020-0011',
                    hoTen: 'Nguyễn Hoàng Long',
                    maNguoi: 'ND-000168',
                    cccd: '001069045678',
                    loaiTraCuu: 'Tra cứu lịch sử vi phạm',
                    mucDoUuTien: 'Khẩn',
                    ngayYeuCau: '20/10/2026',
                    donViYeuCau: 'Phòng CSGT',
                    noiDung: 'Tra cứu thông tin giấy phép lái xe và lịch sử xử lý vi phạm nồng độ cồn',
                    trangThai: 'Đang xử lý'
                }
            ]
        }
    }
});
