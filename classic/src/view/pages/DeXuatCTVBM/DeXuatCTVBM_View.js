Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_View', {
    extend: 'Ext.container.Container',
    xtype: 'DeXuatCTVBM_View',

    controller: 'dexuatctvbm',
    viewModel: 'dexuatctvbm',

    requires: [
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewController',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewModel',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewFormChung',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewGridTraCuu',
        'Ext.toolbar.Spacer'
    ],

    cls: 'dash-page padding5',
    scrollable: 'y',
    padding: '16 20 24 20',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        // ================= 1. PAGE HEADER COMMAND BAR =================
        {
            xtype: 'container',
            cls: 'dash-card',
            margin: '0 0 12 0',
            padding: '8 14',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                // Khối bên trái: Indicator xanh + Icon tùy chọn + Tiêu đề trang
                {
                    xtype: 'component',
                    html: '<div style="display:flex; align-items:center; gap:8px;">' +
                            '<span style="width:4px; height:18px; background-color:#1b6b44; border-radius:2px; display:inline-block;"></span>' +
                            '<span style="color:#64748b; font-size:13px; cursor:pointer;" title="Tùy chọn hệ thống"><i class="x-fa fa-ellipsis-v"></i></span>' +
                            '<span style="font-size:12px; font-weight:700; color:#1e293b; letter-spacing:0.5px; text-transform:uppercase;">THÔNG TIN CHI TIẾT ĐỀ XUẤT XÂY DỰNG CTVBM</span>' +
                          '</div>'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                // Khối bên phải: Icons tiện ích + Thông tin người dùng + Đăng xuất
                {
                    xtype: 'component',
                    html: '<div style="display:flex; align-items:center; gap:12px; color:#64748b; font-size:13px;">' +
                            '<span style="cursor:pointer;" title="Trợ giúp"><i class="x-fa fa-question-circle"></i></span>' +
                            '<span style="cursor:pointer;" title="Tin nhắn"><i class="x-fa fa-envelope-o"></i></span>' +
                            '<span style="cursor:pointer;" title="Ghi chú"><i class="x-fa fa-pencil-square-o"></i></span>' +
                            '<span style="cursor:pointer; color:#94a3b8;" title="Yêu thích"><i class="x-fa fa-star"></i></span>' +
                            '<span style="width:1px; height:16px; background-color:#cbd5e1; margin:0 4px;"></span>' +
                            '<div style="display:flex; align-items:center; gap:6px; cursor:pointer;" title="Thông tin người dùng">' +
                                '<div style="width:22px; height:22px; border-radius:50%; background-color:#1b6b44; color:#fff; font-weight:700; font-size:11px; display:flex; align-items:center; justify-content:center;">P</div>' +
                                '<span style="font-size:11.5px; font-weight:500; color:#1e293b;">Vũ Tiến Phúc</span>' +
                                '<i class="x-fa fa-chevron-down" style="font-size:9px; color:#64748b;"></i>' +
                            '</div>' +
                            '<span style="width:1px; height:16px; background-color:#cbd5e1; margin:0 4px;"></span>' +
                            '<span style="cursor:pointer; color:#ef4444;" title="Đăng xuất"><i class="x-fa fa-power-off"></i></span>' +
                          '</div>'
                }
            ]
        },

        // ================= 2. FORM THÔNG TIN CHUNG (R2) =================
        {
            xtype: 'DeXuatCTVBM_ViewFormChung',
            reference: 'formThongTinChung',
            margin: '0 0 12 0'
        },

        // ================= 3. GRID YÊU CẦU TRA CỨU & ACTION BAR (R3) =================
        {
            xtype: 'DeXuatCTVBM_ViewGridTraCuu',
            reference: 'gridYeuCauTraCuu',
            flex: 1
        }
    ]
});
