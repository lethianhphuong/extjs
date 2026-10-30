Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dexuatctvbm',

    data: {
        currentUser: {
            name: 'Vũ Tiến Phúc',
            avatarInitial: 'P',
            role: 'Cán bộ đề xuất'
        },

        totalYCTC: 0,
        selectedYCTC: null,

        // ================= FORM THÔNG TIN CHUNG =================
        thongTinChung: {
            doMat: 'Tối mật',
            ngayXayDung: new Date(2026, 5, 9),
            loaiCtvbm: 'Đặc tình',
            nguonLap: 'Từ nguồn khác',
            loai: 'Loại 1',
            biDanh: '111',
            ghiChu: '',
            vaiAo: false,
            heLucLuong: 'Lực lượng Văn phòng Cơ quan cảnh sát điều tra',
            linhVucChinh: 'Lĩnh vực Phòng, chống người Việt Nam vi phạm pháp luật, phạm tội tại nước ngoài',
            linhVucLienQuan: '',
            ngayKy: new Date(2026, 5, 9),
            ngayDuKienSinhHoat: null,
            isNoLeaderAcc: false,
            lanhDaoKy: 'Nguyễn Thanh Tùng',
            lanhDaoKyText: '',
            nhiemVuCtvbm: 'Thông tin về diễn biến, hoạt động của đối tượng trong trại giam, trại...',
            mucDichChinh: 'Phục vụ truy bắt đối tượng truy nã',
            mucDichKemTheo: ''
        },

        // ================= MODAL 1: CHỌN CON NGƯỜI =================
        mockPeopleData: [
            { stt: 1, hoTen: 'Vũ Tiến Phúc', gioiTinh: 'Nam', ngaySinh: '05/11/2000', cccd: '034567784388', hoChieu: 'HC833', maConNguoi: '8377KGY833' },
            { stt: 2, hoTen: 'Vũ Tiến Phúc', gioiTinh: 'Nam', ngaySinh: '01/02/1995', cccd: '0345677843435', hoChieu: '', maConNguoi: '8377KGY833' }
        ],
        searchQuery: {
            hoTen: '',
            gioiTinh: '',
            ngaySinh: '',
            cccd: '',
            hoChieu: ''
        },
        selectedPerson: null,
        selectedPersonIndex: null,
        qrPersonGenerated: false,
        generatedPersonCode: '8377KGY833',
        btnChonVisible: false,
        btnTaoYctcVisible: false,

        // ================= MODAL 2: PHIẾU YCTC B5 =================
        b5Data: {
            mucDichTraCuu: '',
            donViHoSo: {
                v06: false,
                pv06: false
            },
            lanhDaoDonVi: '',
            capBac: '',
            chucVu: '',
            noiDungTraCuu: '',
            btnTaoMaYctcVisible: false
        },
        b5UnitsSelected: '',

        // ================= MODAL 3: KẾT QUẢ YCTC B5 =================
        yctcGeneratedList: [],
        modal3Config: {
            viewModeOnly: false,
            btnHoanThanhVisible: true,
            personCode: '8377KGY833',
            blockV06Visible: false,
            codeV06: '8377KGY834',
            blockPV06Visible: false,
            codePV06: '8377KGY836'
        },

        // ================= MODAL 4: GỬI PHẢN ÁNH, GÓP Ý =================
        feedbackData: {
            tieuDe: '',
            noiDung: ''
        }
    },

    formulas: {
        totalYCTCBadge: function (get) {
            const count = get('totalYCTC');
            return 'Tổng số yêu cầu: <b style="color: #065f46; font-weight: 700;">' + count + '</b>';
        },
        lookupRequestsCount: function (get) {
            return get('totalYCTC') || 0;
        },
        lookupRequestsCountText: function (get) {
            return 'Tổng số yêu cầu: ' + (get('totalYCTC') || 0);
        },
        hasSelectedPerson: function (get) {
            return !(!get('selectedPerson'));
        },
        hasGeneratedPersonCode: function (get) {
            return !(!get('generatedPersonCode'));
        },
        isModal3ViewMode: function (get) {
            return !(!get('modal3Config.viewModeOnly'));
        }
    },

    stores: {
        loaiCtvbmStore: {
            fields: ['value', 'text'],
            data: [
                { value: 'Đặc tình', text: 'Đặc tình' },
                { value: 'Cơ sở bí mật', text: 'Cơ sở bí mật' }
            ]
        },

        nguonLapStore: {
            fields: ['value', 'text'],
            data: [
                { value: 'Từ nguồn khác', text: 'Từ nguồn khác' },
                { value: 'Trực tiếp trinh sát', text: 'Trực tiếp trinh sát' },
                { value: 'Đơn vị bạn chuyển giao', text: 'Đơn vị bạn chuyển giao' }
            ]
        },

        loaiStore: {
            fields: ['value', 'text'],
            data: [
                { value: 'Loại 1', text: 'Loại 1' },
                { value: 'Loại 2', text: 'Loại 2' },
                { value: 'Loại 3', text: 'Loại 3' }
            ]
        },

        heLucLuongStore: {
            fields: ['value', 'text'],
            data: [
                {
                    value: 'Lực lượng Văn phòng Cơ quan cảnh sát điều tra',
                    text: 'Lực lượng Văn phòng Cơ quan cảnh sát điều tra'
                },
                {
                    value: 'Lực lượng Cảnh sát hình sự',
                    text: 'Lực lượng Cảnh sát hình sự'
                },
                {
                    value: 'Lực lượng Cảnh sát điều tra tội phạm về ma túy',
                    text: 'Lực lượng Cảnh sát điều tra tội phạm về ma túy'
                },
                {
                    value: 'Lực lượng An ninh mạng và phòng chống tội phạm sử dụng công nghệ cao',
                    text: 'Lực lượng An ninh mạng và phòng chống tội phạm sử dụng công nghệ cao'
                }
            ]
        },

        linhVucChinhStore: {
            fields: ['value', 'text'],
            data: [
                {
                    value: 'Lĩnh vực Phòng, chống người Việt Nam vi phạm pháp luật, phạm tội tại nước ngoài',
                    text: 'Lĩnh vực Phòng, chống người Việt Nam vi phạm pháp luật, phạm tội tại nước ngoài'
                },
                {
                    value: 'Lĩnh vực An ninh trật tự xã hội trọng điểm',
                    text: 'Lĩnh vực An ninh trật tự xã hội trọng điểm'
                },
                {
                    value: 'Lĩnh vực Phòng chống tội phạm có tổ chức, xuyên quốc gia',
                    text: 'Lĩnh vực Phòng chống tội phạm có tổ chức, xuyên quốc gia'
                }
            ]
        },

        linhVucLienQuanStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: '-- Chọn lĩnh vực liên quan --' },
                { value: 'Lĩnh vực Quản lý xuất nhập cảnh', text: 'Lĩnh vực Quản lý xuất nhập cảnh' },
                { value: 'Lĩnh vực Trinh sát kỹ thuật', text: 'Lĩnh vực Trinh sát kỹ thuật' },
                { value: 'Lĩnh vực An ninh mạng', text: 'Lĩnh vực An ninh mạng' }
            ]
        },

        lanhDaoKyStore: {
            fields: ['value', 'text'],
            data: [
                { value: 'Nguyễn Thanh Tùng', text: 'Nguyễn Thanh Tùng' },
                { value: 'Trần Quốc Toản', text: 'Trần Quốc Toản' },
                { value: 'Lê Hồng Minh', text: 'Lê Hồng Minh' }
            ]
        },

        mucDichKemTheoStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: '-- Chọn mục đích xây dựng kèm theo --' },
                {
                    value: 'Thu thập tài liệu, bằng chứng phục vụ mở rộng chuyên án',
                    text: 'Thu thập tài liệu, bằng chứng phục vụ mở rộng chuyên án'
                },
                {
                    value: 'Nắm tình hình an ninh trật tự địa bàn giáp ranh',
                    text: 'Nắm tình hình an ninh trật tự địa bàn giáp ranh'
                }
            ]
        },

        yeuCauTraCuuGridStore: {
            fields: [
                'id',
                'stt',
                'maYC',
                'donViYC',
                'donViHS',
                'mucDich',
                'ngayTao',
                'ngayNhan',
                'trangThai',
                'lyDo'
            ],
            data: []
        },

        mucDichTraCuuB5Store: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: '-- Chọn mục đích tra cứu --' },
                { value: 'Đặc tình', text: 'Đặc tình' },
                { value: 'Cơ sở bí mật', text: 'Cơ sở bí mật' },
                { value: 'CTV danh dự', text: 'CTV danh dự' }
            ]
        },

        lanhDaoDonViB5Store: {
            fields: ['value', 'text', 'capBac', 'chucVu'],
            data: [
                { value: 'Lê Phước Lâm', text: 'Lê Phước Lâm', capBac: 'Thượng tá', chucVu: 'Trưởng phòng' },
                { value: 'Nguyễn Xuân Trường', text: 'Nguyễn Xuân Trường', capBac: 'Thượng tá', chucVu: 'Trưởng phòng' },
                { value: 'Đặng Văn Hiếu', text: 'Đặng Văn Hiếu', capBac: 'Thượng tá', chucVu: 'Trưởng phòng' },
                { value: 'Trịnh Trọng Nam', text: 'Trịnh Trọng Nam', capBac: 'Thượng tá', chucVu: 'Trưởng phòng' },
                { value: 'Trần Việt Tùng', text: 'Trần Việt Tùng', capBac: 'Thượng tá', chucVu: 'Trưởng phòng' }
            ]
        },

        mockPeopleStore: {
            fields: ['stt', 'hoTen', 'gioiTinh', 'ngaySinh', 'cccd', 'hoChieu', 'maConNguoi'],
            data: [
                {
                    stt: 1,
                    hoTen: 'Vũ Tiến Phúc',
                    gioiTinh: 'Nam',
                    ngaySinh: '05/11/2000',
                    cccd: '034567784388',
                    hoChieu: 'HC833',
                    maConNguoi: '8377KGY833'
                },
                {
                    stt: 2,
                    hoTen: 'Vũ Tiến Phúc',
                    gioiTinh: 'Nam',
                    ngaySinh: '01/02/1995',
                    cccd: '0345677843435',
                    hoChieu: '',
                    maConNguoi: '8377KGY833'
                }
            ]
        }
    }
});
