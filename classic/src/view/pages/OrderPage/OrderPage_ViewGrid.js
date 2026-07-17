Ext.define('DEMO.view.pages.OrderPage.OrderPage_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'OrderPage_ViewGrid',

    title: 'Recent Orders',
    header: { titleAlign: 'left' },
    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    columns: [
        { text: 'Order ID', dataIndex: 'orderId', width: 110 },
        { text: 'Customer', dataIndex: 'customer', flex: 1 },
        { text: 'Product', dataIndex: 'product', flex: 1 },
        { text: 'Amount', dataIndex: 'amount', width: 100, renderer: Ext.util.Format.usMoney },
        { text: 'Date', dataIndex: 'date', width: 110 },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = { 'Completed': '#22c55e', 'Pending': '#f97316', 'Shipped': '#3b82f6', 'Cancelled': '#ef4444' };
                return '<span style="color:' + (c[v] || '#666') + ';font-weight:600;">' + v + '</span>';
            }
        }
    ],
    store: {
        fields: ['orderId', 'customer', 'product', 'amount', 'date', 'status'],
        data: [
            { orderId: 'ORD-7841', customer: 'Jaydon Frankie', product: 'Wireless Keyboard', amount: 79.99, date: '2025-06-15', status: 'Completed' },
            { orderId: 'ORD-7842', customer: 'Skylar Dias', product: 'USB-C Hub', amount: 49.99, date: '2025-06-15', status: 'Shipped' },
            { orderId: 'ORD-7843', customer: 'Craig Torff', product: 'Monitor Stand', amount: 129.99, date: '2025-06-14', status: 'Pending' },
            { orderId: 'ORD-7844', customer: 'Lindsey Lipshutz', product: 'Desk Lamp', amount: 34.99, date: '2025-06-14', status: 'Completed' },
            { orderId: 'ORD-7845', customer: 'Abram Levin', product: 'Ergonomic Mouse', amount: 59.99, date: '2025-06-13', status: 'Cancelled' }
        ]
    }
});
