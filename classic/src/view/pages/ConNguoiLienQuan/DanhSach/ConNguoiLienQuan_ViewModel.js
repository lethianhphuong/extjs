Ext.define('DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.connguoilienquan',
    data: { timKiemNangCao: { keyword: '', role: null, gender: null } },
    stores: {
        vaiTroComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Bị can',
                    text: 'Bị can'
                },
                {
                    value: 'Bị cáo',
                    text: 'Bị cáo'
                },
                {
                    value: 'Bị hại',
                    text: 'Bị hại'
                },
                {
                    value: 'Người làm chứng',
                    text: 'Người làm chứng'
                },
                {
                    value: 'Nguyên đơn dân sự',
                    text: 'Nguyên đơn dân sự'
                },
                {
                    value: 'Bị đơn dân sự',
                    text: 'Bị đơn dân sự'
                },
                {
                    value: 'Người có quyền lợi, nghĩa vụ liên quan',
                    text: 'Người có quyền lợi, nghĩa vụ liên quan'
                },
                {
                    value: 'Người bào chữa',
                    text: 'Người bào chữa'
                },
                {
                    value: 'Người giám định',
                    text: 'Người giám định'
                },
                {
                    value: 'Người phiên dịch',
                    text: 'Người phiên dịch'
                },
                {
                    value: 'Người đại diện hợp pháp',
                    text: 'Người đại diện hợp pháp'
                }
            ]
        },
        gioiTinhComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Nam',
                    text: 'Nam'
                },
                {
                    value: 'Nữ',
                    text: 'Nữ'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        peopleGridStore: {
            fields: ['id', 'stt', 'hoTen', 'vaiTro', 'gioiTinh', 'cccd', 'soDt', 'noiO', 'details',
                { name: 'ngaySinh', type: 'date' }],
            pageSize: 10,
            proxy: { type: 'memory', enablePaging: true, reader: { type: 'json' } }
        }
    },

    createDemoData: function () {
        return Array.from({ length: 24 }, function (unused, index) {
            return {
                id: 'demo-' + index,
                hoTen: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Minh Châu', 'Phạm Thu Dung'][index % 4] + ' (mẫu ' + (index + 1) + ')',
                vaiTro: ['Bị can', 'Bị hại', 'Người làm chứng'][index % 3],
                gioiTinh: index % 2 ? 'Nữ' : 'Nam',
                ngaySinh: new Date(1985 + index, index % 12, 10),
                cccd: '000000' + String(index + 1).padStart(6, '0'),
                soDt: '',
                noiO: 'Địa chỉ mẫu ' + (index + 1) + ', Hà Nội'
            };
        });
    }
});
