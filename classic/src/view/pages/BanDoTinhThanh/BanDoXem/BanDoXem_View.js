Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoXem.BanDoXem_View', {
    extend: 'Ext.container.Container',
    xtype: 'BanDoXem_View',
    controller: 'BanDoXem_ViewController',
    viewModel: 'BanDoXem_ViewModel',
    cls: 'bdx-page',
    padding: 12,
    // align 'begin': giữ đúng width tự đặt của từng item (align 'stretch' sẽ kéo giãn hết chiều ngang)
    layout: { type: 'vbox', align: 'begin' },

    items: [
        {
            xtype: 'component',
            cls: 'bdx-hint',
            width: '100%',
            html: '<i class="x-fa fa-info-circle"></i> Lăn chuột để phóng to, kéo để di chuyển, bấm vào một tỉnh để chọn.'
        },
        {
            width: '100%',
            layout: { type: 'hbox', align: 'stretch' },
            items: [
                {
                    xtype: 'container',
                    cls: 'bdx-map-card',
                    flex: 1,
                    height: 800,
                    margin: '8 0 0 0',
                    layout: { type: 'vbox', align: 'stretch' },
                    items: [
                        // Thanh thông tin tỉnh đang chọn
                        // {
                        //     xtype: 'container',
                        //     cls: 'bdx-map-header',
                        //     height: 44,
                        //     layout: { type: 'hbox', align: 'middle' },
                        //     items: [
                        //         {
                        //             xtype: 'component',
                        //             flex: 1,
                        //             bind: {
                        //                 html: '<div class="bdx-sel {lopTinhDangChon}"><span class="bdx-sel-dot"></span>' +
                        //                     '<div class="bdx-sel-text"><div class="bdx-sel-name">{tieuDeTinh}</div>' +
                        //                     '<div class="bdx-sel-meta">{moTaTinh}</div></div></div>'
                        //             }
                        //         },
                        //         {
                        //             xtype: 'button',
                        //             cls: 'bdx-btn-bo-chon',
                        //             text: 'Bỏ chọn',
                        //             margin: '0 0 0 8',
                        //             hidden: true,
                        //             bind: { hidden: '{!tinhDangChon}' },
                        //             handler: 'onBoChon'
                        //         }
                        //     ]
                        // },
                        // // Bản đồ
                        {
                            xtype: 'component',
                            cls: 'bdx-map-host',
                            flex: 1,
                            listeners: { afterrender: 'onBanDoAfterRender' }
                        }
                    ]
                },
                // { flex: 2 }
            ]
        }

    ]
});
