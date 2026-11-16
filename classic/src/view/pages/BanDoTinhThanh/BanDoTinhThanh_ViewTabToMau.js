Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoTinhThanh_ViewTabToMau', {
    extend: 'Ext.container.Container',
    xtype: 'BanDoTinhThanh_ViewTabToMau',
    height: 840,
    padding: 12,
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // Thanh chọn màu
        {
            xtype: 'container',
            cls: 'bdtt-toolbar-card dash-card',
            layout: { type: 'hbox', align: 'middle' },
            items: [
                {
                    xtype: 'component',
                    cls: 'bdtt-toolbar-label',
                    html: 'Màu đang dùng'
                },
                {
                    xtype: 'dataview',
                    reference: 'dvBangMau',
                    cls: 'bdtt-palette',
                    bind: { store: '{bangMauStore}' },
                    itemSelector: 'span.bdtt-swatch',
                    selectedItemCls: 'is-selected',
                    tpl: '<tpl for="."><span class="bdtt-swatch" style="background:{mau}" title="{ten}"></span></tpl>',
                    listeners: {
                        viewready: 'onBangMauSanSang',
                        selectionchange: 'onChonMau'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Màu khác',
                    iconCls: 'x-fa fa-tint',
                    ui: 'soft-blue',
                    menu: {
                        xtype: 'colormenu',
                        listeners: { select: 'onChonMauKhac' }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'btnTay',
                    text: 'Tẩy',
                    iconCls: 'x-fa fa-eraser',
                    margin: '0 0 0 8',
                    enableToggle: true,
                    toggleHandler: 'onBatTatTay'
                },
                { xtype: 'tbfill' },
                {
                    xtype: 'button',
                    text: 'Tô theo vùng',
                    iconCls: 'x-fa fa-th-large',
                    ui: 'soft-blue',
                    handler: 'onToTheoVung'
                },
                {
                    xtype: 'button',
                    text: 'Tô tất cả',
                    iconCls: 'x-fa fa-paint-brush',
                    margin: '0 0 0 8',
                    handler: 'onToTatCa'
                },
                {
                    xtype: 'button',
                    text: 'Xóa hết màu',
                    iconCls: 'x-fa fa-trash-o',
                    margin: '0 0 0 8',
                    handler: 'onXoaHetMau'
                }
            ]
        },

        // Bản đồ bên trái + danh sách tỉnh thành bên phải
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '12 0 0 0',
            flex: 1,
            items: [
                {
                    xtype: 'container',
                    cls: 'bdtt-map-card dash-card',
                    flex: 1.4,
                    margin: '0 12 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'component',
                        reference: 'cmpBanDo',
                        cls: 'bdtt-map-host',
                        listeners: { afterrender: 'onBanDoAfterRender' }
                    }]
                },
                {
                    xtype: 'grid',
                    reference: 'gridTinhThanh',
                    cls: 'bdtt-grid-card dash-card',
                    flex: 1,
                    hideHeaders: true,
                    bind: { store: '{tinhThanhStore}' },
                    features: [{
                        ftype: 'grouping',
                        groupHeaderTpl: '{name} ({rows.length})',
                        collapsible: false
                    }],
                    dockedItems: [{
                        xtype: 'component',
                        dock: 'top',
                        cls: 'bdtt-grid-header',
                        bind: {
                            html: '<div class="bdtt-grid-title"><i class="x-fa fa-list-ul"></i><span>Danh sách tỉnh thành</span>' +
                                '<span class="bdtt-count">{soTinhDaTo} / 34 đã tô</span></div>'
                        }
                    }],
                    columns: [
                        {
                            xtype: 'checkcolumn',
                            dataIndex: 'daTo',
                            width: 44,
                            listeners: { checkchange: 'onTichChonTinh' }
                        },
                        { dataIndex: 'name', flex: 1 },
                        {
                            dataIndex: 'mau',
                            width: 44,
                            align: 'center',
                            renderer: function (value) {
                                return '<span class="bdtt-color-dot" style="background:' + Ext.String.htmlEncode(value || 'var(--theme-border)') + '"></span>';
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
