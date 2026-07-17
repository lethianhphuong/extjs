Ext.define('DEMO.view.pages.ProductCategories.ProductCategories_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductCategories_View',

    controller: 'productcategories',
    viewModel: 'productcategories',

    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    header: {
        titleAlign: 'left',
        items: [{
            xtype: 'button', text: '+ Add Category', iconCls: 'x-fa fa-plus', ui: 'soft-green', style: 'border-radius:8px;'
        }]
    },

    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Category Name', dataIndex: 'name', flex: 1 },
        { text: 'Products', dataIndex: 'products', width: 100, align: 'center' },
        { text: 'Description', dataIndex: 'description', flex: 2 },
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
        fields: ['id', 'name', 'products', 'description'],
        data: [
            { id: 1, name: 'Electronics', products: 156, description: 'Electronic devices and gadgets' },
            { id: 2, name: 'Accessories', products: 89, description: 'Computer and desk accessories' },
            { id: 3, name: 'Lighting', products: 34, description: 'LED and desk lighting solutions' },
            { id: 4, name: 'Audio', products: 45, description: 'Speakers, headphones, and audio equipment' },
            { id: 5, name: 'Furniture', products: 28, description: 'Office and home furniture' }
        ]
    }
});
