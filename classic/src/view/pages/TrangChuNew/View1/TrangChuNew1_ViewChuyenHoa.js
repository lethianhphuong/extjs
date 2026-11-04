Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChuyenHoa', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewChuyenHoa',
    cls: 'tcn-card tcn-info-card tcn-analysis-table dash-card',
    height: 320,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'component',
            bind: { data: '{tableHeader}' },
            tpl: [
                '<header class="tcn-info-header"><h2><span class="tcn-analysis-icon" aria-hidden="true">',
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">',
                '<tpl switch="bieuTuong">',
                '<tpl case="hoSo"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/>',
                '<tpl case="theoDoi"><path d="M9 5H6v16h12V5h-3M9 3h6v4H9zM9 13l2 2 4-4M9 18h6"/>',
                '<tpl case="lucLuong"><circle cx="12" cy="7" r="3"/><path d="M6 20v-2a6 6 0 0 1 12 0v2M3 18v-1a4 4 0 0 1 3-4m15 5v-1a4 4 0 0 0-3-4"/>',
                '</tpl></svg></span>{tieuDe:htmlEncode}</h2></header>',
                '<div class="tcn-analysis-columns tcn-analysis-heading">',
                '<span>{cotTen:htmlEncode}</span><span>Số lượng</span><span>Tỷ trọng</span></div>'
            ]
        },
        {
            xtype: 'dataview',
            bind: { store: '{tableStore}' },
            cls: 'tcn-analysis-scroll',
            flex: 1,
            scrollable: 'y',
            disableSelection: true,
            itemSelector: '.tcn-analysis-record',
            tpl: [
                '<tpl for=".">',
                '<div class="tcn-analysis-columns tcn-analysis-record">',
                '<span class="tcn-analysis-name" title="{ten:htmlEncode}">{ten:htmlEncode}</span>',
                '<strong title="Số lượng: {soLuongText:htmlEncode}">{soLuongText:htmlEncode}</strong>',
                '<span title="Tỷ trọng: {tyLeText:htmlEncode}">{tyLeText:htmlEncode}',
                '<span class="tcn-analysis-meter" aria-hidden="true">',
                '<span style="width:{[Math.max(0, Math.min(100, values.tyLe || 0))]}%"></span></span></span>',
                '</div></tpl>'
            ]
        },
        {
            xtype: 'component',
            bind: { data: '{tableFooter}', hidden: '{anFooterHieuQua}' },
            tpl: [
                '<footer class="tcn-analysis-columns tcn-analysis-total">',
                '<span>Tổng cộng:</span>',
                '<strong title="Tổng số lượng: {tongSoText:htmlEncode}">{tongSoText:htmlEncode}</strong>',
                '<strong title="Tổng tỷ trọng: {tongTyTrongText:htmlEncode}">{tongTyTrongText:htmlEncode}</strong>',
                '</footer>'
            ]
        }
    ]
});
