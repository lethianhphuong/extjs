Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewPhanTich', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewPhanTich',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewTrangThaiChart',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewChuyenHoa'
    ],
    cls: 'tcn-analysis',
    layout: 'auto',
    items: [
        { xtype: 'TrangChuNew1_ViewTrangThaiChart' },
        {
            xtype: 'TrangChuNew1_ViewChuyenHoa',
            userCls: 'tcn-tone-green',
            viewModel: {
                formulas: {
                    tableHeader: function () {
                        return {
                            tieuDe: 'Hiệu quả công tác ĐTCB',
                            bieuTuong: 'hoSo',
                            cotTen: 'Chỉ tiêu'
                        };
                    },
                    tableStore: function (get) {
                        return get('hieuQuaDtcbTableStore');
                    },
                    tableFooter: function (get) {
                        return {
                            tongSoText: get('hieuQuaDtcbHienThi.tongSoText'),
                            tongTyTrongText: get('hieuQuaDtcbHienThi.tongTyTrongText')
                        };
                    }
                }
            }
        },
        {
            xtype: 'TrangChuNew1_ViewChuyenHoa',
            userCls: 'tcn-tone-amber',
            viewModel: {
                formulas: {
                    tableHeader: function () {
                        return {
                            tieuDe: 'Hiệu quả công tác Sưu tra',
                            bieuTuong: 'theoDoi',
                            cotTen: 'Chỉ tiêu'
                        };
                    },
                    tableStore: function (get) {
                        return get('hieuQuaSuuTraTableStore');
                    },
                    tableFooter: function (get) {
                        return {
                            tongSoText: get('hieuQuaSuuTraHienThi.tongSoText'),
                            tongTyTrongText: get('hieuQuaSuuTraHienThi.tongTyTrongText')
                        };
                    }
                }
            }
        },
        {
            xtype: 'TrangChuNew1_ViewChuyenHoa',
            userCls: 'tcn-tone-blue',
            viewModel: {
                data: { anFooterHieuQua: false },
                formulas: {
                    tableHeader: function (get) {
                        return {
                            tieuDe: get('lucLuongHienThi.nhanDoiTuong') + ' theo hệ lực lượng',
                            bieuTuong: 'lucLuong',
                            cotTen: 'Lực lượng'
                        };
                    },
                    tableStore: function (get) {
                        return get('lucLuongTableStore');
                    },
                    tableFooter: function (get) {
                        return {
                            tongSoText: get('lucLuongHienThi.tongSoText'),
                            tongTyTrongText: get('lucLuongHienThi.tongTyTrongText')
                        };
                    }
                }
            }
        }
    ]
});
