Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DataView2', {
    singleton: true,

    tongQuan: [
        {
            'code': 'DANG_QUAN_LY',
            'name': 'Tổng số hồ sơ đang quản lý',
            'typeLech': 1,
            'val': 11932,
            'valLech': null
        },
        {
            'code': 'LAP_MOI',
            'name': 'Mở mới trong kỳ',
            'typeLech': 1,
            'val': 12835,
            'valLech': null
        },
        {
            'code': 'DA_KET_THUC',
            'name': 'Kết thúc trong kỳ',
            'typeLech': 1,
            'val': 903,
            'valLech': null
        },
        {
            'code': 'CHUYEN_MUC',
            'name': 'Chuyển mức trong kỳ',
            'typeLech': 1,
            'val': 531,
            'valLech': null
        },
        {
            'code': 'PER_LAP_MOI',
            'name': 'Phần trăm mở mới trong kỳ',
            'typeLech': 1,
            'val': 12835,
            'valLech': 7104
        },
        {
            'code': 'PER_DA_KET_THUC',
            'name': 'Phần trăm kết thúc trong kỳ',
            'typeLech': 1,
            'val': 903,
            'valLech': 780
        }
    ],
    loaiHoSo: [
        {
            'code': 'DTCB',
            'name': 'Điều tra cơ bản',
            'val': 1246
        },
        {
            'code': 'SUUTRA',
            'name': 'Sưu tra',
            'val': 941
        },
        {
            'code': 'HIEMNGHI',
            'name': 'Hiềm nghi',
            'val': 1542
        },
        {
            'code': 'CHUYENAN',
            'name': 'Chuyên án',
            'val': 532
        },
        {
            'code': 'CTVBM',
            'name': 'Cộng tác viên bí mật',
            'val': 6982
        },
        {
            'code': 'HTBM',
            'name': 'Hộp thư bí mật',
            'val': 323
        },
        {
            'code': 'VANV',
            'name': 'Vai ảo NV',
            'val': 289
        },
        {
            'code': 'NNV',
            'name': 'Nhà ngiệp vụ',
            'val': 77
        }
    ],
    coCauHoSoTheoDonVi: [
        {
            'capDonVi': 'CUC',
            'val': 547
        },
        {
            'capDonVi': 'TINH',
            'val': 9371
        },
        {
            'capDonVi': 'XA',
            'val': 2014
        }
    ],
    bienDongHoSoTheoDonVi: [
        {
            'code': 202511,
            'cuc': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2025',
            'tinh': 27,
            'xa': 0
        },
        {
            'code': 202512,
            'cuc': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2025',
            'tinh': 26,
            'xa': 0
        },
        {
            'code': 202601,
            'cuc': 2,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2025',
            'tinh': 141,
            'xa': 5
        },
        {
            'code': 202602,
            'cuc': 62,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2025',
            'tinh': 244,
            'xa': 17
        },
        {
            'code': 202603,
            'cuc': 32,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2026',
            'tinh': 633,
            'xa': 378
        },
        {
            'code': 202604,
            'cuc': 238,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2026',
            'tinh': 1226,
            'xa': 1328
        },
        {
            'code': 202605,
            'cuc': 44,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2026',
            'tinh': 125,
            'xa': 29
        },
        {
            'code': 202606,
            'cuc': 50,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2026',
            'tinh': 336,
            'xa': 78
        },
        {
            'code': 202607,
            'cuc': 22,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2026',
            'tinh': 414,
            'xa': 70
        },
        {
            'code': 202608,
            'cuc': 43,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2026',
            'tinh': 259,
            'xa': 31
        },
        {
            'code': 202609,
            'cuc': 23,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2026',
            'tinh': 147,
            'xa': 22
        },
        {
            'code': 202610,
            'cuc': 6,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2026',
            'tinh': 99,
            'xa': 26
        },
        {
            'code': 202611,
            'cuc': 11,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2026',
            'tinh': 62,
            'xa': 20
        },
        {
            'code': 202612,
            'cuc': 4,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2026',
            'tinh': 88,
            'xa': 9
        }
    ],
    loaiDoiTuong: [
        {
            'code': '029',
            'name': 'Hình sự',
            'val': 972
        },
        {
            'code': '030',
            'name': 'Kinh tế',
            'val': 154
        },
        {
            'code': '031',
            'name': 'Ma túy',
            'val': 563
        },
        {
            'code': '032',
            'name': 'Môi trường',
            'val': 58
        },
        {
            'code': '-1',
            'name': 'Khác',
            'val': 477
        }
    ],
    dienBienMoMoiVaKetThuc: [
        {
            'code': 198903,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1989'
        },
        {
            'code': 198904,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1989'
        },
        {
            'code': 198905,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1989'
        },
        {
            'code': 198906,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1989'
        },
        {
            'code': 198907,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1989'
        },
        {
            'code': 198908,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1989'
        },
        {
            'code': 198909,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1989'
        },
        {
            'code': 198910,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1989'
        },
        {
            'code': 198911,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1989'
        },
        {
            'code': 198912,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1989'
        },
        {
            'code': 199001,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1989'
        },
        {
            'code': 199002,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1989'
        },
        {
            'code': 199003,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1990'
        },
        {
            'code': 199004,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1990'
        },
        {
            'code': 199005,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1990'
        },
        {
            'code': 199006,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1990'
        },
        {
            'code': 199007,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1990'
        },
        {
            'code': 199008,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1990'
        },
        {
            'code': 199009,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1990'
        },
        {
            'code': 199010,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1990'
        },
        {
            'code': 199011,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1990'
        },
        {
            'code': 199012,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1990'
        },
        {
            'code': 199101,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1990'
        },
        {
            'code': 199102,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1990'
        },
        {
            'code': 199103,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1991'
        },
        {
            'code': 199104,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1991'
        },
        {
            'code': 199105,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1991'
        },
        {
            'code': 199106,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1991'
        },
        {
            'code': 199107,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1991'
        },
        {
            'code': 199108,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1991'
        },
        {
            'code': 199109,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1991'
        },
        {
            'code': 199110,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1991'
        },
        {
            'code': 199111,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1991'
        },
        {
            'code': 199112,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1991'
        },
        {
            'code': 199201,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1991'
        },
        {
            'code': 199202,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1991'
        },
        {
            'code': 199203,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1992'
        },
        {
            'code': 199204,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1992'
        },
        {
            'code': 199205,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1992'
        },
        {
            'code': 199206,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1992'
        },
        {
            'code': 199207,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1992'
        },
        {
            'code': 199208,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1992'
        },
        {
            'code': 199209,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1992'
        },
        {
            'code': 199210,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1992'
        },
        {
            'code': 199211,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1992'
        },
        {
            'code': 199212,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1992'
        },
        {
            'code': 199301,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1992'
        },
        {
            'code': 199302,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1992'
        },
        {
            'code': 199303,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1993'
        },
        {
            'code': 199304,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1993'
        },
        {
            'code': 199305,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1993'
        },
        {
            'code': 199306,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1993'
        },
        {
            'code': 199307,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1993'
        },
        {
            'code': 199308,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1993'
        },
        {
            'code': 199309,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1993'
        },
        {
            'code': 199310,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1993'
        },
        {
            'code': 199311,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1993'
        },
        {
            'code': 199312,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1993'
        },
        {
            'code': 199401,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1993'
        },
        {
            'code': 199402,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1993'
        },
        {
            'code': 199403,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1994'
        },
        {
            'code': 199404,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1994'
        },
        {
            'code': 199405,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1994'
        },
        {
            'code': 199406,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1994'
        },
        {
            'code': 199407,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1994'
        },
        {
            'code': 199408,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1994'
        },
        {
            'code': 199409,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1994'
        },
        {
            'code': 199410,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1994'
        },
        {
            'code': 199411,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1994'
        },
        {
            'code': 199412,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1994'
        },
        {
            'code': 199501,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1994'
        },
        {
            'code': 199502,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1994'
        },
        {
            'code': 199503,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1995'
        },
        {
            'code': 199504,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1995'
        },
        {
            'code': 199505,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1995'
        },
        {
            'code': 199506,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1995'
        },
        {
            'code': 199507,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1995'
        },
        {
            'code': 199508,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1995'
        },
        {
            'code': 199509,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1995'
        },
        {
            'code': 199510,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1995'
        },
        {
            'code': 199511,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1995'
        },
        {
            'code': 199512,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1995'
        },
        {
            'code': 199601,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1995'
        },
        {
            'code': 199602,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1995'
        },
        {
            'code': 199603,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1996'
        },
        {
            'code': 199604,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1996'
        },
        {
            'code': 199605,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1996'
        },
        {
            'code': 199606,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1996'
        },
        {
            'code': 199607,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1996'
        },
        {
            'code': 199608,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1996'
        },
        {
            'code': 199609,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1996'
        },
        {
            'code': 199610,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1996'
        },
        {
            'code': 199611,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1996'
        },
        {
            'code': 199612,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1996'
        },
        {
            'code': 199701,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1996'
        },
        {
            'code': 199702,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1996'
        },
        {
            'code': 199703,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1997'
        },
        {
            'code': 199704,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1997'
        },
        {
            'code': 199705,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1997'
        },
        {
            'code': 199706,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1997'
        },
        {
            'code': 199707,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1997'
        },
        {
            'code': 199708,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1997'
        },
        {
            'code': 199709,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1997'
        },
        {
            'code': 199710,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1997'
        },
        {
            'code': 199711,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1997'
        },
        {
            'code': 199712,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1997'
        },
        {
            'code': 199801,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1997'
        },
        {
            'code': 199802,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1997'
        },
        {
            'code': 199803,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1998'
        },
        {
            'code': 199804,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1998'
        },
        {
            'code': 199805,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1998'
        },
        {
            'code': 199806,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1998'
        },
        {
            'code': 199807,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1998'
        },
        {
            'code': 199808,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1998'
        },
        {
            'code': 199809,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1998'
        },
        {
            'code': 199810,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1998'
        },
        {
            'code': 199811,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1998'
        },
        {
            'code': 199812,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1998'
        },
        {
            'code': 199901,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1998'
        },
        {
            'code': 199902,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1998'
        },
        {
            'code': 199903,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/1999'
        },
        {
            'code': 199904,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/1999'
        },
        {
            'code': 199905,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/1999'
        },
        {
            'code': 199906,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/1999'
        },
        {
            'code': 199907,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/1999'
        },
        {
            'code': 199908,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/1999'
        },
        {
            'code': 199909,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/1999'
        },
        {
            'code': 199910,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/1999'
        },
        {
            'code': 199911,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/1999'
        },
        {
            'code': 199912,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/1999'
        },
        {
            'code': 200001,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/1999'
        },
        {
            'code': 200002,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/1999'
        },
        {
            'code': 200003,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2000'
        },
        {
            'code': 200004,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2000'
        },
        {
            'code': 200005,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2000'
        },
        {
            'code': 200006,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2000'
        },
        {
            'code': 200007,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2000'
        },
        {
            'code': 200008,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2000'
        },
        {
            'code': 200009,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2000'
        },
        {
            'code': 200010,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2000'
        },
        {
            'code': 200011,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2000'
        },
        {
            'code': 200012,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2000'
        },
        {
            'code': 200101,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2000'
        },
        {
            'code': 200102,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2000'
        },
        {
            'code': 200103,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2001'
        },
        {
            'code': 200104,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2001'
        },
        {
            'code': 200105,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2001'
        },
        {
            'code': 200106,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2001'
        },
        {
            'code': 200107,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2001'
        },
        {
            'code': 200108,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2001'
        },
        {
            'code': 200109,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2001'
        },
        {
            'code': 200110,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2001'
        },
        {
            'code': 200111,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2001'
        },
        {
            'code': 200112,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2001'
        },
        {
            'code': 200201,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2001'
        },
        {
            'code': 200202,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2001'
        },
        {
            'code': 200203,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2002'
        },
        {
            'code': 200204,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2002'
        },
        {
            'code': 200205,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2002'
        },
        {
            'code': 200206,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2002'
        },
        {
            'code': 200207,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2002'
        },
        {
            'code': 200208,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2002'
        },
        {
            'code': 200209,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2002'
        },
        {
            'code': 200210,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2002'
        },
        {
            'code': 200211,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2002'
        },
        {
            'code': 200212,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2002'
        },
        {
            'code': 200301,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2002'
        },
        {
            'code': 200302,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2002'
        },
        {
            'code': 200303,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2003'
        },
        {
            'code': 200304,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2003'
        },
        {
            'code': 200305,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2003'
        },
        {
            'code': 200306,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2003'
        },
        {
            'code': 200307,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2003'
        },
        {
            'code': 200308,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2003'
        },
        {
            'code': 200309,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2003'
        },
        {
            'code': 200310,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2003'
        },
        {
            'code': 200311,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2003'
        },
        {
            'code': 200312,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2003'
        },
        {
            'code': 200401,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2003'
        },
        {
            'code': 200402,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2003'
        },
        {
            'code': 200403,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2004'
        },
        {
            'code': 200404,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2004'
        },
        {
            'code': 200405,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2004'
        },
        {
            'code': 200406,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2004'
        },
        {
            'code': 200407,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2004'
        },
        {
            'code': 200408,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2004'
        },
        {
            'code': 200409,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2004'
        },
        {
            'code': 200410,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2004'
        },
        {
            'code': 200411,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2004'
        },
        {
            'code': 200412,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2004'
        },
        {
            'code': 200501,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2004'
        },
        {
            'code': 200502,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2004'
        },
        {
            'code': 200503,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2005'
        },
        {
            'code': 200504,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2005'
        },
        {
            'code': 200505,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2005'
        },
        {
            'code': 200506,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2005'
        },
        {
            'code': 200507,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2005'
        },
        {
            'code': 200508,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2005'
        },
        {
            'code': 200509,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2005'
        },
        {
            'code': 200510,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2005'
        },
        {
            'code': 200511,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2005'
        },
        {
            'code': 200512,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2005'
        },
        {
            'code': 200601,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2005'
        },
        {
            'code': 200602,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2005'
        },
        {
            'code': 200603,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2006'
        },
        {
            'code': 200604,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2006'
        },
        {
            'code': 200605,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2006'
        },
        {
            'code': 200606,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2006'
        },
        {
            'code': 200607,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2006'
        },
        {
            'code': 200608,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2006'
        },
        {
            'code': 200609,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2006'
        },
        {
            'code': 200610,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2006'
        },
        {
            'code': 200611,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2006'
        },
        {
            'code': 200612,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2006'
        },
        {
            'code': 200701,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2006'
        },
        {
            'code': 200702,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2006'
        },
        {
            'code': 200703,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2007'
        },
        {
            'code': 200704,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2007'
        },
        {
            'code': 200705,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2007'
        },
        {
            'code': 200706,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2007'
        },
        {
            'code': 200707,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2007'
        },
        {
            'code': 200708,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2007'
        },
        {
            'code': 200709,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2007'
        },
        {
            'code': 200710,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2007'
        },
        {
            'code': 200711,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2007'
        },
        {
            'code': 200712,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2007'
        },
        {
            'code': 200801,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2007'
        },
        {
            'code': 200802,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2007'
        },
        {
            'code': 200803,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2008'
        },
        {
            'code': 200804,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2008'
        },
        {
            'code': 200805,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2008'
        },
        {
            'code': 200806,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2008'
        },
        {
            'code': 200807,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2008'
        },
        {
            'code': 200808,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2008'
        },
        {
            'code': 200809,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2008'
        },
        {
            'code': 200810,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2008'
        },
        {
            'code': 200811,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2008'
        },
        {
            'code': 200812,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2008'
        },
        {
            'code': 200901,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2008'
        },
        {
            'code': 200902,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2008'
        },
        {
            'code': 200903,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2009'
        },
        {
            'code': 200904,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2009'
        },
        {
            'code': 200905,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2009'
        },
        {
            'code': 200906,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2009'
        },
        {
            'code': 200907,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2009'
        },
        {
            'code': 200908,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2009'
        },
        {
            'code': 200909,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2009'
        },
        {
            'code': 200910,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2009'
        },
        {
            'code': 200911,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2009'
        },
        {
            'code': 200912,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2009'
        },
        {
            'code': 201001,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2009'
        },
        {
            'code': 201002,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2009'
        },
        {
            'code': 201003,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2010'
        },
        {
            'code': 201004,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2010'
        },
        {
            'code': 201005,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2010'
        },
        {
            'code': 201006,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2010'
        },
        {
            'code': 201007,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2010'
        },
        {
            'code': 201008,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2010'
        },
        {
            'code': 201009,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2010'
        },
        {
            'code': 201010,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2010'
        },
        {
            'code': 201011,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2010'
        },
        {
            'code': 201012,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2010'
        },
        {
            'code': 201101,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2010'
        },
        {
            'code': 201102,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2010'
        },
        {
            'code': 201103,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2011'
        },
        {
            'code': 201104,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2011'
        },
        {
            'code': 201105,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2011'
        },
        {
            'code': 201106,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2011'
        },
        {
            'code': 201107,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2011'
        },
        {
            'code': 201108,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2011'
        },
        {
            'code': 201109,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2011'
        },
        {
            'code': 201110,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2011'
        },
        {
            'code': 201111,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2011'
        },
        {
            'code': 201112,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2011'
        },
        {
            'code': 201201,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2011'
        },
        {
            'code': 201202,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2011'
        },
        {
            'code': 201203,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2012'
        },
        {
            'code': 201204,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2012'
        },
        {
            'code': 201205,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2012'
        },
        {
            'code': 201206,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2012'
        },
        {
            'code': 201207,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2012'
        },
        {
            'code': 201208,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2012'
        },
        {
            'code': 201209,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2012'
        },
        {
            'code': 201210,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2012'
        },
        {
            'code': 201211,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2012'
        },
        {
            'code': 201212,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2012'
        },
        {
            'code': 201301,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2012'
        },
        {
            'code': 201302,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2012'
        },
        {
            'code': 201303,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2013'
        },
        {
            'code': 201304,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2013'
        },
        {
            'code': 201305,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2013'
        },
        {
            'code': 201306,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2013'
        },
        {
            'code': 201307,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2013'
        },
        {
            'code': 201308,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2013'
        },
        {
            'code': 201309,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2013'
        },
        {
            'code': 201310,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2013'
        },
        {
            'code': 201311,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2013'
        },
        {
            'code': 201312,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2013'
        },
        {
            'code': 201401,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2013'
        },
        {
            'code': 201402,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2013'
        },
        {
            'code': 201403,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2014'
        },
        {
            'code': 201404,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2014'
        },
        {
            'code': 201405,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2014'
        },
        {
            'code': 201406,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2014'
        },
        {
            'code': 201407,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2014'
        },
        {
            'code': 201408,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2014'
        },
        {
            'code': 201409,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2014'
        },
        {
            'code': 201410,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2014'
        },
        {
            'code': 201411,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2014'
        },
        {
            'code': 201412,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2014'
        },
        {
            'code': 201501,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2014'
        },
        {
            'code': 201502,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2014'
        },
        {
            'code': 201503,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2015'
        },
        {
            'code': 201504,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2015'
        },
        {
            'code': 201505,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2015'
        },
        {
            'code': 201506,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2015'
        },
        {
            'code': 201507,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2015'
        },
        {
            'code': 201508,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2015'
        },
        {
            'code': 201509,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2015'
        },
        {
            'code': 201510,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2015'
        },
        {
            'code': 201511,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2015'
        },
        {
            'code': 201512,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2015'
        },
        {
            'code': 201601,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2015'
        },
        {
            'code': 201602,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2015'
        },
        {
            'code': 201603,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2016'
        },
        {
            'code': 201604,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2016'
        },
        {
            'code': 201605,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2016'
        },
        {
            'code': 201606,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2016'
        },
        {
            'code': 201607,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2016'
        },
        {
            'code': 201608,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2016'
        },
        {
            'code': 201609,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2016'
        },
        {
            'code': 201610,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2016'
        },
        {
            'code': 201611,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2016'
        },
        {
            'code': 201612,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2016'
        },
        {
            'code': 201701,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2016'
        },
        {
            'code': 201702,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2016'
        },
        {
            'code': 201703,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2017'
        },
        {
            'code': 201704,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2017'
        },
        {
            'code': 201705,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2017'
        },
        {
            'code': 201706,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2017'
        },
        {
            'code': 201707,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2017'
        },
        {
            'code': 201708,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2017'
        },
        {
            'code': 201709,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2017'
        },
        {
            'code': 201710,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2017'
        },
        {
            'code': 201711,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2017'
        },
        {
            'code': 201712,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2017'
        },
        {
            'code': 201801,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2017'
        },
        {
            'code': 201802,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2017'
        },
        {
            'code': 201803,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2018'
        },
        {
            'code': 201804,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2018'
        },
        {
            'code': 201805,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2018'
        },
        {
            'code': 201806,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2018'
        },
        {
            'code': 201807,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2018'
        },
        {
            'code': 201808,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2018'
        },
        {
            'code': 201809,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2018'
        },
        {
            'code': 201810,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2018'
        },
        {
            'code': 201811,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2018'
        },
        {
            'code': 201812,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2018'
        },
        {
            'code': 201901,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2018'
        },
        {
            'code': 201902,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2018'
        },
        {
            'code': 201903,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2019'
        },
        {
            'code': 201904,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2019'
        },
        {
            'code': 201905,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2019'
        },
        {
            'code': 201906,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2019'
        },
        {
            'code': 201907,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2019'
        },
        {
            'code': 201908,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2019'
        },
        {
            'code': 201909,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2019'
        },
        {
            'code': 201910,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2019'
        },
        {
            'code': 201911,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2019'
        },
        {
            'code': 201912,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2019'
        },
        {
            'code': 202001,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2019'
        },
        {
            'code': 202002,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2019'
        },
        {
            'code': 202003,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2020'
        },
        {
            'code': 202004,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2020'
        },
        {
            'code': 202005,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2020'
        },
        {
            'code': 202006,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2020'
        },
        {
            'code': 202007,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2020'
        },
        {
            'code': 202008,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2020'
        },
        {
            'code': 202009,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2020'
        },
        {
            'code': 202010,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2020'
        },
        {
            'code': 202011,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2020'
        },
        {
            'code': 202012,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2020'
        },
        {
            'code': 202101,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2020'
        },
        {
            'code': 202102,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2020'
        },
        {
            'code': 202103,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2021'
        },
        {
            'code': 202104,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2021'
        },
        {
            'code': 202105,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2021'
        },
        {
            'code': 202106,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2021'
        },
        {
            'code': 202107,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2021'
        },
        {
            'code': 202108,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2021'
        },
        {
            'code': 202109,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2021'
        },
        {
            'code': 202110,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2021'
        },
        {
            'code': 202111,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2021'
        },
        {
            'code': 202112,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2021'
        },
        {
            'code': 202201,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2021'
        },
        {
            'code': 202202,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2021'
        },
        {
            'code': 202203,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2022'
        },
        {
            'code': 202204,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2022'
        },
        {
            'code': 202205,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2022'
        },
        {
            'code': 202206,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2022'
        },
        {
            'code': 202207,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2022'
        },
        {
            'code': 202208,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2022'
        },
        {
            'code': 202209,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2022'
        },
        {
            'code': 202210,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2022'
        },
        {
            'code': 202211,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2022'
        },
        {
            'code': 202212,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2022'
        },
        {
            'code': 202301,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2022'
        },
        {
            'code': 202302,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2022'
        },
        {
            'code': 202303,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2023'
        },
        {
            'code': 202304,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2023'
        },
        {
            'code': 202305,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2023'
        },
        {
            'code': 202306,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2023'
        },
        {
            'code': 202307,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2023'
        },
        {
            'code': 202308,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2023'
        },
        {
            'code': 202309,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2023'
        },
        {
            'code': 202310,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2023'
        },
        {
            'code': 202311,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2023'
        },
        {
            'code': 202312,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2023'
        },
        {
            'code': 202401,
            'ketThuc': 0,
            'moMoi': 0,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2023'
        },
        {
            'code': 202402,
            'ketThuc': 0,
            'moMoi': 100,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2023'
        },
        {
            'code': 202403,
            'ketThuc': 0,
            'moMoi': 72,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2024'
        },
        {
            'code': 202404,
            'ketThuc': 0,
            'moMoi': 45,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2024'
        },
        {
            'code': 202405,
            'ketThuc': 3,
            'moMoi': 2031,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2024'
        },
        {
            'code': 202406,
            'ketThuc': 9,
            'moMoi': 1788,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2024'
        },
        {
            'code': 202407,
            'ketThuc': 9,
            'moMoi': 464,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2024'
        },
        {
            'code': 202408,
            'ketThuc': 3,
            'moMoi': 113,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2024'
        },
        {
            'code': 202409,
            'ketThuc': 13,
            'moMoi': 181,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2024'
        },
        {
            'code': 202410,
            'ketThuc': 5,
            'moMoi': 138,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2024'
        },
        {
            'code': 202411,
            'ketThuc': 1,
            'moMoi': 106,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2024'
        },
        {
            'code': 202412,
            'ketThuc': 8,
            'moMoi': 82,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2024'
        },
        {
            'code': 202501,
            'ketThuc': 8,
            'moMoi': 164,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2024'
        },
        {
            'code': 202502,
            'ketThuc': 0,
            'moMoi': 12,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2024'
        },
        {
            'code': 202503,
            'ketThuc': 3,
            'moMoi': 25,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2025'
        },
        {
            'code': 202504,
            'ketThuc': 2,
            'moMoi': 19,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2025'
        },
        {
            'code': 202505,
            'ketThuc': 14,
            'moMoi': 52,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2025'
        },
        {
            'code': 202506,
            'ketThuc': 1,
            'moMoi': 15,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2025'
        },
        {
            'code': 202507,
            'ketThuc': 7,
            'moMoi': 31,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2025'
        },
        {
            'code': 202508,
            'ketThuc': 6,
            'moMoi': 38,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2025'
        },
        {
            'code': 202509,
            'ketThuc': 4,
            'moMoi': 61,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2025'
        },
        {
            'code': 202510,
            'ketThuc': 20,
            'moMoi': 134,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2025'
        },
        {
            'code': 202511,
            'ketThuc': 5,
            'moMoi': 32,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2025'
        },
        {
            'code': 202512,
            'ketThuc': 2,
            'moMoi': 28,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2025'
        },
        {
            'code': 202601,
            'ketThuc': 23,
            'moMoi': 171,
            'name': 'T 11',
            'nameHover': 'Tháng 11/2025'
        },
        {
            'code': 202602,
            'ketThuc': 50,
            'moMoi': 373,
            'name': 'T 12',
            'nameHover': 'Tháng 12/2025'
        },
        {
            'code': 202603,
            'ketThuc': 64,
            'moMoi': 1107,
            'name': 'T 1',
            'nameHover': 'Tháng 1/2026'
        },
        {
            'code': 202604,
            'ketThuc': 164,
            'moMoi': 2956,
            'name': 'T 2',
            'nameHover': 'Tháng 2/2026'
        },
        {
            'code': 202605,
            'ketThuc': 63,
            'moMoi': 261,
            'name': 'T 3',
            'nameHover': 'Tháng 3/2026'
        },
        {
            'code': 202606,
            'ketThuc': 33,
            'moMoi': 497,
            'name': 'T 4',
            'nameHover': 'Tháng 4/2026'
        },
        {
            'code': 202607,
            'ketThuc': 25,
            'moMoi': 531,
            'name': 'T 5',
            'nameHover': 'Tháng 5/2026'
        },
        {
            'code': 202608,
            'ketThuc': 110,
            'moMoi': 443,
            'name': 'T 6',
            'nameHover': 'Tháng 6/2026'
        },
        {
            'code': 202609,
            'ketThuc': 94,
            'moMoi': 286,
            'name': 'T 7',
            'nameHover': 'Tháng 7/2026'
        },
        {
            'code': 202610,
            'ketThuc': 86,
            'moMoi': 217,
            'name': 'T 8',
            'nameHover': 'Tháng 8/2026'
        },
        {
            'code': 202611,
            'ketThuc': 28,
            'moMoi': 121,
            'name': 'T 9',
            'nameHover': 'Tháng 9/2026'
        },
        {
            'code': 202612,
            'ketThuc': 40,
            'moMoi': 141,
            'name': 'T 10',
            'nameHover': 'Tháng 10/2026'
        }
    ],
    topDiaBanCoNhieuHoSo: [
        {
            'code': '500101',
            'kyHieu': 'CATP Hà Nội',
            'name': 'CATP Hà Nội',
            'val': 7719
        },
        {
            'code': '500703',
            'kyHieu': 'CAT Lâm Đồng',
            'name': 'CAT Lâm Đồng',
            'val': 1069
        },
        {
            'code': '500815',
            'kyHieu': 'CATP Cần Thơ',
            'name': 'CATP Cần Thơ',
            'val': 767
        },
        {
            'code': '500211',
            'kyHieu': 'CAT Tuyên Quang',
            'name': 'CAT Tuyên Quang',
            'val': 301
        },
        {
            'code': '500215',
            'kyHieu': 'CAT Thái Nguyên',
            'name': 'CAT Thái Nguyên',
            'val': 292
        },
        {
            'code': '500117',
            'kyHieu': 'CAT Ninh Bình',
            'name': 'CAT Ninh Bình',
            'val': 231
        },
        {
            'code': '500409',
            'kyHieu': 'CAT Quảng Trị',
            'name': 'CAT Quảng Trị',
            'val': 130
        },
        {
            'code': '500603',
            'kyHieu': 'CAT Gia Lai',
            'name': 'CAT Gia Lai',
            'val': 107
        },
        {
            'code': '500701',
            'kyHieu': 'CATP Hồ Chí Minh',
            'name': 'CATP Hồ Chí Minh',
            'val': 77
        },
        {
            'code': '500713',
            'kyHieu': 'CATP Đồng Nai',
            'name': 'CATP Đồng Nai',
            'val': 65
        }
    ],
    canhBaoNoiBat: [
        {
            'code': 'QUA_HAN',
            'name': 'Hồ sơ quá hạn đánh giá',
            'val': 0
        },
        {
            'code': 'HET_HAN',
            'name': 'Hồ sơ sắp hết hạn đánh giá',
            'val': 0
        },
        {
            'code': 'BAT_THUONG',
            'name': 'Hồ sơ tăng mức bất thường',
            'val': 0
        },
        {
            'code': 'LIEN_QUAN',
            'name': 'Hồ sơ nhiều đơn vị liên quan',
            'val': 0
        }
    ]
});
