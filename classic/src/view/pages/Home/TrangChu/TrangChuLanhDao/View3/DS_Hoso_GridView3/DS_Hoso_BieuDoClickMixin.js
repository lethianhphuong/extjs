/**
 * Dùng chung cho các ViewController trang chủ lãnh đạo (View3, View5) có grid DS_Hoso_GridView3:
 * hover báo hiệu bấm được, click chart / thẻ KPI lấy mã biểu đồ + code + record rồi bắn sự kiện sang grid.
 * Controller dùng mixin cần có getMaBieuDoMap() trả về { dataKey: 'Dx_Cxx' }; chart khai báo dataKey.
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_BieuDoClickMixin', {
    extend: 'Ext.Mixin',
    mixinConfig: { id: 'dsHosoBieuDoClick' },

    /** Độ mờ của phần tử đang rê chuột (giữ nguyên màu, chỉ làm mờ) và con trỏ báo hiệu bấm được. */
    hoverOpacity: 0.6,
    hoverCursor: 'zoom-in',

    /**
     * Gắn click + hover cho chart có dataKey: đổi tọa độ chuột sang tọa độ surface của series
     * rồi dùng chart.getItemForPoint để lấy đúng cột / lát / điểm.
     */
    bindBieuDoClick: function (chart) {
        const me = this;
        if (!chart || !chart.dataKey || chart.bieuDoClickBound || !chart.getEl()) { return; }
        chart.bieuDoClickBound = true;
        chart.getEl().on('click', function (event) {
            const item = me.getItemAtPoint(chart, event.getX(), event.getY());
            if (item) {
                me.onBieuDoClick(chart, item);
            }
        });
        // Interaction itemhighlight của chart chặn mousemove của Ext nên dùng sự kiện DOM gốc
        const dom = chart.getEl().dom;
        dom.addEventListener('mousemove', function (event) {
            me.onBieuDoHover(chart, me.getItemAtPoint(chart, event.pageX, event.pageY));
        });
        dom.addEventListener('mouseleave', function () {
            me.onBieuDoHover(chart, null);
        });
    },

    /** Item (cột / lát / điểm) nằm tại tọa độ trang (pageX, pageY), đổi sang tọa độ surface của series. */
    getItemAtPoint: function (chart, pageX, pageY) {
        const surfaceXY = chart.getSurface('series').el.getXY();
        return chart.getItemForPoint(pageX - surfaceXY[0], pageY - surfaceXY[1]);
    },

    /** Rê chuột vào phần tử bấm được: đổi con trỏ và làm mờ phần tử đó. */
    onBieuDoHover: function (chart, item) {
        const me = this;
        const current = chart.hoverItem;
        const same = item && current && item.record === current.record && item.field === current.field;
        if (same || (!item && !current)) { return; }
        chart.hoverItem = item;
        chart.getEl().dom.style.cursor = item ? me.hoverCursor : '';
        if (item) {
            // Highlight mặc định của Ext đổi màu (vàng/đỏ, tách lát, phóng to điểm) nên ghi đè bằng màu gốc + opacity
            item.series.setHighlight(Ext.apply(me.getItemBaseStyle(chart, item), { globalAlpha: me.hoverOpacity }));
            chart.setHighlightItem(null);
        }
        chart.setHighlightItem(item || null);
        if (typeof me.onAfterBieuDoHover === 'function') {
            me.onAfterBieuDoHover(chart, item);
        }
    },

    /** Kiểu gốc (màu nền, viền) của phần tử theo loại series để highlight không làm đổi màu. */
    getItemBaseStyle: function (chart, item) {
        const series = item.series;
        if (series.type === 'pie') {
            const style = series.getStyleByIndex(item.index);
            return { fillStyle: style.fillStyle, strokeStyle: style.strokeStyle, lineWidth: 1, margin: 0 };
        }
        if (series.type === 'line') {
            const marker = series.getMarker() || {};
            const color = marker.fillStyle || series.getStyleByIndex(0).strokeStyle;
            return { fillStyle: color, strokeStyle: marker.strokeStyle || color, lineWidth: marker.lineWidth || 0, scalingX: 1, scalingY: 1 };
        }
        const renderer = series.getRenderer();
        const rendered = renderer ? renderer.call(series, item.sprite, {}, { store: chart.getStore() }, item.index) : null;
        if (rendered && rendered.fillStyle) {
            return { fillStyle: rendered.fillStyle, strokeStyle: rendered.strokeStyle || rendered.fillStyle, lineWidth: rendered.lineWidth || 0 };
        }
        const yField = [].concat(series.getYField());
        const style = series.getStyleByIndex(Math.max(yField.indexOf(item.field), 0));
        return { fillStyle: style.fillStyle, strokeStyle: style.strokeStyle, lineWidth: style.lineWidth || 0 };
    },

    /** Xử lý item được bấm của các chart (cột, donut, đường): chart khai báo dataKey để tra mã biểu đồ. */
    onBieuDoClick: function (chart, item) {
        const me = this;
        const record = item && item.record;
        if (!record) { return; }
        me.xuLyClickBieuDo(me.taoThongTinClick(chart.dataKey, record.get('code'), record.get('raw') || record.getData(), item.field));
    },

    /**
     * Thẻ KPI tổng quan là HTML: click theo thuộc tính data-code của thẻ.
     * @param {Ext.Component} component component chứa các thẻ
     * @param {String} selector CSS selector của 1 thẻ (vd '.tcn3-metric')
     * @param {String} dataKey khóa tra mã biểu đồ (vd 'tongQuan')
     * @param {Function} getList trả về danh sách dữ liệu thẻ để tìm record theo code
     */
    bindKpiClick: function (component, selector, dataKey, getList) {
        const me = this;
        component.getEl().on('click', function (event, target) {
            const code = target.getAttribute('data-code');
            const raw = (getList() || []).find(it => it.code === code);
            if (raw) {
                me.xuLyClickBieuDo(me.taoThongTinClick(dataKey, code, raw, null));
            }
        }, me, { delegate: selector });
    },

    /** Danh sách mã biểu đồ có code là thời gian (kỳ YYYYKK hoặc ngày YYYYMMDD); controller khai báo lại nếu có. */
    getMaBieuDoTheoKy: function () {
        return [];
    },

    /**
     * Đổi mã trên trục thời gian của chart sang khoảng ngày (fromDate / toDate dạng 'Ymd'):
     * - 6 chữ số (YYYYKK) — mỗi điểm là 1 kỳ báo cáo (tháng 15→14) → khoảng ngày của kỳ.
     * - 8 chữ số (YYYYMMDD) — tìm kiếm theo tháng, mỗi điểm là 1 ngày → fromDate = toDate = ngày đó.
     * @param {Number|String} code mã trên trục thời gian
     * @return {Object|null} { fromDate, toDate }, null nếu code không hợp lệ
     */
    tinhKhoangNgayTuMaKy: function (code) {
        const text = String(code);
        if (/^\d{8}$/.test(text)) {
            return this.tinhKhoangNgayTheoNgay(text);
        }
        if (/^\d{6}$/.test(text)) {
            return this.tinhKhoangNgayTheoKy(Number(text));
        }
        return null;
    },

    /** Mã ngày YYYYMMDD: kiểm tra ngày có thật (strict) rồi trả về khoảng 1 ngày. */
    tinhKhoangNgayTheoNgay: function (text) {
        const ngay = Ext.Date.parse(text, 'Ymd', true);
        return ngay ? { fromDate: text, toDate: text } : null;
    },

    /**
     * Mã kỳ YYYYKK, cùng quy tắc với TT_TimKiem (getMonthPeriodRange / getYearPeriodRange):
     * code = năm báo cáo * 100 + kỳ; năm báo cáo N bắt đầu 15/10/(N-1), kỳ 01 = "Tháng 11", kỳ 12 = "Tháng 10";
     * kỳ "Tháng M" chạy từ 15/(M-1) đến 14/M. Vd 202603 → Tháng 1/2026 → 15/12/2025 - 14/01/2026.
     */
    tinhKhoangNgayTheoKy: function (value) {
        const ky = value % 100;
        const namBaoCao = Math.floor(value / 100);
        if (ky < 1 || ky > 12) {
            return null;
        }
        // Kỳ 01, 02 là tháng 11, 12 của năm dương lịch trước; kỳ 03..12 là tháng 1..10
        const thang = ky <= 2 ? ky + 10 : ky - 2;
        const nam = ky <= 2 ? namBaoCao - 1 : namBaoCao;
        // Tháng của Date tính từ 0: (thang - 2) là tháng trước, (thang - 1) là tháng hiện tại
        const tuNgay = new Date(nam, thang - 2, 15);
        const denNgay = new Date(nam, thang - 1, 14);
        return {
            fromDate: Ext.Date.format(tuNgay, 'Ymd'),
            toDate: Ext.Date.format(denNgay, 'Ymd')
        };
    },

    /** Gói thông tin click thống nhất cho mọi biểu đồ. */
    taoThongTinClick: function (dataKey, code, record, truong) {
        const maBieuDo = this.getMaBieuDoMap() || {};
        return {
            maBieuDo: maBieuDo[dataKey] || null,
            dataKey: dataKey,
            code: code,
            record: record,
            truong: truong || null
        };
    },

    /**
     * Điểm xử lý duy nhất sau khi click: tạo params và bắn sự kiện taiDanhSach sang grid DS_Hoso_GridView3,
     * grid gọi store tự chọn mock (DEMO) hoặc API (NVCB).
     */
    xuLyClickBieuDo: function (thongTin) {
        const me = this;
        const params = {
            maThongKe: thongTin.maBieuDo + '_LIST',
            json: { code: thongTin.code }
        };
        // Chart theo thời gian (code YYYYKK hoặc YYYYMMDD): gửi thêm khoảng ngày của điểm được click
        if (me.getMaBieuDoTheoKy().indexOf(thongTin.maBieuDo) >= 0) {
            Ext.apply(params.json, me.tinhKhoangNgayTuMaKy(thongTin.code));
        }
        window.console.log('[' + me.getView().xtype + '] Click biểu đồ', params, thongTin);
        const grid = me.getView().down('DS_Hoso_GridView3');
        if (grid) {
            console.log(params, 'params');

            grid.fireEvent('taiDanhSach', params, thongTin);
        }
    }
});
