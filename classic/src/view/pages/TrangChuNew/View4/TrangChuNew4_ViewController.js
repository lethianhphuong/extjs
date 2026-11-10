/* global NVCB, config */
Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew4_ViewController',
    requires: [
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_DisplayConfig',
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_MockData'
    ],

    init: function () {
        const me = this;
        const view = me.getView();
        const viewModel = me.getViewModel();

        if (viewModel) {
            viewModel.set('timKiemNangCao.tuNgay', new Date(2025, 9, 1));
            viewModel.set('timKiemNangCao.denNgay', new Date(2025, 11, 31));
        }

        if (view) {
            const tabpanel = view.up('tabpanel');
            if (tabpanel) {
                tabpanel.on('tabchange', function (tp, newCard) {
                    if (newCard && newCard.xtype === view.xtype) {
                        me.onSearch();
                    }
                });
            }
        }

        me.loadData();
    },

    loadData: function () {
        const me = this;
        const useMockData = DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_DisplayConfig.USE_MOCK_DATA;

        if (useMockData) {
            me.loadMockData();
        } else {
            me.loadApiData();
        }
    },

    loadMockData: function () {
        const me = this;
        const viewModel = me.getViewModel();
        if (!viewModel) return;

        const config = DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_DisplayConfig;
        const mockData = DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_MockData.getData();

        // 1. Gắn SVG icon vào thẻ KPI
        const kpiCards = Ext.Array.clone(mockData.kpiCards || []).map(function (item) {
            return Ext.apply({}, item, {
                iconSvg: config.getIconSvg(item.icon)
            });
        });

        // 2. Cập nhật dữ liệu ViewModel
        viewModel.set('canBoInfo', mockData.canBo || {});
        viewModel.set('kpiCards', kpiCards);
        viewModel.set('loaiHoSoCards', mockData.loaiHoSoCards || []);
        viewModel.set('tongSoDonut', 128);

        // 3. Nạp store Donut Chart
        const donutStore = viewModel.getStore('trangThaiDonutStore');
        if (donutStore && mockData.trangThaiDonut) {
            donutStore.loadData(mockData.trangThaiDonut);
        }

        // 4. Nạp store Line Chart
        const lineStore = viewModel.getStore('tienDoThangStore');
        if (lineStore && mockData.tienDoThang) {
            lineStore.loadData(mockData.tienDoThang);
        }

        // 5. Nạp store Danh sách hồ sơ
        const dsStore = viewModel.getStore('dsHoSoStore');
        if (dsStore && mockData.dsHoSo) {
            dsStore.loadData(mockData.dsHoSo);
        }
    },

    loadApiData: function () {
        const me = this;
        // Khung gọi API backend khi triển khai thực tế
        if (typeof config !== 'undefined' && config.getNVCB_BE_Url) {
            const url = config.getNVCB_BE_Url() + 'trang-chu-can-bo/thong-ke';
            if (typeof NVCB !== 'undefined' && NVCB.Ajax && NVCB.Ajax.get) {
                NVCB.Ajax.get(url, function (success, response) {
                    if (success) {
                        try {
                            const res = Ext.decode(response.responseText);
                            if (res.success && res.data) {
                                // Gán dữ liệu API
                                return;
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                    me.loadMockData();
                });
                return;
            }
        }
        me.loadMockData();
    },

    onSearch: function () {
        const me = this;
        me.loadData();
    },

    onChartReady: function (chart) {
        if (!chart) return;
        Ext.defer(function () {
            if (chart && !chart.destroyed) {
                chart.redraw();
            }
        }, 120);
    }
});
