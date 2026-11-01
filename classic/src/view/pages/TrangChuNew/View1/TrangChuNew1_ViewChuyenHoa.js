Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChuyenHoa', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew1_ViewChuyenHoa',
    cls: 'tcn-card tcn-info-card dash-card',
    tpl: [
        '<header class="tcn-info-header"><h2>{tieuDe:htmlEncode}</h2></header>',
        '<div class="tcn-info-content"><tpl for="items">',
        '<div class="tcn-progress-row tcn-tone-{mau:htmlEncode}">',
        '<div class="tcn-progress-label"><span><i class="tcn-dot"></i>{ten:htmlEncode}</span>',
        '<strong class="tcn-percent">{tyLeText:htmlEncode}</strong></div>',
        '<div class="tcn-progress-track" role="progressbar" aria-label="{ten:htmlEncode}" ',
        'aria-valuemin="0" aria-valuemax="100" aria-valuenow="{tyLe}">',
        '<div class="tcn-progress-fill" style="width:{tyLe}%"></div></div></div>',
        '</tpl></div><footer class="tcn-info-footer"><span>Tỷ lệ chuyển hóa chính:</span>',
        '<strong class="tcn-summary tcn-tone-{mau:htmlEncode}"><i class="tcn-dot"></i>',
        '{tyLeChinhText:htmlEncode}</strong></footer>'
    ]
});
