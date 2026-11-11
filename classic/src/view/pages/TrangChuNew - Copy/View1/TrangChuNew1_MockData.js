Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_MockData', {
    singleton: true,

    /** Dữ liệu mô phỏng theo đúng contract response DATA_MOCK của backend */
    getData: function () {
        return {
            chiSo: [
                {
                    code: 'HIEMNGHI',
                    typeLech: 1,
                    val: 11,
                    valLech: 11
                },
                {
                    code: 'VANV',
                    typeLech: -1,
                    val: 136,
                    valLech: 5
                },
                {
                    code: 'SUUTRA',
                    typeLech: -1,
                    val: 361,
                    valLech: 5
                },
                {
                    code: 'CTVBM',
                    typeLech: -1,
                    val: 5469,
                    valLech: 89
                },
                {
                    code: 'CHUYENAN',
                    typeLech: -1,
                    val: 382,
                    valLech: 11
                },
                {
                    code: 'DTCB',
                    typeLech: -1,
                    val: 337,
                    valLech: 11
                },
                {
                    code: 'HTBM',
                    typeLech: -1,
                    val: 7777,
                    valLech: 140
                },
                {
                    code: 'TONG',
                    typeLech: -1,
                    val: 125,
                    valLech: 2
                }
            ],
            trangThaiChartStore: [
                {
                    name: 'Lập mới',
                    soLuong: 3884
                },
                {
                    name: 'Đang quản lý',
                    soLuong: 8658
                },
                {
                    name: 'Chưa có hồ sơ',
                    soLuong: 2068
                },
                {
                    name: 'Đã kết thúc',
                    soLuong: 707
                }
            ],
            hieuQuaDtcb: [
                {
                    code: 'HIEMNGHI',
                    name: 'Số đối tượng được đưa vào sưu tra từ ĐTCB ',
                    val: 10
                },
                {
                    code: 'SUUTRA',
                    name: 'Số hiềm nghi được xác lập từ ĐTCB',
                    val: 26
                },
                {
                    code: 'CHUYENAN',
                    name: 'Số chuyên án trinh sát được xác lập từ ĐTCB',
                    val: 13
                },
                {
                    code: 'CTVBM',
                    name: 'Số vụ vi phạm hành chính được phát hiện từ ĐTCB',
                    val: 11
                },
                {
                    code: 'HINHSU',
                    name: 'Số vụ vi phạm hình sự được phát hiện từ ĐTCB',
                    val: 7
                },
                {
                    code: 'HANHCHINH',
                    name: 'Số đối tượng đưa đi CSGD bắt buộc từ ĐTCB',
                    val: 6
                },
                {
                    code: 'TGD',
                    name: 'Số đối tượng đưa đi TGD từ ĐTCB',
                    val: 1
                },
                {
                    code: 'CSCNBB',
                    name: 'Số đối tượng đưa đi CSCNBB từ ĐTCB',
                    val: 2
                },
                {
                    code: 'CSGD',
                    name: 'Số CTVBM được xây dựng từ ĐTCB',
                    val: 1
                },
                {
                    code: 'VANBAN',
                    name: 'Số biện pháp, giải pháp PCTP, bảo đảm TTATXH được tham mưu, đề xuất từ ĐTCB',
                    val: 3
                }
            ],
            hieuQuaSuuTra: [
                {
                    code: 'SL_KQ_B1',
                    name: 'Sưu tra được quản lý, cảm hóa, giáo dục tiến bộ và loại khỏi diện sưu tra',
                    val: 5
                },
                {
                    code: 'SL_KQ_B2',
                    name: 'Sưu tra có đủ căn cứ và xác lập được hiềm nghi hoặc đẩy lên đối tượng hiềm nghi',
                    val: 62
                },
                {
                    code: 'SL_KQ_B3',
                    name: 'Sưu tra có đủ căn cứ và xác lập được chuyên án trinh sát hoặc đẩy lên đối tượng chuyên án',
                    val: 17
                },
                {
                    code: 'SL_KQ_B4',
                    name: 'Sưu tra đã thu thập được tài liệu chứng minh hành vi phạm tội hoặc đã có quyết định khởi tố bị can',
                    val: 4
                },
                {
                    code: 'SL_KQ_B5',
                    name: 'Sưu tra đã thu thập được tài liệu chứng minh hành vi vi phạm pháp luật chưa đến mức xử lý hình sự',
                    val: 4
                },
                {
                    code: 'SL_KQ_B6',
                    name: 'Sưu tra đã lập hồ sơ đề nghị áp dụng biện pháp giáo dục tại xã, phường, thị trấn',
                    val: 5
                },
                {
                    code: 'SL_KQ_B7',
                    name: 'Sưu tra đã đưa vào cơ sở giáo dục bắt buộc',
                    val: 4
                },
                {
                    code: 'SL_KQ_B8',
                    name: 'Sưu tra đã đưa vào trường giáo dưỡng',
                    val: 1
                },
                {
                    code: 'SL_KQ_B9',
                    name: 'Sưu tra đã đưa vào cơ sở cai nghiện bắt buộc',
                    val: 0
                },
                {
                    code: 'SL_KQ_B10',
                    name: 'Sưu tra được cảm hóa, xây dựng thành CTVBM',
                    val: 0
                }
            ],
            lucLuong: [
                {
                    code: '017001',
                    name: 'Lực lượng Cảnh sát hình sự',
                    val: 1844
                },
                {
                    code: '017002',
                    name: 'Lực lượng Cảnh sát kinh tế, môi trường',
                    val: 813
                },
                {
                    code: '017003',
                    name: 'Lực lượng Cảnh sát điều tra tội phạm về ma túy',
                    val: 380
                },
                {
                    code: '017004',
                    name: 'Lực lượng Cảnh sát quản lý hành chính về trật tự xã hội',
                    val: 262
                },
                {
                    code: '017005',
                    name: 'Lực lượng Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ',
                    val: 71
                },
                {
                    code: '017006',
                    name: 'Lực lượng Cảnh sát giao thông',
                    val: 110
                },
                {
                    code: '017007',
                    name: 'Lực lượng Kỹ thuật hình sự',
                    val: 38
                },
                {
                    code: '017008',
                    name: 'Lực lượng Văn phòng Cơ quan cảnh sát điều tra',
                    val: 848
                },
                {
                    code: '017009',
                    name: 'Lực lượng Cảnh sát cơ động',
                    val: 23
                },
                {
                    code: '017010',
                    name: 'Lực lượng Cảnh sát quản lý tạm giữ, tạm giam và thi hành án hình sự tại cộng đồng',
                    val: 28
                },
                {
                    code: '017011',
                    name: 'Lực lượng Cảnh sát quản lý trại giam, cơ sở giáo dục bắt buộc, trường giáo dưỡng',
                    val: 85
                },
                {
                    code: '017012',
                    name: 'Công an cấp xã',
                    val: 3225
                },
                {
                    code: '017013',
                    name: 'Đồn Công an',
                    val: 38
                },
                {
                    code: '017014',
                    name: 'Trung tâm Dữ liệu Quốc gia',
                    val: 2
                }
            ],
            donViStore: [
                {
                    code: '500101032',
                    name: 'Phòng Cảnh sát điều tra tội phạm về tham nhũng, kinh tế, buôn lậu, môi trường',
                    kyHieu: 'PC03',
                    val: 6503
                },
                {
                    code: '500101030',
                    name: 'Văn phòng Cơ quan Cảnh sát điều tra',
                    kyHieu: 'VP CQCSĐT',
                    val: 865
                },
                {
                    code: '500101031',
                    name: 'Phòng Cảnh sát điều tra tội phạm về trật tự xã hội',
                    kyHieu: 'PC02',
                    val: 398
                },
                {
                    code: '500101011',
                    name: 'Phòng An ninh nội địa',
                    kyHieu: 'PA02',
                    val: 27
                },
                {
                    code: '500101439',
                    name: 'Công an phường Long Biên',
                    kyHieu: 'CAP Long Biên',
                    val: 27
                },
                {
                    code: '500101033',
                    name: 'Phòng Cảnh sát điều tra tội phạm về ma túy',
                    kyHieu: 'PC04',
                    val: 25
                },
                {
                    code: '500101400',
                    name: 'Công an phường Hoàn Kiếm',
                    kyHieu: 'CAP Hoàn Kiếm',
                    val: 18
                },
                {
                    code: '500101452',
                    name: 'Công an phường Thanh Liệt',
                    kyHieu: 'CAP Thanh Liệt',
                    val: 10
                },
                {
                    code: '500101402',
                    name: 'Công an phường Ba Đình',
                    kyHieu: 'CAP Ba Đình',
                    val: 10
                },
                {
                    code: '500101055',
                    name: 'Phòng Hồ sơ nghiệp vụ',
                    kyHieu: 'PV06',
                    val: 9
                }
            ],
            namThongKeDonVi: [
                {
                    code: 202512,
                    ketThuc: 0,
                    moMoi: 0,
                    name: 'T 10',
                    nameHover: 'Tháng 10/2025'
                },
                {
                    code: 202601,
                    ketThuc: 31,
                    moMoi: 208,
                    name: 'T 11',
                    nameHover: 'Tháng 11/2026'
                },
                {
                    code: 202602,
                    ketThuc: 52,
                    moMoi: 317,
                    name: 'T 12',
                    nameHover: 'Tháng 12/2026'
                },
                {
                    code: 202603,
                    ketThuc: 43,
                    moMoi: 330,
                    name: 'T 1',
                    nameHover: 'Tháng 1/2026'
                },
                {
                    code: 202604,
                    ketThuc: 76,
                    moMoi: 220,
                    name: 'T 2',
                    nameHover: 'Tháng 2/2026'
                },
                {
                    code: 202605,
                    ketThuc: 58,
                    moMoi: 147,
                    name: 'T 3',
                    nameHover: 'Tháng 3/2026'
                },
                {
                    code: 202606,
                    ketThuc: 28,
                    moMoi: 319,
                    name: 'T 4',
                    nameHover: 'Tháng 4/2026'
                },
                {
                    code: 202607,
                    ketThuc: 23,
                    moMoi: 463,
                    name: 'T 5',
                    nameHover: 'Tháng 5/2026'
                },
                {
                    code: 202608,
                    ketThuc: 120,
                    moMoi: 364,
                    name: 'T 6',
                    nameHover: 'Tháng 6/2026'
                },
                {
                    code: 202609,
                    ketThuc: 97,
                    moMoi: 237,
                    name: 'T 7',
                    nameHover: 'Tháng 7/2026'
                },
                {
                    code: 202610,
                    ketThuc: 80,
                    moMoi: 193,
                    name: 'T 8',
                    nameHover: 'Tháng 8/2026'
                },
                {
                    code: 202611,
                    ketThuc: 19,
                    moMoi: 77,
                    name: 'T 9',
                    nameHover: 'Tháng 9/2026'
                },
                {
                    code: 202612,
                    ketThuc: 33,
                    moMoi: 81,
                    name: 'T 10',
                    nameHover: 'Tháng 10/2026'
                }
            ]
        };
    }
});