Ext.define('DEMO.view.pages.ProductPage.ProductPage_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductPage_ViewGrid',

    title: 'Product List',
    header: { titleAlign: 'left' },
    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Product Name', dataIndex: 'name', flex: 1 },
        { text: 'Category', dataIndex: 'category', width: 130 },
        { text: 'Price', dataIndex: 'price', width: 100, renderer: Ext.util.Format.usMoney },
        { text: 'Stock', dataIndex: 'stock', width: 80, align: 'center' },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = v === 'In Stock' ? '#22c55e' : v === 'Low Stock' ? '#f97316' : '#ef4444';
                return '<span style="color:' + c + ';font-weight:600;">' + v + '</span>';
            }
        }
    ],
    store: {
        fields: ['id', 'name', 'category', 'price', 'stock', 'status'],
        data: [
            { id: 1, name: 'Wireless Keyboard', category: 'Electronics', price: 79.99, stock: 124, status: 'In Stock' },
            { id: 2, name: 'USB-C Hub Adapter', category: 'Electronics', price: 49.99, stock: 8, status: 'Low Stock' },
            { id: 3, name: 'Ergonomic Mouse', category: 'Electronics', price: 59.99, stock: 0, status: 'Out of Stock' },
            { id: 4, name: 'Monitor Stand', category: 'Accessories', price: 129.99, stock: 56, status: 'In Stock' },
            { id: 5, name: 'Desk Lamp LED', category: 'Lighting', price: 34.99, stock: 3, status: 'Low Stock' }
        ]
    }
});
