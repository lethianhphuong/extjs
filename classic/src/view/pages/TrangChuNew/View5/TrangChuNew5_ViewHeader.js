Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewHeader', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewHeader',
    cls: 'tcn5-page-header',
    layout: { type: 'hbox', align: 'middle' },
    items: [{
        xtype: 'component',
        flex: 1,
        bind: { data: { kyBaoCao: '{kyBaoCao}' } },
        tpl: '<h2 class="tcn5-page-title">Tổng quan hồ sơ nghiệp vụ</h2>' +
            '<tpl if="kyBaoCao"><div class="tcn5-page-sub"><i class="x-fa fa-calendar-alt"></i>Kỳ báo cáo: {kyBaoCao:htmlEncode}</div></tpl>'
    }, {
        xtype: 'button',
        text: 'Làm mới',
        iconCls: 'x-fa fa-sync-alt',
        cls: 'dash-btn-outline',
        handler: 'onLamMoi'
    }]
});
