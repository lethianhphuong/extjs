Ext.define('DEMO.view.pages.FilePage.FilePage_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.filepage',

    requires: [
        'DEMO.view.pages.FilePage.PdfViewer_View'
    ],

    /**
     * Mở popup xem PDF.
     * Gọi từ grid actioncolumn hoặc bất kỳ event nào:
     *   this.onViewPdf(record.get('linkTaiLieu'), record.get('tenVanBan'));
     */
    onViewPdf: function (url, title) {
        if (!url) {
            notiCommon.show({ message: 'Không có link tài liệu', type: 'warning' });
            return;
        }

        DEMO.view.pages.FilePage.PdfViewer_View.open({
            url: url,
            title: title || 'Xem tài liệu'
        });
    }
});
