/**
 * Store quan ly cac loai thong bao dung trong DialogNotiCommon.
 *
 * Cach dung (singleton, doc lap khoi ViewModel):
 *   var store = DEMO.app.store.NotificationTypeStore.getInstance();
 *   var cfg   = store.getByType('success');   // tra ve {type, label, iconCls, color, bgColor, description}
 *
 * Cung cap ham tien ich:
 *   store.getIconClsByType('error')   -> 'x-fa fa-times-circle'
 *   store.getColorByType('warning')   -> '#f59e0b'
 *   store.getAllTypes()               -> [{...}, {...}, ...]
 */
Ext.define('DEMO.app.store.NotificationTypeStore', {
    extend: 'Ext.data.Store',

    singleton: true,

    alias: 'store.notificationtypestore',

    fields: [
        { name: 'type',        type: 'string' },
        { name: 'label',       type: 'string' },
        { name: 'iconCls',     type: 'string' },
        { name: 'color',       type: 'string' },
        { name: 'bgColor',     type: 'string' },
        { name: 'description', type: 'string' }
    ],

    data: [
        {
            type: 'success',
            label: 'Thong bao thanh cong',
            iconCls: 'x-fa fa-check-circle',
            color: '#10b981',
            bgColor: '#ecfdf5',
            description: 'Thao tac da duoc thuc hien thanh cong'
        },
        {
            type: 'error',
            label: 'Loi',
            iconCls: 'x-fa fa-times-circle',
            color: '#ef4444',
            bgColor: '#fef2f2',
            description: 'Co loi xay ra trong qua trinh xu ly'
        },
        {
            type: 'warning',
            label: 'Canh bao',
            iconCls: 'x-fa fa-exclamation-triangle',
            color: '#f59e0b',
            bgColor: '#fffbeb',
            description: 'Vui long kiem tra truoc khi thuc hien'
        },
        {
            type: 'info',
            label: 'Thong tin',
            iconCls: 'x-fa fa-info-circle',
            color: '#3b82f6',
            bgColor: '#eff6ff',
            description: 'Thong tin bo sung'
        },
        {
            type: 'confirm',
            label: 'Xac nhan',
            iconCls: 'x-fa fa-question-circle',
            color: '#8b5cf6',
            bgColor: '#f5f3ff',
            description: 'Can su xac nhan tu nguoi dung'
        }
    ],

    /**
     * Lay toan bo cau hinh theo loai thong bao.
     * @param {String} type - 'success', 'error', 'warning', 'info', 'confirm'
     * @return {Object|null} {type, label, iconCls, color, bgColor, description}
     */
    getByType: function (type) {
        var idx = this.findExact('type', type);
        return idx >= 0 ? this.getAt(idx).data : null;
    },

    /**
     * Lay icon CSS class theo loai.
     * @param {String} type
     * @return {String}
     */
    getIconClsByType: function (type) {
        var cfg = this.getByType(type);
        return cfg ? cfg.iconCls : 'x-fa fa-info-circle';
    },

    /**
     * Lay mau sac theo loai.
     * @param {String} type
     * @return {String} hex color
     */
    getColorByType: function (type) {
        var cfg = this.getByType(type);
        return cfg ? cfg.color : '#3b82f6';
    },

    /**
     * Lay toan bo danh sach loai thong bao.
     * @return {Array}
     */
    getAllTypes: function () {
        var result = [];
        this.each(function (rec) {
            result.push(Ext.apply({}, rec.data));
        });
        return result;
    }
});
