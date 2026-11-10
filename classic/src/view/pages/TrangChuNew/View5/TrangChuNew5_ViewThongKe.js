Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewThongKe', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewThongKe',
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'component',
        listeners: { afterrender: 'onTooltipReady' },
        bind: { data: '{chiSo}' },
        tpl: '<div class="tcn5-metrics"><tpl for="."><div class="tcn5-metric tcn5-tone-{mau}" data-tcn5-tip="{name:htmlEncode}: {[Number(values.val).toLocaleString("vi-VN")]} hồ sơ<tpl if="hienBienDong"> — {lech:htmlEncode}</tpl>">' +
            '<div class="tcn5-metric-label">{name:htmlEncode}<i class="x-fa fa-{icon} tcn5-tone-{mau}"></i></div>' +
            '<div class="tcn5-metric-bottom" style="display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap;"><strong>{[Number(values.val).toLocaleString("vi-VN")]}</strong>' +
            '<tpl if="hienBienDong"><span class="tcn5-badge tcn5-tone-{xuHuong}">{lech:htmlEncode}</span></tpl></div>' +
            '</div></tpl></div>'
    }, {
        xtype: 'component',
        listeners: { afterrender: 'onTooltipReady' },
        bind: { data: '{loaiHoSo}' },
        tpl: '<div class="tcn5-summary"><tpl for="."><div class="tcn5-tone-{mau}" data-tcn5-tip="{name:htmlEncode}: {[Number(values.val).toLocaleString("vi-VN")]} hồ sơ"><span><i class="x-fa fa-{icon} tcn5-card-icon"></i>{name:htmlEncode}</span><b>{[Number(values.val).toLocaleString("vi-VN")]}</b></div></tpl></div>'
    }]
});
