Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_MockData', {
    singleton: true,

    /** Dữ liệu minh họa gồm đúng 7 phần; mỗi lần gọi trả về object mới. */
    getData: function () {
        return {
            tongQuan: [
                { ma: 'tongHoSo', soLuong: 12568, thayDoi: 342 },
                { ma: 'dtcb', soLuong: 9142, thayDoi: 185 },
                { ma: 'suuTra', soLuong: 4123, thayDoi: 64 },
                { ma: 'hiemNghi', soLuong: 2861, thayDoi: -38 },
                { ma: 'chuyenAn', soLuong: 1647, thayDoi: 12 },
                { ma: 'ctvbm', soLuong: 511, thayDoi: 19 },
                { ma: 'htbm', soLuong: 3420, thayDoi: -15 },
                { ma: 'vaiAo', soLuong: 3426, thayDoi: 52 }
            ],
            hoSoTheoTrangThai: [
                { ma: 'dangQuanLy', soLuong: 4123 },
                { ma: 'daKetThuc', soLuong: 2861 },
                { ma: 'lapMoi', soLuong: 1647 },
                { ma: 'chuaCoSoHoSo', soLuong: 511 }
            ],
            hieuQuaDtcb: [
                { ma: 'suuTra', soLuong: 727 },
                { ma: 'hiemNghi', soLuong: 201 },
                { ma: 'chuyenAn', soLuong: 52 },
                { ma: 'choDanhGia', soLuong: 20 },
                { ma: 'xacMinh', soLuong: 45 },
                { ma: 'boSung', soLuong: 38 },
                { ma: 'theoDoi', soLuong: 32 },
                { ma: 'raSoat', soLuong: 28 },
                { ma: 'phoiHop', soLuong: 24 },
                { ma: 'danhGia', soLuong: 19 },
                { ma: 'deXuat', soLuong: 14 },
                { ma: 'luuTru', soLuong: 10 }
            ],
            hieuQuaSuuTra: [
                { ma: 'dtcb', soLuong: 727 },
                { ma: 'hiemNghi', soLuong: 201 },
                { ma: 'chuyenAn', soLuong: 52 },
                { ma: 'choDanhGia', soLuong: 20 }
            ],
            hoSoTheoHeLucLuong: [
                { ma: 'tratTuXaHoi', soLuong: 3482 },
                { ma: 'maTuy', soLuong: 2156 },
                { ma: 'kinhTe', soLuong: 1042 },
                { ma: 'moiTruong', soLuong: 928 },
                { ma: 'khac', soLuong: 683 }
            ],
            hoSoTheoDonVi: {
                nam: 2026,
                items: [
                    { ma: 'haNoi', soLuong: 1242 },
                    { ma: 'tpHcm', soLuong: 1087 },
                    { ma: 'thanhHoa', soLuong: 685 },
                    { ma: 'ngheAn', soLuong: 592 },
                    { ma: 'dongNai', soLuong: 518 },
                    { ma: 'binhDuong', soLuong: 452 },
                    { ma: 'quangNinh', soLuong: 401 },
                    { ma: 'haiPhong', soLuong: 378 },
                    { ma: 'dakLak', soLuong: 312 },
                    { ma: 'canTho', soLuong: 282 }
                ]
            },
            dienBienHoSo: [
                { ky: 'T1', moMoi: 250, ketThuc: 175 },
                { ky: 'T2', moMoi: 350, ketThuc: 200 },
                { ky: 'T3', moMoi: 500, ketThuc: 275 },
                { ky: 'T4', moMoi: 375, ketThuc: 325 },
                { ky: 'T5', moMoi: 490, ketThuc: 375 },
                { ky: 'T6', moMoi: 500, ketThuc: 375 },
                { ky: 'T7', moMoi: 550, ketThuc: 375 },
                { ky: 'T8', moMoi: 490, ketThuc: 390 },
                { ky: 'T9', moMoi: 700, ketThuc: 510 },
                { ky: 'T10', moMoi: 575, ketThuc: 450 },
                { ky: 'T11', moMoi: 475, ketThuc: 375 },
                { ky: 'T12', moMoi: 425, ketThuc: 350 }
            ]
        };
    }
});
