Ext.define('DEMO.view.pages.XemPdfDemo.XemPdfDemo_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xempdfdemo',

    requires: [
        'DEMO.view.pages.FilePage.PdfViewer_View'
    ],

    /**
     * Mở PDF trong popup iframe.
     */
    onViewPdf: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            url = rec.get('linkPdf'),
            title = rec.get('tenVanBan');

        if (!url) {
            notiCommon.show({ message: 'Không có link tài liệu', type: 'warning' });
            return;
        }

        DEMO.view.pages.FilePage.PdfViewer_View.open({
            url: url,
            title: title
        });
    },

    /**
     * Mở PDF trong popup trình duyệt (cửa sổ mới có kích thước cố định).
     */
    onOpenInNewTab: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            url = rec.get('linkPdf');

        if (url) {
            var w = screen.width * 0.75,
                h = screen.height * 0.8,
                left = (screen.width - w) / 2,
                top = (screen.height - h) / 2;

            window.open(
                url,
                '_blank',
                'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',menubar=no,toolbar=yes,location=yes,status=yes'
            );
        }
    },

    /**
     * Tìm kiếm theo tên văn bản.
     */
    onSearch: function () {
        var store = this.getView().getStore(),
            keyword = this.lookup('txtKeyword').getValue();

        if (keyword) {
            store.clearFilter();
            store.filterBy(function (rec) {
                return rec.get('tenVanBan').toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        } else {
            store.clearFilter();
        }
    },

    /**
     * Làm mới — xóa filter.
     */
    onRefresh: function () {
        this.lookup('txtKeyword').setValue('');
        this.getView().getStore().clearFilter();
    }
});
