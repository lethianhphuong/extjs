/**
 * PdfViewer_View — Popup xem file PDF bằng pdf.js.
 * Dark theme UI: merged header+toolbar, sidebar thumbnails, gray content area.
 *
 * Yêu cầu: lib/pdfjs/pdf.min.js + pdf.worker.min.js
 */
Ext.define('DEMO.view.pages.FilePage.PdfViewer_View', {
    extend: 'Ext.window.Window',
    xtype: 'PdfViewer_View',

    controller: 'pdfviewer',
    viewModel: 'pdfviewer',

    title: 'Xem tài liệu',
    width: '90%',
    height: '90%',
    layout: 'border',
    maximizable: true,
    cls: 'pdf-viewer-window pdfv2',
    headerStyle: 'background:#111827;',
    bodyStyle: 'overflow:hidden;background:#6b7280;',

    config: {
        pdfUrl: '',
        pdfTitle: ''
    },

    initComponent: function () {
        var me = this;

        if (me.pdfTitle) {
            me.setTitle(me.pdfTitle);
        }

        me.tbar = [{
            iconCls: 'x-fa fa-th',
            tooltip: 'Ẩn/hiện thumbnails',
            cls: 'pdfv2-tbar-btn',
            handler: 'onToggleThumbnails'
        }, {
            xtype: 'tbtext',
            text: '',
            cls: 'pdfv2-tbar-spacer'
        }, {
            iconCls: 'x-fa fa-search-plus',
            tooltip: 'Phóng to',
            cls: 'pdfv2-tbar-btn',
            handler: 'onZoomIn'
        }, {
            iconCls: 'x-fa fa-search-minus',
            tooltip: 'Thu nhỏ',
            cls: 'pdfv2-tbar-btn',
            handler: 'onZoomOut'
        }, {
            xtype: 'tbtext',
            text: '',
            cls: 'pdfv2-tbar-spacer'
        }, {
            xtype: 'tbtext',
            reference: 'pageInfo',
            text: '1 / 1',
            cls: 'pdfv2-tbar-page'
        }];

        me.items = [{
            region: 'west',
            width: 160,
            split: true,
            minWidth: 100,
            maxWidth: 260,
            reference: 'thumbnailPanel',
            cls: 'pdfv2-sidebar',
            header: false,
            bodyStyle: 'background:#1f2937;',
            html: ''
        }, {
            region: 'center',
            xtype: 'component',
            reference: 'pdfContainer',
            cls: 'pdfv2-content',
            scrollable: 'y',
            html: '<div class="pdfv2-loading">Đang tải...</div>'
        }];

        me.callParent(arguments);

        me.on('show', function () {
            me.getController().loadPdf();
        });

        // Force dark toolbar background
        me.on('afterrender', function () {
            var tb = me.getDockedItems('toolbar[dock="top"]')[0];
            if (tb && tb.el) {
                tb.el.setStyle('background', '#1f2937');
                tb.el.setStyle('border-bottom', 'none');
            }
        });
    }
});

DEMO.view.pages.FilePage.PdfViewer_View.open = function (cfg) {
    return Ext.create('DEMO.view.pages.FilePage.PdfViewer_View', {
        pdfUrl: cfg.url || '',
        pdfTitle: cfg.title || 'Xem tài liệu',
        renderTo: Ext.getBody()
    }).show();
};
