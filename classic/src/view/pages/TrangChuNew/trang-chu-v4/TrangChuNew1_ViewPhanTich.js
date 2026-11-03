Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewPhanTich', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewPhanTich',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewTrangThaiChart',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChuyenHoa'
    ],
    cls: 'tcn-analysis',
    layout: 'auto',
    items: [
        { xtype: 'TrangChuNew1_ViewTrangThaiChart' },
        {
            xtype: 'TrangChuNew1_ViewChuyenHoa',
            bind: {
                data: {
                    tieuDe: 'Hiệu quả công tác ĐTCB',
                    items: '{hieuQuaDtcbHienThi.items}'
                }
            }
        },
        {
            xtype: 'TrangChuNew1_ViewChuyenHoa',
            bind: {
                data: {
                    tieuDe: 'Hiệu quả công tác Sưu tra',
                    items: '{hieuQuaSuuTraHienThi.items}'
                }
            }
        },
        {
            xtype: 'component',
            cls: 'tcn-card tcn-info-card dash-card',
            bind: { data: '{lucLuongHienThi}' },
            tpl: [
                '<header class="tcn-info-header"><h2>{nhanDoiTuong:htmlEncode} theo hệ lực lượng</h2>',
                '<span class="tcn-info-hint">{soHe} hệ chính</span></header>',
                '<div class="tcn-info-content"><tpl for="items">',
                '<div class="tcn-progress-row tcn-force-row tcn-tone-{mau:htmlEncode}">',
                '<div class="tcn-progress-label"><span><i class="tcn-square"></i>{ten:htmlEncode}</span>',
                '<span class="tcn-force-values"><small>{tyLeText:htmlEncode}</small>',
                '<strong>{soLuongText:htmlEncode}</strong></span></div>',
                '<div class="tcn-progress-track" role="progressbar" aria-label="{ten:htmlEncode}" ',
                'aria-valuemin="0" aria-valuemax="100" aria-valuenow="{tyLe}">',
                '<div class="tcn-progress-fill" style="width:{tyLe}%"></div></div></div>',
                '</tpl></div>'
            ]
        }
    ]
});
