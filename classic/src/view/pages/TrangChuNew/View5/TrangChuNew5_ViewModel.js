Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew5_ViewModel',
    requires: ['DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_DisplayConfig'],
    data: { hienMoMoi: true, hienKetThuc: true, chiSo: [], loaiHoSo: [], donVi: [], topTinh: [], topXa: [] },
    /** Gắn cấu hình FE theo code, tính biến động từ số liệu thô. */
    prepareRows: function (rows, group) {
        const me = this;
        return (rows || []).map(function (row) {
            const display = DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_DisplayConfig.get(group, row.code);
            const result = Object.assign({}, row, display);
            if (group === 'chiSo') {
                Object.assign(result, me.formatTrend(row));
            }
            return result;
        }).sort((a, b) => a.thuTu - b.thuTu);
    },
    /** Định dạng hướng, số lượng và tỷ lệ biến động như View1. */
    formatTrend: function (row) {
        if (typeof row.valLech !== 'number' || !Number.isFinite(row.valLech)) {
            return { hienBienDong: false };
        }
        const direction = Math.sign(row.typeLech || 0);
        const change = direction * Math.abs(row.valLech);
        const previous = row.val - change;
        const rate = previous > 0 ? change * 100 / previous : null;
        const numberText = change.toLocaleString('vi-VN');
        const changeText = (change > 0 ? '+' : '') + numberText;
        let arrow = '→';
        let tone = 'muted';
        if (direction > 0) {
            arrow = '↑';
            tone = row.code === 'QUA_HAN' ? 'red' : 'green';
        } else if (direction < 0) {
            arrow = '↓';
            tone = 'red';
        }
        let percentText = '—';
        if (rate !== null) {
            percentText = (rate > 0 ? '+' : '') + rate.toLocaleString('vi-VN', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            }) + '%';
        }
        return {
            hienBienDong: true,
            lech: arrow + ' ' + changeText + ' (' + percentText + ')',
            xuHuong: tone
        };
    },
    /** Tỷ lệ được tính từ số lượng, không lưu cứng trong mock. */
    prepareUnits: function (rows) {
        const me = this;
        const units = me.prepareRows(rows, 'donVi');
        const total = units.reduce((sum, row) => sum + row.val, 0);
        return units.map(function (row) {
            const rate = total ? row.val * 100 / total : 0;
            return Object.assign({}, row, {
                tyLe: rate,
                tyLeText: rate.toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + '%'
            });
        });
    },
    stores: {
        donViStore: { fields: ['code', 'name', 'val', 'tyLe', 'tyLeText', 'mau'] },
        dienBienStore: { fields: ['code', 'name', 'nameHover', 'moMoi', 'ketThuc'] },
        capTinhStore: { fields: ['code', 'name', 'val', 'mau'] },
        capXaStore: { fields: ['code', 'name', 'val', 'mau'] }
    }
});
