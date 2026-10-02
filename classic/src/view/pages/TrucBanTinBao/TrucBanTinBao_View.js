Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrucBanTinBao_View',

    controller: 'trucbantinbao',
    viewModel: 'trucbantinbao',

    requires: [
        'Ext.button.Segmented',
        'DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewController',
        'DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewModel',
        'DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewFilter',
        'DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewCharts'
    ],

    scrollable: 'y',
    padding: '16 24 32 24',
    cls: 'dash-page',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onViewAfterRender'
    },

    items: [
        // ================= HEADER COMMAND BAR =================
        {
            xtype: 'container',
            cls: 'dash-card',
            padding: '12 18',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                // Brand
                {
                    xtype: 'component',
                    html: '<div style="display:flex; align-items:center; gap:12px;">' +
                            '<div style="width:42px; height:42px; border-radius:10px; display:grid; place-items:center; background:linear-gradient(150deg, var(--accent, #1c5cab), var(--accent-2, #2a78d6)); color:#fff; box-shadow:0 4px 14px var(--accent-soft, rgba(28,92,171,0.25));">' +
                                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:24px; height:24px;">' +
                                    '<path d="M12 2.5 4 6v5.5c0 4.6 3.2 8 8 9.9 4.8-1.9 8-5.3 8-9.9V6z"/>' +
                                    '<path d="m9 12 2 2 4-4.5"/>' +
                                '</svg>' +
                            '</div>' +
                            '<div>' +
                                '<div style="font-size:17px; font-weight:700; color:var(--theme-text-primary, #1e293b); line-height:1.2;">Trực ban Tin báo Toàn quốc</div>' +
                                '<div style="font-size:12px; color:var(--theme-text-secondary, #64748b); margin-top:2px;">Tiếp nhận &amp; xử lý đề xuất tin báo cấp xã · giám sát thời gian thực</div>' +
                            '</div>' +
                          '</div>'
                },
                { xtype: 'tbspacer', flex: 1 },
                // Online Badge
                {
                    xtype: 'component',
                    margin: '0 16 0 0',
                    bind: {
                        html: '<span class="tb-live-badge" style="display:inline-flex; align-items:center; gap:7px; padding:6px 14px; border-radius:999px; background:var(--good-soft, rgba(12,154,61,0.12)); color:var(--good, #0c9a3d); font-weight:600; font-size:12px; white-space:nowrap;">' +
                                '<span style="width:8px; height:8px; border-radius:50%; background:currentColor;"></span>' +
                                'Trực tuyến · {onlineAgoText} trước' +
                              '</span>'
                    }
                },
                // Range Pill Buttons (Style Image 2)
                {
                    xtype: 'component',
                    margin: '0 16 0 0',
                    html: '<div class="tb-range-pills" id="tb-range-pills" role="group" aria-label="Phạm vi thời gian">' +
                            '<button type="button" class="tb-pill" data-range="today">Hôm nay</button>' +
                            '<button type="button" class="tb-pill" data-range="7">7 ngày</button>' +
                            '<button type="button" class="tb-pill active" data-range="30">30 ngày</button>' +
                            '<button type="button" class="tb-pill" data-range="0">Toàn kỳ</button>' +
                            '<button type="button" class="tb-pill" data-range="custom">Kỳ tự chọn</button>' +
                          '</div>',
                    listeners: {
                        element: 'el',
                        delegate: '.tb-pill',
                        click: 'onRangePillClick'
                    }
                },
                // Real-time Clock
                {
                    xtype: 'component',
                    style: 'text-align:right;',
                    bind: {
                        html: '<div style="line-height:1.1;">' +
                                '<div style="font-size:22px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--theme-text-primary, #1e293b);">{currentTimeText}</div>' +
                                '<div style="font-size:11.5px; color:var(--theme-text-muted, #77869c); text-transform:capitalize;">{currentDateText}</div>' +
                              '</div>'
                    }
                }
            ]
        },

        // ================= CUSTOM PERIOD BAR =================
        {
            xtype: 'container',
            margin: '8 0 0 0',
            cls: 'dash-card',
            padding: '10 16',
            bind: {
                hidden: '{!customPeriodVisible}'
            },
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                margin: '0 10 0 0'
            },
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Từ ngày',
                    reference: 'dfRangeFrom',
                    width: 200,
                    value: new Date(Date.now() - 30 * 864e5)
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Đến ngày',
                    reference: 'dfRangeTo',
                    width: 200,
                    value: new Date()
                },
                {
                    xtype: 'button',
                    text: 'Áp dụng',
                    ui: 'soft-blue',
                    height: 32,
                    margin: '18 0 0 4',
                    handler: 'onApplyCustomRange'
                }
            ]
        },

        // ================= CONTEXT STRIP =================
        {
            xtype: 'container',
            margin: '12 0 0 0',
            cls: 'tb-context-strip',
            padding: '12 18',
            style: 'border-radius:12px; background:linear-gradient(120deg, var(--accent-soft, rgba(28,92,171,0.1)), transparent 70%); border:1px solid var(--theme-border, #e2e8f0);',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'component',
                    bind: {
                        html: '<div style="font-size:14.5px; font-weight:700; color:var(--theme-text-primary, #1e293b); display:flex; align-items:center; gap:8px;">' +
                                '<span style="font-family:\'Barlow Condensed\', sans-serif; font-size:12px; background:var(--accent, #1c5cab); color:#fff; padding:2px 8px; border-radius:5px; letter-spacing:.04em;">{scopeBadge}</span> ' +
                                '{scopeText}' +
                              '</div>'
                    }
                },
                { xtype: 'tbspacer', flex: 1 },
                {
                    xtype: 'component',
                    bind: {
                        html: '<div style="display:flex; gap:18px; line-height:1.1; margin-right:16px;">' +
                                '<div><b style="font-size:18px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--theme-text-primary, #1e293b);">{kpiProposals}</b><span style="font-size:11px; color:var(--theme-text-muted, #77869c); display:block;">đề xuất</span></div>' +
                                '<div><b style="font-size:18px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--good, #0c9a3d);">{kpiDone}</b><span style="font-size:11px; color:var(--theme-text-muted, #77869c); display:block;">hoàn thành</span></div>' +
                                '<div><b style="font-size:18px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--warning, #e39400);">{kpiInprog}</b><span style="font-size:11px; color:var(--theme-text-muted, #77869c); display:block;">đang đề xuất</span></div>' +
                                '<div><b style="font-size:18px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--critical, #d0342f);">{kpiCritical}</b><span style="font-size:11px; color:var(--theme-text-muted, #77869c); display:block;">quá hạn</span></div>' +
                              '</div>'
                    }
                },
                {
                    xtype: 'component',
                    html: '<span style="font-size:11.5px; color:var(--theme-text-muted, #77869c); display:inline-flex; align-items:center; gap:5px;">' +
                            '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent, #1c5cab);"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>' +
                            'Bấm vào số liệu để xem chi tiết' +
                          '</span>'
                }
            ]
        },

        // ================= 6 KPI CARDS =================
        {
            xtype: 'container',
            margin: '12 0 0 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1,
                margin: '0 8 0 0'
            },
            items: [
                // KPI 1: Số vụ duy nhất
                {
                    xtype: 'panel',
                    cls: 'dash-card tb-kpi-card clickable',
                    bodyPadding: 14,
                    bind: {
                        html: '<div data-drill="1" data-title="Các đề xuất thuộc những vụ phù hợp" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:var(--theme-text-muted, #77869c);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:var(--theme-border-light, #f1f5f9); display:grid; place-items:center; font-weight:700; font-size:11px; color:var(--theme-text-primary, #1e293b);">VỤ</span>' +
                                    '<span style="font-size:12px; font-weight:600; color:var(--theme-text-secondary, #64748b);">Số vụ duy nhất</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:var(--theme-text-primary, #1e293b);">{kpiCases}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:var(--theme-text-muted, #77869c);">Mỗi mã vụ chỉ tính 1 lần</div>' +
                              '</div>'
                    }
                },
                // KPI 2: Số đề xuất (Accent card)
                {
                    xtype: 'panel',
                    cls: 'tb-kpi-card tb-kpi-accent clickable',
                    bodyPadding: 14,
                    bodyStyle: 'background:linear-gradient(150deg, var(--accent, #1c5cab), var(--accent-2, #2a78d6)); color:#fff; border-radius:10px;',
                    bind: {
                        html: '<div data-drill="1" data-title="Tất cả tin — bộ lọc hiện tại" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:rgba(255,255,255,0.8);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:rgba(255,255,255,0.2); display:grid; place-items:center; color:#fff;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>' +
                                    '<span style="font-size:12px; font-weight:600; color:rgba(255,255,255,0.9);">Số đề xuất</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:#fff;">{kpiProposals}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:rgba(255,255,255,0.85);">chiếm {kpiProposalsPct} toàn quốc</div>' +
                              '</div>'
                    }
                },
                // KPI 3: Đang đề xuất
                {
                    xtype: 'panel',
                    cls: 'dash-card tb-kpi-card clickable',
                    bodyPadding: 14,
                    bind: {
                        html: '<div data-drill="1" data-group="inprogress" data-title="Tin đang đề xuất (chưa kết thúc)" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:var(--theme-text-muted, #77869c);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:var(--info-soft, rgba(42,120,214,0.12)); display:grid; place-items:center; color:var(--info, #2a78d6);"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>' +
                                    '<span style="font-size:12px; font-weight:600; color:var(--theme-text-secondary, #64748b);">Đang đề xuất</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:var(--info, #2a78d6);">{kpiInprog}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:var(--theme-text-muted, #77869c);">chờ duyệt · thẩm định</div>' +
                              '</div>'
                    }
                },
                // KPI 4: Đã hoàn thành
                {
                    xtype: 'panel',
                    cls: 'dash-card tb-kpi-card clickable',
                    bodyPadding: 14,
                    bind: {
                        html: '<div data-drill="1" data-status="Đã hoàn thành đề xuất" data-title="Đã hoàn thành đề xuất" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:var(--theme-text-muted, #77869c);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:var(--good-soft, rgba(12,154,61,0.12)); display:grid; place-items:center; color:var(--good, #0c9a3d);"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
                                    '<span style="font-size:12px; font-weight:600; color:var(--theme-text-secondary, #64748b);">Đã hoàn thành</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:var(--good, #0c9a3d);">{kpiDone}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:var(--theme-text-muted, #77869c);"><b style="color:var(--good, #0c9a3d);">{kpiDoneRate}</b> tỷ lệ hoàn thành</div>' +
                              '</div>'
                    }
                },
                // KPI 5: Sắp hết hạn
                {
                    xtype: 'panel',
                    cls: 'dash-card tb-kpi-card clickable',
                    bodyPadding: 14,
                    bind: {
                        html: '<div data-drill="1" data-deadline="sap" data-title="Tin sắp hết hạn (< 24 giờ)" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:var(--theme-text-muted, #77869c);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:var(--warning-soft, rgba(227,148,0,0.14)); display:grid; place-items:center; color:var(--warning, #e39400);"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>' +
                                    '<span style="font-size:12px; font-weight:600; color:var(--theme-text-secondary, #64748b);">Sắp hết hạn</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:var(--warning, #e39400);">{kpiWarning}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:var(--theme-text-muted, #77869c);">cần xử lý trong &lt; 24 giờ</div>' +
                              '</div>'
                    }
                },
                // KPI 6: Đề xuất quá hạn
                {
                    xtype: 'panel',
                    cls: 'dash-card tb-kpi-card clickable',
                    bodyPadding: 14,
                    margin: '0',
                    bind: {
                        html: '<div data-drill="1" data-deadline="qua" data-title="Đề xuất quá hạn" style="position:relative; cursor:pointer;">' +
                                '<span style="position:absolute; top:0; right:0; font-size:10px; color:var(--theme-text-muted, #77869c);">chi tiết ›</span>' +
                                '<div style="display:flex; align-items:center; gap:8px;">' +
                                    '<span style="width:28px; height:28px; border-radius:6px; background:var(--critical-soft, rgba(208,52,47,0.12)); display:grid; place-items:center; color:var(--critical, #d0342f);"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>' +
                                    '<span style="font-size:12px; font-weight:600; color:var(--critical, #d0342f);">Quá hạn</span>' +
                                '</div>' +
                                '<div style="font-size:36px; font-weight:700; line-height:1.1; margin-top:8px; font-family:\'Barlow Condensed\', sans-serif; color:var(--critical, #d0342f);">{kpiCritical}</div>' +
                                '<div style="margin-top:6px; font-size:11.5px; color:var(--theme-text-muted, #77869c);">trình đề xuất &amp; xử lý tin</div>' +
                              '</div>'
                    }
                }
            ]
        },

        // ================= VIEW FILTER =================
        {
            xtype: 'TrucBanTinBao_ViewFilter'
        },

        // ================= VIEW CHARTS =================
        {
            xtype: 'TrucBanTinBao_ViewCharts'
        },

        // ================= TICKER FOOTER =================
        {
            xtype: 'container',
            margin: '14 0 0 0',
            cls: 'dash-card',
            padding: '10 16',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<span style="display:inline-flex; align-items:center; gap:6px; font-weight:700; font-size:12px; color:var(--critical, #d0342f); text-transform:uppercase; letter-spacing:.05em; margin-right:12px;">' +
                            '<span style="width:8px; height:8px; border-radius:50%; background:currentColor;"></span>Tin mới' +
                          '</span>'
                },
                {
                    xtype: 'component',
                    flex: 1,
                    html: '<div id="tb-ticker-view" class="tb-tk-view" style="overflow:hidden; height:22px; position:relative;"></div>'
                }
            ]
        },

        // ================= BOTTOM FOOTER =================
        {
            xtype: 'component',
            margin: '16 0 0 0',
            html: '<div style="display:flex; justify-content:space-between; font-size:11.5px; color:var(--theme-text-muted, #77869c);">' +
                    '<span>Dữ liệu mẫu mô phỏng · phục vụ chỉ huy, trực ban.</span>' +
                    '<span>Hệ thống tiếp nhận tin báo cấp xã · Đồng bộ thời gian thực</span>' +
                  '</div>'
        }
    ]
});
