Ext.define('DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_DonViStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1donvi',
    fields: [
        { name: 'ma', type: 'string' },
        { name: 'soLuong', type: 'int' },
        { name: 'thuHang', type: 'int' }
    ],
    sorters: [{ property: 'soLuong', direction: 'DESC' }],
    listeners: {
        datachanged: function (store) {
            store.updateRankings();
        }
    },

    /** Cập nhật thứ hạng sau sắp xếp để chained store lọc Top 5/10. */
    updateRankings: function () {
        const me = this;

        me.each(function (record, index) {
            if (record.get('thuHang') !== index + 1) {
                record.set('thuHang', index + 1);
            }
        });
    }
});
