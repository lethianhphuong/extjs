Ext.define('DEMO.view.pages.UploadFileDemo.UploadFileDemo_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadfiledemo',

    /** Danh sach file da chon */
    _selectedFiles: [],

    // ================================================================
    //  FILE SELECTION
    // ================================================================

    /** Mo dialog chon file */
    onChooseFile: function () {
        var me = this,
            fileField = me.lookup('fileUpload');
        if (fileField) {
            fileField.fileInputEl.dom.click();
        }
    },

    /** Xu ly khi file duoc chon tu dialog */
    onFileSelected: function (field) {
        var me = this,
            fileInputEl = field.fileInputEl ? field.fileInputEl.dom : null;

        if (!fileInputEl || !fileInputEl.files || fileInputEl.files.length === 0) {
            return;
        }

        var files = Array.from(fileInputEl.files);
        me._selectedFiles = files;

        // Hien danh sach file
        var area = me.lookup('selectedFileArea');
        var nameCmp = me.lookup('selectedFileName');
        var iconMap = {
            pdf: 'fa-file-pdf-o', doc: 'fa-file-word-o', docx: 'fa-file-word-o',
            xls: 'fa-file-excel-o', xlsx: 'fa-file-excel-o',
            png: 'fa-file-image-o', jpg: 'fa-file-image-o', jpeg: 'fa-file-image-o'
        };

        var html = '<div style="display:flex;flex-direction:column;gap:6px;background:var(--theme-bg-input, #f1f5f9);border:1px solid var(--theme-border, #e2e8f0);border-radius:8px;padding:12px 16px;">';

        files.forEach(function (file) {
            var ext = file.name.split('.').pop().toLowerCase();
            var icon = iconMap[ext] || 'fa-file-o';
            html += '<span style="display:inline-flex;align-items:center;gap:10px;">' +
                '<i class="x-fa ' + icon + '" style="font-size:16px;color:#3b82f6;"></i>' +
                '<span style="font-weight:600;color:var(--theme-text-primary, #1e293b);font-size:13px;">' + Ext.htmlEncode(file.name) + '</span>' +
                '<span style="color:var(--theme-text-muted, #94a3b8);font-size:12px;">' + me._formatFileSize(file.size) + '</span>' +
                '</span>';
        });

        html += '</div>';

        nameCmp.setHtml(html);
        area.show();

        // Enable nut upload
        me.lookup('btnUpload').enable();
        me.lookup('btnUploadConfig').enable();
    },

    /** Bo chon file */
    onClearSelection: function () {
        var me = this;
        me._selectedFiles = [];
        me.lookup('fileUpload').reset();
        me.lookup('selectedFileArea').hide();
        me.lookup('btnUpload').disable();
        me.lookup('btnUploadConfig').disable();
    },

    /** Xu ly khi tha file vao drop zone */
    onFileDrop: function (e) {
        var me = this,
            fileField = me.lookup('fileUpload'),
            files = e.browserEvent.dataTransfer.files;

        if (files && files.length > 0) {
            // Gan tat ca file vao filefield
            var dt = new DataTransfer();
            Array.from(files).forEach(function (file) {
                dt.items.add(file);
            });
            fileField.fileInputEl.dom.files = dt.files;
            me.onFileSelected(fileField);
        }
    },

    // ================================================================
    //  UPLOAD HANDLERS
    // ================================================================

    /** Upload co ban — khong dieu kien */
    onUploadFile: function () {
        var me = this,
            fileField = me.lookup('fileUpload'),
            store = me.getViewModel().getStore('uploadedFiles');

        if (!me._selectedFiles || me._selectedFiles.length === 0) {
            notiCommon.show({ type: 'warning', message: 'Vui long chon file truoc khi upload.' });
            return;
        }

        common.setLoading(true);

        common.upLoadFile(fileField, function (success, results) {
            common.setLoading(false);

            if (success && results && results.length > 0) {
                results.forEach(function (item) {
                    if (item.success && item.response) {
                        store.add({
                            fileName: item.response.fileName || item.fileName,
                            fileSize: me._formatFileSize(item.response.fileSize || 0),
                            fileType: item.response.fileType || '',
                            uploadUrl: item.response.uploadUrl || '',
                            uploadTime: Ext.Date.format(new Date(), 'd/m/Y H:i:s'),
                            status: 'Thanh cong'
                        });
                    }
                });

                me._updateCount();
                notiCommon.show({ type: 'success', message: 'Upload thanh cong ' + results.length + ' file!' });
                me.onClearSelection();
            } else {
                notiCommon.show({ type: 'error', message: 'Upload that bai mot so file.' });
            }
        });
    },

    /** Upload voi dieu kien ContentType */
    onUploadWithConfig: function () {
        var me = this,
            fileField = me.lookup('fileUpload'),
            store = me.getViewModel().getStore('uploadedFiles');

        if (!me._selectedFiles || me._selectedFiles.length === 0) {
            notiCommon.show({ type: 'warning', message: 'Vui long chon file truoc khi upload.' });
            return;
        }

        common.setLoading(true);

        var allowedTypes = ['PDF', 'DOCX', 'XLSX'];

        common.upLoadFile(fileField, function (success, results) {
            common.setLoading(false);

            if (success && results && results.length > 0) {
                results.forEach(function (item) {
                    if (item.success && item.response) {
                        store.add({
                            fileName: item.response.fileName || item.fileName,
                            fileSize: me._formatFileSize(item.response.fileSize || 0),
                            fileType: item.response.fileType || '',
                            uploadUrl: item.response.uploadUrl || '',
                            uploadTime: Ext.Date.format(new Date(), 'd/m/Y H:i:s'),
                            status: 'Thanh cong'
                        });
                    }
                });

                me._updateCount();
                notiCommon.show({ type: 'success', message: 'Upload thanh cong ' + results.length + ' file!' });
                me.onClearSelection();
            } else {
                notiCommon.show({ type: 'error', message: 'Upload that bai mot so file.' });
            }
        }, allowedTypes, {
            IdDuLieu: '123',
            LoaiDuLieu: 'FILE_DINH_KEM'
        });
    },

    // ================================================================
    //  GRID HANDLERS
    // ================================================================

    /** Xoa 1 file khoi danh sach */
    onDeleteFile: function (view, rowIndex) {
        var me = this,
            store = me.getViewModel().getStore('uploadedFiles'),
            rec = store.getAt(rowIndex);

        if (rec) {
            store.remove(rec);
            me._updateCount();
            notiCommon.show({ type: 'info', message: 'Da xoa file: ' + rec.get('fileName') });
        }
    },

    /** Xoa tat ca file */
    onClearAll: function () {
        var me = this,
            store = me.getViewModel().getStore('uploadedFiles');

        if (store.getCount() === 0) {
            notiCommon.show({ type: 'info', message: 'Danh sach trong.' });
            return;
        }

        notiCommon.show({
            type: 'confirm',
            message: 'Ban co chac chan muon xoa tat ca ' + store.getCount() + ' file?',
            onConfirm: function () {
                store.removeAll();
                me._updateCount();
                notiCommon.show({ type: 'success', message: 'Da xoa tat ca file.' });
            }
        });
    },

    // ================================================================
    //  HELPERS
    // ================================================================

    /** Cap nhat so luong file tren badge */
    _updateCount: function () {
        var me = this,
            store = me.getViewModel().getStore('uploadedFiles'),
            count = store.getCount(),
            badge = me.getView().el && me.getView().el.down('.upload-count-badge');

        if (badge) {
            badge.update(count);
        }
    },

    /** Format file size */
    _formatFileSize: function (bytes) {
        if (bytes === 0) return '0 Bytes';
        var k = 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});
