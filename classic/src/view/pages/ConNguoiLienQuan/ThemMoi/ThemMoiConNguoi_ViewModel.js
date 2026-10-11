Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.themmoiconguoi',
    data: {
        person: {
            noiSinh_qg: 'Việt Nam', noiSinh_qg_old: 'Việt Nam',
            queQuan_qg: 'Việt Nam', queQuan_qg_old: 'Việt Nam',
            dktt_qg: 'Việt Nam', dktt_qg_old: 'Việt Nam',
            tamTru_qg: 'Việt Nam', tamTru_qg_old: 'Việt Nam',
            hienTai_qg: 'Việt Nam', hienTai_qg_old: 'Việt Nam',
            danToc: 'Kinh', quocTich: 'Việt Nam', tonGiao: 'Không', dangVien: 'Không', tienAn: 'Không' },
        oldAddresses: false,
        hasIncident: false
    },
    formulas: {
        isSapNhap: function (get) { return !get('oldAddresses'); }
    },
    stores: {
        //#region NOTE: Danh mục thông tin cá nhân; địa chỉ thuộc ComBoDiaChi
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
        danTocComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Kinh',
                    text: 'Kinh'
                },
                {
                    value: 'Tày',
                    text: 'Tày'
                },
                {
                    value: 'Thái',
                    text: 'Thái'
                },
                {
                    value: 'Mường',
                    text: 'Mường'
                },
                {
                    value: 'Khmer',
                    text: 'Khmer'
                },
                {
                    value: 'Hoa',
                    text: 'Hoa'
                },
                {
                    value: 'Nùng',
                    text: 'Nùng'
                },
                {
                    value: 'H\'Mông',
                    text: 'H\'Mông'
                },
                {
                    value: 'Dao',
                    text: 'Dao'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        quocTichComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Việt Nam',
                    text: 'Việt Nam'
                },
                {
                    value: 'Lào',
                    text: 'Lào'
                },
                {
                    value: 'Campuchia',
                    text: 'Campuchia'
                },
                {
                    value: 'Trung Quốc',
                    text: 'Trung Quốc'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        trinhDoComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không biết chữ',
                    text: 'Không biết chữ'
                },
                {
                    value: 'Tiểu học',
                    text: 'Tiểu học'
                },
                {
                    value: '9/12',
                    text: '9/12'
                },
                {
                    value: '12/12',
                    text: '12/12'
                },
                {
                    value: 'Trung cấp',
                    text: 'Trung cấp'
                },
                {
                    value: 'Cao đẳng',
                    text: 'Cao đẳng'
                },
                {
                    value: 'Đại học',
                    text: 'Đại học'
                },
                {
                    value: 'Sau đại học',
                    text: 'Sau đại học'
                }
            ]
        },
        ngheNghiepComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không nghề nghiệp',
                    text: 'Không nghề nghiệp'
                },
                {
                    value: 'Nông dân',
                    text: 'Nông dân'
                },
                {
                    value: 'Công nhân',
                    text: 'Công nhân'
                },
                {
                    value: 'Cán bộ, công chức',
                    text: 'Cán bộ, công chức'
                },
                {
                    value: 'Kinh doanh',
                    text: 'Kinh doanh'
                },
                {
                    value: 'Học sinh, sinh viên',
                    text: 'Học sinh, sinh viên'
                },
                {
                    value: 'Lao động tự do',
                    text: 'Lao động tự do'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        thanhPhanGdComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Nông dân',
                    text: 'Nông dân'
                },
                {
                    value: 'Công nhân',
                    text: 'Công nhân'
                },
                {
                    value: 'Cán bộ, viên chức',
                    text: 'Cán bộ, viên chức'
                },
                {
                    value: 'Tiểu thương',
                    text: 'Tiểu thương'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        tonGiaoComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Phật giáo',
                    text: 'Phật giáo'
                },
                {
                    value: 'Công giáo',
                    text: 'Công giáo'
                },
                {
                    value: 'Tin lành',
                    text: 'Tin lành'
                },
                {
                    value: 'Cao Đài',
                    text: 'Cao Đài'
                },
                {
                    value: 'Hòa Hảo',
                    text: 'Hòa Hảo'
                },
                {
                    value: 'Hồi giáo',
                    text: 'Hồi giáo'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        dangVienComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Có',
                    text: 'Có'
                }
            ]
        },
        tienAnComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Tiền án',
                    text: 'Tiền án'
                },
                {
                    value: 'Tiền sự',
                    text: 'Tiền sự'
                },
                {
                    value: 'Cả tiền án và tiền sự',
                    text: 'Cả tiền án và tiền sự'
                }
            ]
        },
        maTuyComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Có sử dụng',
                    text: 'Có sử dụng'
                },
                {
                    value: 'Nghiện',
                    text: 'Nghiện'
                },
                {
                    value: 'Đang cai nghiện',
                    text: 'Đang cai nghiện'
                }
            ]
        },
        lucLuongVtComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Quân đội',
                    text: 'Quân đội'
                },
                {
                    value: 'Công an',
                    text: 'Công an'
                },
                {
                    value: 'Cơ yếu',
                    text: 'Cơ yếu'
                }
            ]
        },
        doiTuongNvComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Không',
                    text: 'Không'
                },
                {
                    value: 'Đối tượng sưu tra',
                    text: 'Đối tượng sưu tra'
                },
                {
                    value: 'Đối tượng truy nã',
                    text: 'Đối tượng truy nã'
                },
                {
                    value: 'Đối tượng quản lý nghiệp vụ khác',
                    text: 'Đối tượng quản lý nghiệp vụ khác'
                }
            ]
        },
        //#endregion
        //#region NOTE: Danh mục đơn vị và trường hợp trốn/chết
        dvCap1ComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Trại tạm giam',
                    text: 'Trại tạm giam'
                },
                {
                    value: 'Nhà tạm giữ',
                    text: 'Nhà tạm giữ'
                },
                {
                    value: 'Trụ sở công an',
                    text: 'Trụ sở công an'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        dvCap2ComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: []
        },
        dvCap3ComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: []
        },
        tcLoaiComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'tron',
                    text: 'Trốn'
                },
                {
                    value: 'chet',
                    text: 'Chết'
                }
            ]
        },
        htTronComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Phá buồng giam, giữ',
                    text: 'Phá buồng giam, giữ'
                },
                {
                    value: 'Tấn công cán bộ',
                    text: 'Tấn công cán bộ'
                },
                {
                    value: 'Sơ hở của cán bộ',
                    text: 'Sơ hở của cán bộ'
                },
                {
                    value: 'khac',
                    text: 'Khác'
                }
            ]
        },
        ddTronComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Trại tạm giam',
                    text: 'Trại tạm giam'
                },
                {
                    value: 'Nhà tạm giữ',
                    text: 'Nhà tạm giữ'
                },
                {
                    value: 'Trụ sở công an',
                    text: 'Trụ sở công an'
                },
                {
                    value: 'Trên đường dẫn giải, áp giải',
                    text: 'Trên đường dẫn giải, áp giải'
                },
                {
                    value: 'khac',
                    text: 'Khác'
                }
            ]
        },
        kqTronComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Khởi tố vụ án',
                    text: 'Khởi tố vụ án'
                },
                {
                    value: 'Khởi tố bị can',
                    text: 'Khởi tố bị can'
                },
                {
                    value: 'Truy nã đối tượng',
                    text: 'Truy nã đối tượng'
                },
                {
                    value: 'Không khởi tố - Truy nã',
                    text: 'Không khởi tố - Truy nã'
                },
                {
                    value: 'Không khởi tố - Truy tìm',
                    text: 'Không khởi tố - Truy tìm'
                }
            ]
        },
        nnChetComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Bệnh lý',
                    text: 'Bệnh lý'
                },
                {
                    value: 'Tự sát',
                    text: 'Tự sát'
                },
                {
                    value: 'Bị cán bộ đánh',
                    text: 'Bị cán bộ đánh'
                },
                {
                    value: 'Bị đối tượng đánh',
                    text: 'Bị đối tượng đánh'
                },
                {
                    value: 'khac',
                    text: 'Khác'
                }
            ]
        },
        ddChetComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Trại tạm giam',
                    text: 'Trại tạm giam'
                },
                {
                    value: 'Nhà tạm giữ',
                    text: 'Nhà tạm giữ'
                },
                {
                    value: 'Trụ sở công an',
                    text: 'Trụ sở công an'
                },
                {
                    value: 'Trên đường dẫn giải, áp giải',
                    text: 'Trên đường dẫn giải, áp giải'
                },
                {
                    value: 'khac',
                    text: 'Khác'
                }
            ]
        },
        //#endregion
        //#region NOTE: Dữ liệu lưới quan hệ, trốn và chết của phiên làm việc
        relationsGridStore: { fields: ['qhTen', 'qhNam', 'qhGt', 'qhCccd', 'qhQuanHe', 'qhNoiO'], data: [] },
        escapesGridStore: { fields: ['ten', 'xuLy'], data: [] },
        deathsGridStore: { fields: ['ten', 'xuLy'], data: [] }
        //#endregion
    },
    //#region NOTE: Danh sách đơn vị con cho combo phụ thuộc
    unitOptions: {
        'Trại tạm giam': ['Trại tạm giam số 1 - CA TP Hà Nội', 'Trại tạm giam số 2 - CA TP Hà Nội', 'Trại tạm giam Chí Hòa', 'Trại tạm giam T16 - Bộ Công an'],
        'Nhà tạm giữ': ['Nhà tạm giữ CA quận Ba Đình', 'Nhà tạm giữ CA quận Đống Đa', 'Nhà tạm giữ CA TP Thủ Đức', 'Nhà tạm giữ CA huyện Gia Lâm'],
        'Trụ sở công an': ['Cơ quan CSĐT', 'Cơ quan khác', 'Công an xã'],
        'Cơ quan CSĐT': ['Cơ quan CSĐT Bộ Công an', 'Cơ quan CSĐT CA TP Hà Nội', 'Cơ quan CSĐT CA quận Cầu Giấy'],
        'Cơ quan khác': ['Cơ quan An ninh điều tra', 'Bộ đội Biên phòng', 'Cảnh sát biển', 'Kiểm lâm', 'Hải quan'],
        'Công an xã': ['Công an phường Ba Đình', 'Công an phường Hoàn Kiếm', 'Công an xã Đông Anh']
    }
    //#endregion
});
