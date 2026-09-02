Ext.define('DEMO.view.pages.UploadFileDemo.UploadFileDemo_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.uploadfiledemo',

    data: {},

    stores: {
        uploadedFiles: {
            fields: ['fileName', 'fileSize', 'fileType', 'uploadUrl', 'uploadTime', 'status'],
            data: []
        }
    }
});
