Ext.define('DEMO.view.pages.OrderList.OrderList_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'OrderList_View',

    controller: 'orderlist',
    viewModel: 'orderlist',

    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    header: { titleAlign: 'left' },

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        layout: { type: 'hbox', align: 'middle' },
        defaults: { margin: '0 10 0 0' },
        items: [
            {
                xtype: 'combobox',
                emptyText: 'All Status',
                width: 160,
                editable: false,
                store: { data: [
                    { text: 'All Status', value: 'all' },
                    { text: 'Completed', value: 'Completed' },
                    { text: 'Pending', value: 'Pending' },
                    { text: 'Shipped', value: 'Shipped' },
                    { text: 'Cancelled', value: 'Cancelled' }
                ]},
                valueField: 'value', displayField: 'text'
            },
            {
                xtype: 'textfield',
                emptyText: 'Search orders...',
                width: 240
            },
            {
                xtype: 'button', text: 'Search', iconCls: 'x-fa fa-search', ui: 'soft-blue', style: 'border-radius:8px;'
            }
        ]
    }],

    columns: [
        { text: 'Order ID', dataIndex: 'orderId', width: 110 },
        { text: 'Customer', dataIndex: 'customer', flex: 1 },
        { text: 'Product', dataIndex: 'product', flex: 1 },
        { text: 'Quantity', dataIndex: 'qty', width: 80, align: 'center' },
        { text: 'Amount', dataIndex: 'amount', width: 110, renderer: Ext.util.Format.usMoney },
        { text: 'Date', dataIndex: 'date', width: 110 },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = { 'Completed': '#22c55e', 'Pending': '#f97316', 'Shipped': '#3b82f6', 'Cancelled': '#ef4444' };
                return '<span style="color:' + (c[v] || '#666') + ';font-weight:600;">' + v + '</span>';
            }
        },
        {
            xtype: 'actioncolumn', text: 'Actions', width: 100, align: 'center',
            items: [
                { iconCls: 'x-fa fa-eye', tooltip: 'View', style: 'color:#3b82f6;' },
                { iconCls: 'x-fa fa-print', tooltip: 'Print', style: 'color:#666;' }
            ]
        }
    ],

    store: {
        type: 'store',
        fields: ['orderId', 'customer', 'product', 'qty', 'amount', 'date', 'status'],
        data: [
            { orderId: 'ORD-7841', customer: 'Jaydon Frankie', product: 'Wireless Keyboard', qty: 2, amount: 159.98, date: '2025-06-15', status: 'Completed' },
            { orderId: 'ORD-7842', customer: 'Skylar Dias', product: 'USB-C Hub', qty: 1, amount: 49.99, date: '2025-06-15', status: 'Shipped' },
            { orderId: 'ORD-7843', customer: 'Craig Torff', product: 'Monitor Stand', qty: 1, amount: 129.99, date: '2025-06-14', status: 'Pending' },
            { orderId: 'ORD-7844', customer: 'Lindsey Lipshutz', product: 'Desk Lamp', qty: 3, amount: 104.97, date: '2025-06-14', status: 'Completed' },
            { orderId: 'ORD-7845', customer: 'Abram Levin', product: 'Ergonomic Mouse', qty: 1, amount: 59.99, date: '2025-06-13', status: 'Cancelled' },
            { orderId: 'ORD-7846', customer: 'Kadin Bator', product: 'Webcam HD Pro', qty: 1, amount: 89.99, date: '2025-06-13', status: 'Completed' },
            { orderId: 'ORD-7847', customer: 'Zaire Vaccaro', product: 'Headphones', qty: 1, amount: 199.99, date: '2025-06-12', status: 'Shipped' }
        ]
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing orders {0} - {1} of {2}',
        emptyMsg: 'No orders to display'
    }
});
