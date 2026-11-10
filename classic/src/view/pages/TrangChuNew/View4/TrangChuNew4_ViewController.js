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

    applyData: function (data) {
        const me = this;
        const viewModel = me.getViewModel();
        if (!viewModel || !data) return;

        const config = DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_DisplayConfig;

        // 1. Gắn SVG icon vào thẻ KPI
        const kpiCards = Ext.Array.clone(data.kpiCards || []).map(function (item) {
            return Ext.apply({}, item, {
                iconSvg: config.getIconSvg(item.icon)
            });
        });

        // 2. Cập nhật dữ liệu ViewModel
        viewModel.set('canBoInfo', data.canBo || {});
        viewModel.set('kpiCards', kpiCards);
        viewModel.set('loaiHoSoCards', data.loaiHoSoCards || []);
        viewModel.set('tongSoDonut', data.tongSoDonut || 128);

        // 3. Nạp store Donut Chart
        const donutStore = viewModel.getStore('trangThaiDonutStore');
        if (donutStore && data.trangThaiDonut) {
            donutStore.loadData(data.trangThaiDonut);
        }

        // 4. Nạp store Line Chart
        const lineStore = viewModel.getStore('tienDoThangStore');
        if (lineStore && data.tienDoThang) {
            lineStore.loadData(data.tienDoThang);
        }

        // 5. Nạp store Danh sách hồ sơ (trực tiếp không slice)
        const dsStore = viewModel.getStore('dsHoSoStore');
        if (dsStore && data.dsHoSo) {
            dsStore.loadData(data.dsHoSo);
        }
    },

    loadMockData: function () {
        const me = this;
        const mockData = DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_MockData.getData();
        me.applyData(mockData);
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
                                me.applyData(res.data);
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
