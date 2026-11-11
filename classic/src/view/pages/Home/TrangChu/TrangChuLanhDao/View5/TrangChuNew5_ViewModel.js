Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew5_ViewModel',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_DisplayConfig'],
    data: {
        hienMoMoi: true,
        hienKetThuc: true,
        chiSo: [],
        loaiHoSo: [],
        coCauDonViList: [],
        topTinh: [],
        topXa: []
    },
    /** Gắn cấu hình FE theo code, tính biến động từ số liệu thô. */
    prepareRows: function (rows, group) {
        const me = this;
        return (rows || []).map(function (row) {
            const display = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_DisplayConfig.get(group, row.code);
            const result = Object.assign({}, row, display);
            if (group === 'chiSo') {
                Object.assign(result, me.formatTrend(row));
                result.laTong = (row.code === 'DANG_QUAN_LY');
                // Thẻ phần trăm (code PER_*): bỏ val, chỉ hiển thị % biến động
                result.laPhanTram = String(row.code || '').indexOf('PER_') === 0;
                if (!result.hienBienDong) {
                    result.phanTramText = '0%';
                    result.xuHuong = 'muted';
                }
            }
            return result;
        }).sort((a, b) => a.thuTu - b.thuTu);
    },
    /** Chuẩn hóa tổng quan từ API: hiển thị đầy đủ 6 thẻ KPI. */
    prepareTongQuan: function (rows) {
        const me = this;
        return me.prepareRows(rows || [], 'chiSo');
    },
    /** Định dạng hướng, số lượng và tỷ lệ biến động. */
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
            phanTramText: arrow + ' ' + percentText,
            lech: arrow + ' ' + changeText + ' (' + percentText + ')',
            xuHuong: tone
        };
    },
    /** Chuẩn hóa cơ cấu đơn vị cho Donut Chart (lấy Top đơn vị lớn nhất + nhóm Khác). */
    prepareCoCauDonVi: function (rows) {
        if (!rows || !rows.length) return [];
        const sorted = rows.slice().sort((a, b) => (b.val || 0) - (a.val || 0));
        const total = sorted.reduce((sum, it) => sum + (it.val || 0), 0);
        const palette = ['blue', 'indigo', 'cyan', 'purple', 'green', 'amber', 'muted'];

        const top = sorted.slice(0, 5);
        const rest = sorted.slice(5);
        const restVal = rest.reduce((sum, it) => sum + (it.val || 0), 0);

        const result = top.map(function (it, idx) {
            const rate = total ? (it.val || 0) * 100 / total : 0;
            return {
                code: it.maDonVi || ('CC_' + idx),
                name: it.capDonVi || it.name || ('Đơn vị ' + (idx + 1)),
                val: it.val || 0,
                tyLe: rate,
                tyLeText: rate.toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + '%',
                mau: palette[idx % palette.length]
            };
        });

        if (restVal > 0) {
            const restRate = total ? restVal * 100 / total : 0;
            result.push({
                code: 'KHAC',
                name: 'Đơn vị khác',
                val: restVal,
                tyLe: restRate,
                tyLeText: restRate.toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + '%',
                mau: 'muted'
            });
        }
        return result;
    },
    /** Chuẩn hóa biến động số lượng hồ sơ theo đơn vị cho Bar Chart. */
    prepareBienDongDonVi: function (rows) {
        if (!rows || !rows.length) return [];
        const sorted = rows.slice().sort((a, b) => (b.val || 0) - (a.val || 0));
        const palette = ['cyan', 'blue', 'indigo', 'purple', 'green', 'amber', 'orange'];
        const top = sorted.slice(0, 7);
        return top.map(function (it, idx) {
            return {
                code: it.maDonVi || ('BD_' + idx),
                name: it.capDonVi || it.name || ('Đơn vị ' + (idx + 1)),
                val: it.val || 0,
                mau: palette[idx % palette.length]
            };
        });
    },
    stores: {
        coCauDonViStore: { fields: ['code', 'name', 'val', 'tyLe', 'tyLeText', 'mau'] },
        bienDongDonViStore: { fields: ['code', 'name', 'val', 'mau'] },
        dienBienStore: { fields: ['code', 'name', 'nameHover', 'moMoi', 'ketThuc'] },
        capTinhStore: { fields: ['code', 'name', 'val', 'mau'] },
        capXaStore: { fields: ['code', 'name', 'val', 'mau'] }
    }
});
