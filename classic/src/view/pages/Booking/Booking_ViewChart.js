Ext.define('DEMO.view.pages.Booking.Booking_ViewChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'Booking_ViewChart',

    flex: 1,
    shadow: true,
    layout: 'fit',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],

    items: [{
        xtype: 'cartesian',
        shadow: true,
        padding: '8px 24px 20px',
        flex: 1,
        store: {
            fields: ['year', 'sold', 'canceled'],
            data: [
                { year: '2018', sold: 85, canceled: 50 },
                { year: '2019', sold: 55, canceled: 55 },
                { year: '2020', sold: 38, canceled: 32 },
                { year: '2021', sold: 50, canceled: 50 },
                { year: '2022', sold: 30, canceled: 50 },
                { year: '2023', sold: 100, canceled: 50 }
            ]
        },
        legend: false,
        axes: [{
            type: 'numeric',
            position: 'left',
            grid: true,
            minimum: 0,
            majorTickSteps: 5,
            label: {
                fontSize: 11,
                fillStyle: '#94a3b8'
            },
            title: {
                text: ''
            }
        }, {
            type: 'category',
            position: 'bottom',
            fields: ['year'],
            label: {
                fontSize: 11,
                fillStyle: '#94a3b8'
            }
        }],
        series: [{
            type: 'bar',
            title: 'Sold',
            xField: 'year',
            yField: 'sold',
            stacked: false,
            style: {
                fill: '#0d9488',
                maxBarWidth: 28,
                minBarWidth: 18,
                radiusTopLeft: 4,
                radiusTopRight: 4
            },
            highlight: {
                fillStyle: '#14b8a6',
                strokeStyle: '#0f766e'
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record) {
                    tooltip.setHtml(
                        '<b>Sold</b> (' + record.get('year') + '): <b>' +
                        record.get('sold') + '</b>'
                    );
                }
            }
        }, {
            type: 'bar',
            title: 'Canceled',
            xField: 'year',
            yField: 'canceled',
            stacked: false,
            style: {
                fill: '#fca5a1',
                maxBarWidth: 28,
                minBarWidth: 18,
                radiusTopLeft: 4,
                radiusTopRight: 4
            },
            highlight: {
                fillStyle: '#f87171',
                strokeStyle: '#ef4444'
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record) {
                    tooltip.setHtml(
                        '<b>Canceled</b> (' + record.get('year') + '): <b>' +
                        record.get('canceled') + '</b>'
                    );
                }
            }
        }]
    }]
});
