Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewGridTraCuu', {
    extend: 'Ext.grid.Panel',
    xtype: 'DeXuatCTVBM_ViewGridTraCuu',

    reference: 'gridYeuCauTraCuu',
    cls: 'dash-card',

    requires: [
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.button.Button',
        'Ext.util.Format'
    ],

    minHeight: 280,

    bind: {
        store: '{yeuCauTraCuuGridStore}'
    },

    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true,
        deferEmptyText: false,
        emptyText: '<div style="text-align: center; padding: 36px 0; color: #9ca3af; font-style: italic; font-size: 11.5px;">Không có dữ liệu</div>'
    },

    listeners: {
        cellclick: 'onGridCellClick'
    },

    dockedItems: [
        // ==================== 1. TOP TOOLBAR ====================
        {
            xtype: 'toolbar',
            dock: 'top',
            padding: '8 14',
            style: {
                backgroundColor: '#f8faf9',
                borderBottom: '1px solid #e2e8f0'
            },
            items: [
                {
                    xtype: 'component',
                    reference: 'lblTongSoYeuCau',
                    cls: 'total-counter-text',
                    style: {
                        fontSize: '11.5px',
                        color: '#64748b',
                        fontStyle: 'italic'
                    },
                    bind: {
                        html: 'Tổng số yêu cầu: <b style="color: #065f46; font-weight: 700;">{totalYCTC}</b>'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: '+ Thêm mới',
                    iconCls: 'x-fa fa-plus',
                    ui: 'soft-green',
                    style: {
                        backgroundColor: '#1b6b44',
                        borderColor: '#1b6b44',
                        color: '#ffffff',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '4px 12px'
                    },
                    handler: 'onOpenModalChonNguoi'
                }
            ]
        },

        // ==================== 2. BOTTOM ACTION BAR ====================
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: '8 16',
            style: {
                backgroundColor: '#d2ded8',
                borderTop: '1px solid #b8c9c1'
            },
            items: [
                // Left Dock: Gửi phản ánh, góp ý
                {
                    xtype: 'button',
                    text: 'Gửi phản ánh, góp ý',
                    ui: 'soft-red',
                    style: {
                        backgroundColor: '#7c1c24',
                        borderColor: '#7c1c24',
                        color: '#ffffff',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '4px 14px'
                    },
                    handler: 'onGuiPhanAnh'
                },
                '->',
                // Center Dock: Lưu, Hoàn thành, Đóng
                {
                    xtype: 'button',
                    text: 'Lưu',
                    ui: 'soft-green',
                    margin: '0 4',
                    style: {
                        backgroundColor: '#1b6b44',
                        borderColor: '#1b6b44',
                        color: '#ffffff',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '4px 16px'
                    },
                    handler: 'onLuu'
                },
                {
                    xtype: 'button',
                    text: 'Hoàn thành',
                    ui: 'soft-cyan',
                    margin: '0 4',
                    style: {
                        backgroundColor: '#0b7f8c',
                        borderColor: '#0b7f8c',
                        color: '#ffffff',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '4px 14px'
                    },
                    handler: 'onHoanThanh'
                },
                {
                    xtype: 'button',
                    text: 'Đóng',
                    ui: 'soft-red',
                    margin: '0 4',
                    style: {
                        backgroundColor: '#ba2323',
                        borderColor: '#ba2323',
                        color: '#ffffff',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '4px 16px'
                    },
                    handler: 'onDong'
                },
                '->',
                // Right Dock: Balance Spacer
                {
                    xtype: 'tbspacer',
                    width: 140
                }
            ]
        }
    ],

    columns: [
        // 1. STT
        {
            xtype: 'rownumberer',
            text: 'STT',
            width: 50,
            align: 'center'
        },

        // 2. Mã yêu cầu (Hyperlink)
        {
            text: 'Mã yêu cầu',
            dataIndex: 'maYC',
            width: 140,
            align: 'left',
            renderer: function (val) {
                if (!val) {
                    return '-';
                }
                return '<a href="javascript:void(0);" class="grid-link-mayc" style="color: #1b6b44; font-weight: 700; text-decoration: underline; cursor: pointer;" title="Xem chi tiết ' +
                    Ext.util.Format.htmlEncode(val) + '">' +
                    Ext.util.Format.htmlEncode(val) + '</a>';
            }
        },

        // 3. Đơn vị yêu cầu
        {
            text: 'Đơn vị yêu cầu',
            dataIndex: 'donViYC',
            flex: 1,
            minWidth: 160,
            align: 'left',
            renderer: Ext.util.Format.htmlEncode
        },

        // 4. Đơn vị hồ sơ
        {
            text: 'Đơn vị hồ sơ',
            dataIndex: 'donViHS',
            flex: 1,
            minWidth: 160,
            align: 'left',
            renderer: Ext.util.Format.htmlEncode
        },

        // 5. Mục đích yêu cầu
        {
            text: 'Mục đích yêu cầu',
            dataIndex: 'mucDich',
            flex: 1.2,
            minWidth: 140,
            align: 'left',
            renderer: function (val, meta) {
                if (val) {
                    meta.tdAttr = 'data-qtip="' + Ext.util.Format.htmlEncode(val) + '"';
                    return Ext.util.Format.htmlEncode(val);
                }
                return '-';
            }
        },

        // 6. Ngày tạo
        {
            text: 'Ngày tạo',
            dataIndex: 'ngayTao',
            width: 100,
            align: 'center',
            renderer: Ext.util.Format.htmlEncode
        },

        // 7. Ngày nhận kết quả
        {
            text: 'Ngày nhận kết quả',
            dataIndex: 'ngayNhan',
            width: 120,
            align: 'center',
            renderer: function (val) {
                return val ? Ext.util.Format.htmlEncode(val) : '-';
            }
        },

        // 8. Trạng thái (Pill Badges)
        {
            text: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 130,
            align: 'center',
            renderer: function (val) {
                let bg = '#e0f2fe';
                let border = '#bae6fd';
                let color = '#0369a1';
                let text = val || 'Chưa xác định';

                if (val === 'Chờ tiếp nhận') {
                    bg = '#fef3c7';
                    border = '#fcd34d';
                    color = '#78350f';
                } else if (val === 'Tạo mới') {
                    bg = '#d1fae5';
                    border = '#6ee7b7';
                    color = '#104e38';
                } else if (val === 'Đã duyệt') {
                    bg = '#ccfbf1';
                    border = '#99f6e4';
                    color = '#115e59';
                } else if (val === 'Từ chối') {
                    bg = '#fee2e2';
                    border = '#fca5a5';
                    color = '#991b1b';
                }

                return '<span style="display:inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; background-color: ' +
                    bg + '; border: 1px solid ' + border + '; color: ' + color + ';">' +
                    Ext.util.Format.htmlEncode(text) + '</span>';
            }
        },

        // 9. Lý do từ chối
        {
            text: 'Lý do từ chối',
            dataIndex: 'lyDo',
            width: 130,
            align: 'left',
            renderer: function (val) {
                if (!val || val === '-') {
                    return '<span style="color: #9ca3af; font-style: italic;">-</span>';
                }
                return '<span style="color: #6b7280; font-style: italic;">' + Ext.util.Format.htmlEncode(val) + '</span>';
            }
        },

        // 10. Thao tác (Action Column)
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 70,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Xóa',
                    iconStyle: 'color: #dc2626; cursor: pointer; font-size: 13px;',
                    handler: 'onDeleteRowYCTC'
                }
            ]
        }
    ]
});
