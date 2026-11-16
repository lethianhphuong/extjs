Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoTinhThanh_View', {
    extend: 'Ext.container.Container',
    xtype: 'BanDoTinhThanh_View',
    controller: 'BanDoTinhThanh_ViewController',
    viewModel: 'BanDoTinhThanh_ViewModel',
    cls: 'bdtt-page dash-page',
    scrollable: 'y',
    padding: '5 20 24 20',
    layout: { type: 'vbox', align: 'stretch' },

    items: [

        // 2. Hai tab: tô màu + danh sách | chỉ bản đồ
        {
            xtype: 'tabpanel',
            cls: 'bdtt-tabs dash-card',
            bodyCls: 'bdtt-tabs-body',
            items: [
                {
                    xtype: 'BanDoTinhThanh_ViewTabToMau',
                    title: 'Tô màu và danh sách',
                    iconCls: 'x-fa fa-paint-brush'
                },
                {
                    xtype: 'BanDoXem_View',
                    title: 'Bản đồ',
                    iconCls: 'x-fa fa-map'
                }
            ]
        }
    ]
});
