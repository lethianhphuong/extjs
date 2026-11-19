Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3', {
    extend: 'Ext.grid.Panel',
    xtype: 'DS_Hoso_GridView3',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Controller',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Model'
    ],
    controller: 'DS_Hoso_GridView3Controller',
    // ViewModel riêng: store dsHoSoStore + điều kiện tìm kiếm; view cha nghe sự kiện 'dshosoload' nếu cần biết kết quả tải
    viewModel: 'DS_Hoso_GridView3Model',
    // taiDanhSach: click biểu đồ (params, thongTin); resetDanhSach: view cha tải lại dữ liệu (mixin.resetDsHoSo)
    listeners: { taiDanhSach: 'onTaiDanhSach', resetDanhSach: 'onResetDanhSach' },
    cls: 'ds-hoso-grid3',
    // Ẩn cả card cho tới khi click biểu đồ và store có dữ liệu (xem controller.capNhatHienThi)
    hidden: true,
    minHeight: 260,
    maxHeight: 620,
    bind: { store: '{dsHoSoStore}' },
    emptyText: '<div class="ds-hoso-grid3-empty"><i class="x-fa fa-mouse-pointer"></i>Chọn một biểu đồ để xem danh sách hồ sơ</div>',
    viewConfig: {
        deferEmptyText: false,
        stripeRows: true,
        enableTextSelection: true
    },
    /**
     * Bộ cột riêng theo mã biểu đồ được click (maThongKe bỏ đuôi _LIST). Mã không khai báo ở đây dùng `columns`
     * mặc định bên dưới (danh sách hồ sơ). Controller.apDungBoCot đổi cột bằng reconfigure; bộ cột riêng ẩn thanh tìm kiếm.
     */
    boCotTheoMa: {
        // View6 — Kết quả công việc trực tiếp thực hiện
        D5_C05: {
            tieuDe: 'Danh sách công việc trực tiếp thực hiện',
            cot: [
                { xtype: 'rownumberer', text: 'STT', width: 64, align: 'center' },
                { text: 'Loại đề xuất', dataIndex: 'LOAI_DE_XUAT', flex: 1, minWidth: 180, renderer: 'renderText' },
                { text: 'Trạng thái', dataIndex: 'TRANG_THAI', width: 160, align: 'center', renderer: 'renderText' },
                { text: 'Ghi chú', dataIndex: 'GHI_CHU', flex: 1.5, minWidth: 220, renderer: 'renderText' },
                { text: 'Tên người ký duyệt', dataIndex: 'TEN_NGUOI_KY_DUYET', flex: 1, minWidth: 180, renderer: 'renderText' }
            ]
        },
        // View6 — Kết quả phạm vi quản lý (tạm thời chỉ có Họ tên)
        D5_C07: {
            tieuDe: 'Danh sách phạm vi quản lý',
            cot: [
                { xtype: 'rownumberer', text: 'STT', width: 64, align: 'center' },
                { text: 'Họ tên', dataIndex: 'HO_TEN', flex: 1, minWidth: 220, renderer: 'renderText' }
            ]
        }
    },
    columns: {
        defaults: { menuDisabled: true },
        items: [
            { text: 'STT', width: 64, align: 'center', xtype: 'rownumberer' },
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
        // Tiêu đề tự dựng (không dùng title/iconCls của panel vì Ext đo layout header theo icon 16px,
        // đổi kích thước bằng CSS sẽ làm chữ đè lên icon); style riêng trong DS_Hoso_GridView3.scss để dùng được ở mọi view
        xtype: 'component',
        dock: 'top',
        reference: 'dsHoSoHeader',
        cls: 'ds-hoso-grid3-header',
        // Tiêu đề đổi theo bộ cột (controller.apDungBoCot)
        data: { tieuDe: 'Danh sách hồ sơ' },
        tpl: '<div class="ds-hoso-grid3-title">' +
            '<span class="ds-hoso-grid3-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span>' +
            '<h3>{tieuDe:htmlEncode}</h3>' +
            '</div>'
    }, {
        // Thanh tìm kiếm trong danh sách (điều kiện bind vào timKiemNangCao); Enter ở ô bất kỳ để tìm
        xtype: 'container',
        dock: 'top',
        reference: 'dsHoSoFilter',
        cls: 'ds-hoso-grid3-filter padding5',
        layout: { type: 'hbox', align: 'end' },
        keyMap: { ENTER: 'onTimKiem' },
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Loại hồ sơ',
            emptyText: 'Tất cả',
            width: 180,
            displayField: 'ten',
            valueField: 'code',
            bind: { store: '{loaiHoSoCbbStore}', value: '{timKiemNangCao.loaiHoSo}' }
        }, {
            xtype: 'combobox',
            fieldLabel: 'Trạng thái',
            emptyText: 'Tất cả',
            width: 170,
            displayField: 'ten',
            valueField: 'code',
            bind: { store: '{trangThaiCbbStore}', value: '{timKiemNangCao.trangThai}' }
        }, {
            xtype: 'datefield',
            fieldLabel: 'Đưa vào quản lý từ ngày',
            width: 170,
            bind: { value: '{timKiemNangCao.tuNgay}', maxValue: '{timKiemNangCao.denNgay}' }
        }, {
            xtype: 'datefield',
            fieldLabel: 'Đến ngày',
            width: 150,
            bind: { value: '{timKiemNangCao.denNgay}', minValue: '{timKiemNangCao.tuNgay}' }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Tên đối tượng',
            emptyText: 'Nhập tên đối tượng...',
            flex: 1,
            minWidth: 180,
            bind: { value: '{timKiemNangCao.tenDoiTuong}' }
        }, {
            xtype: 'button',
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            cls: 'button-csstyle',
            margin: 5,
            handler: 'onTimKiem'
        }, {
            xtype: 'button',
            text: 'Làm mới',
            iconCls: 'x-fa fa-undo',
            cls: 'button-csstyle',
            margin: 5,
            handler: 'onLamMoi'
        }]
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
