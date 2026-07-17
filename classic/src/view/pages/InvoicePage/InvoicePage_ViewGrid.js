Ext.define('DEMO.view.pages.InvoicePage.InvoicePage_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'InvoicePage_ViewGrid',

    title: 'Invoice List',
    header: { titleAlign: 'left' },
    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    columns: [
        { text: 'Invoice #', dataIndex: 'invoiceNo', width: 110 },
        { text: 'Customer', dataIndex: 'customer', flex: 1 },
        { text: 'Amount', dataIndex: 'amount', width: 120, renderer: Ext.util.Format.usMoney },
        { text: 'Due Date', dataIndex: 'dueDate', width: 110 },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = { 'Paid': '#22c55e', 'Unpaid': '#f97316', 'Overdue': '#ef4444' };
                return '<span style="color:' + (c[v] || '#666') + ';font-weight:600;">' + v + '</span>';
            }
        }
    ],
    store: {
        fields: ['invoiceNo', 'customer', 'amount', 'dueDate', 'status'],
        data: [
            { invoiceNo: 'INV-3241', customer: 'Jaydon Frankie', amount: 249.99, dueDate: '2025-07-01', status: 'Paid' },
            { invoiceNo: 'INV-3242', customer: 'Skylar Dias', amount: 189.50, dueDate: '2025-07-05', status: 'Unpaid' },
            { invoiceNo: 'INV-3243', customer: 'Craig Torff', amount: 425.00, dueDate: '2025-06-20', status: 'Overdue' },
            { invoiceNo: 'INV-3244', customer: 'Lindsey Lipshutz', amount: 99.99, dueDate: '2025-07-10', status: 'Paid' },
            { invoiceNo: 'INV-3245', customer: 'Abram Levin', amount: 340.00, dueDate: '2025-07-15', status: 'Unpaid' }
        ]
    }
});
