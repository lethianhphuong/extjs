Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.connguoidemo2',

    data: {
        timKiemNangCao: {
            tuKhoa: '',
            vaiTro: 'all',
            tienAn: 'all'
        },
        formState: {
            isSapNhap: false,
            isTronChet: false,
            hasCccd: false,
            tcLoai: 'tron'
        }
    },

    stores: {
        conNguoiStore: {
            fields: [
                'id', 'avatar', 'hoTen', 'tenKhac', 'gioiTinh', 'ngaySinh', 'cccd',
                'vaiTro', 'soDt', 'diaChiHienTai', 'tienAn', 'coTronChet', 'trangThai', 'ngheNghiep'
            ],
            data: [
                {
                    id: 1,
                    avatar: '',
                    hoTen: 'Nguyễn Văn Hùng',
                    tenKhac: 'Hùng Ke',
                    gioiTinh: 'Nam',
                    ngaySinh: '15/04/1988',
                    cccd: '001088012345',
                    vaiTro: 'Bị can',
                    soDt: '0912345678',
                    diaChiHienTai: 'Số 12 ngõ 45 phố Láng Hạ, Đống Đa, Hà Nội',
                    tienAn: 'Tiền án',
                    coTronChet: true,
                    trangThai: 'Đã bắt lại',
                    ngheNghiep: 'Lao động tự do'
                },
                {
                    id: 2,
                    avatar: '',
                    hoTen: 'Trần Thị Thu Trang',
                    tenKhac: '',
                    gioiTinh: 'Nữ',
                    ngaySinh: '22/09/1995',
                    cccd: '034195009876',
                    vaiTro: 'Bị hại',
                    soDt: '0988776655',
                    diaChiHienTai: 'Phường Ba Đình, TP. Hà Nội',
                    tienAn: 'Không',
                    coTronChet: false,
                    trangThai: 'Bình thường',
                    ngheNghiep: 'Kinh doanh'
                },
                {
                    id: 3,
                    avatar: '',
                    hoTen: 'Lê Hoàng Nam',
                    tenKhac: 'Nam Còi',
                    gioiTinh: 'Nam',
                    ngaySinh: '10/11/1992',
                    cccd: '079092004321',
                    vaiTro: 'Người làm chứng',
                    soDt: '0903123456',
                    diaChiHienTai: 'Phường Cầu Giấy, TP. Hà Nội',
                    tienAn: 'Không',
                    coTronChet: false,
                    trangThai: 'Bình thường',
                    ngheNghiep: 'Cán bộ, công chức'
                },
                {
                    id: 4,
                    avatar: '',
                    hoTen: 'Phạm Quốc Bảo',
                    tenKhac: '',
                    gioiTinh: 'Nam',
                    ngaySinh: '05/02/1985',
                    cccd: '022085006543',
                    vaiTro: 'Bị can',
                    soDt: '0934567890',
                    diaChiHienTai: 'Xã Sóc Sơn, TP. Hà Nội',
                    tienAn: 'Cả tiền án và tiền sự',
                    coTronChet: true,
                    trangThai: 'Trốn',
                    ngheNghiep: 'Không nghề nghiệp'
                }
            ],
            pageSize: 10
        },

        moiQuanHeStore: {
            fields: ['ten', 'nam', 'gt', 'cccd', 'qh', 'noiO'],
            data: []
        },

        tronStore: {
            fields: ['ten', 'xuLy'],
            data: []
        },

        chetStore: {
            fields: ['ten', 'xuLy'],
            data: []
        }
    }
});
