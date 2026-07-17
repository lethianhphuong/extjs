Ext.define('DEMO.view.pages.ProductList.ProductList_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductList_View',

    controller: 'productlist',
    viewModel: 'productlist',

    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    header: {
        titleAlign: 'left',
        items: [{
            xtype: 'button', text: '+ Add Product', iconCls: 'x-fa fa-plus', ui: 'soft-green', style: 'border-radius:8px;'
        }]
    },

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
        },
        {
            xtype: 'actioncolumn', text: 'Actions', width: 100, align: 'center',
            items: [
                { iconCls: 'x-fa fa-edit', tooltip: 'Edit', style: 'color:#3b82f6;' },
                { iconCls: 'x-fa fa-trash', tooltip: 'Delete', style: 'color:#ef4444;' }
            ]
        }
    ],

    store: {
        type: 'store',
        fields: ['id', 'name', 'category', 'price', 'stock', 'status'],
        data: [
            { id: 1, name: 'Wireless Keyboard', category: 'Electronics', price: 79.99, stock: 124, status: 'In Stock' },
            { id: 2, name: 'USB-C Hub Adapter', category: 'Electronics', price: 49.99, stock: 8, status: 'Low Stock' },
            { id: 3, name: 'Ergonomic Mouse', category: 'Electronics', price: 59.99, stock: 0, status: 'Out of Stock' },
            { id: 4, name: 'Monitor Stand', category: 'Accessories', price: 129.99, stock: 56, status: 'In Stock' },
            { id: 5, name: 'Desk Lamp LED', category: 'Lighting', price: 34.99, stock: 3, status: 'Low Stock' },
            { id: 6, name: 'Webcam HD Pro', category: 'Electronics', price: 89.99, stock: 42, status: 'In Stock' },
            { id: 7, name: 'Noise Cancelling Headphones', category: 'Audio', price: 199.99, stock: 18, status: 'In Stock' },
            { id: 8, name: 'Desk Mat XL', category: 'Accessories', price: 24.99, stock: 0, status: 'Out of Stock' }
        ]
    }
});
