Ext.define('DEMO.view.dashboard.Dashboard_ViewVuAnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_ViewVuAnGrid',

    title: 'DANH SÁCH VỤ ÁN THEO DÕI',
    header: {
        titleAlign: 'left',
        cls: 'dash-panel-header'
    },
    minHeight: 280,
    bind: {
        store: '{vuAnGridStore}'
    },
    bodyStyle: {
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    },
    margin: '0 0 15 0',
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 50, align: 'center' },
        { text: 'Mã vụ án', dataIndex: 'maVuAn', width: 120, align: 'center', style: 'font-weight: bold;' },
        { text: 'Tên vụ án', dataIndex: 'tenVuAn', flex: 2 },
        { text: 'Đơn vị thụ lý', dataIndex: 'donVi', width: 120, align: 'center' },
        { text: 'Điều tra viên chính', dataIndex: 'dieuTraVien', width: 150 },
        { text: 'Giai đoạn', dataIndex: 'giaiDoan', width: 150 },
        {
            text: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 140,
            renderer: function (value) {
                var color = '#475569';
                if (value === 'Đang điều tra') color = '#10b981';
                else if (value === 'Sắp hết hạn') color = '#f97316';
                else if (value === 'Đã quá hạn') color = '#ef4444';
                else if (value === 'Kết luận điều tra') color = '#3b82f6';
                else if (value === 'Tạm đình chỉ') color = '#8b5cf6';
                return '<span style="color: ' + color + '; font-weight: 700;">' + value + '</span>';
            }
        },
        { text: 'Hạn điều tra', dataIndex: 'hanDieuTra', width: 120, align: 'center' },
        {
            text: 'Số ngày còn lại',
            dataIndex: 'soNgayConLai',
            width: 120,
            align: 'center',
            renderer: function (value) {
                if (value === null || value === undefined || isNaN(value)) return '-';
                var color = value < 0 ? '#ef4444' : (value <= 10 ? '#f97316' : '#0f172a');
                return '<span style="color: ' + color + '; font-weight: 600;">' + value + ' ngày</span>';
            }
        },
        {
            text: 'Cảnh báo',
            dataIndex: 'canhBao',
            width: 130,
            align: 'center',
            renderer: function (value) {
                if (!value) return '';
                var bgColor = value === 'Quá hạn' ? '#fef2f2' : '#fff7ed';
                var textColor = value === 'Quá hạn' ? '#ef4444' : '#f97316';
                return '<span style="background: ' + bgColor + '; color: ' + textColor + '; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;">' + value + '</span>';
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Thao tác',
            width: 100,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'Xem chi tiết',
                    handler: 'onRowView',
                    style: 'margin-right: 8px; color: #3b82f6; cursor: pointer;'
                },
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Chỉnh sửa',
                    handler: 'onRowEdit',
                    style: 'margin-right: 8px; color: #10b981; cursor: pointer;'
                },
                {
                    iconCls: 'x-fa fa-ellipsis-v',
                    tooltip: 'Lựa chọn khác',
                    handler: 'onRowMore',
                    style: 'color: #64748b; cursor: pointer;'
                }
            ]
        }
    ],
    bbar: {
        xtype: 'toolbar',
        cls: 'dash-toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Xem tất cả →',
                ui: 'link',
                style: {
                    color: '#1d4ed8',
                    fontWeight: '600'
                },
                handler: 'onViewAll'
            }
        ]
    }
});
