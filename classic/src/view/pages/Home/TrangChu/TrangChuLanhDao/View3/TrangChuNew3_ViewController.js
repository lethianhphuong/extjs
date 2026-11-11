/* global NVCB */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew3_ViewController',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig'
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
        const me = this;
        const data = rawData || {};
        const tongQuanList = me.toList(data.tongQuan);
        const capData = me.mapCapData(data);

        return {
            tongQuan: tongQuanList,
            loaiHoSoRaw: me.mapLoaiHoSo(data.loaiHoSo),
            canhBaoRaw: me.mapCanhBao(data.canhBaoNoiBat),
            coCauData: me.mapCoCau(data.coCauHoSoTheoDonVi),
            bienDongData: me.toList(data.bienDongHoSoTheoDonVi).map(me.mapBienDongItem),
            dienBienData: me.toList(data.dienBienMoMoiVaKetThuc).slice(-12).map(me.mapDienBienItem),
            topDiaBanData: me.mapTopDiaBan(data.topDiaBanCoNhieuHoSo),
            loaiDoiTuongData: me.mapLoaiDoiTuong(data.loaiDoiTuong),
            capDataMap: capData.capDataMap,
            capTotalMap: capData.capTotalMap,
            tongSoDonut: Number(me.getTongSoVal(tongQuanList)).toLocaleString('vi-VN')
        };
    },

    //#region NOTE: Hàm phụ trợ cho mapData
    /** Trả về chính mảng đầu vào, không phải mảng thì trả về mảng rỗng. */
    toList: function (value) {
        return Array.isArray(value) ? value : [];
    },

    /** Lấy giá trị trường chính, không có (undefined) thì dùng trường dự phòng hoặc 0. */
    pickNumber: function (item, key, fallbackKey) {
        return item[key] !== undefined ? item[key] : (item[fallbackKey] || 0);
    },

    /** 1. Tổng số hồ sơ cho tâm donut: ưu tiên mã DANG_QUAN_LY / TONG, không có thì lấy phần tử đầu. */
    getTongSoVal: function (tongQuanList) {
        if (!tongQuanList.length) { return 0; }
        const foundTotal = tongQuanList.find(it => it.code === 'DANG_QUAN_LY' || it.code === 'TONG');
        if (foundTotal && typeof foundTotal.val === 'number') { return foundTotal.val; }
        return tongQuanList[0].val || 0;
    },

    /** 2. Loại hồ sơ. */
    mapLoaiHoSo: function (list) {
        return this.toList(list).map(it => ({
            code: it.code,
            ten: it.name || it.ten || it.code,
            val: it.val || 0
        }));
    },

    /** 3. Cảnh báo nổi bật: chuyển mảng {code, val} thành object theo khóa nghiệp vụ. */
    mapCanhBao: function (list) {
        const cbMap = {};
        this.toList(list).forEach(function (it) {
            if (it && it.code) {
                cbMap[it.code] = it.val || 0;
            }
        });
        return {
            quaHan: cbMap.QUA_HAN || 0,
            sapHetHan: cbMap.HET_HAN || 0,
            tangBatThuong: cbMap.BAT_THUONG || 0,
            nhieuDonVi: cbMap.LIEN_QUAN || 0
        };
    },

    /** 4. Cơ cấu hồ sơ theo cấp đơn vị (tên, màu, tỷ lệ %). */
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
                name: cfg.name,
                soLuong: soLuong,
                tyLe: totalCoCau > 0 ? Math.round((soLuong / totalCoCau) * 1000) / 10 : 0,
                mau: cfg.mau
            };
        });
    },

    /** 5. Biến động theo quý / tháng (hiển thị toàn bộ dữ liệu, không cắt slice). */
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
            tongSo: cuc + tinh + xa
        };
    },

    /** 6. Diễn biến mở mới và kết thúc (12 tháng gần nhất). */
    mapDienBienItem: function (it, idx) {
        const thangLabel = it.name ? it.name.replace(/\s+/g, '') : ('T' + (idx + 1));
        return {
            code: it.code || idx,
            name: it.name || thangLabel,
            nameHover: it.nameHover || it.name || thangLabel,
            thang: thangLabel,
            moMoi: it.moMoi || 0,
            ketThuc: it.ketThuc || 0
        };
    },

    /** 7. Top địa bàn (hiển thị toàn bộ); tỷ lệ % so với địa bàn đứng đầu. */
    mapTopDiaBan: function (list) {
        const topDiaBanList = this.toList(list);
        const first = topDiaBanList[0];
        const maxVal = (first && (first.val || first.soHoSo)) || 1;
        return topDiaBanList.map(function (it, idx) {
            const val = it.val || it.soHoSo || 0;
            return {
                stt: idx + 1,
                diaBan: it.kyHieu || it.name || it.diaBan || '',
                soHoSo: val,
                soHoSoText: Number(val).toLocaleString('vi-VN'),
                tyLe: Math.max(0, Math.min(100, Math.round((val / maxVal) * 100))),
                loai: 'tinh'
            };
        });
    },

    /**
     * 8. Loại đối tượng. Đảo ngược thứ tự để khi vẽ trên Horizontal Bar Chart (flipXY: true)
     * danh mục thứ nhất trong API sẽ hiển thị ở trên cùng (ExtJS category axis vẽ từ dưới lên trên).
     */
    mapLoaiDoiTuong: function (list) {
        const rawLoaiDoiTuong = this.toList(list);
        return rawLoaiDoiTuong.slice().reverse().map((it, idx) => ({
            code: it.code || '',
            name: it.name || it.ten || '',
            val: typeof it.val === 'number' ? it.val : 0,
            originalIndex: rawLoaiDoiTuong.length - 1 - idx
        }));
    },

    /** 9. Tình hình đơn vị theo cấp từ tabList (CUC / TINH / XA), thiếu thì lấy từ MockData. */
    mapCapData: function (data) {
        const me = this;
        let tabList = data.tabList;
        if (!Array.isArray(tabList)) {
            const mockRaw = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData.getData();
            tabList = me.toList(mockRaw && mockRaw.tabList);
        }
        const capDataMap = {};
        const capTotalMap = {};
        ['CUC', 'TINH', 'XA'].forEach(function (cap) {
            const tabItem = tabList.find(t => t.type === cap.toLowerCase() || t.type === cap);
            const hasList = tabItem && Array.isArray(tabItem.list);
            capDataMap[cap] = hasList ? tabItem.list.map(me.mapGridItem, me) : [];
            capTotalMap[cap] = tabItem && typeof tabItem.total === 'number' ? tabItem.total : null;
        });
        return { capDataMap: capDataMap, capTotalMap: capTotalMap };
    },

    /** Một dòng Grid tình hình đơn vị (14 cột theo chuẩn nghiệp vụ). */
    mapGridItem: function (it, idx) {
        const me = this;
        return {
            stt: it.stt || (idx + 1),
            maDonVi: it.maDonVi || '',
            tenDonVi: it.tenDonVi || it.name || '',
            capDonVi: it.capDonVi || '',
            tongHoSo: me.pickNumber(it, 'tongHoSo', 'tongQuanLy'),
            moMoi: it.moMoi || 0,
            ketThuc: it.ketThuc || 0,
            chuyenMuc: it.chuyenMuc || 0,
            dtcb: it.dtcb || 0,
            suuTra: me.pickNumber(it, 'suuTra', 'suutra'),
            hiemNghi: me.pickNumber(it, 'hiemNghi', 'hiemnghi'),
            chuyenAn: me.pickNumber(it, 'chuyenAn', 'chuyenan'),
            ctvbm: it.ctvbm || 0,
            htbm: it.htbm || 0,
            vanv: it.vanv || 0,
            nnv: it.nnv || 0,
            isSummary: !!it.isSummary
        };
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
        me.capTotalMap = mapped.capTotalMap;
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

    //#region NOTE: Renderer bảng tình hình theo đơn vị
    /** Dòng tổng cộng (isSummary hoặc mã TONG). */
    isSummaryRecord: function (record) {
        return !!(record && (record.get('isSummary') || record.get('maDonVi') === 'TONG'));
    },

    /** Cột STT: ẩn số ở dòng tổng. */
    renderSttGrid: function (val, meta, record) {
        const me = this;
        return me.isSummaryRecord(record) ? '' : val;
    },

    /** Cột đơn vị: link ở dòng thường, chữ đậm ở dòng tổng; tooltip tên đầy đủ khi bị cắt. */
    renderDonViGrid: function (val, meta, record) {
        const me = this;
        const text = Ext.String.htmlEncode(val || '');
        meta.tdAttr = 'data-qtip="' + text + '"';
        if (me.isSummaryRecord(record)) {
            return '<strong class="tcn3-summary-name">' + text + '</strong>';
        }
        return '<a href="javascript:void(0)" class="tcn3-unit-link">' + text + '</a>';
    },

    /** Cột số liệu: định dạng vi-VN, số 0 hiển thị mờ, dòng tổng in đậm. */
    renderSoLieuGrid: function (val, meta, record) {
        const me = this;
        const num = Number(val || 0);
        const formatted = num.toLocaleString('vi-VN');
        if (me.isSummaryRecord(record)) {
            return '<strong>' + formatted + '</strong>';
        }
        return num === 0 ? '<span class="tcn3-num-zero">0</span>' : formatted;
    },
    //#endregion

    /**
     * Cập nhật tiêu đề 3 Tab kèm tổng số hồ sơ động: Icon + Title tab + (tổng số hs)
     */
    updateGridTabTitles: function () {
        const me = this;
        const view = me.getView();
        if (!view) return;

        const capMap = me.capDataMap || {};
        const capTotalMap = me.capTotalMap || {};

        function getCapTotal(cap) {
            if (typeof capTotalMap[cap] === 'number') {
                return capTotalMap[cap];
            }
            const list = capMap[cap] || [];
            return list.reduce(function (sum, it) {
                return sum + (it.tongHoSo || 0);
            }, 0);
        }

        const totalCuc = getCapTotal('CUC');
        const totalTinh = getCapTotal('TINH');
        const totalXa = getCapTotal('XA');

        const cucTab = view.down('#cucTab_IdView');
        if (cucTab) {
            cucTab.setText('Cấp Cục<span class="tcn3-tab-count">' + Number(totalCuc).toLocaleString('vi-VN') + '</span>');
        }

        const tinhTab = view.down('#tinhTab_IdView');
        if (tinhTab) {
            tinhTab.setText('Cấp Tỉnh<span class="tcn3-tab-count">' + Number(totalTinh).toLocaleString('vi-VN') + '</span>');
        }

        const xaTab = view.down('#xaTab_IdView');
        if (xaTab) {
            xaTab.setText('Cấp Xã<span class="tcn3-tab-count">' + Number(totalXa).toLocaleString('vi-VN') + '</span>');
        }
    },

    /**
     * Xử lý chuyển tab trên thanh TabBar của Grid
     * Chuyển tab sẽ nạp dữ liệu cấp tương ứng (CUC / TINH / XA) vào Grid duy nhất
     * @param {Ext.tab.Tab} tab Tab được click
     */
    /** Kích hoạt tab theo cấp đang chọn khi tabbar render xong (mặc định Cấp Cục). */
    onGridTabBarReady: function (tabBar) {
        const me = this;
        const cap = me.currentCap || 'CUC';
        const tab = tabBar.items.findBy(item => item.capDonVi === cap);
        if (tab) {
            tabBar.setActiveTab(tab);
        }
    },

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

    //#region NOTE: Cập nhật và đồng bộ biểu đồ
    /** Sự kiện khi từng chart được render */
    onChartReady: function (chart) {
        const me = this;
        me.updateChartColors(chart);
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

    /** Cập nhật biểu đồ diễn biến mở mới và kết thúc (12 tháng). */
    updateDienBienChart: function (view, targetChart) {
        const me = this;
        const chart = view.down('#dienBienChart_IdView');
        if (!me.isTargetChart(chart, targetChart)) { return; }
        chart.redraw();
    },

    /** Đồng bộ bảng màu và trạng thái cho toàn bộ các biểu đồ */
    updateChartColors: function (targetChart) {
        const me = this;
        const view = me.getView();
        if (!view || !view.rendered) { return; }

        me.updateCoCauChart(view, targetChart);
        me.updateBienDongChart(view, targetChart);
        me.updateLoaiDoiTuongChart(view, targetChart);
        me.updateDienBienChart(view, targetChart);
    },
    //#endregion

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

    /** Mở URL bản đồ (URL cấu hình trong TrangChuNew3_DisplayConfig) */
    onOpenMapUrl: function () {
        const cfg = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig;
        const targetHash = (cfg && cfg.bandoMapUrl) || '#ban-do';
        const cleanHash = targetHash.startsWith('#') ? targetHash : '#' + targetHash;
        const fakeMapUrl = window.location.origin + window.location.pathname + cleanHash;
        window.open(fakeMapUrl, '_blank');
    },

    /** Khởi tạo tooltip cho các thẻ metric và thẻ tóm tắt nghiệp vụ */
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
