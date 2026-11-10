Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_MockData', {
    singleton: true,
    /** Dữ liệu mẫu dạng response; cấu hình trình bày thuộc DisplayConfig. */
    getData: function () {
        return {
            chiSo: [
                { code: 'DANG_QUAN_LY', name: 'Tổng số hồ sơ đang quản lý', val: 256842, typeLech: 0, valLech: null },
                { code: 'LAP_MOI', name: 'Mở mới trong kỳ', val: 12436, typeLech: 1, valLech: 681 },
                { code: 'DA_KET_THUC', name: 'Kết thúc trong kỳ', val: 10978, typeLech: 1, valLech: 757 },
                { code: 'CHUYEN_MUC', name: 'Chuyển mức trong kỳ', val: 1203, typeLech: -1, valLech: 26 },
                { code: 'SAP_DEN_HAN', name: 'Sắp đến hạn', val: 8673, typeLech: 0, valLech: null },
                { code: 'QUA_HAN', name: 'Quá hạn', val: 3421, typeLech: 1, valLech: 384 }
            ],
            loaiHoSo: [
                { code: 'DTCB', name: 'ĐTCB', val: 9142 },
                { code: 'SUUTRA', name: 'Sưu tra', val: 4123 },
                { code: 'HIEMNGHI', name: 'Hiềm nghi', val: 2861 },
                { code: 'CHUYENAN', name: 'Chuyên án', val: 1647 },
                { code: 'CTVBM', name: 'CTVBM', val: 511 },
                { code: 'HTBM', name: 'HTBM', val: 342 }
            ],
            donVi: [
                { code: 'P1', name: 'Phòng 1', val: 420 },
                { code: 'P2', name: 'Phòng 2', val: 580 },
                { code: 'P3', name: 'Phòng 3', val: 310 },
                { code: 'P4', name: 'Phòng 4', val: 460 },
                { code: 'P5', name: 'Phòng 5', val: 220 }
            ],
            dienBien: [
                { code: 202601, name: 'T1', nameHover: 'Tháng 1/2026', moMoi: 320, ketThuc: 310 },
                { code: 202602, name: 'T2', nameHover: 'Tháng 2/2026', moMoi: 410, ketThuc: 330 },
                { code: 202603, name: 'T3', nameHover: 'Tháng 3/2026', moMoi: 530, ketThuc: 380 },
                { code: 202604, name: 'T4', nameHover: 'Tháng 4/2026', moMoi: 440, ketThuc: 420 },
                { code: 202605, name: 'T5', nameHover: 'Tháng 5/2026', moMoi: 470, ketThuc: 435 },
                { code: 202606, name: 'T6', nameHover: 'Tháng 6/2026', moMoi: 490, ketThuc: 430 },
                { code: 202607, name: 'T7', nameHover: 'Tháng 7/2026', moMoi: 460, ketThuc: 425 },
                { code: 202608, name: 'T8', nameHover: 'Tháng 8/2026', moMoi: 590, ketThuc: 450 },
                { code: 202609, name: 'T9', nameHover: 'Tháng 9/2026', moMoi: 670, ketThuc: 510 },
                { code: 202610, name: 'T10', nameHover: 'Tháng 10/2026', moMoi: 600, ketThuc: 470 },
                { code: 202611, name: 'T11', nameHover: 'Tháng 11/2026', moMoi: 530, ketThuc: 455 },
                { code: 202612, name: 'T12', nameHover: 'Tháng 12/2026', moMoi: 470, ketThuc: 440 }
            ],
            capTinh: [
                { code: 'DTCB', name: 'ĐTCB', val: 6 },
                { code: 'SUUTRA', name: 'Sưu tra', val: 1 },
                { code: 'HIEMNGHI', name: 'Hiềm nghi', val: 2 },
                { code: 'CHUYENAN', name: 'Chuyên án', val: 7 },
                { code: 'CTVBM', name: 'CTVBM', val: 12 },
                { code: 'HTBM', name: 'HTBM', val: 2 },
                { code: 'VANV', name: 'Vai ảo NV', val: 8 },
                { code: 'NNV', name: 'Nhà nghiệp vụ', val: 0 }
            ],
            capXa: [
                { code: 'DTCB', name: 'ĐTCB', val: 4 },
                { code: 'SUUTRA', name: 'Sưu tra', val: 2 },
                { code: 'HIEMNGHI', name: 'Hiềm nghi', val: 1 },
                { code: 'CHUYENAN', name: 'Chuyên án', val: 5 },
                { code: 'CTVBM', name: 'CTVBM', val: 9 },
                { code: 'HTBM', name: 'HTBM', val: 1 },
                { code: 'VANV', name: 'Vai ảo NV', val: 6 },
                { code: 'NNV', name: 'Nhà nghiệp vụ', val: 0 }
            ],
            topTinh: [
                { code: 'HN', name: 'Công an TP. Hà Nội', val: 1840 },
                { code: 'HCM', name: 'Công an TP. Hồ Chí Minh', val: 1520 },
                { code: 'BD', name: 'Công an tỉnh Bình Dương', val: 965 },
                { code: 'DN', name: 'Công an TP. Đà Nẵng', val: 740 },
                { code: 'HP', name: 'Công an TP. Hải Phòng', val: 620 }
            ],
            topXa: [
                { code: 'HANGTRONG', name: 'Công an Phường Hàng Trống (Hoàn Kiếm, HN)', val: 425 },
                { code: 'BENNGHE', name: 'Công an Phường Bến Nghé (Quận 1, TP.HCM)', val: 380 },
                { code: 'THUANPHUOC', name: 'Công an Phường Thuận Phước (Hải Châu, Đà Nẵng)', val: 310 },
                { code: 'ANKHANH', name: 'Công an Xã An Khánh (Hoài Đức, HN)', val: 285 },
                { code: 'DIAN', name: 'Công an Phường Dĩ An (TP. Dĩ An, Bình Dương)', val: 260 }
            ]
        };
    }
});
