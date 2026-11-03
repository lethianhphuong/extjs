Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChuyenHoa', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew1_ViewChuyenHoa',
    cls: 'tcn-card tcn-info-card dash-card',
    tpl: [
        '<header class="tcn-info-header"><h2>{tieuDe:htmlEncode}</h2></header>',
        '<div class="tcn-info-content"><tpl for="items">',
        '<div class="tcn-progress-row tcn-tone-{mau:htmlEncode}">',
        '<div class="tcn-progress-label"><span><i class="tcn-dot"></i>{ten:htmlEncode}</span>',
        '<span class="tcn-force-values"><small>{tyLeText:htmlEncode}</small>',
        '<strong>{soLuongText:htmlEncode}</strong></span></div>',
        '<div class="tcn-progress-track" role="progressbar" aria-label="{ten:htmlEncode}" ',
        'aria-valuemin="0" aria-valuemax="100" aria-valuenow="{tyLe}">',
        '<div class="tcn-progress-fill" style="width:{tyLe}%"></div></div></div>',
        '</tpl></div>'
    ]
});
