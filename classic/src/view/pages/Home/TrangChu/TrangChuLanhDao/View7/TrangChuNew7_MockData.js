/**
 * Dữ liệu mẫu View7 (chưa có API): tongQuan = số cán bộ theo chức vụ, danhSachCanBo = danh sách cán bộ.
 * Số liệu tongQuan là tổng toàn hệ thống; danh sách mẫu chỉ gồm một phần cán bộ.
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_MockData', {
    singleton: true,

    getData: function () {
        return {
            tongQuan: [
                { code: 'TONG', name: 'Tổng số cán bộ', val: 486 },
                { code: 'CUC_TRUONG', name: 'Cục trưởng/Giám đốc', val: 12 },
                { code: 'PHO_CUC_TRUONG', name: 'Phó Cục trưởng/Phó Giám đốc', val: 68 },
                { code: 'TRUONG_PHONG', name: 'Trưởng phòng', val: 486 },
                { code: 'PHO_TRUONG_PHONG', name: 'Phó Trưởng phòng', val: 721 },
                { code: 'DOI_TRUONG', name: 'Đội trưởng', val: 1932 },
                { code: 'DOI_PHO', name: 'Đội phó', val: 3214 },
                { code: 'TRUONG_CAX', name: 'Trưởng Công an Xã/Phường/Đặc khu', val: 3321 },
                { code: 'PHO_TRUONG_CAX', name: 'Phó Trưởng Công an Xã/Phường/Đặc khu', val: 6540 },
                { code: 'CAN_BO', name: 'Cán bộ', val: 12684 }
            ],

            danhSachCanBo: [
                { id: 1, hoTen: 'Nguyễn Văn Dũng', soHieu: '123401', chucVuCode: 'CUC_TRUONG', chucVu: 'Cục trưởng', donVi: 'Cục Cảnh sát hình sự', tongHoSo: 312, dangThucHien: 140 },
                { id: 2, hoTen: 'Trần Quốc Bảo', soHieu: '123402', chucVuCode: 'PHO_CUC_TRUONG', chucVu: 'Phó Cục trưởng', donVi: 'Cục Cảnh sát hình sự', tongHoSo: 268, dangThucHien: 121 },
                { id: 3, hoTen: 'Lê Thị Minh', soHieu: '123403', chucVuCode: 'PHO_CUC_TRUONG', chucVu: 'Phó Cục trưởng', donVi: 'Cục An ninh kinh tế', tongHoSo: 254, dangThucHien: 117 },
                { id: 4, hoTen: 'Phạm Đức Anh', soHieu: '123404', chucVuCode: 'TRUONG_PHONG', chucVu: 'Trưởng phòng', donVi: 'Phòng Cảnh sát hình sự', tongHoSo: 196, dangThucHien: 92 },
                { id: 5, hoTen: 'Vũ Hoàng Nam', soHieu: '123405', chucVuCode: 'TRUONG_PHONG', chucVu: 'Trưởng phòng', donVi: 'Phòng An ninh kinh tế', tongHoSo: 184, dangThucHien: 88 },
                { id: 6, hoTen: 'Đặng Thu Trang', soHieu: '123406', chucVuCode: 'TRUONG_PHONG', chucVu: 'Trưởng phòng', donVi: 'Phòng Cảnh sát kinh tế', tongHoSo: 171, dangThucHien: 80 },
                { id: 7, hoTen: 'Hoàng Văn Long', soHieu: '123407', chucVuCode: 'PHO_TRUONG_PHONG', chucVu: 'Phó Trưởng phòng', donVi: 'Phòng Cảnh sát hình sự', tongHoSo: 158, dangThucHien: 74 },
                { id: 8, hoTen: 'Bùi Thị Hạnh', soHieu: '123408', chucVuCode: 'PHO_TRUONG_PHONG', chucVu: 'Phó Trưởng phòng', donVi: 'Phòng An ninh kinh tế', tongHoSo: 149, dangThucHien: 70 },
                { id: 9, hoTen: 'Ngô Quang Vinh', soHieu: '123409', chucVuCode: 'PHO_TRUONG_PHONG', chucVu: 'Phó Trưởng phòng', donVi: 'Phòng Cảnh sát kinh tế', tongHoSo: 143, dangThucHien: 66 },
                { id: 10, hoTen: 'Nguyễn Văn D', soHieu: '123456', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Phòng ngừa – Phòng CSHS', tongHoSo: 128, dangThucHien: 72 },
                { id: 11, hoTen: 'Trần Thị Hương', soHieu: '123457', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Quản lý đối tượng – Phòng CSHS', tongHoSo: 142, dangThucHien: 76 },
                { id: 12, hoTen: 'Lê Quốc Tuấn', soHieu: '123458', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Địa bàn trọng điểm – Phòng CSKT', tongHoSo: 118, dangThucHien: 65 },
                { id: 13, hoTen: 'Phạm Minh Hải', soHieu: '123459', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Chuyên đề – Phòng CSKT', tongHoSo: 136, dangThucHien: 81 },
                { id: 14, hoTen: 'Vũ Thị Lan', soHieu: '123460', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Tổng hợp – Phòng ANKT', tongHoSo: 110, dangThucHien: 63 },
                { id: 15, hoTen: 'Đặng Văn Sơn', soHieu: '123461', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Quản lý ngành nghề kinh doanh', tongHoSo: 120, dangThucHien: 66 },
                { id: 16, hoTen: 'Hoàng Trung Kiên', soHieu: '123462', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Phòng ngừa xã hội – Phòng ANTT', tongHoSo: 108, dangThucHien: 59 },
                { id: 17, hoTen: 'Ngô Thu Hà', soHieu: '123463', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Quản lý đối tượng – CA TP A', tongHoSo: 134, dangThucHien: 75 },
                { id: 18, hoTen: 'Bùi Văn Thái', soHieu: '123464', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Địa bàn – CA huyện B', tongHoSo: 112, dangThucHien: 61 },
                { id: 19, hoTen: 'Đỗ Quang Huy', soHieu: '123465', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Tổng hợp – CA huyện C', tongHoSo: 126, dangThucHien: 70 },
                { id: 20, hoTen: 'Lý Văn Phúc', soHieu: '123466', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Điều tra – CA huyện D', tongHoSo: 115, dangThucHien: 62 },
                { id: 21, hoTen: 'Trịnh Thị Mai', soHieu: '123467', chucVuCode: 'DOI_TRUONG', chucVu: 'Đội trưởng', donVi: 'Đội Cảnh sát kinh tế – CA TP E', tongHoSo: 104, dangThucHien: 57 },
                { id: 27, hoTen: 'Cao Văn Thắng', soHieu: '123481', chucVuCode: 'DOI_PHO', chucVu: 'Đội phó', donVi: 'Đội Phòng ngừa – Phòng CSHS', tongHoSo: 92, dangThucHien: 48 },
                { id: 28, hoTen: 'Mai Thị Thu', soHieu: '123482', chucVuCode: 'DOI_PHO', chucVu: 'Đội phó', donVi: 'Đội Chuyên đề – Phòng CSKT', tongHoSo: 87, dangThucHien: 45 },
                { id: 29, hoTen: 'Tạ Quang Minh', soHieu: '123483', chucVuCode: 'DOI_PHO', chucVu: 'Đội phó', donVi: 'Đội Quản lý đối tượng – CA TP A', tongHoSo: 81, dangThucHien: 40 },
                { id: 30, hoTen: 'Hồ Văn Bình', soHieu: '123491', chucVuCode: 'TRUONG_CAX', chucVu: 'Trưởng Công an xã', donVi: 'Công an xã Tân Lập – CA huyện B', tongHoSo: 76, dangThucHien: 39 },
                { id: 31, hoTen: 'Dương Thị Lụa', soHieu: '123492', chucVuCode: 'TRUONG_CAX', chucVu: 'Trưởng Công an phường', donVi: 'Công an phường Hòa Bình – CA TP A', tongHoSo: 84, dangThucHien: 44 },
                { id: 32, hoTen: 'Kiều Văn Hậu', soHieu: '123493', chucVuCode: 'TRUONG_CAX', chucVu: 'Trưởng Công an đặc khu', donVi: 'Công an đặc khu Cồn Cỏ', tongHoSo: 58, dangThucHien: 27 },
                { id: 33, hoTen: 'Lương Văn Tú', soHieu: '123495', chucVuCode: 'PHO_TRUONG_CAX', chucVu: 'Phó Trưởng Công an xã', donVi: 'Công an xã Tân Lập – CA huyện B', tongHoSo: 63, dangThucHien: 31 },
                { id: 34, hoTen: 'Âu Thị Hằng', soHieu: '123496', chucVuCode: 'PHO_TRUONG_CAX', chucVu: 'Phó Trưởng Công an phường', donVi: 'Công an phường Hòa Bình – CA TP A', tongHoSo: 69, dangThucHien: 35 },
                { id: 35, hoTen: 'Quách Văn Định', soHieu: '123497', chucVuCode: 'PHO_TRUONG_CAX', chucVu: 'Phó Trưởng Công an xã', donVi: 'Công an xã Hưng Đạo – CA huyện C', tongHoSo: 55, dangThucHien: 26 },
                { id: 22, hoTen: 'Phan Văn Toàn', soHieu: '123501', chucVuCode: 'CAN_BO', chucVu: 'Cán bộ', donVi: 'Đội Phòng ngừa – Phòng CSHS', tongHoSo: 46, dangThucHien: 28 },
                { id: 23, hoTen: 'Nguyễn Thị Hoa', soHieu: '123502', chucVuCode: 'CAN_BO', chucVu: 'Cán bộ', donVi: 'Đội Quản lý đối tượng – Phòng CSHS', tongHoSo: 39, dangThucHien: 22 },
                { id: 24, hoTen: 'Lê Văn Khánh', soHieu: '123503', chucVuCode: 'CAN_BO', chucVu: 'Cán bộ', donVi: 'Đội Địa bàn trọng điểm – Phòng CSKT', tongHoSo: 52, dangThucHien: 31 },
                { id: 25, hoTen: 'Trần Minh Quân', soHieu: '123504', chucVuCode: 'CAN_BO', chucVu: 'Cán bộ', donVi: 'Đội Chuyên đề – Phòng CSKT', tongHoSo: 44, dangThucHien: 26 },
                { id: 26, hoTen: 'Đỗ Thị Ngọc', soHieu: '123505', chucVuCode: 'CAN_BO', chucVu: 'Cán bộ', donVi: 'Đội Tổng hợp – Phòng ANKT', tongHoSo: 37, dangThucHien: 19 }
            ]
        };
    }
});
