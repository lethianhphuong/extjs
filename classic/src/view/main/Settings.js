Ext.define('DEMO.view.main.Settings', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-settings',

    floating: true,
    width: 380,
    height: '100%',
    closable: true,
    closeAction: 'hide',
    scrollable: 'y',
    cls: 'app-settings-panel',
    bodyCls: 'app-settings-body',
    bodyStyle: { padding: '0' },
    layout: { type: 'vbox', align: 'stretch' },

    // ---- State ----
    _state: {
        darkMode: false,
        highContrast: false,
        rtl: false,
        compact: false,
        layout: 'sidebar',
        colorMode: 'integrate',
        preset: '#22c55e'
    },

    _storageKey: 'app-settings-state',

    defaults: { border: false },

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent(arguments);
        this._loadState();
        this._applyAll();
    },

    // ============================================================
    //  STATE PERSISTENCE
    // ============================================================

    _loadState: function () {
        try {
            var saved = localStorage.getItem(this._storageKey);
            if (saved) {
                var parsed = Ext.decode(saved);
                Ext.apply(this._state, parsed);
            }
        } catch (e) {
            // ignore
        }
    },

    _saveState: function () {
        try {
            localStorage.setItem(this._storageKey, Ext.encode(this._state));
        } catch (e) {
            // ignore
        }
    },

    // ============================================================
    //  BUILD UI
    // ============================================================

    buildItems: function () {
        var me = this;
        return [
            me.buildHeader(),
            me.buildDisplaySection(),
            me.buildNavSection(),
            me.buildPresetSection()
        ];
    },

    /* ---- Header ---- */
    buildHeader: function () {
        var me = this;
        return {
            xtype: 'container',
            layout: { type: 'hbox', align: 'middle', pack: 'space-between' },
            height: 60,
            padding: '0 24',
            cls: 'settings-header',
            items: [
                {
                    xtype: 'component',
                    html: '<span class="settings-title">Settings</span>'
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    items: [
                        me._makeIconBtn('x-fa fa-cube', 'Components', Ext.emptyFn),
                        me._makeIconBtn('x-fa fa-refresh', 'Reset all', function () {
                            me.onReset();
                        }),
                        me._makeIconBtn('x-fa fa-times', 'Close', function () {
                            me.hide();
                        })
                    ]
                }
            ]
        };
    },

    _makeIconBtn: function (icon, tip, fn) {
        return {
            xtype: 'component',
            cls: 'settings-icon-btn',
            html: '<div class="settings-icon-btn-inner" data-qtip="' + tip + '"><i class="x-fa ' + icon + '"></i></div>',
            listeners: { el: { click: fn } }
        };
    },

    /* ---- Display Section ---- */
    buildDisplaySection: function () {
        var me = this;
        return {
            xtype: 'container',
            padding: '24',
            cls: 'settings-section',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    html: '<div class="settings-section-title">Display</div>'
                },
                {
                    xtype: 'container',
                    layout: { type: 'table', columns: 2 },
                    defaults: { style: 'margin: 0 10px 10px 0;' },
                    items: [
                        me._buildSwitchCard('Mode', 'fa-moon-o', 'darkMode'),
                        me._buildSwitchCard('Contrast', 'fa-circle-o', 'highContrast'),
                        me._buildSwitchCard('Right to left', 'fa-arrows-h', 'rtl'),
                        me._buildSwitchCard('Compact', 'fa-arrows-alt-h', 'compact', true)
                    ]
                }
            ]
        };
    },

    _buildSwitchCard: function (label, icon, stateKey, hasInfo) {
        var me = this;
        var infoHtml = hasInfo
            ? '<span class="settings-info-icon" data-qtip="Giao diện thu gọn, hiển thị nhiều nội dung hơn"><i class="x-fa fa-info-circle"></i></span>'
            : '';

        return {
            xtype: 'container',
            width: 155,
            height: 88,
            cls: 'settings-switch-card',
            layout: { type: 'vbox', align: 'center', pack: 'center' },
            items: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle', pack: 'between' },
                    width: '100%',
                    padding: '0 14',
                    items: [
                        {
                            xtype: 'component',
                            html: '<i class="x-fa ' + icon + ' settings-card-icon"></i>'
                        },
                        {
                            xtype: 'component',
                            itemId: 'sw-' + stateKey,
                            cls: 'settings-switch' + (me._state[stateKey] ? ' on' : ''),
                            html: '<div class="settings-switch-track"><div class="settings-switch-thumb"></div></div>',
                            listeners: {
                                el: {
                                    click: function () {
                                        me._toggleSwitch(stateKey);
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<div class="settings-card-label">' + label + infoHtml + '</div>'
                }
            ]
        };
    },

    _toggleSwitch: function (key) {
        this._state[key] = !this._state[key];
        var sw = this.down('#sw-' + key);
        if (sw) {
            var el = sw.getEl();
            if (this._state[key]) {
                el.addCls('on');
            } else {
                el.removeCls('on');
            }
        }
        this._applyAll();
        this._saveState();
    },

    /* ---- Nav Section ---- */
    buildNavSection: function () {
        var me = this;
        return {
            xtype: 'container',
            padding: '24',
            cls: 'settings-section',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    html: '<span class="settings-badge">Nav</span>'
                },
                {
                    xtype: 'component',
                    html: '<div class="settings-label">Layout</div>'
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '0 0 20 0',
                    items: [
                        me._makeLayoutThumb('sidebar', '<div class="lt-side"></div><div class="lt-main"></div>', 'Sidebar'),
                        me._makeLayoutThumb('horizontal', '<div class="lt-top"></div><div class="lt-body"></div>', 'Horizontal'),
                        me._makeLayoutThumb('collapsed', '<div class="lt-narrow"></div><div class="lt-body"></div>', 'Collapsed')
                    ]
                },
                {
                    xtype: 'component',
                    html: '<div class="settings-label">Color</div>'
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    items: [
                        me._makeColorBtn('Integrate', 'integrate'),
                        me._makeColorBtn('Apparent', 'apparent')
                    ]
                }
            ]
        };
    },

    _makeLayoutThumb: function (type, inner, tip) {
        var me = this;
        return {
            xtype: 'component',
            itemId: 'layout-' + type,
            cls: 'layout-thumb' + (me._state.layout === type ? ' layout-thumb-active' : ''),
            html: '<div class="layout-thumb-box" data-qtip="' + tip + '">' + inner + '</div>',
            listeners: {
                el: {
                    click: function () {
                        me._onLayoutChange(type);
                    }
                }
            }
        };
    },

    _makeColorBtn: function (label, type) {
        var me = this;
        var isActive = me._state.colorMode === type;
        return {
            xtype: 'component',
            itemId: 'color-' + type,
            cls: 'settings-color-btn' + (isActive ? ' settings-color-btn-active' : ''),
            html: '<i class="x-fa fa-' + (isActive ? 'check-circle' : 'circle-o') + '"></i><span>' + label + '</span>',
            listeners: {
                el: {
                    click: function () {
                        me._onColorChange(type);
                    }
                }
            }
        };
    },

    /* ---- Preset Section ---- */
    buildPresetSection: function () {
        var me = this;
        var presets = [
            { color: '#22c55e', name: 'green' },
            { color: '#3b82f6', name: 'blue' },
            { color: '#8b5cf6', name: 'purple' },
            { color: '#ef4444', name: 'red' }
        ];

        var items = [];
        for (var i = 0; i < presets.length; i++) {
            items.push(me._makePresetDot(presets[i].color, presets[i].name));
        }

        return {
            xtype: 'container',
            padding: '24',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    html: '<span class="settings-badge">Presets</span>'
                },
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '16 0 0 0',
                    items: items
                }
            ]
        };
    },

    _makePresetDot: function (color, name) {
        var me = this;
        return {
            xtype: 'component',
            cls: 'settings-preset-dot' + (me._state.preset === color ? ' settings-preset-active' : ''),
            html: '<div style="background:' + color + ';" data-qtip="' + name + '"></div>',
            listeners: {
                el: {
                    click: function () {
                        me._onPresetChange(color);
                    }
                }
            }
        };
    },

    // ============================================================
    //  ACTIONS
    // ============================================================

    _applyAll: function () {
        var body = Ext.getBody(),
            s = this._state;

        // Toggle modes on body
        this._setCls(body, 'dark-mode', s.darkMode);
        this._setCls(body, 'high-contrast', s.highContrast);
        this._setCls(body, 'compact-mode', s.compact);

        // Apply dark-mode on the settings panel itself for CSS specificity
        if (this.rendered) {
            var el = this.getEl();
            if (el) {
                this._setCls(el, 'dark-mode', s.darkMode);
            }
        }

        // RTL
        document.body.dir = s.rtl ? 'rtl' : 'ltr';
        this._setCls(body, 'rtl-mode', s.rtl);

        // Layout
        this._applyLayout(s.layout);

        // Color mode
        body.removeCls('settings-color-integrate settings-color-apparent');
        body.addCls('settings-color-' + s.colorMode);

        // Preset accent
        body.removeCls('preset-green preset-blue preset-purple preset-red');
        var presetMap = {
            '#22c55e': 'preset-green',
            '#3b82f6': 'preset-blue',
            '#8b5cf6': 'preset-purple',
            '#ef4444': 'preset-red'
        };
        body.addCls(presetMap[s.preset] || 'preset-green');
    },

    _applyLayout: function (type) {
        var main = Ext.getCmp('app-main');
        if (!main) return;

        var sidebar = main.getComponent('app-sidebar');

        if (type === 'collapsed') {
            // Show sidebar in micro mode (icon only)
            if (sidebar) {
                sidebar.show();
                sidebar.setWidth(60);
                var treelist = sidebar.down('treelist');
                if (treelist) {
                    treelist.setMicro(true);
                }
            }

        } else if (type === 'horizontal') {
            // Hide sidebar for horizontal navigation (Header contains top nav)
            if (sidebar) {
                sidebar.hide();
            }

        } else {
            // Default: show full sidebar
            if (sidebar) {
                sidebar.show();
                sidebar.setWidth(260);
                var tl = sidebar.down('treelist');
                if (tl) {
                    tl.setMicro(false);
                }
            }
        }

        main.updateLayout();
    },

    _onLayoutChange: function (type) {
        this._state.layout = type;

        var types = ['sidebar', 'horizontal', 'collapsed'];
        for (var i = 0; i < types.length; i++) {
            var cmp = this.down('#layout-' + types[i]);
            if (cmp) {
                var el = cmp.getEl();
                if (types[i] === type) {
                    el.addCls('layout-thumb-active');
                } else {
                    el.removeCls('layout-thumb-active');
                }
            }
        }
        this._applyAll();
        this._saveState();
    },

    _onColorChange: function (type) {
        this._state.colorMode = type;

        var btns = ['integrate', 'apparent'];
        for (var i = 0; i < btns.length; i++) {
            var cmp = this.down('#color-' + btns[i]);
            if (cmp) {
                var el = cmp.getEl();
                if (btns[i] === type) {
                    el.addCls('settings-color-btn-active');
                } else {
                    el.removeCls('settings-color-btn-active');
                }
            }
        }
        this._applyAll();
        this._saveState();
    },

    _onPresetChange: function (color) {
        this._state.preset = color;

        var dots = this.query('.settings-preset-dot');
        for (var i = 0; i < dots.length; i++) {
            var innerDiv = dots[i].getEl().down('div');
            dots[i].getEl().removeCls('settings-preset-active');
            if (innerDiv && innerDiv.dom.style.background === color) {
                dots[i].getEl().addCls('settings-preset-active');
            }
        }
        this._applyAll();
        this._saveState();
    },

    onReset: function () {
        var me = this;
        me._state = {
            darkMode: false,
            highContrast: false,
            rtl: false,
            compact: false,
            layout: 'sidebar',
            colorMode: 'integrate',
            preset: '#22c55e'
        };

        me._applyAll();
        me._resetAllUI();

        try {
            localStorage.removeItem(me._storageKey);
        } catch (e) {
            // ignore
        }

        Ext.toast({
            html: 'Settings reset to default',
            closable: false,
            align: 'tr',
            slideDuration: 1500
        });
    },

    _resetAllUI: function () {
        var me = this;

        // Reset toggle switches
        var toggles = ['darkMode', 'highContrast', 'rtl', 'compact'];
        for (var i = 0; i < toggles.length; i++) {
            var sw = me.down('#sw-' + toggles[i]);
            if (sw && sw.getEl()) {
                sw.getEl().removeCls('on');
            }
        }

        // Reset layout thumbs
        var layouts = ['sidebar', 'horizontal', 'collapsed'];
        for (var j = 0; j < layouts.length; j++) {
            var lc = me.down('#layout-' + layouts[j]);
            if (lc && lc.getEl()) {
                if (layouts[j] === 'sidebar') {
                    lc.getEl().addCls('layout-thumb-active');
                } else {
                    lc.getEl().removeCls('layout-thumb-active');
                }
            }
        }

        // Reset color buttons
        var ci = me.down('#color-integrate');
        var ca = me.down('#color-apparent');
        if (ci && ci.getEl()) ci.getEl().addCls('settings-color-btn-active');
        if (ca && ca.getEl()) ca.getEl().removeCls('settings-color-btn-active');

        // Reset preset dots
        var dots = me.query('.settings-preset-dot');
        for (var k = 0; k < dots.length; k++) {
            dots[k].getEl().removeCls('settings-preset-active');
        }
        if (dots[0]) {
            dots[0].getEl().addCls('settings-preset-active');
        }
    },

    _setCls: function (el, cls, on) {
        if (on) {
            el.addCls(cls);
        } else {
            el.removeCls(cls);
        }
    }
});
