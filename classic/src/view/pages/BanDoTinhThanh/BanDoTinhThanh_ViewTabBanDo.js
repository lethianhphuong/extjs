Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoTinhThanh_ViewTabBanDo', {
    extend: 'Ext.container.Container',
    xtype: 'BanDoTinhThanh_ViewTabBanDo',
    padding: 12,
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            cls: 'bdtt-view-hint',
            html: '<i class="x-fa fa-info-circle"></i> Bản đồ chỉ để xem, màu lấy theo tab "Tô màu và danh sách".'
        },
        {
            xtype: 'container',
            cls: 'bdtt-map-card dash-card',
            flex: 1,
            margin: '8 0 0 0',
            layout: 'fit',
            items: [{
                xtype: 'component',
                reference: 'cmpBanDoXem',
                cls: 'bdtt-map-host',
                listeners: { afterrender: 'onBanDoXemAfterRender' }
            }]
        }
    ]
});
