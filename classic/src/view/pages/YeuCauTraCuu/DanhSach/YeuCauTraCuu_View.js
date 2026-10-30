Ext.define('DEMO.view.pages.YeuCauTraCuu.DanhSach.YeuCauTraCuu_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'YeuCauTraCuu_View',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.DanhSach.YeuCauTraCuu_ViewController',
        'DEMO.view.pages.YeuCauTraCuu.DanhSach.YeuCauTraCuu_ViewModel'
    ],

    controller: 'yeucautracuu',
    viewModel: 'yeucautracuu',

    cls: 'dash-card',
    header: false,
    bind: {
        store: '{ticketGridStore}'
    },

    columns: [
        {
            text: 'STT',
            xtype: 'rownumberer',
            width: 55,
            align: 'center'
        },
        {
            text: 'Mã phiếu',
            dataIndex: 'maPhieu',
            width: 170,
            renderer: function (val) {
                return '<span style="font-weight: 700; color: #0f5c8c; cursor: pointer;">' + Ext.util.Format.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'Người được tra cứu',
            dataIndex: 'hoTen',
            flex: 1,
            minWidth: 180,
            renderer: function (val, meta, rec) {
                return '<div><strong style="color: #1e293b;">' + Ext.util.Format.htmlEncode(val) + '</strong>' +
                    '<div style="font-size: 11px; color: #64748b;">Mã: ' + rec.get('maNguoi') + '</div></div>';
            }
        },
        {
            text: 'Số CCCD',
            dataIndex: 'cccd',
            width: 140,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Loại tra cứu',
            dataIndex: 'loaiTraCuu',
            width: 180,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Mức độ ưu tiên',
            dataIndex: 'mucDoUuTien',
            width: 130,
            align: 'center',
            renderer: function (val) {
                if (val === 'Hoả tốc') {
                    return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #fee2e2; color: #b91c1c; font-weight: 700; font-size: 12px;">Hoả tốc</span>';
                }
                if (val === 'Khẩn') {
                    return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #ffedd5; color: #c2410c; font-weight: 600; font-size: 12px;">Khẩn</span>';
                }
                return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #f1f5f9; color: #475569; font-weight: 500; font-size: 12px;">Thường</span>';
            }
        },
        {
            text: 'Ngày yêu cầu',
            dataIndex: 'ngayYeuCau',
            width: 115,
            align: 'center',
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Đơn vị yêu cầu',
            dataIndex: 'donViYeuCau',
            width: 200,
            renderer: Ext.util.Format.htmlEncode
        },
        {
            text: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 130,
            align: 'center',
            renderer: function (val) {
                if (val === 'Hoàn thành') {
                    return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #dcfce7; color: #15803d; font-weight: 600; font-size: 12px;"><i class="x-fa fa-check" style="margin-right: 4px;"></i>Hoàn thành</span>';
                }
                if (val === 'Đang xử lý') {
                    return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #fef9c3; color: #a16207; font-weight: 600; font-size: 12px;"><i class="x-fa fa-clock-o" style="margin-right: 4px;"></i>Đang xử lý</span>';
                }
                return '<span style="display:inline-block; padding: 3px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; font-weight: 600; font-size: 12px;"><i class="x-fa fa-plus-circle" style="margin-right: 4px;"></i>Mới tạo</span>';
            }
        },
        {
            text: 'Thao tác',
            xtype: 'actioncolumn',
            width: 90,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'Xem chi tiết & mã QR',
                    handler: 'onViewDetail'
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Xoá yêu cầu',
                    handler: 'onDeleteTicket'
                }
            ]
        }
    ],

    dockedItems: [
        // Toolbar Top: Bộ lọc + Nút Thêm mới
        {
            xtype: 'toolbar',
            dock: 'top',
            padding: '14 16',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<span style="font-size: 16px; font-weight: 700; color: #1e293b; margin-right: 16px;"><i class="x-fa fa-list-alt" style="color: #0f5c8c; margin-right: 8px;"></i>Yêu cầu tra cứu</span>'
                },
                {
                    xtype: 'textfield',
                    width: 240,
                    emptyText: 'Tìm theo mã phiếu, họ tên, CCCD...',
                    bind: '{filters.keyword}',
                    triggers: {
                        clear: {
                            cls: 'x-fa fa-times',
                            weight: 1,
                            handler: function () {
                                this.setValue('');
                            }
                        }
                    },
                    listeners: {
                        change: 'onSearch'
                    }
                },
                {
                    xtype: 'combobox',
                    width: 180,
                    margin: '0 0 0 10',
                    emptyText: 'Loại tra cứu: Tất cả',
                    editable: false,
                    store: [
                        'Tra cứu lịch sử vi phạm',
                        'Tra cứu nhân thân',
                        'Tra cứu tài sản',
                        'Tra cứu khác'
                    ],
                    bind: '{filters.loaiTraCuu}',
                    listeners: {
                        change: 'onSearch'
                    }
                },
                {
                    xtype: 'combobox',
                    width: 140,
                    margin: '0 0 0 10',
                    emptyText: 'Ưu tiên: Tất cả',
                    editable: false,
                    store: ['Thường', 'Khẩn', 'Hoả tốc'],
                    bind: '{filters.mucDoUuTien}',
                    listeners: {
                        change: 'onSearch'
                    }
                },
                {
                    xtype: 'combobox',
                    width: 140,
                    margin: '0 0 0 10',
                    emptyText: 'Trạng thái: Tất cả',
                    editable: false,
                    store: ['Mới tạo', 'Đang xử lý', 'Hoàn thành'],
                    bind: '{filters.trangThai}',
                    listeners: {
                        change: 'onSearch'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Đặt lại bộ lọc',
                    margin: '0 0 0 8',
                    handler: 'onReset'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Thêm mới',
                    iconCls: 'x-fa fa-plus',
                    scale: 'medium',
                    cls: 'pyc-btn-primary',
                    style: {
                        backgroundColor: '#0f5c8c',
                        borderRadius: '6px',
                        padding: '6px 16px'
                    },
                    handler: 'onAddNewTicket'
                }
            ]
        },
        // Paging Toolbar Bottom
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            bind: {
                store: '{ticketGridStore}'
            },
            displayInfo: true,
            displayMsg: 'Hiển thị {0} - {1} trên tổng số {2} yêu cầu',
            emptyMsg: 'Không có yêu cầu tra cứu nào'
        }
    ]
});
