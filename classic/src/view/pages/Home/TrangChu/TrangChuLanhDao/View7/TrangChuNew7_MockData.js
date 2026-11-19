/**
 * Dữ liệu mẫu View7 (chưa có API): tongQuan = số cán bộ theo chức vụ, danhSachCanBo = danh sách cán bộ.
 * Số liệu tongQuan là tổng toàn hệ thống; danh sách mẫu chỉ gồm một phần cán bộ.
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_MockData', {
    singleton: true,

    getData: function () {
        return {
            tongQuan: [
                {
                    "groupCode": "TONG_SO_CAN_BO",
                    "name": "Tổng số cán bộ",
                    "ord": 0,
                    "value": 4611
                },
                {
                    "groupCode": "CUC_TRUONG",
                    "name": "Cục trưởng",
                    "ord": 1,
                    "value": 2
                },
                {
                    "groupCode": "PHO_CUC_TRUONG",
                    "name": "Phó cục trưởng",
                    "ord": 2,
                    "value": 1
                },
                {
                    "groupCode": "GIAM_DOC",
                    "name": "Giám đốc",
                    "ord": 3,
                    "value": 2
                },
                {
                    "groupCode": "PHO_GIAM_DOC",
                    "name": "Phó giám đốc",
                    "ord": 4,
                    "value": 11
                },
                {
                    "groupCode": "TRUONG_PHONG",
                    "name": "Trưởng phòng",
                    "ord": 5,
                    "value": 39
                },
                {
                    "groupCode": "PHO_TRUONG_PHONG",
                    "name": "Phó Trưởng phòng",
                    "ord": 6,
                    "value": 156
                },
                {
                    "groupCode": "DOI_TRUONG",
                    "name": "Đội trưởng",
                    "ord": 7,
                    "value": 108
                },
                {
                    "groupCode": "PHO_DOI_TRUONG",
                    "name": "Phó đội trưởng",
                    "ord": 8,
                    "value": 515
                },
                {
                    "groupCode": "TRUONG_CONG_AN_XA_PHUONG_DAC_KHU",
                    "name": "Trưởng công an xã, phường, đặc khu",
                    "ord": 9,
                    "value": 441
                },
                {
                    "groupCode": "PHO_CONG_AN_XA_PHUONG_DAC_KHU",
                    "name": "Phó Trưởng Công an xã, phường, đặc khu",
                    "ord": 10,
                    "value": 1438
                },
                {
                    "groupCode": "CAN_BO",
                    "name": "Cán bộ",
                    "ord": 11,
                    "value": 20696
                }
            ],

            danhSachCanBo: [
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Đức Huy",
                    "ID": "c3d7867c-c5cd-4833-aeec-71ccc7993b1f",
                    "MA_DON_VI": "500703482",
                    "SO_HIEU_CAND": "393-917",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Tân Minh"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Đức Giang",
                    "ID": "11cd86ef-7143-430b-917c-09cad6cbbc72",
                    "MA_DON_VI": "500215443",
                    "SO_HIEU_CAND": "172-162",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Phượng Tiến"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Đức Anh",
                    "ID": "ac100306-8513-1134-8185-32a472931805",
                    "MA_DON_VI": "500101514",
                    "SO_HIEU_CAND": "117-834",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Đông Anh"
                },
                {
                    "CODE": "6102",
                    "HO_TEN": "Đỗ Đăng Phương",
                    "ID": "783d0de6-059e-4f80-899f-1da61889bdfc",
                    "MA_DON_VI": "500605456",
                    "SO_HIEU_CAND": "389-519",
                    "SO_HO_SO_DANG_THUC_HIEN": 0,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Phó Trưởng Công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Cư Pui"
                },
                {
                    "CODE": "6101",
                    "HO_TEN": "Đỗ Đình Tài",
                    "ID": "633b2996-f2ae-4ba8-a4bb-60658692bc46",
                    "MA_DON_VI": "500401472",
                    "SO_HIEU_CAND": "216-725",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Trưởng công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Thọ Long"
                },
                {
                    "CODE": "6102",
                    "HO_TEN": "Đỗ Đình Thăng",
                    "ID": "155b7fbb-570b-4183-bc2f-c25e5feaebcb",
                    "MA_DON_VI": "500401473",
                    "SO_HIEU_CAND": "217-685",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Phó Trưởng Công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Xuân Hòa"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Đoàn Tiến Dũng",
                    "ID": "8a1ebd23-5f2a-4ce9-bea8-ff93186fd91b",
                    "MA_DON_VI": "500703036003",
                    "SO_HIEU_CAND": "716-323",
                    "SO_HO_SO_DANG_THUC_HIEN": 4,
                    "SO_HO_SO_PHU_TRACH": 4,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Đội Công tác phòng cháy"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Xuân Trung",
                    "ID": "bbc146dd-0b4d-4f80-b645-19f4cf2165c5",
                    "MA_DON_VI": "500701555",
                    "SO_HIEU_CAND": "038-908",
                    "SO_HO_SO_DANG_THUC_HIEN": 4,
                    "SO_HO_SO_PHU_TRACH": 5,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Phú Hòa Đông"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Xuân Nam",
                    "ID": "2545d526-6621-4075-b114-87dea77ddf5a",
                    "MA_DON_VI": "500511442",
                    "SO_HIEU_CAND": "482-277",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an phường Đông Hải"
                },
                {
                    "CODE": "6002",
                    "HO_TEN": "Đỗ Xuân Bẩy",
                    "ID": "8333dabd-ec6c-4577-a6f4-9a3a4371e612",
                    "MA_DON_VI": "500101942006",
                    "SO_HIEU_CAND": "112-041",
                    "SO_HO_SO_DANG_THUC_HIEN": 2,
                    "SO_HO_SO_PHU_TRACH": 2,
                    "TEN_CHUC_VU": "Phó đội trưởng",
                    "TEN_DON_VI": "Đội Cảnh sát ĐTTP về trật tự xã hội"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Việt",
                    "ID": "580bccf4-b8da-4e32-a813-4efdfb6ad369",
                    "MA_DON_VI": "500409431",
                    "SO_HIEU_CAND": "384-901",
                    "SO_HO_SO_DANG_THUC_HIEN": 3,
                    "SO_HO_SO_PHU_TRACH": 3,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Ninh Châu"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Tú",
                    "ID": "313d3861-b249-46bf-b09a-c685d788952a",
                    "MA_DON_VI": "500401017003",
                    "SO_HIEU_CAND": "216-634",
                    "SO_HO_SO_DANG_THUC_HIEN": 3,
                    "SO_HO_SO_PHU_TRACH": 3,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Đội Quản lý xuất cảnh, nhập cảnh của công dân Việt Nam"
                },
                {
                    "CODE": "6102",
                    "HO_TEN": "Đỗ Văn Tuyền",
                    "ID": "563ad5b8-4555-407c-9ce6-541c1045e7ce",
                    "MA_DON_VI": "500701420",
                    "SO_HIEU_CAND": "466-028",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Phó Trưởng Công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Hòa Hội"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Thắng",
                    "ID": "7f000001-84f6-133b-8184-fa4f670b0561",
                    "MA_DON_VI": "500101447",
                    "SO_HIEU_CAND": "801-769",
                    "SO_HO_SO_DANG_THUC_HIEN": 0,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an phường Kiến Hưng"
                },
                {
                    "CODE": "6201",
                    "HO_TEN": "Đỗ Văn Thương",
                    "ID": "0ce1bf78-162f-4448-835b-01a859054a77",
                    "MA_DON_VI": "500815411",
                    "SO_HIEU_CAND": "442-295",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Trưởng công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an phường Phước Thới"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Thành",
                    "ID": "883e5c0d-1564-4527-b44f-9422750c1353",
                    "MA_DON_VI": "500215033011",
                    "SO_HIEU_CAND": "174-310",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Đội Phòng ngừa, điều tra tội phạm trong lĩnh vực sản xuất trái phép chất ma túy"
                },
                {
                    "CODE": "6102",
                    "HO_TEN": "Đỗ Văn Sơn",
                    "ID": "7414d813-e4cf-48fe-bf20-9b795c704448",
                    "MA_DON_VI": "500709425",
                    "SO_HIEU_CAND": "417-094",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Phó Trưởng Công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Đông Thành"
                },
                {
                    "CODE": "6102",
                    "HO_TEN": "Đỗ Văn Sáu",
                    "ID": "cc5e5c2d-e7a7-4203-b1ea-9dbfa7a4de5a",
                    "MA_DON_VI": "500809932061",
                    "SO_HIEU_CAND": "436-793",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Phó Trưởng Công an xã, phường, đặc khu",
                    "TEN_DON_VI": "Công an xã Đông Thạnh"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Năng",
                    "ID": "e48f64eb-5f58-4881-9c28-1d7105bd63bb",
                    "MA_DON_VI": "500701520",
                    "SO_HIEU_CAND": "289-652",
                    "SO_HO_SO_DANG_THUC_HIEN": 2,
                    "SO_HO_SO_PHU_TRACH": 3,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an phường Bảy Hiền"
                },
                {
                    "CODE": "0000",
                    "HO_TEN": "Đỗ Văn Mạnh",
                    "ID": "1216e554-f25d-4f90-b8f8-6192523eb89c",
                    "MA_DON_VI": "500217479",
                    "SO_HIEU_CAND": "326-395",
                    "SO_HO_SO_DANG_THUC_HIEN": 1,
                    "SO_HO_SO_PHU_TRACH": 1,
                    "TEN_CHUC_VU": "Cán bộ",
                    "TEN_DON_VI": "Công an xã Tam Dương"
                }
            ]
        };
    }
});
