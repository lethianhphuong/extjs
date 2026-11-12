Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewDonVi', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewDonVi',
    cls: 'tcn5-card',
    padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'component',
        cls: 'tcn5-heading',
        height: 48,
        html: '<b><i class="x-fa fa-building tcn5-card-icon tcn5-tone-blue"></i>ĐƠN VỊ</b>'
    }, {
        xtype: 'container',
        height: 320,
        layout: { type: 'hbox', align: 'stretch' },
        margin: '18 0',
        items: [{
            // Số lượng hồ sơ theo 8 loại hồ sơ (thay cho hàng thẻ loại hồ sơ và donut cơ cấu cũ)
            xtype: 'container',
            flex: 1,
            cls: 'tcn5-inner',
            padding: 14,
            margin: '0 14 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn5-subheading',
                    html: '<i class="x-fa fa-chart-bar tcn5-card-icon tcn5-tone-purple"></i>Loại hồ sơ'
                },
                {
                    xtype: 'TrangChuNew5_ViewBarChart',
                    itemId: 'loaiHoSoChart_IdView',
                    flex: 1,
                    bind: { store: '{loaiHoSoStore}' },
                    // Card hẹp, 8 cột: xoay nhãn trục để hiện đủ tên loại hồ sơ, không bị chồng nhau
                    axes: [
                        { type: 'numeric', position: 'left', minimum: 0, hidden: true },
                        {
                            type: 'category', position: 'bottom', fields: ['code'],
                            label: { fontSize: 10, color: '#475569', rotate: { degrees: -35 } },
                            renderer: function (axis, value) {
                                const store = axis.getChart().getStore();
                                const record = store ? store.findRecord('code', value, 0, false, true, true) : null;
                                return record ? (record.get('name') || value) : value;
                            }
                        }
                    ]
                }
            ]
        }, {
            xtype: 'container',
            flex: 1,
            cls: 'tcn5-inner',
            padding: 14,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn5-subheading',
                    html: '<i class="x-fa fa-chart-bar tcn5-card-icon tcn5-tone-cyan"></i>Cơ cấu hồ sơ theo đơn vị'
                },
                {
                    xtype: 'TrangChuNew5_ViewBarChart',
                    itemId: 'bienDongDonViChart_IdView',
                    height: 220,
                    bind: { store: '{bienDongDonViStore}' }
                }
            ]
        }]
    }, {
        xtype: 'container',
        cls: 'tcn5-inner',
        padding: 14,
        flex: 1,
        layout: { type: 'vbox', align: 'stretch' },
        items: [
            {
                xtype: 'container',
                cls: 'tcn5-trend-header',
                layout: { type: 'hbox', align: 'middle' },
                items: [
                    {
                        xtype: 'component',
                        flex: 1,
                        html: '<b><i class="x-fa fa-chart-line tcn5-card-icon tcn5-tone-green"></i>Diễn biến mở mới và kết thúc hồ sơ</b>'
                    },
                    {
                        xtype: 'button',
                        text: 'Mở mới',
                        cls: 'tcn5-series-button tcn5-tone-blue',
                        enableToggle: true,
                        bind: { pressed: '{hienMoMoi}' },
                        stateKey: 'hienMoMoi',
                        chartItemId: 'dienBienHoSoChart_IdView',
                        seriesIndex: 0,
                        toggleHandler: 'onToggleTrendSeries'
                    },
                    {
                        xtype: 'button',
                        text: 'Kết thúc',
                        cls: 'tcn5-series-button tcn5-tone-green',
                        enableToggle: true,
                        bind: { pressed: '{hienKetThuc}' },
                        stateKey: 'hienKetThuc',
                        chartItemId: 'dienBienHoSoChart_IdView',
                        seriesIndex: 1,
                        toggleHandler: 'onToggleTrendSeries'
                    }
                ]
            },
            {
                xtype: 'TrangChuNew5_ViewDienBienChart',
                itemId: 'dienBienHoSoChart_IdView'
            }
        ]
    }]
});
