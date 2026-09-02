/**
 * common — Global utility singleton.
 *
 * Usage:
 *   common.setLoading(true);
 *   common.upLoadFile(sender, callback);
 *   common.upLoadFile(sender, callback, ['PDF','DOCX'], { idDuLieu: '123', loaiDuLieu: 'FILE_DINH_KEM' });
 */
Ext.define('DEMO.app.Common', {
    singleton: true,
    alternateClassName: 'common',

    privates: {
        CHUNK_SIZE: 10 * 1024 * 1024,
        RETRY_DELAYS: [0, 1000, 3000, 5000, 10000]
    },

    // ================================================================
    //  PUBLIC API
    // ================================================================

    setLoading: function (show) {
        if (show) {
            Ext.getBody().mask('<span class="loading-text">Dang xu ly...</span>', 'loading-custom');
        } else {
            Ext.getBody().unmask();
        }
    },

    /**
     * Upload file(s) len server bang tus protocol.
     *
     * @param {Ext.form.field.File} sender       — file field component
     * @param {Function}            callback      — function(success, results)
     * @param {Array}               [ContentType] — allowed extensions ['PDF','DOCX',...]
     * @param {Object}              [params]      — { idDuLieu, loaiDuLieu, Authorization, headers }
     */
    upLoadFile: function (sender, callback, ContentType, params) {
        var me = this,
            fileInputEl = sender.fileInputEl ? sender.fileInputEl.dom : null;

        if (!fileInputEl || !fileInputEl.files || fileInputEl.files.length === 0) {
            me._callback(callback, false, { message: 'Vui long chon file truoc khi upload.' });
            return;
        }

        if (typeof tus === 'undefined') {
            notiCommon.show({ type: 'error', message: 'Thu vien tus chua duoc tai.' });
            me._callback(callback, false, { message: 'tus library not loaded.' });
            return;
        }

        var files = Array.from(fileInputEl.files);

        if (ContentType && ContentType.length > 0 && !me._validateExtensions(files, ContentType)) {
            me._callback(callback, false, { message: 'Dinh dang file khong dung.' });
            return;
        }

        var url = me._getUploadUrl(params),
            headers = me._buildHeaders(params);

        var promises = files.map(function (file) {
            return me._tusUpload(file, url, headers, params);
        });

        Promise.all(promises).then(function (results) {
            var allSuccess = results.every(function (r) { return r.success; });
            me._callback(callback, allSuccess, results);
        }).catch(function (error) {
            me._callback(callback, false, { message: error.message || 'Upload that bai.' });
        });
    },

    // ================================================================
    //  PRIVATE — TUS UPLOAD
    // ================================================================

    /**
     * @private — Upload 1 file bang tus. Tra ve Promise.
     * Tus tu dong: POST tao upload → PATCH gui chunks → onSuccess
     */
    _tusUpload: function (file, url, headers, params) {
        var me = this;

        return new Promise(function (resolve, reject) {
            var metadata = {
                filename: me._normalizeName(file.name),
                filetype: file.type || 'application/octet-stream'
            };

            if (params) {
                if (params.idDuLieu) metadata.idDuLieu = params.idDuLieu;
                if (params.loaiDuLieu) metadata.loaiDuLieu = params.loaiDuLieu;
            }

            var upload = new tus.Upload(file, {
                endpoint: url,
                retryDelays: me.RETRY_DELAYS,
                chunkSize: me.CHUNK_SIZE,
                metadata: metadata,
                headers: headers,
                onSuccess: function () {
                    var uploadId = (upload.url || '').split('/').pop();
                    resolve({
                        success: true,
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type,
                        uploadUrl: upload.url,
                        uploadId: uploadId
                    });
                },
                onError: function (error) {
                    var msg = (error && error.message) || 'Upload that bai.';
                    console.error('[Tus Error]', file.name, error);
                    notiCommon.show({ type: 'error', message: file.name + ': ' + msg });
                    resolve({ success: false, fileName: file.name, message: msg });
                }
            });

            upload.start();
        });
    },

    // ================================================================
    //  PRIVATE — HELPERS
    // ================================================================

    _callback: function (fn, success, data) {
        if (Ext.isFunction(fn)) fn(success, data);
    },

    _validateExtensions: function (files, allowed) {
        var allowedUpper = allowed.map(function (e) { return e.toUpperCase(); }),
            invalid = files.find(function (f) {
                return allowedUpper.indexOf(f.name.split('.').pop().toUpperCase()) === -1;
            });
        if (invalid) {
            notiCommon.show({ type: 'warning', message: 'Dinh dang file khong dung. Cho phep: ' + allowedUpper.join(', ') });
            return false;
        }
        return true;
    },

    _getUploadUrl: function (params) {
        var apiV2 = (typeof config !== 'undefined' && config.getUtils_API_URL_V2)
            ? config.getUtils_API_URL_V2() : '/api/v2/';

        if (params && params.loaiDuLieu === 'VAN_BAN') {
            var apiV3 = (typeof config !== 'undefined' && config.getChApi_V3_URL)
                ? config.getChApi_V3_URL() : '/api/v3/';
            return apiV3 + 'upload-attach-file';
        }

        return apiV2 + 'file-dinh-kem';
    },

    _buildHeaders: function (params) {
        var headers = {};

        if (params && params.Authorization) {
            headers['Authorization'] = params.Authorization;
        }

        if (!headers['Authorization']) {
            var token = localStorage.getItem('token') || localStorage.getItem('access_token');
            if (token) headers['Authorization'] = 'Bearer ' + token;
        }

        if (params && params.headers) {
            Ext.Object.each(params.headers, function (k, v) { headers[k] = v; });
        }

        return headers;
    },

    _normalizeName: function (name) {
        return this._removeVietnameseTones(name).replace(/\s+/g, '_');
    },

    _removeVietnameseTones: function (str) {
        if (!str) return str;
        var map = {
            'a': /['àáảãạ]/g, 'A': /['ÀÁẢÃẠ]/g,
            'd': /['đ']/g, 'D': /['Đ']/g,
            'e': /['èéẻẽẹ]/g, 'E': /['ÈÉẺẼẸ']/g,
            'i': /['ìíỉĩị]/g, 'I': /['ÌÍỈĨỊ']/g,
            'o': /['òóỏõọ]/g, 'O': /['ÒÓỎÕỌ]/g,
            'u': /['ùúủũụ']/g, 'U': /['ÙÚỦŨỤ']/g,
            'y': /['ỳýỷỹỵ]/g, 'Y': /['ỲÝỶỸỴ']/g,
            'o+': /['ơớờởỡợ]/g, 'O+': /['ƠỚỜỞỠỢ']/g,
            'u+': /['ưứừửữự']/g, 'U+': /['ƯỨỪỬỮỰ']/g,
            'a+': /['ấầẩẫậ']/g, 'A+': /['ẤẦẨẪẬ']/g,
            'e+': /['ếềểễệ']/g, 'E+': /['ẾỀỂỄỆ']/g
        };
        var result = str;
        result = result.replace(map['o+'], 'o').replace(map['O+'], 'O');
        result = result.replace(map['u+'], 'u').replace(map['U+'], 'U');
        result = result.replace(map['a+'], 'a').replace(map['A+'], 'A');
        result = result.replace(map['e+'], 'e').replace(map['E+'], 'E');
        result = result.replace(map['a'], 'a').replace(map['A'], 'A');
        result = result.replace(map['d'], 'd').replace(map['D'], 'D');
        result = result.replace(map['e'], 'e').replace(map['E'], 'E');
        result = result.replace(map['i'], 'i').replace(map['I'], 'I');
        result = result.replace(map['o'], 'o').replace(map['O'], 'O');
        result = result.replace(map['u'], 'u').replace(map['U'], 'U');
        result = result.replace(map['y'], 'y').replace(map['Y'], 'Y');
        return result;
    }
});
