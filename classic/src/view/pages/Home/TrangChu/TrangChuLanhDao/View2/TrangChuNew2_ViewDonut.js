Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.TrangChuNew2_ViewDonut', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew2_ViewDonut',
    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie'],
    cls: 'tcn2-card tcn2-donut-card',
    layout: { type: 'vbox', align: 'stretch' },

    config: {
        nhom: null
    },

    // Hai binding phụ thuộc nhóm của từng instance dùng chung mẫu card.
    initComponent: function () {
        const me = this;
        const nhom = me.getNhom();
        const icons = {
            dtcb: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
            hiemNghi: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
            chuyenAn: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
            ctvbm: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
            phanLoai: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
            danhMuc: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
            doiTuong: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>'
        };
        const iconSvg = icons[nhom] || icons.doiTuong;

        me.addCls('tcn2-donut-' + nhom);
        me.items = [
            {
                xtype: 'component',
                cls: 'tcn2-donut-header',
                style: 'display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--theme-border);',
                bind: { data: '{coCau.' + nhom + '}' },
                tpl: [
                    '<div style="display: flex; align-items: center; gap: 8px; min-width: 0;">' +
                        '<span class="tcn-analysis-icon" style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 7px; background: rgba(37, 99, 235, 0.1); color: #2563eb; flex-shrink: 0;" aria-hidden="true">' +
                        '<svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                        iconSvg +
                        '</svg></span>' +
                        '<h3 title="{tieuDe:htmlEncode}" style="margin: 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: var(--theme-text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{tieuDe:htmlEncode}</h3>' +
                    '</div>',
                    '<div class="tcn2-donut-metrics" style="padding: 3px 8px; border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 999px; background: rgba(37, 99, 235, 0.08); color: #2563eb; font-size: 12px; font-weight: 600; line-height: 18px; font-variant-numeric: tabular-nums; white-space: nowrap;">{tong} hs • {soPhanLoai} loại</div>'
                ]
            },
            {
                xtype: 'polar',
                height: 170,
                insetPadding: 6,
                listeners: { afterrender: 'onChartReady' },
                bind: { store: '{' + nhom + 'Store}' },
                series: [{
                    type: 'pie',
                    angleField: 'soLuong',
                    donut: 48,
                    radiusFactor: 95,
                    highlight: false,
                    labelOverflowPadding: 0,
                    label: {
                        field: 'tyLe',
                        display: 'inside',
                        fontSize: 12,
                        fontWeight: 'bold',
                        fillStyle: '#ffffff',
                        renderer: function (value) {
                            const percent = Number(String(value).replace(',', '.'));

                            return {
                                text: percent >= 8 ? value + '%' : '',
                                rotationRads: 0
                            };
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            const ten = Ext.String.htmlEncode(record.get('ten'));
                            const soLuong = Number(record.get('soLuong')).toLocaleString('vi-VN');

                            tooltip.setHtml(ten + ': ' + soLuong + ' hồ sơ');
                        }
                    }
                }]
            },
            {
                xtype: 'component',
                cls: 'tcn2-donut-details',
                bind: { data: '{coCau.' + nhom + '}' },
                tpl: [
                    '<div class="tcn2-legend-columns"><ul class="tcn2-legend">',
                    '<tpl for="chiTiet">',
                    '<tpl if="xcount &gt;= 8 &amp;&amp; xindex === Math.ceil(xcount / 2) + 1">',
                    '</ul><ul class="tcn2-legend">',
                    '</tpl>',
                    '<li style="display: grid; grid-template-columns: 14px minmax(0, 1fr) auto; column-gap: 10px; align-items: center; font-size: 14px; line-height: 22px; color: var(--theme-text-primary);">' +
                    '<i class="tcn2-swatch tcn2-swatch-{mau}" style="background-color: {mauColor} !important; width: 14px; height: 14px; border-radius: 3px; display: inline-block; flex-shrink: 0;"></i>' +
                    '<span>{ten:htmlEncode}</span><strong>{soLuong:this.formatCount}</strong></li>',
                    '</tpl></ul></div>',
                    {
                        formatCount: function (value) {
                            return Number(value).toLocaleString('vi-VN');
                        }
                    }
                ]
            }
        ];
        me.callParent();
    }

});
