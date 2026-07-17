/**
 * notiCommon — Singleton global hien thi dialog thong bao.
 *
 * Cach dung:
 *   notiCommon.show({ message: 'Thanh cong!', type: 'success' });
 *   notiCommon.show({ message: 'Xac nhan?', type: 'confirm', onConfirm: fn });
 *   notiCommon.showCustom({ showGrid: true, gridData: [...] });
 */
Ext.define('DEMO.app.NotiCommon', {

    singleton: true,

    alternateClassName: 'notiCommon',

    _typeConfig: {
        success: { iconCls: 'x-fa fa-check-circle', color: '#10b981', label: 'Thanh cong' },
        error:   { iconCls: 'x-fa fa-times-circle', color: '#ef4444', label: 'Loi' },
        warning: { iconCls: 'x-fa fa-exclamation-triangle', color: '#f59e0b', label: 'Canh bao' },
        info:    { iconCls: 'x-fa fa-info-circle', color: '#3b82f6', label: 'Thong tin' },
        confirm: { iconCls: 'x-fa fa-question-circle', color: '#8b5cf6', label: 'Xac nhan' }
    },

    // ================================================================
    //  SHOW — dung Ext.MessageBox.show
    // ================================================================

    /**
     * Hien thi dialog thong bao bang Ext.MessageBox.
     *
     * @param {Object} opts
     * @param {String}  [opts.type='info']       - success|error|warning|info|confirm
     * @param {String}  [opts.title]              - Tieu de (mac dinh tu label)
     * @param {String}  [opts.message='']         - Noi dung
     * @param {Function}[opts.onConfirm]          - Callback khi bam Yes/OK
     * @param {Function}[opts.onCancel]           - Callback khi bam No/Cancel
     * @param {Function}[opts.onClose]            - Callback khi dong (bat ky nut nao)
     */
    show: function (opts) {
        opts = opts || {};

        var me  = this;
        var type = opts.type || 'info';
        var cfg  = me._typeConfig[type] || me._typeConfig.info;

        // Buttons
        var buttons = (type === 'confirm') ? Ext.Msg.YESNO : Ext.Msg.OK;

        // Icon
        var iconMap = {
            success: Ext.Msg.INFO,
            error:   Ext.Msg.ERROR,
            warning: Ext.Msg.WARNING,
            info:    Ext.Msg.INFO,
            confirm: Ext.Msg.QUESTION
        };
        var icon = iconMap[type] || Ext.Msg.INFO;

        // Text
        var msgText = {
            success: 'Thanh cong',
            error:   'Loi',
            warning: 'Canh bao',
            info:    'Thong tin',
            confirm: 'Xac nhan'
        };

        Ext.MessageBox.show({
            title: opts.title || msgText[type] || 'Thong bao',
            message: opts.message || '',
            buttons: buttons,
            icon: icon,
            fn: function (btn) {
                if (type === 'confirm') {
                    if (btn === 'yes' && Ext.isFunction(opts.onConfirm)) {
                        opts.onConfirm();
                    } else if (btn === 'no' && Ext.isFunction(opts.onCancel)) {
                        opts.onCancel();
                    }
                } else {
                    if (Ext.isFunction(opts.onConfirm)) {
                        opts.onConfirm();
                    }
                }
                if (Ext.isFunction(opts.onClose)) {
                    opts.onClose(btn);
                }
            }
        });
    },

    // ================================================================
    //  SHOW CUSTOM — dung Ext.window.Window (grid, autoClose, customHtml)
    // ================================================================

    /**
     * Hien thi dialog tuy chinh voi grid, autoClose, customHtml.
     *
     * @param {Object} opts
     * @param {String}  [opts.type='info']       - success|error|warning|info|confirm
     * @param {String}  [opts.title]              - Tieu de
     * @param {String}  [opts.message='']         - Noi dung
     * @param {Boolean} [opts.showGrid=false]     - Hien grid
     * @param {Array}   [opts.gridColumns=[]]     - Columns grid
     * @param {Array}   [opts.gridData=[]]        - Data grid
     * @param {Object}  [opts.gridStore]          - Store custom cho grid
     * @param {String}  [opts.customHtml=null]    - HTML tuy chinh body
     * @param {Number}  [opts.autoClose=0]        - Tu dong dong (ms)
     * @param {String}  [opts.confirmText='Dong'] - Text nut xac nhan
     * @param {String}  [opts.cancelText='Huy']   - Text nut huy
     * @param {Function}[opts.onConfirm]          - Callback xac nhan
     * @param {Function}[opts.onCancel]           - Callback huy
     * @param {Number}  [opts.width=480]          - Chieu rong
     * @return {Ext.window.Window}
     */
    showCustom: function (opts) {
        opts = opts || {};

        var me  = this;
        var type = opts.type || 'info';
        var cfg  = me._typeConfig[type] || me._typeConfig.info;
        var needConfirm = (type === 'confirm' || Ext.isFunction(opts.onConfirm));

        var win = Ext.create('Ext.window.Window', {
            title: opts.title || cfg.label || 'Thong bao',
            width: opts.width || 480,
            bodyStyle: 'background-color: var(--theme-bg-card, #ffffff);',
            padding: 0,
            layout: { type: 'fit' },
            draggable: true,
            buttons: me._buildButtons(needConfirm, opts),
            items: [me._buildBody(opts, cfg)],
            listeners: {
                close: function () {
                    if (win._autoCloseTask) {
                        win._autoCloseTask.cancel();
                        win._autoCloseTask = null;
                    }
                }
            }
        });

        if (opts.autoClose > 0) {
            win._autoCloseTask = new Ext.util.DelayedTask(function () {
                if (win && !win.isDestroyed) {
                    win.close();
                }
            });
            win.on('afterrender', function () {
                win._autoCloseTask.delay(opts.autoClose);
            });
        }

        win.show();
        return win;
    },

    // ================================================================
    //  PRIVATE
    // ================================================================

    /** @private */
    _buildButtons: function (needConfirm, opts) {
        if (!needConfirm) {
            return [{
                text: 'Dong',
                ui: 'soft-blue',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }];
        }
        return [
            {
                text: opts.cancelText || 'Huy',
                ui: 'soft-red',
                handler: function (btn) {
                    var win = btn.up('window');
                    win.close();
                    if (Ext.isFunction(opts.onCancel)) {
                        opts.onCancel();
                    }
                }
            },
            {
                text: opts.confirmText || 'Dong',
                ui: 'soft-blue',
                handler: function (btn) {
                    var win = btn.up('window');
                    win.close();
                    if (Ext.isFunction(opts.onConfirm)) {
                        opts.onConfirm();
                    }
                }
            }
        ];
    },

    /** @private */
    _buildBody: function (opts, cfg) {
        var items = [];

        if (opts.customHtml) {
            items.push({ xtype: 'component', html: opts.customHtml });
            return { xtype: 'container', items: items };
        }

        // Icon + message
        items.push({
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            padding: '24 24 16 24',
            items: [
                {
                    xtype: 'component',
                    width: 48,
                    html: '<div style="font-size:36px;line-height:48px;text-align:center;color:' + cfg.color + ';">' +
                        '<i class="' + cfg.iconCls + '"></i></div>'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: { type: 'vbox', pack: 'center' },
                    style: 'margin-left:12px;',
                    items: [{
                        xtype: 'component',
                        html: '<div style="font-size:15px;font-weight:600;color:var(--theme-text-primary, #1e293b);line-height:1.5;">' +
                            Ext.htmlEncode(opts.message || '') + '</div>'
                    }]
                }
            ]
        });

        // Grid
        if (opts.showGrid && opts.gridData && opts.gridData.length > 0) {
            var columns = opts.gridColumns || [
                { text: 'STT', dataIndex: 'stt', width: 50 },
                { text: 'Noi dung', dataIndex: 'noiDung', flex: 1 }
            ];

            var gridStore = opts.gridStore;
            if (!gridStore) {
                var fields = [];
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataIndex) {
                        fields.push(columns[i].dataIndex);
                    }
                }
                gridStore = { fields: fields.length > 0 ? fields : ['stt', 'noiDung'], data: opts.gridData };
            }

            items.push({
                xtype: 'grid',
                margin: '0 16 16 16',
                maxHeight: 280,
                scrollable: 'y',
                viewConfig: { stripeRows: true },
                columns: columns,
                store: gridStore
            });
        }

        return { xtype: 'container', layout: { type: 'vbox', align: 'stretch' }, items: items };
    }
});
