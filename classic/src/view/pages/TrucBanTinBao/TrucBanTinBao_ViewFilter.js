Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewFilter', {
    extend: 'Ext.container.Container',
    xtype: 'TrucBanTinBao_ViewFilter',

    cls: 'dash-card',
    margin: '12 0 0 0',
    padding: '12 16',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                margin: '0 8 0 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cboProvince',
                    fieldLabel: 'Tỉnh / Thành phố',
                    emptyText: 'Tất cả tỉnh/thành',
                    flex: 1,
                    minWidth: 150,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{provinceStore}',
                        value: '{timKiemNangCao.province}'
                    },
                    listeners: {
                        select: 'onProvinceChange'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cboXa',
                    fieldLabel: 'Xã / Phường',
                    emptyText: 'Tất cả xã/phường',
                    flex: 1,
                    minWidth: 150,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{xaStore}',
                        value: '{timKiemNangCao.xa}'
                    },
                    listeners: {
                        select: 'onXaChange'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cboUnit',
                    fieldLabel: 'Đơn vị nghiệp vụ',
                    emptyText: 'Tất cả đơn vị',
                    flex: 1,
                    minWidth: 150,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{unitStore}',
                        value: '{timKiemNangCao.unit}'
                    },
                    listeners: {
                        select: 'onUnitChange'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cboStatus',
                    fieldLabel: 'Trạng thái đề xuất',
                    emptyText: 'Tất cả trạng thái',
                    flex: 1,
                    minWidth: 150,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{statusStore}',
                        value: '{timKiemNangCao.status}'
                    },
                    listeners: {
                        select: 'onStatusChange'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Làm mới bộ lọc',
                    iconCls: 'x-fa fa-undo',
                    ui: 'soft-blue',
                    height: 32,
                    margin: '18 0 0 4',
                    handler: 'onResetFilter'
                }
            ]
        },
        {
            xtype: 'container',
            margin: '8 0 0 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                margin: '0 8 0 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cboCrimeGroup',
                    fieldLabel: 'Nhóm tội phạm (Chương BLHS)',
                    emptyText: 'Tất cả nhóm tội phạm',
                    flex: 1,
                    minWidth: 260,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{crimeGroupStore}',
                        value: '{timKiemNangCao.crimeGroup}'
                    },
                    listeners: {
                        select: 'onCrimeGroupChange'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cboOffense',
                    fieldLabel: 'Tội danh (Điều luật BLHS)',
                    emptyText: 'Tất cả tội danh',
                    flex: 1.5,
                    minWidth: 320,
                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    editable: false,
                    bind: {
                        store: '{offenseStore}',
                        value: '{timKiemNangCao.offense}'
                    },
                    listeners: {
                        select: 'onOffenseChange'
                    }
                }
            ]
        },
        {
            xtype: 'component',
            margin: '8 0 0 0',
            bind: {
                html: '<div style="font-size:12.5px; color:var(--theme-text-secondary, #64748b); padding:4px 2px; display:flex; align-items:center; gap:6px;">' +
                    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent, #1c5cab); flex:none;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
                    '<span>{entitySummary}</span>' +
                    '</div>'
            }
        }
    ]
});
