Ext.define('DEMO.view.pages.BanDo.BanDo_View', {
    extend: 'Ext.container.Container',
    xtype: 'BanDo_View',
    controller: 'BanDo_ViewController',
    viewModel: 'BanDo_ViewModel',
    cls: 'bando-page dash-page',
    scrollable: 'y',
    flex: 1,
    padding: '16 20 24 20',
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // 1. Header Toolbar
        {
            xtype: 'container',
            cls: 'bando-header-card dash-card',
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    flex: 1,
                    html: '<div class="bando-header-wrap">' +
                        '<span class="bando-header-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>' +
                        '<div>' +
                        '<h2 class="bando-title">Bản đồ phân bổ hồ sơ theo địa bàn</h2>' +
                        '<p class="bando-subtitle">Thống kê số lượng, tiến độ và phân loại hồ sơ trên 63 tỉnh/thành phố toàn quốc</p>' +
                        '</div>' +
                        '</div>'
                },
                {
                    xtype: 'button',
                    itemId: 'btnQuayLai_IdView',
                    cls: 'bando-btn-back',
                    iconCls: 'x-fa fa-arrow-left',
                    text: 'Quay lại Trang chủ',
                    ui: 'soft-blue',
                    handler: 'onBackToHome'
                }
            ]
        },

        // 2. Thẻ KPI tóm tắt toàn quốc
        {
            xtype: 'container',
            cls: 'bando-kpi-row',
            layout: 'hbox',
            margin: '12 0 0 0',
            defaults: {
                flex: 1,
                xtype: 'container',
                cls: 'bando-kpi-card dash-card'
            },
            items: [
                {
                    margin: '0 8 0 0',
                    html: '<div class="bando-kpi-item tone-blue">' +
                        '<span class="kpi-icon"><i class="x-fa fa-folder-open"></i></span>' +
                        '<div class="kpi-body">' +
                        '<div class="kpi-num">11.932</div>' +
                        '<div class="kpi-label">Tổng hồ sơ toàn quốc</div>' +
                        '</div>' +
                        '</div>'
                },
                {
                    margin: '0 8 0 0',
                    html: '<div class="bando-kpi-item tone-green">' +
                        '<span class="kpi-icon"><i class="x-fa fa-map-pin"></i></span>' +
                        '<div class="kpi-body">' +
                        '<div class="kpi-num">63/63</div>' +
                        '<div class="kpi-label">Tỉnh / Thành phố</div>' +
                        '</div>' +
                        '</div>'
                },
                {
                    margin: '0 8 0 0',
                    html: '<div class="bando-kpi-item tone-amber">' +
                        '<span class="kpi-icon"><i class="x-fa fa-exclamation-triangle"></i></span>' +
                        '<div class="kpi-body">' +
                        '<div class="kpi-num">24</div>' +
                        '<div class="kpi-label">Hồ sơ quá hạn</div>' +
                        '</div>' +
                        '</div>'
                },
                {
                    html: '<div class="bando-kpi-item tone-purple">' +
                        '<span class="kpi-icon"><i class="x-fa fa-check-circle"></i></span>' +
                        '<div class="kpi-body">' +
                        '<div class="kpi-num">98,6%</div>' +
                        '<div class="kpi-label">Tỷ lệ đúng hạn</div>' +
                        '</div>' +
                        '</div>'
                }
            ]
        },

        // 3. Khung nội dung chính: Cột trái Bản đồ + Cột phải Grid chi tiết
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '12 0 0 0',
            minHeight: 560,
            items: [
                // Khối bản đồ bên trái
                {
                    xtype: 'container',
                    cls: 'bando-map-card dash-card',
                    flex: 1.1,
                    margin: '0 8 0 0',
                    layout: { type: 'vbox', align: 'stretch' },
                    items: [
                        {
                            xtype: 'component',
                            cls: 'bando-card-header',
                            html: '<div class="card-head-title">' +
                                '<i class="x-fa fa-globe"></i>' +
                                '<span>Phân bổ mật độ hồ sơ trên bản đồ Việt Nam</span>' +
                                '</div>'
                        },
                        {
                            xtype: 'container',
                            itemId: 'diaBanChiTietInfo_IdView',
                            cls: 'bando-selected-bar',
                            html: '<div class="bando-selected-province"><span class="prov-hint"><i class="x-fa fa-info-circle"></i> Chọn một địa bàn trên bảng bên phải để xem chi tiết số liệu phân bổ</span></div>'
                        },
                        {
                            xtype: 'container',
                            itemId: 'bandoImgContainer_IdView',
                            cls: 'bando-img-wrapper',
                            flex: 1,
                            minHeight: 460,
                            layout: 'center',
                            items: [{
                                xtype: 'image',
                                cls: 'bando-detail-img',
                                alt: 'Bản đồ Việt Nam',
                                bind: {
                                    src: '{bandoImgUrl}'
                                }
                            }]
                        }
                    ]
                },

                // Khối danh sách Grid bên phải
                {
                    xtype: 'container',
                    cls: 'bando-grid-card dash-card',
                    flex: 1.4,
                    layout: { type: 'vbox', align: 'stretch' },
                    items: [
                        // Toolbar tìm kiếm địa bàn
                        {
                            xtype: 'container',
                            cls: 'bando-card-header bando-grid-tools',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    html: '<div class="card-head-title"><i class="x-fa fa-list-alt"></i><span>Chi tiết phân bổ theo địa bàn</span></div>'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtSearchDiaBan_IdView',
                                    emptyText: 'Tìm địa bàn, vùng miền...',
                                    cls: 'bando-search-input',
                                    width: 220,
                                    triggers: {
                                        clear: {
                                            cls: 'x-form-clear-trigger',
                                            handler: 'onClearSearch'
                                        }
                                    },
                                    listeners: {
                                        change: {
                                            fn: 'onSearchDiaBan',
                                            buffer: 250
                                        }
                                    }
                                }
                            ]
                        },
                        // Bảng dữ liệu địa bàn
                        {
                            xtype: 'grid',
                            itemId: 'gridDiaBan_IdView',
                            cls: 'bando-table-grid',
                            flex: 1,
                            minHeight: 480,
                            bind: { store: '{diaBanStore}' },
                            listeners: {
                                select: 'onSelectRowDiaBan'
                            },
                            columns: [
                                { text: 'STT', dataIndex: 'stt', width: 48, align: 'center' },
                                { text: 'Địa bàn', dataIndex: 'diaBan', flex: 1.2, renderer: function (v) { return '<strong>' + Ext.String.htmlEncode(v) + '</strong>'; } },
                                { text: 'Vùng miền', dataIndex: 'vungMien', width: 95 },
                                { text: 'ĐTCB', dataIndex: 'dtcb', width: 68, align: 'right' },
                                { text: 'Sưu tra', dataIndex: 'suuTra', width: 70, align: 'right' },
                                { text: 'Hiềm nghi', dataIndex: 'hiemNghi', width: 78, align: 'right' },
                                { text: 'Chuyên án', dataIndex: 'chuyenAn', width: 85, align: 'right' },
                                {
                                    text: 'Tổng số',
                                    dataIndex: 'tongSo',
                                    width: 80,
                                    align: 'right',
                                    renderer: function (v) {
                                        return '<span style="color: #2563eb; font-weight: 700;">' + Number(v).toLocaleString('vi-VN') + '</span>';
                                    }
                                },
                                {
                                    text: 'Quá hạn',
                                    dataIndex: 'quaHan',
                                    width: 72,
                                    align: 'center',
                                    renderer: function (v) {
                                        return v > 0 ? '<span class="bando-badge-warn">' + v + '</span>' : '<span style="color: #16a34a;">0</span>';
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
