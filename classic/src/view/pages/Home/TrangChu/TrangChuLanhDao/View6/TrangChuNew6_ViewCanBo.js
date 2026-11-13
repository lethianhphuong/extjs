Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewCanBo', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewCanBo',
    // Bản gọn: thẻ cán bộ 1 khối ngang + 4 thẻ KPI trên 1 hàng (style ở TrangChuNew6_ViewCanBo.scss)
    cls: 'tcn6-canbo-compact',
    layout: { type: 'hbox', align: 'stretch' },
    items: [{
        //#region NOTE: Thông tin cán bộ
        xtype: 'component',
        cls: 'tcn6-card tcn6-officer',
        flex: 1,
        minWidth: 300,
        margin: '0 12 0 0',
        bind: { data: '{canBoInfo}' },
        tpl: '<div class="tcn6-officer-top">' +
            '<div class="tcn6-avatar">{chuCaiDau:htmlEncode}</div>' +
            '<div class="tcn6-officer-info">' +
            '<div class="tcn6-officer-label">Cán bộ phụ trách</div>' +
            '<div class="tcn6-officer-row"><h2 class="tcn6-officer-name">{hoTen:htmlEncode}</h2>' +
            '<span class="tcn6-chip tcn6-tone-blue">{chucVu:htmlEncode}</span></div>' +
            '</div></div>' +
            '<div class="tcn6-officer-meta">' +
            '<div class="tcn6-officer-line" title="Đơn vị: {donVi:htmlEncode}"><i class="x-fa fa-building"></i><span>{donVi:htmlEncode}</span></div>' +
            '<div class="tcn6-officer-line" title="Lĩnh vực phụ trách: {linhVuc:htmlEncode}"><i class="x-fa fa-bullseye"></i><span>{linhVuc:htmlEncode}</span></div>' +
            '</div>'
        //#endregion
    }, {
        //#region NOTE: 4 thẻ KPI trên 1 hàng
        xtype: 'component',
        flex: 2.6,
        bind: { data: '{kpiCards}' },
        // Click thẻ KPI (tongQuan → D5_C02): chỉ log
        listeners: { afterrender: 'onKpiReady' },
        tpl: '<div class="tcn6-kpi-grid"><tpl for=".">' +
            '<div class="tcn6-kpi tcn6-tone-{mau}<tpl if="laTong"> tcn6-kpi-total</tpl><tpl if="canhBao"> tcn6-kpi-warn</tpl>" data-code="{code:htmlEncode}">' +
            '<div class="tcn6-kpi-head">' +
            '<span class="tcn6-kpi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{iconSvg}</svg></span>' +
            '<span class="tcn6-kpi-title" title="{ten:htmlEncode}">{ten:htmlEncode}</span></div>' +
            '<div class="tcn6-kpi-body"><strong class="tcn6-kpi-val">{giaTriText:htmlEncode}</strong><span class="tcn6-kpi-unit">hồ sơ</span>' +
            '<tpl if="hienLech"><span class="tcn6-kpi-lech tcn6-kpi-lech-{lechTone}" title="{lechText:htmlEncode} so với kỳ trước">{lechText:htmlEncode} kỳ trước</span></tpl>' +
            '</div></div></tpl></div>'
        //#endregion
    }]
    // Hàng 8 thẻ loại hồ sơ đã chuyển thành biểu đồ cột "Loại hồ sơ" (TrangChuNew6_ViewKetQua)
});
