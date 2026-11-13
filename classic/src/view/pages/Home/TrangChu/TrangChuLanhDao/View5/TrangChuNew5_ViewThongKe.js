Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewThongKe', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewThongKe',
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'component',
        listeners: { afterrender: 'onKpiReady' },
        bind: { data: '{chiSo}' },
        tpl: '<div class="tcn5-metrics"><tpl for="."><div class="tcn5-metric tcn5-tone-{mau}<tpl if="laTong"> tcn5-metric-total</tpl>" data-code="{code:htmlEncode}" data-tcn5-tip="{name:htmlEncode}: <tpl if="laPhanTram">{phanTramText:htmlEncode}<tpl else>{[Number(values.val).toLocaleString("vi-VN")]} hồ sơ<tpl if="hienBienDong"> — {lech:htmlEncode}</tpl></tpl>">' +
            '<div class="tcn5-metric-label">{name:htmlEncode}<i class="x-fa fa-{icon} tcn5-tone-{mau}"></i></div>' +
            '<div class="tcn5-metric-bottom" style="display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap;"><tpl if="laPhanTram"><strong class="tcn5-metric-pct tcn5-tone-{xuHuong}">{phanTramText:htmlEncode}</strong>' +
            '<tpl else><strong>{[Number(values.val).toLocaleString("vi-VN")]}</strong>' +
            '<tpl if="hienBienDong"><span class="tcn5-badge tcn5-tone-{xuHuong}">{lech:htmlEncode}</span></tpl></tpl></div>' +
            '</div></tpl></div>'
    }]
});
