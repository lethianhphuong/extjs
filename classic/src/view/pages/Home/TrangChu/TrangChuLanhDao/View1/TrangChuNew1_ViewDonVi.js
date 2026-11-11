Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewDonVi', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewDonVi',
    requires: [
        'Ext.button.Segmented',
        'Ext.layout.container.Absolute',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewDonViChart'
    ],
    cls: 'tcn-card tcn-unit-card dash-card',
    height: 360,
    layout: { type: 'vbox', align: 'stretch' },
    listeners: { afterrender: 'onUnitCardResize', resize: 'onUnitCardResize' },
    items: [
        {
            xtype: 'container',
            cls: 'tcn-unit-header',
            layout: 'auto',
            items: [
                {
                    xtype: 'component',
                    bind: { data: '{donViHienThi}' },
                    tpl: '<h2><span class="tcn-analysis-icon tcn-tone-blue" aria-hidden="true">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M3 21h18M5 21V8h7v13m0 0V3h7v18M8 11h1m-1 4h1m6-8h1m-1 4h1m-1 4h1"/>' +
                        '</svg></span>{nhanDoiTuong:htmlEncode} theo đơn vị <span class="tcn-unit-title-tag">Top {gioiHan} Đơn vị</span></h2>'
                },
                {
                    xtype: 'segmentedbutton',
                    itemId: 'chonTopDonVi_IdView',
                    cls: 'tcn-unit-tabs',
                    bind: { value: '{gioiHanDonVi}' },
                    items: [
                        { text: 'Top 5', value: 5 },
                        { text: 'Tất cả 10', value: 10 }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            cls: 'tcn-unit-body',
            flex: 1,
            layout: 'auto',
            items: [
                {
                    xtype: 'container',
                    width: 230,
                    cls: 'tcn-unit-summary',
                    layout: { type: 'vbox', align: 'stretch' },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'donViDonutWrap_IdView',
                            height: 230,
                            layout: 'absolute',
                            items: [
                                { xtype: 'TrangChuNew1_ViewDonViChart', x: 0, y: 0, width: 230, height: 230 },
                                {
                                    xtype: 'component',
                                    itemId: 'donViDonutCenter_IdView',
                                    x: 0,
                                    y: 0,
                                    width: 230,
                                    height: 230,
                                    cls: 'tcn-donut-center',
                                    bind: { data: '{donViHienThi}' },
                                    tpl: [
                                        '<small>TOP {gioiHan} TỔNG</small>',
                                        '<strong>{tongSoText:htmlEncode} <small>{nhanDonVi:htmlEncode}</small></strong>',
                                        '<span>{tyLeTongText:htmlEncode}</span>'
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'component',
                    cls: 'tcn-unit-list-view',
                    listeners: { afterrender: 'onUnitListReady' },
                    bind: { data: '{donViHienThi}' },
                    tpl: [
                        '<ol class="tcn-unit-list"><tpl for="items">',
                        '<li class="tcn-unit-rank tcn-tone-{mau:htmlEncode}" data-unit-name="{ten:htmlEncode}">',
                        '<div class="tcn-unit-rank-label"><span class="tcn-unit-name">',
                        '<b class="tcn-rank-number">{thuHang}</b>',
                        '<span class="tcn-unit-symbol">{kyHieu:htmlEncode}</span></span>',
                        '<span class="tcn-unit-count"><strong>{soLuongText:htmlEncode}</strong><small>{nhanDonVi:htmlEncode}</small>',
                        '<span class="tcn-percent">{tyLeText:htmlEncode}</span></span></div>',
                        '<div class="tcn-progress-track" role="progressbar" aria-label="{ten:htmlEncode}" ',
                        'aria-valuemin="0" aria-valuemax="100" aria-valuenow="{doDai}">',
                        '<div class="tcn-progress-fill" style="width:{doDai}%"></div></div></li>',
                        '</tpl></ol>',
                        '<tpl if="!items.length"><p class="tcn-unit-empty">Không có dữ liệu</p></tpl>'
                    ]
                }
            ]
        }
    ]
});
