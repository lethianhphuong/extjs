Ext.define('DEMO.view.pages.ToTrinh.LichSuToTrinh_ViewPopup', {
    extend: 'Ext.container.Container',
    xtype: 'LichSuToTrinh_ViewPopup',

    controller: 'lichSuToTrinhPopup',
    viewModel: 'lichSuToTrinhPopup',

    layout: { type: 'vbox', align: 'stretch' },
    scrollable: 'y',
    style: 'background:var(--theme-bg-card, #fff);',

    items: [{
        xtype: 'dataview',
        cls: 'lt-timeline',
        bind: { store: '{lichSuStore}' },
        scrollable: false,
        itemSelector: 'div.lt-item',
        overItemCls: 'lt-item-over',
        itemTpl: [
            '<div class="lt-item">',
                '<div class="lt-dot {[this.dotCls(values)]}"></div>',
                '<div class="lt-card">',
                    '<div class="lt-hdr">',
                        '<span class="lt-title">{hanhDong}</span>',
                        '<span class="lt-time">{thoiGian}</span>',
                    '</div>',
                    '<div class="lt-person">{nguoiThucHien} <span class="lt-role">({chucDanh})</span></div>',
                    '<tpl if="trangThaiMoi">',
                        '<div class="lt-badge {[this.badgeCls(values)]}">',
                            '<tpl if="trangThaiCu"><span class="lt-badge-old">{trangThaiCu}</span> &#8594; </tpl>',
                            '{trangThaiMoi}',
                        '</div>',
                    '</tpl>',
                    '<tpl if="moTa">',
                        '<div class="lt-desc">{moTa}</div>',
                    '</tpl>',
                '</div>',
            '</div>',
            {
                dotCls: function (values) {
                    var tm = values.trangThaiMoi || '';
                    var isWarn = tm.indexOf('YÊU CẦU') > -1 || tm.indexOf('TỪ CHỐI') > -1 || tm.indexOf('CHỜ') > -1;
                    return isWarn ? 'lt-dot-warn' : 'lt-dot-ok';
                },
                badgeCls: function (values) {
                    var tm = values.trangThaiMoi || '';
                    var isWarn = tm.indexOf('YÊU CẦU') > -1 || tm.indexOf('TỪ CHỐI') > -1 || tm.indexOf('CHỜ') > -1;
                    return isWarn ? 'lt-badge-warn' : 'lt-badge-ok';
                }
            }
        ]
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items: ['->', {
            text: 'ĐÓNG',
            ui: 'soft-red',
            handler: 'onClosePopup'
        }]
    }]
});
