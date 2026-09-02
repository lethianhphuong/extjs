Ext.define('DEMO.view.dashboard.Dashboard_ViewCharts', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_ViewCharts',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    height: 420,

    initComponent: function () {
        this.items = [
            // LEFT: Current download (Donut chart)
            {
                xtype: 'panel',
                flex: 1,
                cls: 'dash-chart-panel',
                margin: '0 8 0 0',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        cls: 'dash-chart-header',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                text: 'Current download',
                                cls: 'dash-chart-title'
                            },
                            {
                                xtype: 'label',
                                text: 'Downloaded by operating system',
                                cls: 'dash-chart-subtitle'
                            }
                        ]
                    },
                    {
                        xtype: 'polar',
                        flex: 1,
                        bind: {
                            store: '{downloadOsStore}'
                        },
                        interactions: ['rotate', 'itemhighlight'],
                        series: [{
                            type: 'pie',
                            angleField: 'value',
                            donut: 65,
                            colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
                            highlight: {
                                'segment': {
                                    margin: 8
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    tooltip.setHtml(record.get('name') + ': ' + Ext.util.Format.number(record.get('value'), '0,000'));
                                }
                            }
                        }]
                    },
                    {
                        xtype: 'container',
                        reference: 'donutLegend',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        margin: '8 0 0 0',
                        data: [],
                        tpl: [
                            '<div class="dash-legend">',
                            '<tpl for=".">',
                            '<div class="dash-legend-item">',
                            '<span class="dash-legend-dot" style="background:{color};"></span>',
                            '<span>{name}</span>',
                            '</div>',
                            '</tpl>',
                            '</div>'
                        ]
                    }
                ],
                listeners: {
                    afterrender: function (panel) {
                        var view = panel.up('Dashboard_View');
                        if (!view) return;
                        var vm = view.getViewModel();
                        if (!vm) return;
                        var store = vm.getStore('downloadOsStore');
                        var legendCmp = panel.lookupReference('donutLegend');
                        if (legendCmp && store) {
                            legendCmp.setData(store.getRange().map(function (r) { return r.data; }));
                        }
                    }
                }
            },
            // RIGHT: Area installed (Bar chart)
            {
                xtype: 'panel',
                flex: 1,
                cls: 'dash-chart-panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        margin: '0 0 16 0',
                        defaults: {
                            xtype: 'label'
                        },
                        items: [
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'Area installed',
                                        cls: 'dash-chart-title'
                                    },
                                    {
                                        xtype: 'label',
                                        text: '(+43%) than last year',
                                        cls: 'dash-chart-subtitle'
                                    }
                                ]
                            },
                            {
                                xtype: 'combobox',
                                bind: {
                                    store: '{yearStore}',
                                    value: '{selectedYear}'
                                },
                                valueField: 'year',
                                displayField: 'year',
                                value: 2023,
                                editable: false,
                                width: 80,
                                cls: 'dash-chart-year-combo',
                                ui: 'default'
                            }
                        ]
                    },
                    {
                        xtype: 'cartesian',
                        flex: 1,
                        bind: {
                            store: '{areaInstalledStore}'
                        },
                        axes: [{
                            type: 'numeric',
                            position: 'left',
                            grid: true,
                            minimum: 0,
                            label: {
                                fontSize: 10,
                                fillStyle: '#94a3b8'
                            },
                            title: false
                        }, {
                            type: 'category',
                            position: 'bottom',
                            label: {
                                fontSize: 10,
                                fillStyle: '#94a3b8'
                            },
                            title: false
                        }],
                        series: [{
                            type: 'bar',
                            xField: 'region',
                            yField: ['value'],
                            colors: ['#3b82f6'],
                            style: {
                                maxBarWidth: 28,
                                radius: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    tooltip.setHtml(record.get('region') + ': ' + record.get('value') + ' installs');
                                }
                            }
                        }]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
