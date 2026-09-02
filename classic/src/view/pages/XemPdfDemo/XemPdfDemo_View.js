Ext.define('DEMO.view.pages.XemPdfDemo.XemPdfDemo_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'XemPdfDemo_View',

    controller: 'xempdfdemo',
    viewModel: 'xempdfdemo',

    cls: 'dash-card',
    header: {
        title: 'Demo Xem PDF',
        titleAlign: 'left',
        cls: 'dash-panel-header'
    },

    bind: { store: '{sampleDocStore}' },

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        cls: 'dash-toolbar',
        items: [
            {
                xtype: 'textfield',
                reference: 'txtKeyword',
                emptyText: 'Nhập tên văn bản...',
                width: 260
            },
            {
                text: 'Tìm kiếm',
                iconCls: 'x-fa fa-search',
                ui: 'soft-blue',
                handler: 'onSearch'
            },
            '->',
            {
                text: 'Làm mới',
                iconCls: 'x-fa fa-refresh',
                handler: 'onRefresh'
            }
        ]
    }],

    columns: [
        {
            text: 'STT',
            dataIndex: 'stt',
            width: 60,
            align: 'center'
        },
        {
            text: 'Số văn bản',
            dataIndex: 'soVanBan',
            width: 150
        },
        {
            text: 'Tên văn bản',
            dataIndex: 'tenVanBan',
            flex: 1
        },
        {
            text: 'Ngày tạo',
            dataIndex: 'ngayTao',
            width: 120,
            align: 'center'
        },
        {
            text: 'Loại file',
            dataIndex: 'loaiFile',
            width: 100,
            align: 'center',
            renderer: function (v) {
                return '<span style="color:#e74c3c;font-weight:600;">PDF</span>';
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 120,
            align: 'center',
            sortable: false,
            menuDisable: true,
            items: [
                {
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'Xem PDF',
                    style: 'color:#3b82f6;',
                    handler: 'onViewPdf'
                },
                {
                    iconCls: 'x-fa fa-external-link-alt',
                    tooltip: 'Mở trong cửa sổ mới',
                    style: 'color:#22c55e;',
                    handler: 'onOpenInNewTab'
                }
            ]
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Hiển thị {0} - {1} của {2} văn bản',
        emptyMsg: 'Không có văn bản'
    }
});
