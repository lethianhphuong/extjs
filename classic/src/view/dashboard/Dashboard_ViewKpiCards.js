Ext.define('DEMO.view.dashboard.Dashboard_ViewKpiCards', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_ViewKpiCards',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    margin: '0 0 16 0',
    height: 160,

    defaults: {
        flex: 1,
        xtype: 'box',
        cls: 'dash-kpi-card',
        margin: '0 8 0 0'
    },

    items: [],

    listeners: {
        afterrender: function (cmp) {
            var view = cmp.up('Dashboard_View');
            if (!view) return;
            var vm = view.getViewModel();
            if (!vm) return;
            var kpiStore = vm.getStore('kpiStore');
            if (!kpiStore) return;

            var items = [];

            kpiStore.each(function (record) {
                var value = Ext.util.Format.number(record.get('value'), '0,000');
                var trendDir = record.get('trendDir');
                var trend = record.get('trend');
                var color = record.get('color');
                var sparkData = record.get('sparkData');
                var maxVal = Math.max.apply(null, sparkData);
                var trendIcon = trendDir === 'up' ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
                var trendCls = trendDir === 'up' ? 'dash-kpi-trend-up' : 'dash-kpi-trend-down';

                // Build sparkline bars
                var sparkBars = '';
                for (var i = 0; i < sparkData.length; i++) {
                    var h = Math.max(4, Math.round((sparkData[i] / maxVal) * 36));
                    sparkBars += '<span class="dash-kpi-sparkline-bar" style="height:' + h + 'px;background:' + color + ';opacity:' + (0.4 + (i / sparkData.length) * 0.6) + ';"></span>';
                }

                items.push({
                    html: '<div class="dash-kpi-label">' + record.get('title') + '</div>' +
                        '<div class="dash-kpi-row">' +
                        '  <div class="dash-kpi-value">' + value + '</div>' +
                        '  <div class="dash-kpi-sparkline">' + sparkBars + '</div>' +
                        '</div>' +
                        '<div class="dash-kpi-trend ' + trendCls + '">' +
                        '  <i class="' + trendIcon + '"></i> ' + trend +
                        '  <span class="dash-kpi-trend-period">last 7 days</span>' +
                        '</div>'
                });
            });

            cmp.removeAll(true);
            cmp.add(items);
        }
    }
});
