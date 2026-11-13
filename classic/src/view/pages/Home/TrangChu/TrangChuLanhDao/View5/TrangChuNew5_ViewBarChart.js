Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewBarChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'TrangChuNew5_ViewBarChart',
    animation: false,
    height: 170,
    insetPadding: { top: 26, right: 8, bottom: 8, left: 8 },
    innerPadding: { top: 15, right: 0, bottom: 0, left: 0 },
    listeners: { afterrender: 'onChartReady', storechange: 'onBarStoreChange' },
    axes: [
        { type: 'numeric', position: 'left', minimum: 0, hidden: true },
        { type: 'category', position: 'bottom', fields: ['code'], label: { fontSize: 10, rotationRads: 0, color: '#475569' },
            // Ext tự ẩn nhãn trục khi khung nhãn chạm nhau; textPadding âm cho phép sát nhau để không mất tên cột
            style: { textPadding: -12 },
            renderer: function (axis, value) {
                const chart = axis.getChart();
                const store = chart ? chart.getStore() : null;
                const record = store ? store.findRecord('code', value, 0, false, true, true) : null;
                const text = record ? (record.get('name') || record.get('code') || value) : value;
                return typeof text === 'string' ? text.replace(/ /g, '\n') : (text || '');
            } }
    ],
    series: [{
        type: 'bar', xField: 'code', yField: 'val',
        style: { maxBarWidth: 28, radius: 4 },
        label: { field: 'val', display: 'outside', orientation: 'horizontal', calloutLine: false, color: '#0f172a', fontSize: 13, fontWeight: 'bold' },
        renderer: function (sprite, config, data, index) {
            const me = this;
            const palette = me.getChart().recordColors;
            const record = data.store.getAt(index);
            if (!record) { return {}; }
            // Ưu tiên màu hex cố định của record (Loại hồ sơ dùng chung màu với View3), không có thì lấy theo tone
            const color = record.get('hex') || (palette && palette[record.get('mau')]);
            return color ? { fillStyle: color, strokeStyle: color } : {};
        },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record) {
                const label = record ? (record.get('name') || record.get('code') || '') : '';
                const val = record ? Number(record.get('val') || 0).toLocaleString('vi-VN') : 0;
                tooltip.setHtml(Ext.String.htmlEncode(label) + ': ' + val);
            }
        }
    }]
});
