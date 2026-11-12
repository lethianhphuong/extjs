Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3', {
    extend: 'Ext.grid.Panel',
    xtype: 'DS_Hoso_GridView3',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Controller'
    ],
    controller: 'DS_Hoso_GridView3Controller',
    // Sự kiện từ TrangChuNew3_ViewController khi click biểu đồ: (params, thongTin)
    listeners: { taiDanhSach: 'onTaiDanhSach' },
    // Không khai báo viewModel: dùng chung ViewModel của TrangChuNew3_View (store dsHoSoStore)
    cls: 'tcn3-card ds-hoso-grid3',
    minHeight: 260,
    maxHeight: 620,
    bind: { store: '{dsHoSoStore}' },
    emptyText: '<div class="ds-hoso-grid3-empty"><i class="x-fa fa-mouse-pointer"></i>Chọn một biểu đồ để xem danh sách hồ sơ</div>',
    viewConfig: {
        deferEmptyText: false,
        stripeRows: true,
        enableTextSelection: true
    },
    columns: {
        defaults: { menuDisabled: true },
        items: [
            { text: 'STT', width: 64, align: 'center', xtype: 'rownumberer', },
            {
                xtype: 'actioncolumn',
                text: 'Thao tác',
                width: 92,
                align: 'center',
                sortable: false,
                items: [{
                    iconCls: 'x-fa fa-eye ds-hoso-grid3-action',
                    tooltip: 'Xem chi tiết',
                    handler: 'onXemChiTiet'
                }]
            },
            { text: 'Loại hồ sơ', dataIndex: 'tenLoaiHoSo', width: 170, renderer: 'renderLoaiHoSo' },
            { xtype: 'datecolumn', text: 'Ngày đưa vào quản lý', dataIndex: 'ngayDuaVaoQuanLy', format: 'd/m/Y', width: 180, align: 'center', tdCls: 'ds-hoso-grid3-date' },
            { text: 'Trạng thái', dataIndex: 'trangThai', width: 160, align: 'center', renderer: 'renderTrangThai' },
            { text: 'Tên đối tượng', dataIndex: 'tenDoiTuong', flex: 1, minWidth: 220, renderer: 'renderTenDoiTuong' }
        ]
    },
    dockedItems: [{
        // Tiêu đề dùng chung mẫu header card của View3 (không dùng title/iconCls của panel
        // vì Ext đo layout header theo icon 16px, đổi kích thước bằng CSS sẽ làm chữ đè lên icon)
        xtype: 'component',
        dock: 'top',
        cls: 'tcn3-card-header ds-hoso-grid3-header',
        html: '<div class="tcn3-header-wrap">' +
            '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span>' +
            '<h3>Danh sách hồ sơ</h3>' +
            '</div>'
    }, {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        cls: 'ds-hoso-grid3-paging',
        bind: { store: '{dsHoSoStore}' },
        displayInfo: true,
        displayMsg: 'Hiển thị {0} - {1} / {2} hồ sơ',
        emptyMsg: 'Không có hồ sơ',
        beforePageText: 'Trang',
        afterPageText: '/ {0}',
        items: ['-', { xtype: 'tbtext', text: 'Số dòng/trang' }, {
            xtype: 'combobox',
            itemId: 'pageSizeCombo',
            cls: 'ds-hoso-grid3-pagesize',
            width: 72,
            editable: false,
            queryMode: 'local',
            value: 10,
            store: [5, 10, 20, 50],
            listeners: { select: 'onPageSizeChange' }
        }]
    }]
});
