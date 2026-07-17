Ext.define('DEMO.view.pages.InvoiceList.InvoiceList_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'InvoiceList_View',

    controller: 'invoicelist',
    viewModel: 'invoicelist',

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
                    { text: 'Paid', value: 'Paid' },
                    { text: 'Unpaid', value: 'Unpaid' },
                    { text: 'Overdue', value: 'Overdue' }
                ]},
                valueField: 'value', displayField: 'text'
            },
            {
                xtype: 'textfield',
                emptyText: 'Search invoices...',
                width: 240
            },
            {
                xtype: 'button', text: 'Search', iconCls: 'x-fa fa-search', ui: 'soft-blue', style: 'border-radius:8px;'
            },
            {
                xtype: 'button', text: '+ New Invoice', iconCls: 'x-fa fa-plus', ui: 'soft-green', style: 'border-radius:8px;'
            }
        ]
    }],

    columns: [
        { text: 'Invoice #', dataIndex: 'invoiceNo', width: 110 },
        { text: 'Customer', dataIndex: 'customer', flex: 1 },
        { text: 'Amount', dataIndex: 'amount', width: 120, renderer: Ext.util.Format.usMoney },
        { text: 'Issue Date', dataIndex: 'issueDate', width: 110 },
        { text: 'Due Date', dataIndex: 'dueDate', width: 110 },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = v === 'Paid' ? '#22c55e' : v === 'Unpaid' ? '#f97316' : '#ef4444';
                return '<span style="color:' + c + ';font-weight:600;">' + v + '</span>';
            }
        },
        {
            xtype: 'actioncolumn', text: 'Actions', width: 120, align: 'center',
            items: [
                { iconCls: 'x-fa fa-eye', tooltip: 'View', style: 'color:#3b82f6;' },
                { iconCls: 'x-fa fa-download', tooltip: 'Download PDF', style: 'color:#666;' },
                { iconCls: 'x-fa fa-trash', tooltip: 'Delete', style: 'color:#ef4444;' }
            ]
        }
    ],

    store: {
        type: 'store',
        fields: ['invoiceNo', 'customer', 'amount', 'issueDate', 'dueDate', 'status'],
        data: [
            { invoiceNo: 'INV-3241', customer: 'Jaydon Frankie', amount: 249.99, issueDate: '2025-06-01', dueDate: '2025-07-01', status: 'Paid' },
            { invoiceNo: 'INV-3242', customer: 'Skylar Dias', amount: 189.50, issueDate: '2025-06-05', dueDate: '2025-07-05', status: 'Unpaid' },
            { invoiceNo: 'INV-3243', customer: 'Craig Torff', amount: 425.00, issueDate: '2025-05-20', dueDate: '2025-06-20', status: 'Overdue' },
            { invoiceNo: 'INV-3244', customer: 'Lindsey Lipshutz', amount: 99.99, issueDate: '2025-06-10', dueDate: '2025-07-10', status: 'Paid' },
            { invoiceNo: 'INV-3245', customer: 'Abram Levin', amount: 340.00, issueDate: '2025-06-15', dueDate: '2025-07-15', status: 'Unpaid' },
            { invoiceNo: 'INV-3246', customer: 'Kadin Bator', amount: 175.50, issueDate: '2025-05-28', dueDate: '2025-06-28', status: 'Paid' },
            { invoiceNo: 'INV-3247', customer: 'Zaire Vaccaro', amount: 520.00, issueDate: '2025-06-12', dueDate: '2025-07-12', status: 'Unpaid' }
        ]
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing invoices {0} - {1} of {2}',
        emptyMsg: 'No invoices to display'
    }
});
