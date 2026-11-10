Ext.define('DEMO.view.pages.BanDo.BanDo_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BanDo_ViewController',

    onBackToHome: function () {
        const me = this;
        me.redirectTo('trang-chu-new');
    },

    onSearchDiaBan: function (field, newValue) {
        const me = this;
        const store = me.getViewModel().getStore('diaBanStore');
        if (!store) return;

        const query = (newValue || '').trim().toLowerCase();
        store.clearFilter();
        if (query) {
            store.filterBy(function (rec) {
                const diaBan = (rec.get('diaBan') || '').toLowerCase();
                const vungMien = (rec.get('vungMien') || '').toLowerCase();
                return diaBan.indexOf(query) !== -1 || vungMien.indexOf(query) !== -1;
            });
        }
    },

    onClearSearch: function () {
        const me = this;
        const searchField = me.getView().down('#txtSearchDiaBan_IdView');
        if (searchField) {
            searchField.reset();
        }
        const store = me.getViewModel().getStore('diaBanStore');
        if (store) {
            store.clearFilter();
        }
    },

    onSelectRowDiaBan: function (grid, record) {
        const me = this;
        if (!record) return;
        const infoEl = me.getView().down('#diaBanChiTietInfo_IdView');
        if (infoEl) {
            infoEl.setHtml(
                '<div class="bando-selected-province">' +
                '  <span class="prov-name">' + Ext.String.htmlEncode(record.get('diaBan')) + ' (' + Ext.String.htmlEncode(record.get('vungMien')) + ')</span>' +
                '  <span class="prov-stat">Tổng: <strong>' + record.get('tongSo') + '</strong> hồ sơ | ĐTCB: <strong>' + record.get('dtcb') + '</strong> | Chuyên án: <strong>' + record.get('chuyenAn') + '</strong> | Quá hạn: <strong style="color: #ef4444;">' + record.get('quaHan') + '</strong></span>' +
                '</div>'
            );
        }
    }
});
