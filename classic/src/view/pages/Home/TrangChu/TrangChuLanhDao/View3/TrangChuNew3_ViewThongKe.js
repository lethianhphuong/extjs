Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewThongKe', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_ViewThongKe',
    cls: 'tcn3-kpi-container',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        // Hàng 1: Thẻ KPI tổng quan (6 thẻ chỉ số chính chuẩn View 5)
        {
            xtype: 'component',
            listeners: { afterrender: 'onTooltipReady' },
            bind: { data: '{kpiCards}' },
            tpl: '<div class="tcn3-metrics">' +
                '<tpl for=".">' +
                '<div class="tcn3-metric tcn3-tone-{mau}<tpl if="laTong"> tcn3-metric-total</tpl>" data-tcn3-tip="{name:htmlEncode}: <tpl if="laPhanTram">{phanTramText:htmlEncode}<tpl else>{[Number(values.val).toLocaleString("vi-VN")]} hồ sơ<tpl if="hienBienDong"> — {lech:htmlEncode}</tpl></tpl>">' +
                '  <div class="tcn3-metric-label">{name:htmlEncode}<i class="x-fa fa-{icon} tcn3-tone-{mau}"></i></div>' +
                '  <div class="tcn3-metric-bottom" style="display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap;">' +
                '    <tpl if="laPhanTram"><strong class="tcn3-tone-{xuHuong}">{phanTramText:htmlEncode}</strong>' +
                '    <tpl else><strong>{[Number(values.val).toLocaleString("vi-VN")]}</strong>' +
                '    <tpl if="hienBienDong"><span class="tcn3-badge tcn3-tone-{xuHuong}">{lech:htmlEncode}</span></tpl></tpl>' +
                '  </div>' +
                '</div>' +
                '</tpl>' +
                '</div>'
        },
        // Hàng 2: Thẻ phân loại nghiệp vụ trực thuộc (6 loại nghiệp vụ chuẩn View 5)
        {
            xtype: 'component',
            listeners: { afterrender: 'onTooltipReady' },
            bind: { data: '{loaiHoSoCards}' },
            tpl: '<div class="tcn3-summary">' +
                '<tpl for=".">' +
                '<div class="tcn3-tone-{mau}" data-tcn3-tip="{name:htmlEncode}: {[Number(values.val).toLocaleString("vi-VN")]} hồ sơ">' +
                '  <span><i class="x-fa fa-{icon} tcn3-card-icon"></i>{name:htmlEncode}</span>' +
                '  <b>{[Number(values.val).toLocaleString("vi-VN")]}</b>' +
                '</div>' +
                '</tpl>' +
                '</div>'
        }
    ]
});
