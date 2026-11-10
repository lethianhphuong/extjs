Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewCanBo', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewCanBo',
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'container',
        layout: { type: 'hbox', align: 'stretch' },
        items: [{
            //#region NOTE: Thông tin cán bộ
            xtype: 'component',
            cls: 'tcn6-card tcn6-officer',
            flex: 1,
            minWidth: 320,
            margin: '0 16 0 0',
            bind: { data: '{canBoInfo}' },
            tpl: '<div class="tcn6-officer-top">' +
                '<div class="tcn6-avatar">{chuCaiDau:htmlEncode}</div>' +
                '<div><div class="tcn6-officer-label">Cán bộ phụ trách</div>' +
                '<h2 class="tcn6-officer-name">{hoTen:htmlEncode}</h2>' +
                '<span class="tcn6-chip tcn6-tone-blue">{chucVu:htmlEncode}</span></div></div>' +
                '<dl class="tcn6-officer-meta">' +
                '<dt>Đơn vị</dt><dd>{donVi:htmlEncode}</dd>' +
                '<dt>Lĩnh vực phụ trách</dt><dd>{linhVuc:htmlEncode}</dd>' +
                '</dl>'
            //#endregion
        }, {
            //#region NOTE: 6 thẻ KPI
            xtype: 'component',
            flex: 2,
            bind: { data: '{kpiCards}' },
            tpl: '<div class="tcn6-kpi-grid"><tpl for=".">' +
                '<div class="tcn6-kpi tcn6-tone-{mau}<tpl if="laTong"> tcn6-kpi-total</tpl><tpl if="canhBao"> tcn6-kpi-warn</tpl>">' +
                '<div class="tcn6-kpi-head"><span class="tcn6-kpi-title">{ten:htmlEncode}</span>' +
                '<span class="tcn6-kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{iconSvg}</svg></span></div>' +
                '<strong class="tcn6-kpi-val">{giaTriText:htmlEncode}</strong>' +
                '<span class="tcn6-kpi-unit">hồ sơ<tpl if="hienLech"> <span class="tcn6-kpi-lech tcn6-kpi-lech-{lechTone}">{lechText:htmlEncode} so với kỳ trước</span></tpl></span>' +
                '</div></tpl></div>'
            //#endregion
        }]
    }, {
        //#region NOTE: Thẻ loại hồ sơ
        xtype: 'component',
        cls: 'tcn6-loai-row',
        margin: '16 0 0',
        bind: { data: '{loaiHoSo}' },
        tpl: '<tpl for="items"><div class="tcn6-loai-chip tcn6-tone-{mau}" title="{name:htmlEncode}: {soLuongText} hồ sơ ({tyLeText})">' +
            '<span>{name:htmlEncode}</span><b>{soLuongText}</b></div></tpl>'
        //#endregion
    }]
});
