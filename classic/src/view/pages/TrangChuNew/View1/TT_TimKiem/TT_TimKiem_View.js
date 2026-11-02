Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View', {
    extend: 'Ext.form.Panel',
    xtype: 'TT_TimKiem_View',
    requires: [
        'Ext.form.field.Tag',
        'Ext.form.field.Date',
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_ViewController',
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_ViewModel'
    ],
    controller: 'tt_timkiem',
    viewModel: 'tt_timkiem',
    cls: 'tt-tim-kiem tcn-filter padding5 dash-card',
    bodyCls: 'tcn-filter-body',
    border: false,
    layout: 'auto',
    listeners: { afterrender: 'onSearchReady' },
    items: [
        {
            xtype: 'tagfield',
            itemId: 'thoiGian_IdView',
            name: 'thoiGian',
            fieldLabel: 'Thời gian',
            displayField: 'ten',
            valueField: 'ma',
            multiSelect: false,
            grow: false,
            editable: false,
            selectOnFocus: false,
            allowBlank: false,
            cls: 'field-csstyle required',
            bind: { store: '{thoiGianStore}', value: '{timKiemNangCao.thoiGian}' },
            listeners: { change: 'onPeriodChange' }
        },
        {
            xtype: 'datefield',
            itemId: 'tuNgay_IdView',
            name: 'tuNgay',
            fieldLabel: 'Từ ngày',
            allowBlank: false,
            cls: 'field-csstyle required',
            bind: { value: '{timKiemNangCao.tuNgay}' },
            listeners: { change: 'onDateChange' }
        },
        {
            xtype: 'datefield',
            itemId: 'denNgay_IdView',
            name: 'denNgay',
            fieldLabel: 'Đến ngày',
            allowBlank: false,
            cls: 'field-csstyle required',
            bind: { value: '{timKiemNangCao.denNgay}' },
            listeners: { change: 'onDateChange' }
        },
        {
            xtype: 'tagfield',
            itemId: 'donVi_IdView',
            name: 'donVi',
            fieldLabel: 'Đơn vị',
            displayField: 'ten',
            valueField: 'ma',
            emptyText: 'Toàn quốc',
            filterPickList: true,
            grow: false,
            bind: { store: '{donViStore}', value: '{timKiemNangCao.donVi}' }
        },
        {
            xtype: 'tagfield',
            itemId: 'cucTinh_IdView',
            name: 'cucTinh',
            fieldLabel: 'Cục/Tỉnh',
            displayField: 'ten',
            valueField: 'ma',
            emptyText: 'Chọn Cục/Tỉnh',
            filterPickList: true,
            grow: false,
            bind: { store: '{cucTinhStore}', value: '{timKiemNangCao.cucTinh}' }
        },
        {
            xtype: 'tagfield',
            itemId: 'loaiHoSo_IdView',
            name: 'loaiHoSo',
            fieldLabel: 'Loại hồ sơ',
            displayField: 'ten',
            valueField: 'ma',
            emptyText: 'Tất cả',
            filterPickList: true,
            grow: false,
            bind: { store: '{loaiHoSoStore}', value: '{timKiemNangCao.loaiHoSo}' }
        },
        {
            xtype: 'tagfield',
            itemId: 'heLucLuong_IdView',
            name: 'heLucLuong',
            fieldLabel: 'Hệ lực lượng',
            displayField: 'ten',
            valueField: 'ma',
            emptyText: 'Tất cả',
            filterPickList: true,
            grow: false,
            bind: { store: '{heLucLuongStore}', value: '{timKiemNangCao.heLucLuong}' }
        },
        {
            xtype: 'tagfield',
            itemId: 'tinhTrang_IdView',
            name: 'tinhTrang',
            fieldLabel: 'Tình trạng hồ sơ',
            displayField: 'ten',
            valueField: 'ma',
            emptyText: 'Tất cả',
            filterPickList: true,
            grow: false,
            bind: { store: '{tinhTrangStore}', value: '{timKiemNangCao.tinhTrang}' }
        },
        {
            xtype: 'button',
            itemId: 'timKiem_IdView',
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            width: 112,
            handler: 'onSearch'
        }
    ]
});
