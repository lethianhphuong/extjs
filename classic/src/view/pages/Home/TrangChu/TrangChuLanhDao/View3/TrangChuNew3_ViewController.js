/* global NVCB */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew3_ViewController',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig'
    ],
    // Hover/click chart → grid DS_Hoso_GridView3 (dùng chung với View5)
    mixins: {
        bieuDoClick: 'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_BieuDoClickMixin'
    },

    /** Khởi tạo và liên kết sự kiện */
    init: function () {
        const me = this;
        const view = me.getView();
        const viewModel = me.getViewModel();

        if (viewModel) {
            viewModel.set('timKiemNangCao.tuNgay', new Date(2025, 9, 1));
            viewModel.set('timKiemNangCao.denNgay', new Date(2025, 11, 31));
        }

        if (view) {
            const timKiem = view.down('TT_TimKiem_View') || view.down('#TT_TimKiem_View');
            if (timKiem) {
                timKiem.on({
                    search: function () {
                        me.onSearch();
                    }
                });
            }

            const tabpanel = view.up('tabpanel');
            if (tabpanel) {
                tabpanel.on('tabchange', function (tp, newCard) {
                    if (newCard && newCard.xtype === view.xtype) {
                        me.onSearch();
                    }
                });
            }
        }

        me.onCheckQuyenTK();
    },

    onCheckQuyenTK: function () {
        const me = this;
        const viewModel = me.getViewModel();
        if (typeof config === 'undefined' || typeof NVCB === 'undefined' || !NVCB.Ajax) {
            me.loadData();
            return;
        }
        const url = config.getNVCB_BE_Url() + 'de-xuat-xu-ly/thong-tin-quyen-tai-khoan';
        NVCB.Ajax.get(url, function (success, response) {
            if (success) {
                const oResponse = Ext.decode(response.responseText);
                if (oResponse.success) {
                    const oData = oResponse.data;
                    if (viewModel) {
                        viewModel.set('quyenTaiKhoan', oData);
                    }
                    me.onSearch();
                    return;
                }
            }
            me.loadData();
        });
    },

    //#region NOTE: SEARCH
    getParams: function () {
        const me = this;
        const view = me.getView();
        const viewModel = me.getViewModel();

        const quyenTaiKhoan = (viewModel && viewModel.get('quyenTaiKhoan')) || {};
        const viewTimKiem = view ? (view.down('TT_TimKiem_View') || view.down('#TT_TimKiem_View')) : null;
        let obj = {};
        if (viewTimKiem && viewTimKiem.getController && typeof viewTimKiem.getController().onGetParams === 'function') {
            obj = viewTimKiem.getController().onGetParams() || {};
        }

        const newParams = {
            toDate: obj.toDate || Ext.Date.format(new Date(), 'Ymd'),
            fromDate: obj.fromDate || '19701215',
            maDonVi: obj.maDonVi || ''
        };

        if (quyenTaiKhoan.maDonViDuocThongKe && quyenTaiKhoan.maDonViDuocThongKe !== 'ALL') {
            newParams.maDonVi = quyenTaiKhoan.maDonViDuocThongKe;
        }

        return newParams;
    },

    onSearch: function () {
        const me = this;
        if (typeof config === 'undefined' || typeof NVCB === 'undefined' || !NVCB.Ajax) {
            me.loadData();
            return;
        }

        const params = me.getParams();
        const url = `${config.getNVCB_BC_Url()}/thong-ke-trang-chu-dieu-hanh`;

        NVCB.Ajax.getParams(url, params, function (success, response) {
            if (success) {
                const oResponse = Ext.decode(response.responseText);
                if (oResponse.success && oResponse.data) {
                    me.loadData(oResponse.data);
                } else {
                    me.loadData();
                }
            } else {
                if (typeof common !== 'undefined' && common.onShowResponseMsgFail) {
                    common.onShowResponseMsgFail(response);
                }
                me.loadData();
            }
        });
    },
    //#endregion

    /** Gọi khi tab view3 được kích hoạt hoặc hiển thị lại */
    onViewActivate: function () {
        const me = this;
        const view = me.getView();
        if (!view) return;
        view.updateLayout();

        const coCauChart = view.down('#coCauChart_IdView');
        if (coCauChart && coCauChart.rendered) {
            coCauChart.performLayout();
            coCauChart.redraw();
        }

        const bienDongChart = view.down('#bienDongChart_IdView');
        if (bienDongChart && bienDongChart.rendered) {
            bienDongChart.redraw();
        }

        const dienBienChart = view.down('#dienBienChart_IdView');
        if (dienBienChart && dienBienChart.rendered) {
            dienBienChart.redraw();
        }

        const loaiDoiTuongChart = view.down('#loaiDoiTuongChart_IdView');
        if (loaiDoiTuongChart && loaiDoiTuongChart.rendered) {
            loaiDoiTuongChart.redraw();
        }
    },

    /**
     * Xử lý chuyển đổi và chuẩn hóa toàn bộ dữ liệu thô (từ API thật hoặc MockData)
     * sang cấu trúc phục vụ ViewModel và các Store của View3
     * @param {Object} [rawData] Dữ liệu thô theo hợp đồng DataView2
     * @return {Object} Dữ liệu đã chuẩn hóa
     */
    mapData: function (rawData) {
        const me = this;
        const data = rawData || {};
        const tongQuanList = me.toList(data.tongQuan);
        const loaiHoSoData = me.mapLoaiHoSo(data.loaiHoSo);
        const tongLoaiHoSo = loaiHoSoData.reduce((sum, it) => sum + it.val, 0);

        return {
            tongQuan: tongQuanList,
            loaiHoSoData: loaiHoSoData,
            tongLoaiHoSoText: Number(tongLoaiHoSo).toLocaleString('vi-VN'),
            coCauData: me.mapCoCau(data.coCauHoSoTheoDonVi),
            bienDongData: me.toList(data.bienDongHoSoTheoDonVi).map(me.mapBienDongItem),
            dienBienData: me.toList(data.dienBienMoMoiVaKetThuc).map(me.mapDienBienItem),
            loaiDoiTuongData: me.mapLoaiDoiTuong(data.loaiDoiTuong)
        };
    },

    //#region NOTE: Hàm phụ trợ cho mapData
    /** Trả về chính mảng đầu vào, không phải mảng thì trả về mảng rỗng. */
    toList: function (value) {
        return Array.isArray(value) ? value : [];
    },

    /** 2. Loại hồ sơ cho biểu đồ cột: tên ngắn theo dữ liệu, tên đầy đủ và màu cột theo DisplayConfig. */
    mapLoaiHoSo: function (list) {
        const cfgLoai = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.tieuChi.loaiHoSo;
        return this.toList(list).map(function (it) {
            const def = cfgLoai[it.code] || {};
            const ten = it.name || it.ten || def.ten || it.code;
            return {
                code: it.code,
                ten: ten,
                tenDayDu: def.ten || ten,
                val: typeof it.val === 'number' ? it.val : 0,
                mauHex: def.hex || '#64748b',
                raw: it
            };
        });
    },

    /** 3. Cơ cấu hồ sơ theo cấp đơn vị (tên, màu, tỷ lệ %). */
    mapCoCau: function (list) {
        const capColors = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.coCauColors;
        const cfgDonVi = {
            CUC: { name: 'Cấp Cục', mau: capColors['Cấp Cục'] },
            TINH: { name: 'Cấp tỉnh', mau: capColors['Cấp tỉnh'] },
            XA: { name: 'Cấp Xã', mau: capColors['Cấp Xã'] }
        };
        const coCauList = this.toList(list);
        const totalCoCau = coCauList.reduce((sum, it) => sum + (it.val || 0), 0);
        return coCauList.map(function (it) {
            const cfg = cfgDonVi[it.capDonVi] || { name: it.capDonVi || it.name, mau: '#94a3b8' };
            const soLuong = it.val || 0;
            return {
                code: it.capDonVi,
                name: cfg.name,
                soLuong: soLuong,
                tyLe: totalCoCau > 0 ? Math.round((soLuong / totalCoCau) * 1000) / 10 : 0,
                mau: cfg.mau,
                raw: it
            };
        });
    },

    /** 4. Biến động theo quý / tháng (hiển thị toàn bộ dữ liệu, không cắt slice). */
    mapBienDongItem: function (it, idx) {
        const cuc = it.cuc || 0;
        const tinh = it.tinh || 0;
        const xa = it.xa || 0;
        const name = it.name || it.nameHover || '';
        return {
            code: it.code || idx,
            name: name,
            nameHover: it.nameHover || name,
            quy: name,
            capCuc: cuc,
            capTinh: tinh,
            capXa: xa,
            tongSo: cuc + tinh + xa,
            raw: it
        };
    },

    /** 5. Diễn biến mở mới và kết thúc (12 tháng gần nhất). */
    mapDienBienItem: function (it, idx) {
        const thangLabel = it.name ? it.name.replace(/\s+/g, '') : ('T' + (idx + 1));
        return {
            code: it.code || idx,
            name: it.name || thangLabel,
            nameHover: it.nameHover || it.name || thangLabel,
            thang: thangLabel,
            moMoi: it.moMoi || 0,
            ketThuc: it.ketThuc || 0,
            raw: it
        };
    },

    /**
     * 6. Loại đối tượng. Đảo ngược thứ tự để khi vẽ trên Horizontal Bar Chart (flipXY: true)
     * danh mục thứ nhất trong API sẽ hiển thị ở trên cùng (ExtJS category axis vẽ từ dưới lên trên).
     */
    mapLoaiDoiTuong: function (list) {
        const rawLoaiDoiTuong = this.toList(list);
        return rawLoaiDoiTuong.slice().reverse().map((it, idx) => ({
            code: it.code || '',
            name: it.name || it.ten || '',
            val: typeof it.val === 'number' ? it.val : 0,
            originalIndex: rawLoaiDoiTuong.length - 1 - idx,
            raw: it
        }));
    },

    //#endregion

    /**
     * Nạp dữ liệu vào ViewModel và các Store
     * Ánh xạ trực tiếp từ cấu trúc chuẩn DataView2
     * @param {Object} [dataApi] Dữ liệu từ response API thật (cấu trúc như DataView2)
     */
    loadData: function (dataApi) {
        const me = this;
        const viewModel = me.getViewModel();
        if (!viewModel) return;

        // 1. Mặc định lấy từ MockData (trùng 100% key với DataView2)
        const rawData = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData.getData();

        // 2. Khi có dữ liệu thật từ API: Mở comment dòng dưới và đóng comment dòng trên
        // const rawData = dataApi;
        void dataApi;

        // Xử lý chuyển đổi dữ liệu qua hàm mapData riêng biệt
        const mapped = me.mapData(rawData);

        // Cập nhật ViewModel
        viewModel.set({
            tongQuan: mapped.tongQuan,
            tongLoaiHoSoText: mapped.tongLoaiHoSoText
        });

        // Nạp các Store
        const loaiHoSoStore = viewModel.getStore('loaiHoSoStore');
        if (loaiHoSoStore) loaiHoSoStore.loadData(mapped.loaiHoSoData);

        const coCauStore = viewModel.getStore('coCauStore');
        if (coCauStore) coCauStore.loadData(mapped.coCauData);

        const bienDongStore = viewModel.getStore('bienDongStore');
        if (bienDongStore) bienDongStore.loadData(mapped.bienDongData);

        const loaiDoiTuongStore = viewModel.getStore('loaiDoiTuongStore');
        if (loaiDoiTuongStore) loaiDoiTuongStore.loadData(mapped.loaiDoiTuongData);

        const dienBienStore = viewModel.getStore('dienBienStore');
        if (dienBienStore) dienBienStore.loadData(mapped.dienBienData);

        viewModel.notify();

        const view = me.getView();
        if (view && view.rendered) {
            me.updateChartColors();
        }
    },

    /** Thích ứng số cột khu vực KPI khi resize */
    onMetricsResize: function (component, width) {
        if (!component || !component.rendered) return;
        const availableWidth = typeof width === 'number' ? width : component.getWidth();
        let columns = 2;

        if (availableWidth >= 1200) {
            columns = 6;
        } else if (availableWidth >= 768) {
            columns = 3;
        }

        if (availableWidth <= 0 || component.metricColumns === columns) {
            return;
        }
        component.metricColumns = columns;
        component.removeCls(['tcn3-metrics-cols-6', 'tcn3-metrics-cols-3', 'tcn3-metrics-cols-2']);
        component.addCls('tcn3-metrics-cols-' + columns);
    },

    /** Bật tắt hiển thị đường trong biểu đồ diễn biến 12 tháng */
    onToggleTrendSeries: function (button, pressed) {
        const me = this;
        const chart = me.getView().down('#dienBienChart_IdView');

        me.getViewModel().set(button.stateKey, pressed);
        if (chart && chart.rendered) {
            const seriesList = chart.getSeries();
            if (seriesList && seriesList[button.seriesIndex]) {
                seriesList[button.seriesIndex].setHidden(!pressed);
                chart.redraw();
            }
        }
    },

    //#region NOTE: Cập nhật và đồng bộ biểu đồ
    /** Sự kiện khi từng chart được render */
    onChartReady: function (chart) {
        const me = this;
        me.updateChartColors(chart);
        me.bindBieuDoClick(chart);
    },

    /** Kiểm tra chart đã render và có phải đối tượng cần cập nhật hay không. */
    isTargetChart: function (chart, targetChart) {
        return !!(chart && chart.rendered && (!targetChart || targetChart === chart));
    },

    /** Cập nhật màu cho biểu đồ Donut cơ cấu theo cấp đơn vị. */
    updateCoCauChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#coCauChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }

        const series = chart.getSeries() && chart.getSeries()[0];
        if (series && typeof series.setColors === 'function') {
            const capColors = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.coCauColors;
            series.setColors([capColors['Cấp Cục'], capColors['Cấp tỉnh'], capColors['Cấp Xã']]);
            chart.redraw();
        }
    },

    /** Biểu đồ cột 8 loại hồ sơ: vẽ lại (trục Y tự tính trong listener redraw của chart). */
    updateLoaiHoSoChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#loaiHoSoChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }

        // Trục Y (chừa chỗ cho nhãn số trên đầu cột) tự tính trong listener redraw của chart (TrangChuNew3_ViewCharts)
        chart.redraw();
    },

    /** Cập nhật biểu đồ biến động theo quý (Stacked Bar + Line). */
    updateBienDongChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#bienDongChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }
        chart.redraw();
    },

    /** Cập nhật biểu đồ cơ cấu theo loại đối tượng (Horizontal Bar Chart), điều chỉnh trục tránh tràn nhãn. */
    updateLoaiDoiTuongChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#loaiDoiTuongChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }

        // Chừa khoảng trục cho nhãn số bên ngoài thanh dài nhất (nếu không nhãn bị ẩn)
        const loaiStore = chart.getStore();
        const maxVal = loaiStore ? loaiStore.getRange().reduce((max, rec) => Math.max(max, Number(rec.get('val')) || 0), 0) : 0;
        const numericAxis = chart.getAxes().find(axis => axis.type === 'numeric');
        if (numericAxis && maxVal > 0) {
            numericAxis.setMaximum(Math.ceil(maxVal * 1.2));
        }
        chart.redraw();
    },

    /** Tạo vùng tô gradient mờ từ màu đường biểu đồ xuống đáy (theo chuẩn View 1). */
    buildGradientFill: function (color) {
        return {
            type: 'linear',
            degrees: 90,
            stops: [
                { offset: 0, color: color },
                { offset: 1, color: 'rgba(0,0,0,0)' }
            ]
        };
    },

    /** Cập nhật biểu đồ diễn biến mở mới và kết thúc (12 tháng), đồng bộ màu gradient và trạng thái ẩn/hiện như View 1. */
    updateDienBienChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#dienBienChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }

        const colors = ['#2563eb', '#059669'];
        const vm = me.getViewModel();
        const seriesList = chart.getSeries();
        chart.setColors(colors);
        if (Array.isArray(seriesList)) {
            ['hienMoMoi', 'hienKetThuc'].forEach(function (key, index) {
                const series = seriesList[index];
                if (!series) { return; }
                series.setStyle({
                    strokeStyle: colors[index],
                    fillStyle: me.buildGradientFill(colors[index])
                });
                if (vm) {
                    series.setHidden(!vm.get(key));
                }
            });
        }
        chart.redraw();
    },

    /** Đồng bộ bảng màu và trạng thái cho toàn bộ các biểu đồ */
    updateChartColors: function (targetChart) {
        const me = this;
        const view = me.getView();
        if (!view || !view.rendered) { return; }

        me.updateLoaiHoSoChart(view, targetChart);
        me.updateCoCauChart(view, targetChart);
        me.updateBienDongChart(view, targetChart);
        me.updateLoaiDoiTuongChart(view, targetChart);
        me.updateDienBienChart(view, targetChart);
    },
    //#endregion

    //#region NOTE: Click biểu đồ — phần chung nằm ở DS_Hoso_BieuDoClickMixin
    /** Mã biểu đồ D3_Cxx theo dataKey của chart (DisplayConfig.maBieuDo). */
    getMaBieuDoMap: function () {
        return DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.maBieuDo;
    },

    /** Mã biểu đồ có code là kỳ báo cáo (DisplayConfig.maBieuDoTheoKy). */
    getMaBieuDoTheoKy: function () {
        return DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.maBieuDoTheoKy;
    },

    /** Sau khi hover chart (mixin gọi): donut cơ cấu đồng bộ với danh sách bên cạnh. */
    onAfterBieuDoHover: function (chart, item) {
        if (chart.itemId === 'coCauChart_IdView') {
            this.syncCoCauList(item);
        }
    },

    /** Donut cơ cấu ↔ danh sách bên cạnh: rê vào lát nào thì dòng tương ứng cũng sáng lên. */
    syncCoCauList: function (item) {
        const list = this.getView().down('#coCauList_IdView');
        if (!list || !list.rendered) { return; }
        list.clearHighlight();
        const node = item ? list.getNode(item.index) : null;
        if (node) { list.highlightItem(node); }
    },

    /** Item của donut theo vị trí dòng trong danh sách cơ cấu. */
    getCoCauItem: function (index) {
        const chart = this.getView().down('#coCauChart_IdView');
        const series = chart && chart.getSeries()[0];
        return series ? series.getItemByIndex(index, 'sprites') : null;
    },

    onCoCauItemEnter: function (list, record, node, index) {
        const item = this.getCoCauItem(index);
        if (item) { this.onBieuDoHover(item.series.getChart(), item); }
    },

    onCoCauItemLeave: function () {
        const chart = this.getView().down('#coCauChart_IdView');
        if (chart) { this.onBieuDoHover(chart, null); }
    },

    /** Click dòng trong danh sách cơ cấu: xử lý giống click lát donut (D3_C03). */
    onCoCauItemClick: function (list, record, node, index) {
        const item = this.getCoCauItem(index);
        if (item) { this.onBieuDoClick(item.series.getChart(), item); }
    },

    /** Thẻ KPI tổng quan (D3_C01): tooltip + click theo data-code. */
    onKpiReady: function (component) {
        const me = this;
        me.onTooltipReady(component);
        me.bindKpiClick(component, '.tcn3-metric', 'tongQuan', function () {
            return me.getViewModel().get('tongQuan');
        });
    },
    //#endregion

    /** Khởi tạo tooltip cho các thẻ KPI tổng quan */
    onTooltipReady: function (component) {
        if (!component || !component.getEl()) { return; }
        const tip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            delegate: '[data-tcn3-tip]',
            trackMouse: true,
            listeners: {
                beforeshow: function (tooltip) {
                    const text = tooltip.triggerElement.getAttribute('data-tcn3-tip');
                    if (!text) { return false; }
                    tooltip.setHtml(Ext.String.htmlEncode(text));
                }
            }
        });
        component.on('beforedestroy', function () {
            tip.destroy();
        });
    },

    destroy: function () {
        const me = this;
        me.callParent(arguments);
    }
});
