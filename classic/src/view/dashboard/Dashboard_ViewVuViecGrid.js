Ext.define('DEMO.view.dashboard.Dashboard_ViewVuViecGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_ViewVuViecGrid',

    title: 'DANH SÁCH VỤ VIỆC THEO DÕI',
    header: {
        titleAlign: 'left',
        cls: 'dash-panel-header'
    },
    minHeight: 280,
    bind: {
        store: '{vuViecGridStore}'
    },
    bodyStyle: {
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    },
    margin: '0 0 15 0',
    columns: [
        { text: 'STT', dataIndex: 'stt', width: 50, align: 'center' },
        { text: 'Mã vụ việc', dataIndex: 'maVuViec', width: 120, align: 'center', style: 'font-weight: bold;' },
        { text: 'Nguồn tin/Loại vụ việc', dataIndex: 'nguonTin', flex: 2 },
        { text: 'Đơn vị thụ lý', dataIndex: 'donVi', width: 120, align: 'center' },
        { text: 'Điều tra viên', dataIndex: 'dieuTraVien', width: 150 },
        {
            text: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 160,
            renderer: function (value) {
                var color = '#475569';
                if (value.indexOf('Đang xác minh') > -1) color = '#3b82f6';
                else if (value.indexOf('Sắp hết hạn') > -1) color = '#f97316';
                else if (value.indexOf('Đã quá hạn') > -1) color = '#ef4444';
                else if (value.indexOf('Khởi tố') > -1 && value.indexOf('Không') === -1) color = '#6366f1';
                else if (value.indexOf('Không khởi tố') > -1) color = '#0d9488';
                else if (value.indexOf('Tạm đình chỉ') > -1) color = '#64748b';
                return '<span style="color: ' + color + '; font-weight: 700;">' + value + '</span>';
            }
        },
        { text: 'Hạn xác minh', dataIndex: 'hanXacMinh', width: 120, align: 'center' },
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
        { text: 'Kết quả dự kiến', dataIndex: 'ketQuaDuKien', width: 140, align: 'center' },
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
