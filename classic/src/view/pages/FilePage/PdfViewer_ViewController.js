Ext.define('DEMO.view.pages.FilePage.PdfViewer_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pdfviewer',

    /* ── State ─────────────────────────────────────── */

    _pdf: null,
    _scale: 1.5,
    _currentPage: 1,
    _totalPages: 0,
    _pageDivs: [],
    _thumbHidden: false,

    /* ── Toolbar handlers ──────────────────────────── */

    onZoomIn: function () {
        this._scale = Math.min(this._scale + 0.25, 4);
        this.applyZoom();
    },

    onZoomOut: function () {
        this._scale = Math.max(this._scale - 0.25, 0.5);
        this.applyZoom();
    },

    onPrevPage: function () {
        if (this._currentPage > 1) {
            this.goToPage(this._currentPage - 1);
        }
    },

    onNextPage: function () {
        if (this._currentPage < this._totalPages) {
            this.goToPage(this._currentPage + 1);
        }
    },

    onPrint: function () {
        var url = this.getView().getPdfUrl();
        if (url) { window.print(); }
    },

    onDownloadPdf: function () {
        var url = this.getView().getPdfUrl();
        if (url) {
            var a = document.createElement('a');
            a.href = url;
            a.download = this.getView().getPdfTitle() || 'document.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    },

    onToggleThumbnails: function (btn) {
        var me = this,
            panel = me.lookup('thumbnailPanel');
        if (!panel) return;

        me._thumbHidden = !me._thumbHidden;
        if (me._thumbHidden) {
            panel.hide();
            btn.setIconCls('x-fa fa-th-list');
            btn.setTooltip('Hiện thumbnails');
        } else {
            panel.show();
            btn.setIconCls('x-fa fa-th');
            btn.setTooltip('Ẩn thumbnails');
        }
    },

    /* ── PDF.js loading ────────────────────────────── */

    loadPdf: function () {
        var me = this,
            url = me.getView().getPdfUrl();
        if (!url) return;

        me.waitForContainer(function () {
            if (DEMO.view.pages.FilePage.PdfViewer_ViewController._PDFJS_LOADED) {
                me.renderPdf(url);
            } else {
                me.loadPdfJs(function () {
                    me.renderPdf(url);
                });
            }
        });
    },

    waitForContainer: function (cb, attempt) {
        var me = this,
            c = me.lookup('pdfContainer');
        attempt = attempt || 0;
        if (c && c.el) {
            cb();
        } else if (attempt < 30) {
            Ext.defer(function () { me.waitForContainer(cb, attempt + 1); }, 100);
        }
    },

    loadPdfJs: function (callback) {
        var me = this,
            cls = DEMO.view.pages.FilePage.PdfViewer_ViewController;

        if (cls._PDFJS_LOADED) { callback(); return; }
        if (cls._PDFJS_LOADING) {
            var tick = setInterval(function () {
                if (cls._PDFJS_LOADED) { clearInterval(tick); callback(); }
            }, 100);
            return;
        }

        cls._PDFJS_LOADING = true;
        var script = document.createElement('script');
        script.src = 'lib/pdfjs/pdf.min.js';
        script.onload = function () {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdfjs/pdf.worker.min.js';
            cls._PDFJS_LOADED = true;
            cls._PDFJS_LOADING = false;
            callback();
        };
        script.onerror = function () {
            cls._PDFJS_LOADING = false;
            me.showError('Không thể tải pdf.js. Kiểm tra file lib/pdfjs/pdf.min.js');
        };
        document.head.appendChild(script);
    },

    /* ── Render PDF ────────────────────────────────── */

    renderPdf: function (url) {
        var me = this,
            el = me.lookup('pdfContainer').el.dom;

        el.innerHTML = '<div class="pdfv2-loading">Đang render PDF...</div>';

        window.pdfjsLib.getDocument(url).promise.then(function (pdf) {
            me._pdf = pdf;
            me._totalPages = pdf.numPages;
            me._currentPage = 1;
            me._pageDivs = [];
            me._scale = 1.5;

            me.renderAllPages(pdf);
            me.updateToolbar();

            Ext.defer(function () {
                me.renderThumbnails(pdf);
            }, 200);
        }, function (err) {
            me.showError('Không thể tải file PDF: ' + (err.message || ''));
        });
    },

    renderAllPages: function (pdf) {
        var me = this,
            el = me.lookup('pdfContainer').el.dom;

        el.innerHTML = '';
        var scrollDiv = document.createElement('div');
        scrollDiv.id = 'pdf-scroll-' + Ext.id();
        scrollDiv.className = 'pdfv2-scroll';
        el.appendChild(scrollDiv);

        me._pageDivs = [];

        for (var i = 1; i <= pdf.numPages; i++) {
            me.renderPage(pdf, i, scrollDiv);
        }
    },

    renderPage: function (pdf, pageNum, container) {
        var me = this;

        pdf.getPage(pageNum).then(function (page) {
            var viewport = page.getViewport({ scale: me._scale });

            var pageDiv = document.createElement('div');
            pageDiv.className = 'pdfv2-page';
            pageDiv.style.cssText = 'width:' + viewport.width + 'px;height:' + viewport.height + 'px;';
            pageDiv.setAttribute('data-page', pageNum);
            container.appendChild(pageDiv);

            me._pageDivs[pageNum] = pageDiv;

            var canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.cssText = 'width:100%;height:100%;display:block;pointer-events:none;';
            pageDiv.appendChild(canvas);

            var annotDiv = document.createElement('div');
            annotDiv.className = 'annotationLayer';
            annotDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
            pageDiv.appendChild(annotDiv);

            page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });

            page.getAnnotations().then(function (annotations) {
                me.renderAnnotations(annotations, viewport, annotDiv);
                page.getTextContent().then(function (textContent) {
                    me.renderPdfLinks(textContent, viewport, annotDiv, annotations);
                });
            });
        });
    },

    applyZoom: function () {
        var me = this;
        var ratio = me._scale / 1.5;

        me._pageDivs.forEach(function (div) {
            if (div) {
                div.style.transform = 'scale(' + ratio + ')';
                div.style.transformOrigin = 'top center';
            }
        });

        me.updateToolbar();
    },

    goToPage: function (pageNum) {
        var me = this;
        me._currentPage = pageNum;
        me.updateToolbar();

        var pageDiv = me._pageDivs[pageNum];
        if (pageDiv) {
            pageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Highlight active thumbnail & scroll into view
        var panel = me.lookup('thumbnailPanel');
        if (panel && panel.el) {
            var thumbs = panel.el.dom.querySelectorAll('.pdfv2-thumb');
            Ext.Array.each(thumbs, function (t) {
                t.classList.remove('pdfv2-thumb-active');
            });
            var active = panel.el.dom.querySelector('[data-thumb-page="' + pageNum + '"]');
            if (active) {
                active.classList.add('pdfv2-thumb-active');
                active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    },

    updateToolbar: function () {
        var me = this;
        var pageEl = me.lookup('pageInfo');
        if (pageEl && pageEl.rendered) {
            pageEl.setText(me._currentPage + ' / ' + me._totalPages);
        }
    },

    /* ── Thumbnails ────────────────────────────────── */

    renderThumbnails: function (pdf) {
        var me = this,
            panel = me.lookup('thumbnailPanel');
        if (!panel) return;

        var el = panel.body ? panel.body.dom : (panel.el ? panel.el.dom : null);
        if (!el) return;

        el.innerHTML = '';
        el.style.overflowY = 'auto';
        el.style.height = '100%';
        el.style.textAlign = 'center';

        for (var i = 1; i <= pdf.numPages; i++) {
            me.renderThumbnail(pdf, i, el);
        }
    },

    renderThumbnail: function (pdf, pageNum, container) {
        var me = this;

        pdf.getPage(pageNum).then(function (page) {
            var viewport = page.getViewport({ scale: 0.2 });

            var thumb = document.createElement('div');
            thumb.className = 'pdfv2-thumb';
            thumb.setAttribute('data-thumb-page', pageNum);
            thumb.style.cssText = 'display:inline-block;text-align:center;width:120px;margin:0 0 16px 0;';

            var canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.cssText = 'width:100%;display:block;border-radius:3px;box-shadow:0 1px 4px rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);';
            thumb.appendChild(canvas);

            var label = document.createElement('div');
            label.className = 'pdfv2-thumb-label';
            label.textContent = pageNum;
            label.style.cssText = 'font-size:13px;color:#fff;font-weight:600;margin-top:8px;text-align:center;';
            thumb.appendChild(label);

            thumb.addEventListener('click', function () {
                me.goToPage(pageNum);
            });

            container.appendChild(thumb);

            page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
        });
    },

    /* ── Annotations & Links ───────────────────────── */

    renderAnnotations: function (annotations, viewport, container) {
        var me = this;

        annotations.forEach(function (annot) {
            if (annot.subtype !== 'Link') return;
            var linkUrl = annot.url || annot.unsafeUrl || annot.action || '';
            if (!linkUrl) return;

            var rect = viewport.convertToViewportRectangle(annot.rect);
            var x = Math.min(rect[0], rect[2]);
            var y = Math.min(rect[1], rect[3]);
            var w = Math.abs(rect[2] - rect[0]);
            var h = Math.abs(rect[3] - rect[1]);

            var btn = document.createElement('button');
            btn.style.cssText = 'position:absolute;z-index:99;cursor:pointer;pointer-events:auto;' +
                'background:transparent;border:none;padding:0;' +
                'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';

            (function (url) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (url.indexOf('.pdf') !== -1) {
                        me.openPdfPopup(url);
                    } else {
                        window.open(url, '_blank');
                    }
                });
            })(linkUrl);

            container.appendChild(btn);
        });
    },

    renderPdfLinks: function (textContent, viewport, container, annotations) {
        var me = this;

        var existingUrls = {};
        annotations.forEach(function (a) {
            var aUrl = a.url || a.unsafeUrl || '';
            if (aUrl) { existingUrls[aUrl] = true; }
        });

        textContent.items.forEach(function (item) {
            var str = item.str || '';
            if (str.indexOf('.pdf') === -1) return;

            var url = str.trim();
            if (!url || existingUrls[url]) return;
            existingUrls[url] = true;

            var tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
            var x = tx[4];
            var y = tx[5] - item.height;
            var w = item.width;
            var h = item.height + 4;

            var btn = document.createElement('button');
            btn.style.cssText = 'position:absolute;z-index:99;cursor:pointer;pointer-events:auto;' +
                'background:transparent;border:none;padding:0;' +
                'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';

            (function (popupUrl) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    me.openPdfPopup(popupUrl);
                });
            })(url);

            container.appendChild(btn);
        });
    },

    /* ── Popup ─────────────────────────────────────── */

    openPdfPopup: function (url) {
        var title = url.split('/').pop();
        Ext.create('Ext.window.Window', {
            title: title,
            width: '90%',
            height: '90%',
            layout: 'fit',
            maximizable: true,
            bodyStyle: 'padding:0;background-color:transparent',
            items: [{
                xtype: 'box',
                autoEl: {
                    tag: 'iframe',
                    src: url,
                    style: 'border:none;width:100%;height:100%;',
                    frameborder: '0'
                }
            }],
            renderTo: Ext.getBody()
        }).show();
    },

    showError: function (msg) {
        var c = this.lookup('pdfContainer');
        if (c && c.el) {
            c.el.dom.innerHTML = '<div class="pdfv2-error">' +
                '<i class="fas fa-exclamation-triangle"></i>' +
                msg + '</div>';
        }
    }
}, function (cls) {
    cls._PDFJS_LOADED = false;
    cls._PDFJS_LOADING = false;
});
