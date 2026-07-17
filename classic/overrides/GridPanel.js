
Ext.define('DEMO.override.GridPanel', {
    override: 'Ext.grid.Panel',

    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true,
        loadMask: false
        // style: 'border: solid #cfcfcf; border-width: 1px 1px 0px 1px;',
    },
    emptyText: '<div style=\'text-align:center\'>Không có dữ liệu</div>',
    cls: 'gridcustom',
    // columnLines: true,
    width: '100%'

    //
    // initComponent: function () {
    //     var me = this;

    //     me.viewConfig.listeners = {
    //         beforerender: function (view) {

    //             view.headerCt.items.each(function (column) {
    //                 if (column.renderer) {
    //                     let originalRender = column.renderer

    //                     column.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
    //                         metaData.tdAttr = common.addTooltip(value)
    //                         return originalRender.apply(this, arguments)
    //                     }
    //                 } else {
    //                     column.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
    //                         metaData.tdAttr = common.addTooltip(value)
    //                         return value
    //                     }
    //                 }
    //             })
    //         }
    //     }
});