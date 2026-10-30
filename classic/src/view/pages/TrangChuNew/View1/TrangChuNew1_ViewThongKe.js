Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewThongKe', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew1_ViewThongKe',
    cls: 'tcn-metrics dash-card',
    bind: { data: '{chiSo}' },
    tpl: [
        '<div class="tcn-metric-grid"><tpl for=".">',
        '<article class="tcn-metric"><span>{ten:htmlEncode}</span>',
        '<strong>{giaTri:htmlEncode}</strong>',
        '<small class="tcn-{mau:htmlEncode}">{xuHuong:htmlEncode} (Tăng/giảm)</small>',
        '</article></tpl></div>'
    ]
});
