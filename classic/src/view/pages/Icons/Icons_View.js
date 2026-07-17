Ext.define('DEMO.view.pages.Icons.Icons_View', {
    extend: 'Ext.container.Container',
    xtype: 'Icons_View',

    controller: 'icons',
    viewModel: 'icons',

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // ── Page header ──
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'middle', pack: 'between' },
            margin: '0 0 16 0',
            items: [
                {
                    xtype: 'container',
                    layout: { type: 'vbox' },
                    items: [
                        {
                            xtype: 'component',
                            html: '<h2 style="margin:0;font-size:22px;font-weight:700;color:var(--theme-text-primary);">Font Awesome Icons</h2>'
                        },
                        {
                            xtype: 'component',
                            reference: 'lblSubtitle',
                            margin: '4 0 0 0',
                            html: '<span style="font-size:13px;color:var(--theme-text-secondary);">Thư viện icon — click để copy CSS class</span>'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    items: [
                        {
                            xtype: 'tbtext',
                            reference: 'lblCount',
                            style: { fontSize: '13px', color: 'var(--theme-text-secondary)', marginRight: '12px' }
                        },
                        {
                            xtype: 'button',
                            text: 'Làm mới',
                            iconCls: 'x-fa fa-sync-alt',
                            ui: 'default',
                            style: 'border-radius:6px;font-weight:600;',
                            handler: 'onLamMoi'
                        }
                    ]
                }
            ]
        },

        // ── Filter card ──
        {
            xtype: 'container',
            cls: 'dash-card',
            layout: { type: 'vbox', align: 'stretch' },
            style: { borderRadius: '10px', padding: '16px', marginBottom: '16px' },
            items: [
                // Row 1: Search field
                {
                    xtype: 'textfield',
                    reference: 'txtTuKhoa',
                    emptyText: 'Tìm tên icon... (ví dụ: home, user, bell)',
                    cls: 'icons-search-field',
                    height: 40,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onSearchKeyup'
                    },
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: function (field) {
                                field.setValue('');
                                field.up('Icons_View').getController().onSearchKeyup();
                            }
                        }
                    }
                },
                // Row 2: Filter chips + count
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle', pack: 'between' },
                    margin: '12 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'filterChips',
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: {
                                xtype: 'button',
                                ui: 'default',
                                style: 'border-radius:20px;font-weight:600;font-size:12px;padding:5px 14px;transition:all 0.2s ease;',
                                margin: '0 6 0 0',
                                handler: 'onChipClick'
                            },
                            items: [
                                { text: 'Tất cả', iconCls: 'x-fa fa-th', chipValue: 'all', cls: 'icon-chip icon-chip-active' },
                                { text: 'Solid', iconCls: 'x-fa fa-square', chipValue: 'solid', cls: 'icon-chip' },
                                { text: 'Regular', iconCls: 'far fa-square', chipValue: 'regular', cls: 'icon-chip' },
                                { text: 'Brands', iconCls: 'fab fa-font-awesome', chipValue: 'brands', cls: 'icon-chip' }
                            ]
                        },
                        {
                            xtype: 'component',
                            reference: 'lblChipCount',
                            style: { fontSize: '12px', color: 'var(--theme-text-muted)' }
                        }
                    ]
                }
            ]
        },

        // ── Icon gallery ──
        {
            xtype: 'component',
            reference: 'iconGallery',
            flex: 1,
            scrollable: 'y',
            cls: 'icons-gallery',
            style: { background: 'transparent' }
        }
    ],

    listeners: {
        afterrender: 'onGalleryRender'
    }
});