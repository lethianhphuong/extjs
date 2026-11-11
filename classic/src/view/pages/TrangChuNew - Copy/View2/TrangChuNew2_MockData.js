Ext.define('DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_MockData', {
    singleton: true,

    /** Trả dữ liệu mẫu theo cấu trúc phản hồi nguồn. */
    getData: function () {
        return {
            tongQuan: [
                {
                    "code": "DTCB",
                    "val": 6
                },
                {
                    "code": "SUUTRA",
                    "val": 1
                },
                {
                    "code": "HIEMNGHI",
                    "val": 2
                },
                {
                    "code": "CHUYENAN",
                    "val": 7
                },
                {
                    "code": "CTVBM",
                    "val": 12
                },
                {
                    "code": "HTBM",
                    "val": 2
                },
                {
                    "code": "VANV",
                    "val": 8
                },
                {
                    "code": "NNV",
                    "val": 0
                }
            ],
            ĐTCB: [
                {
                    "code": "036001006",
                    "name": "Lĩnh vực",
                    "val": 2
                },
                {
                    "code": "036001007",
                    "name": "Hệ Loại",
                    "val": 1
                },
                {
                    "code": "036001008",
                    "name": "Hội, nhóm, tài khoản không gian mạng",
                    "val": 3
                }
            ],

            HIEM_NGHI: [
                {
                    "code": "036003001",
                    "name": "Hiềm nghi cá nhân",
                    "val": 2
                },
                {
                    "code": "036003003001",
                    "name": "Hiềm nghi tổ chức",
                    "val": null
                },
                {
                    "code": "036003002",
                    "name": "Hiềm nghi việc, hiện tượng",
                    "val": null
                }
            ],
            ChuyenAn: [
                {
                    "code": "036004001",
                    "name": "Chuyên án trinh sát",
                    "val": 7
                },
                {
                    "code": "036004002",
                    "name": "Chuyên án truy xét",
                    "val": null
                }
            ],
            CTVBM: [
                {
                    "code": "036005001",
                    "name": "Đặc tình",
                    "val": 0
                },
                {
                    "code": "036005002",
                    "name": "Cơ sở bí mật",
                    "val": 12
                },
                {
                    "code": "036005003",
                    "name": "Cộng tác viên danh dự",
                    "val": 0
                }
            ],
            phanLoai: [
                {
                    "code": "10006",
                    "name": "Sưu tra loại A",
                    "val": 1
                },
                {
                    "code": "10007",
                    "name": "Sưu tra loại B",
                    "val": 0
                }
            ],
            danhMuc: [
                {
                    "code": "011",
                    "name": "Danh muc I",
                    "val": 1
                },
                {
                    "code": "012",
                    "name": "Danh muc II",
                    "val": 0
                },
                {
                    "code": "013",
                    "name": "Danh muc III",
                    "val": 0
                },
                {
                    "code": "014",
                    "name": "Danh muc IV",
                    "val": 0
                }
            ],
            loaiDoituong: [
                {
                    "code": "029",
                    "name": "Hình sự",
                    "val": 3
                },
                {
                    "code": "030",
                    "name": "Kinh tế",
                    "val": 0
                },
                {
                    "code": "031",
                    "name": "Ma túy",
                    "val": 0
                },
                {
                    "code": "032",
                    "name": "Môi trường",
                    "val": 0
                },
                {
                    "code": "-1",
                    "name": "Khác",
                    "val": 0
                }
            ]
        };
    }
});
