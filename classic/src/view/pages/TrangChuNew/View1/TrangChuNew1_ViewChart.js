Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChart', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewChart',
    cls: 'tcn-details',
    layout: 'auto',
    items: [
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{thongKeDonVi}' },
            tpl: [
                '<h2>Hồ sơ theo đơn vị (Top 10) <small>Tổng / M3 / M4</small></h2>',
                '<tpl for="."><div class="tcn-unit"><div class="tcn-unit-label">',
                '<span>{ten:htmlEncode}</span><strong>{giaTri:htmlEncode} | M3:{m3} | M4:{m4}</strong></div>',
                '<div class="tcn-track"><div class="tcn-bg-blue" style="width:{tyLe}%"></div></div></div></tpl>'
            ]
        },
        {
            xtype: 'container',
            cls: 'tcn-card dash-card',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                { xtype: 'component', html: '<h2>Diễn biến mở mới và kết thúc hồ sơ</h2>' },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Kỳ thống kê',
                    editable: false,
                    store: ['Theo tháng', 'Theo quý'],
                    bind: { value: '{kyBieuDo}' },
                    listeners: { select: 'onTrendPeriodChange' }
                },
                {
                    xtype: 'component',
                    cls: 'tcn-trend',
                    bind: { data: '{dienBien}' },
                    // HTML gốc chỉ có tọa độ SVG; giữ nguyên thay vì suy diễn số liệu thống kê.
                    tpl: [
                        '<div class="tcn-legend"><span class="tcn-blue">● Mở mới</span><span class="tcn-green">● Kết thúc</span></div>',
                        '<svg role="img" aria-label="Diễn biến mở mới và kết thúc hồ sơ, dữ liệu minh họa" viewBox="0 0 500 210">',
                        '<g class="tcn-chart-grid"><path d="M40 20H490 M40 60H490 M40 100H490 M40 140H490 M40 180H490"/></g>',
                        '<g class="tcn-chart-label"><text x="0" y="24">1.000</text><text x="8" y="64">800</text>',
                        '<text x="8" y="104">600</text><text x="8" y="144">400</text><text x="8" y="184">200</text></g>',
                        '<polyline class="tcn-line-new" points="{moMoi:htmlEncode}"/>',
                        '<polyline class="tcn-line-end" points="{ketThuc:htmlEncode}"/>',
                        '<g class="tcn-chart-label"><tpl for="thang"><text x="{x}" y="205" text-anchor="middle">{ten:htmlEncode}</text></tpl></g>',
                        '</svg>'
                    ]
                }
            ]
        },
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{hoatDong}' },
            tpl: [
                '<h2>Các đơn vị đang làm gì? (Toàn quốc)</h2>',
                '<tpl for="."><div class="tcn-activity"><strong>{ten:htmlEncode}</strong>',
                '<p>{giaTri:htmlEncode} <span class="tcn-red">| Quá hạn {quaHan}</span></p></div></tpl>'
            ]
        }
    ]
});
