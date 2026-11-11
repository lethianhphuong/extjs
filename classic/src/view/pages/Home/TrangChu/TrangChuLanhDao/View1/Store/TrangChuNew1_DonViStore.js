Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.Store.TrangChuNew1_DonViStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1donvi',
    fields: [
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'kyHieu', type: 'string' },
        { name: 'nhanDonVi', type: 'string' },
        { name: 'ten', type: 'string' },
        { name: 'mau', type: 'string' },
        { name: 'val', type: 'int' },
        { name: 'thuHang', type: 'int' }
    ],
    sorters: [{ property: 'val', direction: 'DESC' }],
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
