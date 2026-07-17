Ext.define('DEMO.view.dashboard.Dashboard_View', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_View',

    requires: [
        'Ext.chart.*',
        'DEMO.view.dashboard.Dashboard_ViewVuAnGrid',
        'DEMO.view.dashboard.Dashboard_ViewVuViecGrid'
    ],

    controller: 'dashboard',
    viewModel: 'dashboard',

    style: {
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
    },
    cls: 'dash-page',

    scrollable: 'y',
    padding: 15,

    items: [
        // CSS cho hiệu ứng Hover Reveal
        {
            xtype: 'component',
            html: '<style>' +
                '.kpi-card .details-wrapper { ' +
                'opacity: 0; ' +
                'max-height: 0; ' +
                'overflow: hidden; ' +
                'transition: all 0.4s ease-out; ' +
                'margin-top: 0; ' +
                '} ' +
                '.kpi-card:hover .details-wrapper { ' +
                'opacity: 1; ' +
                'max-height: 100px; ' +
                'margin-top: 10px; ' +
                '} ' +
                '.kpi-card { transition: all 0.3s ease; border-bottom: 3px solid transparent !important; } ' +
                '.kpi-card:hover { ' +
                'border-color: #3b82f6 !important; ' +
                'transform: translateY(-2px); ' +
                'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;' +
                '} ' +
                '.kpi-card .show-on-hover-hint { ' +
                'font-size: 9px; ' +
                'color: #94a3b8; ' +
                'text-align: center; ' +
                'margin-top: 5px;' +
                '} ' +
                '.kpi-card:hover .show-on-hover-hint { display: none; } ' +
                '</style>'
        },
        // --- SECTION 1: HEADER & FILTERS BAR ---
        {
            xtype: 'panel',
            cls: 'dashboard-header-panel dash-card',
            bodyStyle: {
                padding: '16px'
            },
            margin: '0 0 15 0',
            layout: 'vbox',
            width: '100%',

            items: [
                // Top row of Header: Title, Toggle buttons, Profile
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    align: 'middle',
                    margin: '0 0 15 0',
                    items: [
                        {
                            xtype: 'label',
                            text: 'QUẢN LÝ, THEO DÕI VỤ VIỆC TOÀN QUỐC',
                            style: {
                                color: '#1e293b',
                                fontSize: '20px',
                                fontWeight: '700',
                                letterSpacing: '0.5px'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'segmentedbutton',
                            allowMultiple: false,
                            margin: '0 20 0 20',
                            defaults: {
                                padding: '8px 20px',
                                style: {
                                    fontWeight: '600',
                                    fontSize: '13px'
                                }
                            },
                            items: [
                                {
                                    text: 'VỤ ÁN',
                                    value: 'vuan'
                                },
                                {
                                    text: 'VỤ VIỆC',
                                    value: 'vuviec',
                                    pressed: true
                                }
                            ],
                            listeners: {
                                toggle: 'onViewToggle'
                            }
                        },
                        // User Profile Panel
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            align: 'middle',
                            style: {
                                borderLeft: '1px solid #e2e8f0',
                                paddingLeft: '20px'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 10 0 0',
                                    style: {
                                        position: 'relative',
                                        cursor: 'pointer'
                                    },
                                    html: '<div style="background: var(--theme-border-light); padding: 10px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">' +
                                        '<i class="fa fa-bell" style="color: var(--theme-text-secondary); font-size: 16px;"></i>' +
                                        '<span style="position: absolute; top: 0; right: 0; background: #ef4444; color: white; border-radius: 50%; font-size: 10px; padding: 2px 6px; font-weight: 700;">12</span>' +
                                        '</div>'
                                },
                                {
                                    xtype: 'box',
                                    bind: {
                                        data: '{currentUser}'
                                    },
                                    tpl: [
                                        '<div style="text-align: right; line-height: 1.3;">',
                                        '<div style="font-weight: 700; color: #1e293b; font-size: 14px;">{name}</div>',
                                        '<div style="color: var(--theme-text-secondary); font-size: 12px; font-weight: 500;">{title}</div>',
                                        '</div>'
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    html: '<div style="width: 36px; height: 36px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">A</div>'
                                }
                            ]
                        }
                    ]
                },
                // Bottom row of Header: Filter inputs, Search button, Export button
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    width: '100%',
                    defaults: {
                        margin: '0 10 0 0',
                        labelStyle: 'font-weight: 600; color: var(--theme-text-secondary); font-size: 12px; margin-bottom: 4px;',
                        height: 52
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'comboCapDonVi',
                            fieldLabel: 'Cấp đơn vị',
                            emptyText: 'Tất cả',
                            value: 'all',
                            store: {
                                fields: ['abbr', 'name'],
                                data: [
                                    { abbr: 'all', name: 'Tất cả' },
                                    { abbr: 'tw', name: 'Trung ương' },
                                    { abbr: 'tinh', name: 'Cấp Tỉnh' },
                                    { abbr: 'huyen', name: 'Cấp Huyện' }
                                ]
                            },
                            valueField: 'abbr',
                            displayField: 'name',
                            editable: false,
                            flex: 1
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboDonViThuLy',
                            fieldLabel: 'Đơn vị thụ lý',
                            emptyText: 'Tất cả',
                            value: 'all',
                            store: {
                                fields: ['abbr', 'name'],
                                data: [
                                    { abbr: 'all', name: 'Tất cả' },
                                    { abbr: 'C01', name: 'C01 - Văn phòng Cơ quan CSĐT' },
                                    { abbr: 'C02', name: 'C02 - Cục Cảnh sát hình sự' },
                                    { abbr: 'C03', name: 'C03 - Cục Cảnh sát kinh tế' },
                                    { abbr: 'C04', name: 'C04 - Cục Cảnh sát ma túy' },
                                    { abbr: 'C05', name: 'C05 - Cục Cảnh sát môi trường' }
                                ]
                            },
                            valueField: 'abbr',
                            displayField: 'name',
                            editable: false,
                            flex: 1
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboLoaiVuViec',
                            fieldLabel: 'Loại vụ việc',
                            emptyText: 'Tất cả',
                            value: 'all',
                            store: {
                                fields: ['abbr', 'name'],
                                data: [
                                    { abbr: 'all', name: 'Tất cả' },
                                    { abbr: 'tin_bao', name: 'Tin báo tội phạm' },
                                    { abbr: 'kien_nghi', name: 'Kiến nghị khởi tố' },
                                    { abbr: 'phan_anh', name: 'Phản ánh, kiến nghị' },
                                    { abbr: 'khieu_nai', name: 'Đơn khiếu nại, tố cáo' }
                                ]
                            },
                            valueField: 'abbr',
                            displayField: 'name',
                            editable: false,
                            flex: 1
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dateRangeField',
                            fieldLabel: 'Thời hạn xác minh',
                            value: new Date('2025-05-21'),
                            emptyText: 'Chọn ngày',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'Tìm kiếm',
                            iconCls: 'x-fa fa-search',
                            ui: 'primary',
                            margin: '18 10 0 0',
                            height: 34,
                            style: {
                                background: '#1d4ed8',
                                borderColor: '#1d4ed8',
                                borderRadius: '6px',
                                fontWeight: '600'
                            },
                            handler: 'onSearch'
                        },
                        {
                            xtype: 'button',
                            text: 'Xuất báo cáo',
                            iconCls: 'x-fa fa-file-excel',
                            margin: '18 0 0 0',
                            height: 34,
                            cls: 'dash-btn-outline',
                            handler: 'onExportReport'
                        }
                    ]
                }
            ]
        },

        // --- SECTION 2: CARD CONTAINER (VỤ ÁN / VỤ VIỆC) ---
        {
            xtype: 'container',
            layout: 'card',
            width: '100%',
            bind: {
                activeItem: '{activeCardIndex}'
            },

            items: [
                // CARD 0: VỤ ÁN PANEL
                {
                    xtype: 'container',
                    itemId: 'vuanCard',
                    width: '100%',
                    layout: 'vbox',

                    items: [
                        // KPI Row for Vụ Án (DataView)

                        {
                            xtype: 'dataview',
                            bind: {
                                store: '{ThongKeCongTacNghiemVuStore}'
                            },
                            style: {
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                width: '100%',
                                gap: '10px',
                                overflow: 'hidden'
                            },
                            margin: '0 0 15 0',
                            itemSelector: 'div.kpi-card',
                            listeners: {
                                itemclick: 'onMetricClick'
                            },
                            itemTpl: [
                                '<div class="kpi-card" data-qtip="<b>{title}</b><br/>Nhấp để xem chi tiết thông số này" style="flex: 1; display: flex; flex-direction: column; background: var(--theme-bg-card); border-radius: 4px; border: 1px solid var(--theme-border); padding: 10px; min-height: 110px; position: relative; box-shadow: 0 1px 3px rgba(0,0,0,0.05); cursor: pointer; justify-content: flex-start;">',
                                '<div style="font-size: 11px; font-weight: 700; color: var(--theme-text-primary); text-transform: uppercase; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-bottom: 1px solid var(--theme-border-light); padding-bottom: 5px;">{title}</div>',

                                '<div style="display: flex; align-items: center; justify-content: space-between;">',
                                '<div style="display: flex; align-items: center; justify-content: center;">',
                                '<i class="{iconCls}" style="color: {color}; font-size: 24px; opacity: 0.8;"></i>',
                                '</div>',
                                '<div style="font-size: 22px; font-weight: 800; color: {color}; line-height: 1;">{value}</div>',
                                '</div>',

                                '<div class="details-wrapper">',
                                '<div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px dashed var(--theme-border); padding-top: 8px; margin-bottom: 8px;">',
                                '<tpl for="details">',
                                '<div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--theme-text-secondary); font-weight: 500;">',
                                '<span>{label}</span>',
                                '<span style="font-weight: 700; color: var(--theme-text-primary);">{val}</span>',
                                '</div>',
                                '</tpl>',
                                '</div>',
                                '</div>',

                                '<div class="show-on-hover-hint">▼ Rê chuột xem chi tiết</div>',

                                '<div style="text-align: right; border-top: 1px solid var(--theme-border-light); padding-top: 5px; margin-top: auto;">',
                                '<span style="font-size: 10px; color: #ef4444; font-weight: 600;">{subTitle}: <span style="font-weight: 800;">{subValue}</span></span>',
                                '</div>',
                                '</div>'
                            ]
                        },

                        {
                            xtype: 'dataview',
                            bind: {
                                store: '{vuAnMetricsStore}'
                            },
                            style: {
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: '100%',
                                gap: '12px'
                            },
                            margin: '0 0 15 0',
                            itemSelector: 'div.kpi-card',
                            itemTpl: [
                                '<div class="kpi-card" data-qtip="<b>{title}</b><br/>Giá trị hiện tại: {[Ext.util.Format.number(values.value, \"0,000\")]}<br/>Xu hướng: {trendValue}" style="flex: 1; min-width: 200px; display: flex; background: var(--theme-bg-card); border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 16px; border-left: 4px solid {color}; justify-content: space-between; align-items: center;">',
                                '<div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">',
                                '<span style="font-size: 11px; font-weight: 700; color: #1e3a8a; letter-spacing: 0.5px;">{title}</span>',
                                '<span style="font-size: 26px; font-weight: 800; color: var(--theme-text-primary); margin: 4px 0;">{[Ext.util.Format.number(values.value, "0,000")]}</span>',
                                '<span style="font-size: 11px; font-weight: 600; color: {color};"><i class="fa fa-arrow-up"></i> {trendValue} <span style="color: var(--theme-text-secondary); font-weight: 500;">so với kỳ trước</span></span>',
                                '</div>',
                                '<div style="background: {bgColor}; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-left: 10px;">',
                                '<i class="{iconCls}" style="color: {color}; font-size: 20px;"></i>',
                                '</div>',
                                '</div>'
                            ]
                        },

                        // Charts Row for Vụ Án (3 Charts)
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            width: '100%',
                            margin: '0 0 15 0',
                            height: 320,
                            defaults: {
                                xtype: 'panel',
                                flex: 1,
                                bodyPadding: 10,
                                cls: 'dash-card-body',
                                bodyCls: 'dash-card-body'
                            },
                            items: [
                                // Chart 1: Donut (PHÂN LOẠI VỤ ÁN THEO TỘI DANH)
                                {
                                    title: 'PHÂN LOẠI VỤ ÁN THEO TỘI DANH',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'polar',
                                        bind: {
                                            store: '{vuAnCrimeTypeStore}'
                                        },
                                        interactions: ['rotate', 'itemhighlight'],
                                        series: [{
                                            type: 'pie',
                                            angleField: 'value',
                                            donut: 50,
                                            highlight: true,
                                            renderer: function (sprite, config, rendererData, index) {
                                                var record = rendererData.store.getAt(index);
                                                return {
                                                    fillStyle: record ? record.get('color') : '#94a3b8'
                                                };
                                            },
                                            label: {
                                                field: 'name',
                                                display: 'inside',
                                                orientation: 'horizontal'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('name') + ': ' + Ext.util.Format.number(record.get('value'), '0,000') + ' vụ án');
                                                }
                                            }
                                        }]
                                    }]
                                },
                                // Chart 2: Bar 3D Stacked (TÌNH HÌNH XỬ LÝ THEO THỜI HẠN ĐIỀU TRA)
                                {
                                    title: 'TÌNH HÌNH XỬ LÝ THEO THỜI HẠN ĐIỀU TRA',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    margin: '0 12 0 12',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'cartesian',
                                        bind: {
                                            store: '{vuAnStatusPeriodStore}',
                                            series: '{vuAnStatusSeries}'
                                        },
                                        legend: {
                                            type: 'sprite',
                                            position: 'bottom'
                                        },
                                        axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            bind: {
                                                fields: '{vuAnStatusFields}'
                                            },
                                            title: {
                                                text: '(Số lượng vụ án)',
                                                fontSize: 11,
                                                fillStyle: '#64748b'
                                            },
                                            grid: true,
                                            minimum: 0,
                                            // Tăng số bước chia để dễ ước lượng các khoảng giá trị nhỏ
                                            majorTickSteps: 10
                                        }, {
                                            type: 'category3d', // Đồng bộ category axis thành 3d
                                            position: 'bottom',
                                            fields: ['unit'],
                                            label: {
                                                fontSize: 10
                                            }
                                        }]
                                    }]
                                },
                                // Chart 3: 3D Column (TOP 5 ĐƠN VỊ CÓ NHIỀU VỤ ÁN)
                                {
                                    title: 'TOP 5 ĐƠN VỊ CÓ NHIỀU VỤ ÁN',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'cartesian',
                                        bind: {
                                            store: '{vuAnTopUnitsStore}'
                                        },
                                        axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['value'],
                                            grid: true
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
                                            fields: ['unit']
                                        }],
                                        series: [{
                                            type: 'bar3d',
                                            xField: 'unit',
                                            yField: ['value'],
                                            style: {
                                                fill: '#3b82f6',
                                                maxBarWidth: 35
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('unit') + ': ' + record.get('value') + ' vụ án');
                                                }
                                            }
                                        }]
                                    }]
                                }
                            ]
                        },

                        // Grid for Vụ An (DANH SÁCH VỤ ÁN THEO DÕI)
                        {
                            xtype: 'Dashboard_ViewVuAnGrid'
                        }
                    ]
                },

                // CARD 1: VỤ VIỆC PANEL
                {
                    xtype: 'container',
                    itemId: 'vuviecCard',
                    width: '100%',
                    layout: 'vbox',

                    items: [
                        // KPI Row for Vụ Việc (DataView)
                        {
                            xtype: 'dataview',
                            bind: {
                                store: '{vuViecMetricsStore}'
                            },
                            style: {
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: '100%',
                                gap: '12px'
                            },
                            margin: '0 0 15 0',
                            itemSelector: 'div.kpi-card',
                            itemTpl: [
                                '<div class="kpi-card" style="flex: 1; min-width: 260px; display: flex; background: var(--theme-bg-card); border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 16px; border-left: 4px solid {color}; justify-content: space-between; align-items: center; height: 95px;">',
                                '<div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">',
                                '<span style="font-size: 11px; font-weight: 700; color: #1e3a8a; letter-spacing: 0.5px;">{title}</span>',
                                '<span style="font-size: 24px; font-weight: 800; color: var(--theme-text-primary); margin: 2px 0;">{[Ext.util.Format.number(values.value, "0,000")]}</span>',
                                '<span style="font-size: 10px; font-weight: 600; color: {color};"><i class="fa fa-arrow-up"></i> {trendValue} <span style="color: var(--theme-text-secondary); font-weight: 500;">so với kỳ trước</span></span>',
                                '</div>',
                                '<div style="background: {bgColor}; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-left: 8px;">',
                                '<i class="{iconCls}" style="color: {color}; font-size: 16px;"></i>',
                                '</div>',
                                '</div>'
                            ]
                        },

                        // Charts Row for Vụ Việc (4 Charts)
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            width: '100%',
                            margin: '0 0 15 0',
                            height: 320,
                            defaults: {
                                xtype: 'panel',
                                flex: 1,
                                bodyPadding: 10,
                                cls: 'dash-card-body',
                                bodyCls: 'dash-card-body'
                            },
                            items: [
                                // Chart 1: Donut (THỐNG KÊ THEO TRẠNG THÁI)
                                {
                                    title: 'THỐNG KÊ THEO TRẠNG THÁI',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'polar',
                                        bind: {
                                            store: '{vuViecStatusStore}'
                                        },
                                        interactions: ['rotate', 'itemhighlight'],
                                        series: [{
                                            type: 'pie',
                                            renderer: function (sprite, config, rendererData, index) {
                                                var record = rendererData.store.getAt(index);
                                                return {
                                                    fillStyle: record ? record.get('color') : '#94a3b8'
                                                };
                                            },
                                            angleField: 'value',
                                            donut: 50,
                                            highlight: true,
                                            label: {
                                                field: 'name',
                                                display: 'inside',
                                                orientation: 'horizontal'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('name') + ': ' + Ext.util.Format.number(record.get('value'), '0,000') + ' vụ việc');
                                                }
                                            }
                                        }]
                                    }]
                                },
                                // Chart 2: Bar (TÌNH HÌNH XÁC MINH THEO THỜI HẠN)
                                {
                                    title: 'TÌNH HÌNH XÁC MINH THEO THỜI HẠN',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    margin: '0 6 0 6',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'cartesian',
                                        bind: {
                                            store: '{vuViecPeriodStore}'
                                        },
                                        axes: [{
                                            type: 'numeric',
                                            position: 'left',
                                            fields: ['value'],
                                            title: {
                                                text: '(Vụ việc)',
                                                fontSize: 11,
                                                fillStyle: '#64748b'
                                            },
                                            grid: true
                                        }, {
                                            type: 'category',
                                            position: 'bottom',
                                            fields: ['status'],
                                            label: {
                                                rotate: { degrees: -30 },
                                                textAlign: 'end',
                                                fontSize: 10
                                            }
                                        }],
                                        series: [{
                                            type: 'bar',
                                            xField: 'status',
                                            yField: ['value'],
                                            style: {
                                                fill: '#3b82f6',
                                                maxBarWidth: 35
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('status') + ': ' + record.get('value') + ' (' + record.get('percentage') + '%)');
                                                }
                                            }
                                        }]
                                    }]
                                },
                                // Chart 3: 3D Column (TOP 5 ĐƠN VỊ CÓ NHIỀU VỤ VIỆC)
                                {
                                    title: 'TOP 5 ĐƠN VỊ CÓ NHIỀU VỤ VIỆC',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    margin: '0 6 0 6',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'cartesian',
                                        bind: {
                                            store: '{vuViecTopUnitsStore}'
                                        },
                                        axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['value'],
                                            grid: true
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
                                            fields: ['unit']
                                        }],
                                        series: [{
                                            type: 'bar3d',
                                            xField: 'unit',
                                            yField: ['value'],
                                            style: {
                                                fill: '#2563eb',
                                                maxBarWidth: 35
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('unit') + ': ' + record.get('value') + ' vụ việc');
                                                }
                                            }
                                        }]
                                    }]
                                },
                                // Chart 4: 3D Bar (THỐNG KÊ LẦN GIA HẠN)
                                {
                                    title: 'THỐNG KÊ LẦN GIA HẠN',
                                    header: {
                                        titleAlign: 'left',
                                        cls: 'dash-card-header'
                                    },
                                    margin: '0 0 0 6',
                                    layout: 'fit',
                                    items: [{
                                        xtype: 'cartesian',
                                        theme: 'default',
                                        bind: {
                                            store: '{vuViecExtensionStore}'
                                        },
                                        axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['value'],
                                            grid: true
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
                                            fields: ['label']
                                        }],
                                        series: [{
                                            type: 'bar3d',
                                            xField: 'label',
                                            yField: ['value'],
                                            label: {
                                                field: 'value',
                                                display: 'insideEnd'
                                            },
                                            style: {
                                                minBarWidth: 30,
                                                maxBarWidth: 35
                                            },
                                            itemInstancing: {
                                                fillStyle: '#f59e0b'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record, item) {
                                                    tooltip.setHtml(record.get('label') + ': ' + record.get('value') + ' vụ việc');
                                                }
                                            }
                                        }]
                                    }]
                                }
                            ]
                        },

                        // Grid for Vụ Việc (DANH SÁCH VỤ VIỆC THEO DÕI)
                        {
                            xtype: 'Dashboard_ViewVuViecGrid'
                        }
                    ]
                }
            ]
        }
    ]
});
