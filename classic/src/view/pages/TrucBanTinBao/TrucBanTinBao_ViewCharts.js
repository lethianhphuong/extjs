Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewCharts', {
    extend: 'Ext.container.Container',
    xtype: 'TrucBanTinBao_ViewCharts',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '14 0 0 0',

    items: [
        // ================= BOARD 1 =================
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                margin: '0 8 0 0'
            },
            items: [
                // Cột phân bố theo địa bàn
                {
                    xtype: 'panel',
                    flex: 1.25,
                    cls: 'dash-card',
                    bodyPadding: 16,
                    title: 'Phân bố tin báo theo địa bàn',
                    header: {
                        cls: 'dash-panel-header',
                        title: {
                            text: 'Phân bố tin báo theo địa bàn',
                            style: 'font-weight:700; font-size:14.5px;'
                        }
                    },
                    reference: 'pnlGeoChart',
                    html: '<div class="colchart-host" id="tb-geo-chart" style="height:250px; display:flex; align-items:flex-end; gap:8px;"></div>'
                },
                // Cột bên phải: Trạng thái & Đơn vị nghiệp vụ
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'dash-card',
                            bodyPadding: 14,
                            reference: 'pnlStatusDonut',
                            header: {
                                cls: 'dash-panel-header',
                                title: {
                                    text: 'Trạng thái xử lý đề xuất',
                                    style: 'font-weight:700; font-size:14px;'
                                }
                            },
                            html: '<div id="tb-status-donut"></div>'
                        },
                        {
                            xtype: 'panel',
                            margin: '12 0 0 0',
                            cls: 'dash-card',
                            bodyPadding: 14,
                            reference: 'pnlPcBars',
                            header: {
                                cls: 'dash-panel-header',
                                title: {
                                    text: 'Đề xuất theo đơn vị nghiệp vụ',
                                    style: 'font-weight:700; font-size:14px;'
                                }
                            },
                            html: '<div id="tb-pc-bars" class="pc-bars-wrap"></div>'
                        }
                    ]
                }
            ]
        },

        // ================= CRIME CHART =================
        {
            xtype: 'panel',
            cls: 'dash-card',
            margin: '14 0 0 0',
            bodyPadding: 16,
            header: {
                cls: 'dash-panel-header',
                title: {
                    text: 'Phân bố theo nhóm tội phạm (Chương BLHS)',
                    style: 'font-weight:700; font-size:14.5px;'
                },
                tools: [
                    {
                        xtype: 'component',
                        html: '<span id="tb-crime-sub-title" style="font-size:12px; color:var(--theme-text-muted, #77869c); font-weight:500;"></span>'
                    }
                ]
            },
            reference: 'pnlCrimeChart',
            html: '<div class="crime-legend" style="display:flex; gap:18px; margin-bottom:14px; font-size:12px; font-weight:600;">' +
                    '<span><i style="display:inline-block; width:12px; height:8px; border-radius:2px; margin-right:6px; background:var(--accent, #1c5cab);"></i>Số vụ duy nhất</span>' +
                    '<span><i style="display:inline-block; width:12px; height:8px; border-radius:2px; margin-right:6px; background:var(--c3, #1baf7a);"></i>Số đề xuất</span>' +
                  '</div>' +
                  '<div id="tb-crime-chart"></div>' +
                  '<p style="color:var(--theme-text-secondary, #64748b); font-size:11.5px; margin:12px 0 0 0;">Hai thanh dùng chung thang đo so sánh. Mỗi vụ được tính 1 lần trong nhóm; mỗi đề xuất được tính riêng. Bấm vào nhóm để xem danh sách đề xuất chi tiết.</p>'
        },

        // ================= BOARD 2 =================
        {
            xtype: 'container',
            margin: '14 0 0 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                margin: '0 8 0 0'
            },
            items: [
                // Kết quả hoàn thành
                {
                    xtype: 'panel',
                    flex: 1,
                    cls: 'dash-card',
                    bodyPadding: 16,
                    reference: 'pnlResultDonut',
                    header: {
                        cls: 'dash-panel-header',
                        title: {
                            text: 'Kết quả đề xuất đã hoàn thành',
                            style: 'font-weight:700; font-size:14px;'
                        }
                    },
                    html: '<div id="tb-res-donut"></div>'
                },
                // Tình hình thời hạn (Gauges)
                {
                    xtype: 'panel',
                    flex: 1,
                    cls: 'dash-card',
                    bodyPadding: 16,
                    reference: 'pnlGauges',
                    header: {
                        cls: 'dash-panel-header',
                        title: {
                            text: 'Tình hình thời hạn (theo quy định tố tụng)',
                            style: 'font-weight:700; font-size:14px;'
                        }
                    },
                    html: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">' +
                            '<div id="tb-gauge-propose" style="text-align:center;"></div>' +
                            '<div id="tb-gauge-process" style="text-align:center;"></div>' +
                          '</div>'
                }
            ]
        },

        // ================= RANKING TABLE =================
        {
            xtype: 'panel',
            cls: 'dash-card',
            margin: '14 0 0 0',
            bodyPadding: 16,
            header: {
                cls: 'dash-panel-header',
                title: {
                    text: 'Xếp hạng địa bàn trọng điểm (theo số đề xuất)',
                    style: 'font-weight:700; font-size:14.5px;'
                }
            },
            reference: 'pnlRanking',
            html: '<div style="overflow-x:auto;">' +
                    '<table class="tb-rank-table" style="width:100%; border-collapse:collapse; font-size:12.5px;">' +
                        '<thead>' +
                            '<tr style="border-bottom:1px solid var(--theme-border, #e2e8f0); color:var(--theme-text-muted, #77869c); text-transform:uppercase; font-family:\'Barlow Condensed\', sans-serif;">' +
                                '<th id="tb-rank-col-name" style="text-align:left; padding:8px 10px;">Tỉnh / Thành phố</th>' +
                                '<th style="text-align:right; padding:8px 10px;">Số vụ</th>' +
                                '<th style="text-align:right; padding:8px 10px;">Số đề xuất</th>' +
                                '<th style="text-align:right; padding:8px 10px;">Đang xử lý</th>' +
                                '<th style="text-align:right; padding:8px 10px;">Hoàn thành</th>' +
                                '<th style="text-align:right; padding:8px 10px;">Quá hạn</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody id="tb-rank-body"></tbody>' +
                    '</table>' +
                  '</div>'
        }
    ]
});
