Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoSaBan.BanDoSaBan_View', {
    extend: 'Ext.container.Container',
    xtype: 'BanDoSaBan_View',
    controller: 'BanDoSaBan_ViewController',
    viewModel: 'BanDoSaBan_ViewModel',
    cls: 'bdsb-page',
    padding: 12,
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            cls: 'bdsb-hint',
            html: '<i class="x-fa fa-info-circle"></i> Sa bàn 3D vẽ bằng SVG, chạy trên mọi máy. Dùng các nút xoay, nghiêng để đổi góc nhìn; bấm vào một tỉnh để xem số liệu.'
        },
        {
            xtype: 'container',
            cls: 'bdsb-map-card',
            height: 600,
            margin: '8 0 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'container',
                    cls: 'bdsb-map-header',
                    height: 48,
                    layout: { type: 'hbox', align: 'middle' },
                    items: [
                        {
                            xtype: 'component',
                            flex: 1,
                            bind: {
                                html: '<div class="bdsb-sel {lopTinhDangChon}"><span class="bdsb-sel-dot"></span>' +
                                    '<div class="bdsb-sel-text"><div class="bdsb-sel-name">{tieuDeTinh}</div>' +
                                    '<div class="bdsb-sel-meta">{moTaTinh}</div></div></div>'
                            }
                        },
                        {
                            xtype: 'component',
                            cls: 'bdsb-legend',
                            margin: '0 12 0 0',
                            html: '<span class="bdsb-legend-label">Thấp</span><span class="bdsb-legend-bar"></span><span class="bdsb-legend-label">Cao</span>'
                        },
                        {
                            xtype: 'button',
                            cls: 'bdsb-btn',
                            iconCls: 'x-fa fa-rotate-left',
                            tooltip: 'Xoay trái',
                            handler: 'onXoayTrai'
                        },
                        {
                            xtype: 'button',
                            cls: 'bdsb-btn',
                            iconCls: 'x-fa fa-rotate-right',
                            tooltip: 'Xoay phải',
                            margin: '0 0 0 6',
                            handler: 'onXoayPhai'
                        },
                        {
                            xtype: 'button',
                            cls: 'bdsb-btn',
                            text: 'Nghiêng',
                            iconCls: 'x-fa fa-sort',
                            margin: '0 0 0 6',
                            handler: 'onDoiDoNghieng'
                        },
                        {
                            xtype: 'button',
                            cls: 'bdsb-btn',
                            text: 'Góc mặc định',
                            margin: '0 0 0 6',
                            handler: 'onGocMacDinh'
                        },
                        {
                            xtype: 'button',
                            cls: 'bdsb-btn',
                            text: 'Bỏ chọn',
                            margin: '0 0 0 6',
                            hidden: true,
                            bind: { hidden: '{!tinhDangChon}' },
                            handler: 'onBoChon'
                        }
                    ]
                },
                {
                    xtype: 'component',
                    cls: 'bdsb-map-host',
                    flex: 1,
                    listeners: { afterrender: 'onSaBanAfterRender' }
                }
            ]
        }
    ]
});
