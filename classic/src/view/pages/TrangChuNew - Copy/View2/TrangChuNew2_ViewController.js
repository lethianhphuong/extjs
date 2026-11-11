Ext.define('DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew2_ViewController',
    requires: ['DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_MockData'],

    palettes: {
        dtcb: ['#2563eb', '#22c55e', '#f59e0b', '#f97316', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'],
        hiemNghi: ['#2563eb', '#22c55e', '#f97316'],
        chuyenAn: ['#2563eb', '#22c55e', '#f97316'],
        ctvbm: ['#2563eb', '#22c55e', '#f97316'],
        phanLoai: ['#2563eb', '#22c55e'],
        danhMuc: ['#2563eb', '#22c55e', '#f59e0b', '#f97316'],
        doiTuong: [
            '#2563eb', '#22c55e', '#f59e0b', '#f97316', '#8b5cf6', '#ec4899', '#06b6d4',
            '#14b8a6', '#6366f1', '#f43f5e', '#84cc16', '#a855f7', '#0ea5e9'
        ]
    },

    masterPalette: [
        '#64748b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6',
        '#6366f1', '#f43f5e', '#84cc16', '#a855f7', '#0ea5e9',
        '#e11d48', '#3b82f6', '#10b981', '#eab308', '#d946ef',
        '#0284c7', '#16a34a', '#d97706', '#ca8a04', '#9333ea'
    ],

    /**
     * Xác định màu cho tiêu chí:
     * - Nếu có trong config palette của nhóm: giữ nguyên màu config.
     * - Chỉ khi KHÔNG có trong config: chọn màu mới từ masterPalette hoặc sinh màu HSL,
     *   đảm bảo khác hoàn toàn các màu đã dùng trong chart đó.
     */
    resolveColor: function (nhom, index, itemName, usedColors) {
        const me = this;
        const configured = me.palettes && me.palettes[nhom];

        // 1. Nếu có trong config: dùng đúng màu đã cấu hình
        if (configured && configured[index]) {
            return configured[index];
        }

        // 2. Chỉ khi không có trong config: chọn màu mới chưa xuất hiện trong chart này
        const isKhac = itemName && itemName.toLowerCase().indexOf('khác') !== -1;

        if (isKhac && usedColors.indexOf('#64748b') === -1) {
            return '#64748b';
        }

        for (let i = 0; i < me.masterPalette.length; i++) {
            const candidate = me.masterPalette[i];

            if (usedColors.indexOf(candidate) === -1) {
                return candidate;
            }
        }

        // Trường hợp vượt quá bảng màu mở rộng: sinh màu HSL phân bố theo góc vàng
        const hue = (index * 137.5) % 360;

        return 'hsl(' + Math.round(hue) + ', 70%, 50%)';
    },

    /** Nạp số liệu khi khởi tạo dashboard. */
    init: function () {
        const me = this;

        setTimeout(() => {
            me.loadData();
        }, 5000);
    },

    /** Nạp các danh sách mẫu vào biểu đồ và phần chi tiết. */
    loadData: function () {
        const me = this;
        const viewModel = me.getViewModel();
        const data = DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_MockData.getData();
        const loaiHoSo = {
            DTCB: 'ĐTCB',
            SUUTRA: 'Sưu tra',
            HIEMNGHI: 'Hiểm nghi',
            CHUYENAN: 'Chuyên án',
            CTVBM: 'CTVBM',
            HTBM: 'HTBM',
            VANV: 'Vai ảo NV',
            NNV: 'Nhà nghiệp vụ'
        };
        const nhom = {
            dtcb: { key: 'ĐTCB', tieuDe: 'ĐTCB' },
            hiemNghi: { key: 'HIEM_NGHI', tieuDe: 'Hiểm nghi' },
            chuyenAn: { key: 'ChuyenAn', tieuDe: 'Chuyên án' },
            ctvbm: { key: 'CTVBM', tieuDe: 'CTVBM' },
            phanLoai: { key: 'phanLoai', tieuDe: 'Phân loại' },
            danhMuc: { key: 'danhMuc', tieuDe: 'Danh mục' },
            doiTuong: { key: 'loaiDoituong', tieuDe: 'Loại đối tượng' }
        };
        const tongTheoMa = new Map(data.tongQuan.map(muc => [muc.code, muc.val]));
        const hoSo = Object.keys(loaiHoSo)
            .filter(ma => tongTheoMa.has(ma))
            .map(ma => ({ ten: loaiHoSo[ma], soLuong: tongTheoMa.get(ma) }));
        const coCau = {};

        viewModel.getStore('hoSoStore').loadData(hoSo);
        Object.keys(nhom).forEach(function (ma) {
            const cauHinh = nhom[ma];
            const danhSach = data[cauHinh.key] || [];
            const tong = danhSach.reduce((sum, muc) => sum + muc.val, 0);
            const usedColors = [];
            const chiTiet = danhSach.map((muc, index) => {
                const color = me.resolveColor(ma, index, muc.name, usedColors);

                usedColors.push(color);
                return {
                    ten: muc.name,
                    soLuong: muc.val,
                    tyLe: (tong ? muc.val * 100 / tong : 0).toFixed(1).replace('.', ','),
                    mau: index + 1,
                    mauColor: color
                };
            });

            // Pie chỉ tạo sprite cho giá trị khác 0 khi store được nạp sau render.
            // Giữ các mục 0 trong legend, nạp các lát dương và màu tương ứng vào chart.
            const duLieuChart = chiTiet.filter(muc => muc != null && muc.soLuong != null && muc.soLuong > 0);

            viewModel.getStore(ma + 'Store').loadData(duLieuChart);

            coCau[ma] = {
                tieuDe: cauHinh.tieuDe,
                tong: tong.toLocaleString('vi-VN'),
                soPhanLoai: chiTiet.length,
                chiTiet: chiTiet,
                colors: duLieuChart.map(muc => muc.mauColor)
            };
        });


        viewModel.set({
            coCau: coCau,
            tongSuuTra: coCau.phanLoai.tong,
            tongHoSo: hoSo.reduce(function (tong, item) {
                return tong + item.soLuong;
            }, 0).toLocaleString('vi-VN')
        });
        viewModel.notify();

        // Đồng bộ màu sắc cho các biểu đồ Donut đã render
        const view = me.getView();

        if (view && view.rendered) {
            const donutCards = view.query('TrangChuNew2_ViewDonut');

            donutCards.forEach(function (donut) {
                const maNhom = donut.getNhom();
                const polarChart = donut.down('polar');

                if (polarChart && coCau[maNhom] && coCau[maNhom].colors) {
                    polarChart.getSeries()[0].setColors(coCau[maNhom].colors);
                    polarChart.redraw();
                }
            });
        }
    },

    /** Thiết lập bảng màu cho biểu đồ Donut đồng bộ với danh sách legend. */
    onChartReady: function (chart) {
        const me = this;
        const view = chart.up('TrangChuNew2_ViewDonut');
        const nhom = view && view.getNhom ? view.getNhom() : null;
        const viewModel = me.getViewModel();
        const coCau = viewModel ? viewModel.get('coCau') : null;
        const groupData = coCau && nhom ? coCau[nhom] : null;
        let colors = null;

        if (groupData && groupData.colors) {
            colors = groupData.colors;
        } else if (nhom && me.palettes) {
            colors = me.palettes[nhom];
        }

        if (!colors || !colors.length) {
            const styles = window.getComputedStyle(chart.getEl().dom);
            const palette = styles.getPropertyValue('--tcn2-chart-colors').trim();

            if (palette) {
                colors = palette.split(',').map(color => color.trim());
            }
        }

        if (colors && colors.length) {
            chart.getSeries()[0].setColors(colors);
            chart.redraw();
        }
    }
});
