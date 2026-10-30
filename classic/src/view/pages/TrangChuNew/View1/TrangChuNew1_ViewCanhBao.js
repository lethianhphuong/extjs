Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewCanhBao', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewCanhBao',
    requires: ['Ext.view.View'],
    cls: 'tcn-alerts',
    layout: 'auto',
    items: [
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{canhBao}' },
            tpl: [
                '<h2><i class="x-fa fa-exclamation-triangle"></i> Cảnh báo, chú ý <small>4 mục trọng yếu</small></h2>',
                '<tpl for="."><article class="tcn-alert-row">',
                '<div><strong>{ten:htmlEncode}</strong><p>{moTa:htmlEncode}</p></div>',
                '<span class="tcn-badge tcn-{mau:htmlEncode}">{mucDo:htmlEncode}</span>',
                '</article></tpl>'
            ]
        },
        {
            xtype: 'container',
            cls: 'tcn-card dash-card',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                { xtype: 'component', html: '<h2>Hồ sơ cần lãnh đạo xem, chỉ đạo <small>Ưu tiên xử lý</small></h2>' },
                {
                    xtype: 'dataview',
                    bind: { store: '{hoSoChiDaoStore}' },
                    itemSelector: '.tcn-directive',
                    listeners: { itemclick: 'onViewRecord' },
                    tpl: [
                        '<tpl for="."><article class="tcn-directive">',
                        '<div><strong>{ma:htmlEncode}</strong><p>{moTa:htmlEncode}</p></div>',
                        '<button type="button" class="tcn-detail-button">Xem ngay</button>',
                        '</article></tpl>'
                    ]
                }
            ]
        }
    ]
});
