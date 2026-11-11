Ext.define('DEMO.view.pages.BanDo.BanDo_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BanDo_ViewModel',

    data: {
        bandoImgUrl: 'classic/src/view/pages/Home/TrangChu/TrangChuLanhDao/View3/1268_transparent.png',
        filterDiaBan: '',
        tongSoHoSo: 11932,
        kpiSummary: {
            tongHoSo: '11.932',
            diaBanTrongDiem: '12',
            quaHan: '24',
            tyLeDungHan: '98,6%'
        }
    },

    stores: {
        diaBanStore: {
            fields: ['stt', 'diaBan', 'vungMien', 'dtcb', 'suuTra', 'hiemNghi', 'chuyenAn', 'tongSo', 'quaHan', 'tyLeDungHan'],
            data: [
                { stt: 1, diaBan: 'Hà Nội', vungMien: 'Miền Bắc', dtcb: 712, suuTra: 430, hiemNghi: 195, chuyenAn: 83, tongSo: 1420, quaHan: 3, tyLeDungHan: '98,8%' },
                { stt: 2, diaBan: 'TP. Hồ Chí Minh', vungMien: 'Miền Nam', dtcb: 680, suuTra: 395, hiemNghi: 182, chuyenAn: 78, tongSo: 1335, quaHan: 4, tyLeDungHan: '98,5%' },
                { stt: 3, diaBan: 'Hải Phòng', vungMien: 'Miền Bắc', dtcb: 440, suuTra: 250, hiemNghi: 120, chuyenAn: 54, tongSo: 864, quaHan: 2, tyLeDungHan: '98,9%' },
                { stt: 4, diaBan: 'Đà Nẵng', vungMien: 'Miền Trung', dtcb: 395, suuTra: 210, hiemNghi: 98, chuyenAn: 42, tongSo: 745, quaHan: 1, tyLeDungHan: '99,1%' },
                { stt: 5, diaBan: 'Cần Thơ', vungMien: 'Miền Nam', dtcb: 350, suuTra: 190, hiemNghi: 85, chuyenAn: 36, tongSo: 661, quaHan: 2, tyLeDungHan: '98,7%' },
                { stt: 6, diaBan: 'Nghệ An', vungMien: 'Miền Trung', dtcb: 310, suuTra: 175, hiemNghi: 74, chuyenAn: 30, tongSo: 589, quaHan: 1, tyLeDungHan: '99,0%' },
                { stt: 7, diaBan: 'Quảng Ninh', vungMien: 'Miền Bắc', dtcb: 290, suuTra: 160, hiemNghi: 68, chuyenAn: 28, tongSo: 546, quaHan: 2, tyLeDungHan: '98,6%' },
                { stt: 8, diaBan: 'Đồng Nai', vungMien: 'Miền Nam', dtcb: 275, suuTra: 150, hiemNghi: 62, chuyenAn: 25, tongSo: 512, quaHan: 1, tyLeDungHan: '99,2%' },
                { stt: 9, diaBan: 'Bình Dương', vungMien: 'Miền Nam', dtcb: 260, suuTra: 142, hiemNghi: 58, chuyenAn: 23, tongSo: 483, quaHan: 2, tyLeDungHan: '98,8%' },
                { stt: 10, diaBan: 'Thanh Hóa', vungMien: 'Miền Trung', dtcb: 245, suuTra: 135, hiemNghi: 52, chuyenAn: 20, tongSo: 452, quaHan: 1, tyLeDungHan: '99,1%' },
                { stt: 11, diaBan: 'Khánh Hòa', vungMien: 'Miền Trung', dtcb: 230, suuTra: 128, hiemNghi: 48, chuyenAn: 18, tongSo: 424, quaHan: 1, tyLeDungHan: '99,3%' },
                { stt: 12, diaBan: 'Bắc Ninh', vungMien: 'Miền Bắc', dtcb: 215, suuTra: 118, hiemNghi: 45, chuyenAn: 16, tongSo: 394, quaHan: 1, tyLeDungHan: '99,0%' },
                { stt: 13, diaBan: 'Hải Dương', vungMien: 'Miền Bắc', dtcb: 198, suuTra: 108, hiemNghi: 42, chuyenAn: 15, tongSo: 363, quaHan: 1, tyLeDungHan: '98,9%' },
                { stt: 14, diaBan: 'Lâm Đồng', vungMien: 'Tây Nguyên', dtcb: 185, suuTra: 102, hiemNghi: 38, chuyenAn: 14, tongSo: 339, quaHan: 0, tyLeDungHan: '100%' },
                { stt: 15, diaBan: 'Đắk Lắk', vungMien: 'Tây Nguyên', dtcb: 172, suuTra: 95, hiemNghi: 36, chuyenAn: 12, tongSo: 315, quaHan: 1, tyLeDungHan: '99,0%' },
                { stt: 16, diaBan: 'Bà Rịa - Vũng Tàu', vungMien: 'Miền Nam', dtcb: 160, suuTra: 88, hiemNghi: 34, chuyenAn: 11, tongSo: 293, quaHan: 1, tyLeDungHan: '99,0%' },
                { stt: 17, diaBan: 'Thái Nguyên', vungMien: 'Miền Bắc', dtcb: 148, suuTra: 82, hiemNghi: 30, chuyenAn: 10, tongSo: 270, quaHan: 0, tyLeDungHan: '100%' },
                { stt: 18, diaBan: 'Thừa Thiên Huế', vungMien: 'Miền Trung', dtcb: 138, suuTra: 76, hiemNghi: 28, chuyenAn: 9, tongSo: 251, quaHan: 0, tyLeDungHan: '100%' }
            ]
        }
    }
});
