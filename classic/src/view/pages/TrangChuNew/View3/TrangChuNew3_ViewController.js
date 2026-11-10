/* global NVCB */
Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew3_ViewController',
    requires: [
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_MockData',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig'
    ],

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
        const data = rawData || {};

        // 1. Ánh xạ danh sách KPI tổng quan
        const tongQuanList = Array.isArray(data.tongQuan) ? data.tongQuan : [];
        let tongSoVal = 0;
        if (tongQuanList.length > 0) {
            const foundTotal = tongQuanList.find(function (it) {
                return it.code === 'DANG_QUAN_LY' || it.code === 'TONG';
            });
            tongSoVal = (foundTotal && typeof foundTotal.val === 'number')
                ? foundTotal.val
                : (tongQuanList[0].val || 0);
        }

        // 2. Ánh xạ loại hồ sơ
        const loaiHoSoList = Array.isArray(data.loaiHoSo) ? data.loaiHoSo : [];
        const loaiHoSoRaw = loaiHoSoList.map(function (it) {
            return {
                code: it.code,
                ten: it.name || it.ten || it.code,
                val: it.val || 0
            };
        });

        // 3. Ánh xạ cảnh báo nổi bật
        const cbList = Array.isArray(data.canhBaoNoiBat) ? data.canhBaoNoiBat : [];
        const cbMap = {};
        cbList.forEach(function (it) {
            if (it && it.code) {
                cbMap[it.code] = it.val || 0;
            }
        });
        const canhBaoRaw = {
            quaHan: cbMap.QUA_HAN || 0,
            sapHetHan: cbMap.HET_HAN || 0,
            tangBatThuong: cbMap.BAT_THUONG || 0,
            nhieuDonVi: cbMap.LIEN_QUAN || 0
        };

        // 4. Ánh xạ cơ cấu đơn vị
        const cfgDonVi = {
            CUC: { name: 'Cấp Cục', mau: '#2563eb' },
            TINH: { name: 'Cấp tỉnh', mau: '#22c55e' },
            XA: { name: 'Cấp Xã', mau: '#f59e0b' }
        };
        const coCauList = Array.isArray(data.coCauHoSoTheoDonVi) ? data.coCauHoSoTheoDonVi : [];
        const totalCoCau = coCauList.reduce(function (sum, it) { return sum + (it.val || 0); }, 0);
        const coCauData = coCauList.map(function (it) {
            const cfg = cfgDonVi[it.capDonVi] || { name: it.capDonVi || it.name, mau: '#94a3b8' };
            const tyLe = totalCoCau > 0 ? Math.round(((it.val || 0) / totalCoCau) * 1000) / 10 : 0;
            return {
                name: cfg.name,
                soLuong: it.val || 0,
                tyLe: tyLe,
                mau: cfg.mau
            };
        });

        // 5. Ánh xạ biến động theo quý / tháng (hiển thị toàn bộ dữ liệu, không cắt slice)
        const bienDongList = Array.isArray(data.bienDongHoSoTheoDonVi) ? data.bienDongHoSoTheoDonVi : [];
        const bienDongData = bienDongList.map(function (it, idx) {
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
                tongSo: cuc + tinh + xa
            };
        });

        // 6. Ánh xạ diễn biến mở mới và kết thúc (12 tháng gần nhất)
        const dienBienList = Array.isArray(data.dienBienMoMoiVaKetThuc) ? data.dienBienMoMoiVaKetThuc.slice(-12) : [];
        const dienBienData = dienBienList.map(function (it, idx) {
            const thangLabel = it.name ? it.name.replace(/\s+/g, '') : ('T' + (idx + 1));
            return {
                code: it.code || idx,
                name: it.name || thangLabel,
                nameHover: it.nameHover || it.name || thangLabel,
                thang: thangLabel,
                moMoi: it.moMoi || 0,
                ketThuc: it.ketThuc || 0
            };
        });

        // 7. Ánh xạ Top địa bàn (hiển thị toàn bộ dữ liệu có trong mảng, không cắt)
        const topDiaBanList = Array.isArray(data.topDiaBanCoNhieuHoSo) ? data.topDiaBanCoNhieuHoSo : [];
        const topDiaBanData = topDiaBanList.map(function (it, idx) {
            const val = it.val || it.soHoSo || 0;
            return {
                stt: idx + 1,
                diaBan: it.kyHieu || it.name || it.diaBan || '',
                soHoSo: val,
                soHoSoText: Number(val).toLocaleString('vi-VN'),
                tyLe: Math.max(0, Math.min(100, Math.round((val / (topDiaBanList[0] && (topDiaBanList[0].val || topDiaBanList[0].soHoSo) ? (topDiaBanList[0].val || topDiaBanList[0].soHoSo) : 1)) * 100))),
                loai: 'tinh'
            };
        });

        // 8. Ánh xạ loại đối tượng
        const loaiDoiTuongList = Array.isArray(data.loaiDoiTuong) ? data.loaiDoiTuong.map(function (it) {
            return {
                code: it.code || '',
                name: it.name || it.ten || '',
                val: typeof it.val === 'number' ? it.val : 0
            };
        }) : [];

        // 9. Tình hình đơn vị theo cấp (CUC / TINH / XA: Grid 14 cột theo chuẩn nghiệp vụ)
        const mockRaw = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_MockData.getData();
        const rawGridCap = (data && data.tinhHinhDonViTheoCap) || (mockRaw && mockRaw.tinhHinhDonViTheoCap) || {};

        function mapGridItem(it, idx) {
            return {
                stt: (it.isSummary || it.maDonVi === 'TONG') ? '' : (it.stt || (idx + 1)),
                maDonVi: it.maDonVi || '',
                tenDonVi: it.tenDonVi || it.name || '',
                capDonVi: it.capDonVi || '',
                tongHoSo: it.tongHoSo || 0,
                moMoi: it.moMoi || 0,
                ketThuc: it.ketThuc || 0,
                chuyenMuc: it.chuyenMuc || 0,
                dtcb: it.dtcb || 0,
                suuTra: it.suuTra || 0,
                hiemNghi: it.hiemNghi || 0,
                chuyenAn: it.chuyenAn || 0,
                ctvbm: it.ctvbm || 0,
                htbm: it.htbm || 0,
                vanv: it.vanv || 0,
                nnv: it.nnv || 0,
                isSummary: !!it.isSummary || it.maDonVi === 'TONG'
            };
        }

        const capDataMap = {
            CUC: Array.isArray(rawGridCap.CUC) ? rawGridCap.CUC.map(mapGridItem) : [],
            TINH: Array.isArray(rawGridCap.TINH) ? rawGridCap.TINH.map(mapGridItem) : [],
            XA: Array.isArray(rawGridCap.XA) ? rawGridCap.XA.map(mapGridItem) : []
        };

        return {
            tongQuan: tongQuanList,
            loaiHoSoRaw: loaiHoSoRaw,
            canhBaoRaw: canhBaoRaw,
            coCauData: coCauData,
            bienDongData: bienDongData,
            dienBienData: dienBienData,
            topDiaBanData: topDiaBanData,
            loaiDoiTuongData: loaiDoiTuongList,
            capDataMap: capDataMap,
            tongSoDonut: Number(tongSoVal).toLocaleString('vi-VN')
        };
    },

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
        const rawData = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_MockData.getData();

        // 2. Khi có dữ liệu thật từ API: Mở comment dòng dưới và đóng comment dòng trên
        // const rawData = dataApi;
        void dataApi;

        // Xử lý chuyển đổi dữ liệu qua hàm mapData riêng biệt
        const mapped = me.mapData(rawData);

        // Cập nhật ViewModel
        viewModel.set({
            tongQuan: mapped.tongQuan,
            loaiHoSoRaw: mapped.loaiHoSoRaw,
            canhBaoRaw: mapped.canhBaoRaw,
            tongSoDonut: mapped.tongSoDonut
        });

        // Nạp các Store
        const coCauStore = viewModel.getStore('coCauStore');
        if (coCauStore) coCauStore.loadData(mapped.coCauData);

        const bienDongStore = viewModel.getStore('bienDongStore');
        if (bienDongStore) bienDongStore.loadData(mapped.bienDongData);

        const loaiDoiTuongStore = viewModel.getStore('loaiDoiTuongStore');
        if (loaiDoiTuongStore) loaiDoiTuongStore.loadData(mapped.loaiDoiTuongData);

        const dienBienStore = viewModel.getStore('dienBienStore');
        if (dienBienStore) dienBienStore.loadData(mapped.dienBienData);

        const topDiaBanStore = viewModel.getStore('topDiaBanStore');
        if (topDiaBanStore) topDiaBanStore.loadData(mapped.topDiaBanData);

        // Nạp dữ liệu Grid theo cấp đơn vị đang chọn (mặc định CUC)
        me.capDataMap = mapped.capDataMap;
        me.currentCap = me.currentCap || 'CUC';

        const gridStore = viewModel.getStore('gridStore');
        if (gridStore && me.capDataMap) {
            gridStore.loadData(me.capDataMap[me.currentCap] || []);
        }

        // Cập nhật tiêu đề 3 tab có tổng số hs: Icon + Title tab + (tổng số hs)
        me.updateGridTabTitles();

        viewModel.notify();

        const view = me.getView();
        if (view && view.rendered) {
            me.updateChartColors();
        }
    },

    /**
     * Cập nhật tiêu đề 3 Tab kèm tổng số hồ sơ động: Icon + Title tab + (tổng số hs)
     */
    updateGridTabTitles: function () {
        const me = this;
        const view = me.getView();
        if (!view) return;

        const capMap = me.capDataMap || {};

        function getCapTotal(cap) {
            const list = capMap[cap] || [];
            const summary = list.find(function (it) {
                return it.isSummary || it.maDonVi === 'TONG';
            });
            if (summary && typeof summary.tongHoSo === 'number') {
                return summary.tongHoSo;
            }
            return list.reduce(function (sum, it) {
                return sum + (it.tongHoSo || 0);
            }, 0);
        }

        const totalCuc = getCapTotal('CUC');
        const totalTinh = getCapTotal('TINH');
        const totalXa = getCapTotal('XA');

        const cucTab = view.down('#cucTab_IdView');
        if (cucTab) {
            cucTab.setText('Cấp Cục (' + Number(totalCuc).toLocaleString('vi-VN') + ')');
        }

        const tinhTab = view.down('#tinhTab_IdView');
        if (tinhTab) {
            tinhTab.setText('Cấp Tỉnh (' + Number(totalTinh).toLocaleString('vi-VN') + ')');
        }

        const xaTab = view.down('#xaTab_IdView');
        if (xaTab) {
            xaTab.setText('Cấp Xã (' + Number(totalXa).toLocaleString('vi-VN') + ')');
        }
    },

    /**
     * Xử lý chuyển tab trên thanh TabBar của Grid
     * Chuyển tab sẽ nạp dữ liệu cấp tương ứng (CUC / TINH / XA) vào Grid duy nhất
     * @param {Ext.tab.Tab} tab Tab được click
     */
    onGridTabClick: function (tab) {
        const me = this;
        if (!tab) return;

        const capDonVi = tab.capDonVi || 'CUC';
        me.currentCap = capDonVi;

        const tabBar = tab.up('#gridTabBar_IdView');
        if (tabBar && typeof tabBar.setActiveTab === 'function') {
            tabBar.setActiveTab(tab);
        }

        const viewModel = me.getViewModel();
        const gridStore = viewModel ? viewModel.getStore('gridStore') : null;
        if (gridStore && me.capDataMap) {
            gridStore.loadData(me.capDataMap[capDonVi] || []);
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

    /** Sự kiện khi từng chart được render */
    onChartReady: function (chart) {
        const me = this;
        me.updateChartColors(chart);
    },

    /** Đồng bộ bảng màu và background cho toàn bộ các biểu đồ */
    updateChartColors: function (targetChart) {
        const me = this;
        const view = me.getView();
        if (!view || !view.rendered) return;

        // Cập nhật biểu đồ Donut Cơ cấu
        const coCauChart = view.down('#coCauChart_IdView');
        if (coCauChart && coCauChart.rendered && (!targetChart || targetChart === coCauChart)) {
            const series = coCauChart.getSeries() && coCauChart.getSeries()[0];
            if (series && typeof series.setColors === 'function') {
                series.setColors(['#2563eb', '#22c55e', '#f59e0b']);
                coCauChart.redraw();
            }
        }

        // Cập nhật biểu đồ biến động theo quý (Stacked Bar + Line)
        const bienDongChart = view.down('#bienDongChart_IdView');
        if (bienDongChart && bienDongChart.rendered && (!targetChart || targetChart === bienDongChart)) {
            bienDongChart.redraw();
        }

        // Cập nhật biểu đồ cơ cấu theo loại đối tượng (Horizontal Bar Chart)
        const loaiDoiTuongChart = view.down('#loaiDoiTuongChart_IdView');
        if (loaiDoiTuongChart && loaiDoiTuongChart.rendered && (!targetChart || targetChart === loaiDoiTuongChart)) {
            loaiDoiTuongChart.redraw();
        }

        // Cập nhật biểu đồ diễn biến mở mới và kết thúc
        const dienBienChart = view.down('#dienBienChart_IdView');
        if (dienBienChart && dienBienChart.rendered && (!targetChart || targetChart === dienBienChart)) {
            dienBienChart.redraw();
        }
    },

    /** Chuyển đổi tab xem Top địa bàn: Tỉnh/Thành hoặc Quận/Huyện */
    onToggleDiaBan: function (btn) {
        const me = this;
        const viewModel = me.getViewModel();
        if (!viewModel) return;

        viewModel.set('loaiDiaBan', btn.value);
    },

    /** Xem chi tiết đơn vị trên Grid */
    onViewDetailUnit: function (grid, rowIndex) {
        const store = grid.getStore();
        const record = store.getAt(rowIndex);
        if (record) {
            Ext.Msg.alert('Chi tiết đơn vị', 'Xem thông tin chi tiết: ' + record.get('tenDonVi'));
        }
    },

    /** Xuất báo cáo Excel / PDF */
    onExportReport: function () {
        Ext.Msg.alert('Xuất báo cáo', 'Đang trích xuất dữ liệu báo cáo sang định dạng Excel...');
    },

    /** Mở URL bản đồ (URL cấu hình trong TrangChuNew3_DisplayConfig) */
    onOpenMapUrl: function () {
        const cfg = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig;
        const targetHash = (cfg && cfg.bandoMapUrl) || '#ban-do';
        const cleanHash = targetHash.indexOf('#') === 0 ? targetHash : '#' + targetHash;
        const fakeMapUrl = window.location.origin + window.location.pathname + cleanHash;
        window.open(fakeMapUrl, '_blank');
    },

    /** Khởi tạo tooltip cho các thẻ metric và thẻ tóm tắt nghiệp vụ */
    onTooltipReady: function (component) {
        if (!component || !component.getEl()) return;
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
