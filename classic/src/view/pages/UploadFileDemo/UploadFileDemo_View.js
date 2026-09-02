Ext.define('DEMO.view.pages.UploadFileDemo.UploadFileDemo_View', {
    extend: 'Ext.container.Container',
    xtype: 'UploadFileDemo_View',
    controller: 'uploadfiledemo',
    viewModel: 'uploadfiledemo',

    scrollable: 'y',
    padding: 24,

    layout: { type: 'auto' },

    items: [
        // -- Page Header --
        {
            xtype: 'component',
            margin: '0 0 20 0',
            html: '<h2 style="margin:0;font-size:22px;font-weight:700;color:var(--theme-text-primary, #1e293b);">' +
                '<i class="x-fa fa-cloud-upload" style="margin-right:10px;color:#3b82f6;"></i>Upload File Demo</h2>'
        },

        // -- Upload Card --
        {
            xtype: 'panel',
            cls: 'dash-card',
            bodyStyle: { padding: '24px' },
            layout: { type: 'vbox', align: 'stretch' },
            margin: '0 0 24 0',
            items: [
                {
                    xtype: 'component',
                    html: '<h3 style="margin:0 0 16px 0;font-size:16px;font-weight:600;color:var(--theme-text-primary, #1e293b);">Chon file de upload</h3>'
                },

                // -- Drag & Drop Zone --
                {
                    xtype: 'component',
                    reference: 'dropZone',
                    cls: 'upload-drop-zone',
                    height: 160,
                    html: '<div class="upload-drop-content">' +
                        '<i class="x-fa fa-cloud-upload upload-drop-icon"></i>' +
                        '<div class="upload-drop-text">Keo tha nhieu file vao day hoac bam nut ben duoi</div>' +
                        '<div class="upload-drop-hint">Ho tro nhieu file dong thoi — PDF, DOC, DOCX, XLS, XLSX, PNG, JPG</div>' +
                        '</div>',
                    listeners: {
                        afterrender: function (cmp) {
                            var el = cmp.getEl();
                            el.on('dragover', function (e) {
                                e.preventDefault();
                                el.addCls('upload-drop-hover');
                            });
                            el.on('dragleave', function () {
                                el.removeCls('upload-drop-hover');
                            });
                            el.on('drop', function (e) {
                                e.preventDefault();
                                el.removeCls('upload-drop-hover');
                                var controller = cmp.up('[controller]').getController();
                                controller.onFileDrop(e);
                            });
                        }
                    }
                },

                // -- Selected File Display --
                {
                    xtype: 'container',
                    reference: 'selectedFileArea',
                    hidden: true,
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '16 0 0 0',
                    items: [
                        {
                            xtype: 'component',
                            reference: 'selectedFileName',
                            flex: 1,
                            html: ''
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-times',
                            ui: 'soft-red',
                            style: 'border-radius:50%;width:32px;height:32px;padding:0;',
                            tooltip: 'Bo chon',
                            handler: 'onClearSelection'
                        }
                    ]
                },

                // -- Hidden File Field (nhieu file) --
                {
                    xtype: 'filefield',
                    reference: 'fileUpload',
                    name: 'fileUpload',
                    hidden: true,
                    hideLabel: true,
                    allowBlank: true,
                    multiple: true,
                    listeners: {
                        change: function (field) {
                            var controller = field.up('[controller]').getController();
                            controller.onFileSelected(field);
                        }
                    }
                },

                // -- Action Buttons --
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle', pack: 'start' },
                    margin: '16 0 0 0',
                    items: [
                        {
                            xtype: 'button',
                            text: '<i class="x-fa fa-folder-open-o"></i>  Chon file',
                            ui: 'soft-blue',
                            style: 'border-radius:8px;font-weight:600;padding:8px 20px;',
                            handler: 'onChooseFile'
                        },
                        { xtype: 'tbspacer', width: 12 },
                        {
                            xtype: 'button',
                            reference: 'btnUpload',
                            text: '<i class="x-fa fa-cloud-upload"></i>  Upload ngay',
                            ui: 'soft-green',
                            style: 'border-radius:8px;font-weight:600;padding:8px 20px;',
                            handler: 'onUploadFile',
                            disabled: true
                        },
                        { xtype: 'tbspacer', width: 12 },
                        {
                            xtype: 'button',
                            reference: 'btnUploadConfig',
                            text: '<i class="x-fa fa-shield"></i>  Upload (PDF/DOCX/XLSX)',
                            ui: 'soft-cyan',
                            style: 'border-radius:8px;font-weight:600;padding:8px 20px;',
                            handler: 'onUploadWithConfig',
                            disabled: true
                        }
                    ]
                },

                // -- Usage Info --
                {
                    xtype: 'component',
                    margin: '16 0 0 0',
                    html: '<div style="background:var(--theme-bg-input, #f8fafc);border:1px solid var(--theme-border-light, #f1f5f9);border-radius:8px;padding:14px 18px;font-size:13px;color:var(--theme-text-secondary, #64748b);line-height:1.9;">' +
                        '<div style="font-weight:600;color:var(--theme-text-primary, #1e293b);margin-bottom:4px;"><i class="x-fa fa-info-circle" style="margin-right:6px;"></i>Huong dan su dung</div>' +
                        '<div><code style="background:var(--theme-bg-page, #f1f5f9);padding:2px 8px;border-radius:4px;font-size:12px;">common.upLoadFile(sender, callback)</code> — Upload co ban</div>' +
                        '<div><code style="background:var(--theme-bg-page, #f1f5f9);padding:2px 8px;border-radius:4px;font-size:12px;">common.upLoadFile(sender, callback, [types], params)</code> — Upload voi dieu kien</div>' +
                        '</div>'
                }
            ]
        },

        // -- Uploaded Files Grid Card --
        {
            xtype: 'panel',
            cls: 'dash-card',
            bodyStyle: { padding: '0' },
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                // Header
                {
                    xtype: 'container',
                    layout: { type: 'hbox', pack: 'between', align: 'middle' },
                    padding: '18 24',
                    items: [
                        {
                            xtype: 'component',
                            html: '<h3 style="margin:0;font-size:16px;font-weight:600;color:var(--theme-text-primary, #1e293b);">' +
                                '<i class="x-fa fa-list" style="margin-right:8px;color:#3b82f6;"></i>Danh sach file da upload ' +
                                '<span class="upload-count-badge" style="background:#3b82f6;color:#fff;font-size:11px;padding:2px 8px;border-radius:10px;margin-left:8px;font-weight:500;">0</span></h3>'
                        },
                        {
                            xtype: 'button',
                            text: '<i class="x-fa fa-trash-o"></i>  Xoa tat ca',
                            ui: 'soft-red',
                            style: 'border-radius:8px;font-weight:500;padding:6px 16px;',
                            handler: 'onClearAll'
                        }
                    ]
                },
                // Divider
                {
                    xtype: 'component',
                    html: '<div style="height:1px;background:var(--theme-border, #e2e8f0);margin:0 24px;"></div>'
                },
                // Grid
                {
                    xtype: 'grid',
                    flex: 1,
                    margin: '0 0 1 0',
                    bind: { store: '{uploadedFiles}' },
                    columns: [
                        {
                            text: 'STT',
                            width: 70,
                            align: 'center',
                            renderer: function (value, metaData, record, rowIndex) {
                                return '<span style="color:var(--theme-text-secondary, #64748b);font-weight:500;">' + (rowIndex + 1) + '</span>';
                            }
                        },
                        {
                            text: 'Ten file',
                            dataIndex: 'fileName',
                            flex: 1,
                            renderer: function (value) {
                                var ext = value.split('.').pop().toLowerCase();
                                var iconMap = {
                                    pdf: 'fa-file-pdf-o', doc: 'fa-file-word-o', docx: 'fa-file-word-o',
                                    xls: 'fa-file-excel-o', xlsx: 'fa-file-excel-o',
                                    png: 'fa-file-image-o', jpg: 'fa-file-image-o', jpeg: 'fa-file-image-o'
                                };
                                var icon = iconMap[ext] || 'fa-file-o';
                                var colorMap = {
                                    pdf: '#ef4444', doc: '#3b82f6', docx: '#3b82f6',
                                    xls: '#22c55e', xlsx: '#22c55e',
                                    png: '#f97316', jpg: '#f97316', jpeg: '#f97316'
                                };
                                var color = colorMap[ext] || '#64748b';
                                return '<span style="display:inline-flex;align-items:center;gap:8px;">' +
                                    '<i class="x-fa ' + icon + '" style="font-size:16px;color:' + color + ';"></i>' +
                                    '<span style="color:var(--theme-text-primary, #1e293b);font-weight:500;">' + Ext.htmlEncode(value) + '</span>' +
                                    '</span>';
                            }
                        },
                        {
                            text: 'Kich thuoc',
                            dataIndex: 'fileSize',
                            width: 120,
                            align: 'center',
                            renderer: function (value) {
                                return '<span style="color:var(--theme-text-secondary, #64748b);">' + value + '</span>';
                            }
                        },
                        {
                            text: 'Thoi gian',
                            dataIndex: 'uploadTime',
                            width: 170,
                            align: 'center',
                            renderer: function (value) {
                                return '<span style="color:var(--theme-text-secondary, #64748b);">' + value + '</span>';
                            }
                        },
                        {
                            text: 'Trang thai',
                            dataIndex: 'status',
                            width: 150,
                            align: 'center',
                            renderer: function (value) {
                                var isOk = value.indexOf('Thanh cong') > -1;
                                var bg = isOk ? '#dcfce7' : '#fef2f2';
                                var fg = isOk ? '#16a34a' : '#dc2626';
                                var icon = isOk ? 'fa-check-circle' : 'fa-times-circle';
                                return '<span style="display:inline-flex;align-items:center;gap:6px;background:' + bg + ';color:' + fg + ';padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;">' +
                                    '<i class="x-fa ' + icon + '"></i>' + value + '</span>';
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            text: '',
                            width: 50,
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'x-fa fa-trash',
                                    tooltip: 'Xoa file',
                                    style: 'color:#ef4444;cursor:pointer;',
                                    handler: 'onDeleteFile'
                                }
                            ]
                        }
                    ],
                    emptyText: '<div style="padding:48px 20px;text-align:center;">' +
                        '<i class="x-fa fa-cloud-upload" style="font-size:42px;color:var(--theme-border, #cbd5e1);display:block;margin-bottom:14px;"></i>' +
                        '<div style="font-size:15px;font-weight:600;color:var(--theme-text-secondary, #64748b);margin-bottom:6px;">Chua co file nao</div>' +
                        '<div style="font-size:13px;color:var(--theme-text-muted, #94a3b8);">Hay chon file va bam nut Upload de bat dau</div>' +
                        '</div>'
                }
            ]
        }
    ]
});
