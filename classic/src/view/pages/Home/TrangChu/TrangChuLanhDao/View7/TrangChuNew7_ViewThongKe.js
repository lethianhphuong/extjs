Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewThongKe', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew7_ViewThongKe',
    // 7 thẻ KPI theo chức vụ; click thẻ để lọc danh sách (controller.onKpiReady)
    bind: { data: '{kpiCards}' },
    listeners: { afterrender: 'onKpiReady' },
    tpl: '<div class="tcn7-kpi-grid"><tpl for=".">' +
        '<div class="tcn7-kpi tcn7-tone-{mau}<tpl if="laTong"> tcn7-kpi-total</tpl><tpl if="chon"> is-active</tpl>" data-code="{code:htmlEncode}" title="{ten:htmlEncode}: {giaTriText:htmlEncode} cán bộ">' +
        '<span class="tcn7-kpi-icon"><i class="x-fa fa-{icon}"></i></span>' +
        '<div class="tcn7-kpi-text">' +
        '<span class="tcn7-kpi-title">{ten:htmlEncode}</span>' +
        '<strong class="tcn7-kpi-val">{giaTriText:htmlEncode}</strong>' +
        '</div></div>' +
        '</tpl></div>'
});
