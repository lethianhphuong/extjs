Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewLucLuong', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewLucLuong',
    cls: 'tcn5-card', padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'component', cls: 'tcn5-heading', height: 48, html: '<b><i class="x-fa fa-users tcn5-card-icon tcn5-tone-purple"></i>HỆ LỰC LƯỢNG</b>' },
        {
            xtype: 'container', height: 320, layout: { type: 'hbox', align: 'stretch' }, margin: '18 0',
            items: [{
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12, margin: '0 14 0 0',
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<span data-tcn5-tip="CẤP TỈNH — thống kê số hồ sơ đang quản lý"><i class="x-fa fa-building tcn5-card-icon tcn5-tone-indigo"></i>CẤP TỈNH</span>', listeners: { afterrender: 'onTooltipReady' } },
                    { xtype: 'TrangChuNew5_ViewBarChart', itemId: 'capTinhChart_IdView', flex: 1, bind: { store: '{capTinhStore}' } }
                ]
            }, {
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12,
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<span data-tcn5-tip="CẤP XÃ — thống kê số hồ sơ đang quản lý"><i class="x-fa fa-map-marker-alt tcn5-card-icon tcn5-tone-cyan"></i>CẤP XÃ</span>', listeners: { afterrender: 'onTooltipReady' } },
                    { xtype: 'TrangChuNew5_ViewBarChart', itemId: 'capXaChart_IdView', flex: 1, bind: { store: '{capXaStore}' } }
                ]
            }]
        }, {
            xtype: 'container', flex: 1, layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12, margin: '0 14 0 0',
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<span data-tcn5-tip="TOP ĐƠN VỊ CẤP TỈNH CÓ NHIỀU HỒ SƠ — thống kê số hồ sơ đang quản lý"><i class="x-fa fa-trophy tcn5-card-icon tcn5-tone-amber"></i>TOP ĐƠN VỊ CẤP TỈNH CÓ NHIỀU HỒ SƠ</span>', listeners: { afterrender: 'onTooltipReady' } },
                    { xtype: 'TrangChuNew5_ViewTopDonVi', flex: 1, scrollable: 'y', bind: { data: '{topTinh}' } }
                ]
            }, {
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12,
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<span data-tcn5-tip="TOP ĐƠN VỊ CẤP XÃ CÓ NHIỀU HỒ SƠ — thống kê số hồ sơ đang quản lý"><i class="x-fa fa-trophy tcn5-card-icon tcn5-tone-amber"></i>TOP ĐƠN VỊ CẤP XÃ CÓ NHIỀU HỒ SƠ</span>', listeners: { afterrender: 'onTooltipReady' } },
                    { xtype: 'TrangChuNew5_ViewTopDonVi', flex: 1, scrollable: 'y', bind: { data: '{topXa}' } }
                ]
            }]
        }
    ]
});
