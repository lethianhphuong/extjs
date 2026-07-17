Ext.define('DEMO.view.pages.BlogPage.BlogPage_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'BlogPage_ViewGrid',

    title: 'Recent Posts',
    header: { titleAlign: 'left' },
    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Title', dataIndex: 'title', flex: 2 },
        { text: 'Author', dataIndex: 'author', width: 140 },
        { text: 'Category', dataIndex: 'category', width: 120 },
        { text: 'Views', dataIndex: 'views', width: 80, align: 'center' },
        { text: 'Date', dataIndex: 'date', width: 110 },
        {
            text: 'Status', dataIndex: 'status', width: 110,
            renderer: function (v) {
                var c = v === 'Published' ? '#22c55e' : '#f97316';
                return '<span style="color:' + c + ';font-weight:600;">' + v + '</span>';
            }
        }
    ],
    store: {
        fields: ['id', 'title', 'author', 'category', 'views', 'date', 'status'],
        data: [
            { id: 1, title: 'Getting Started with ExtJS 7', author: 'Jaydon Frankie', category: 'Tutorial', views: 12540, date: '2025-06-15', status: 'Published' },
            { id: 2, title: 'Modern JavaScript Frameworks', author: 'Skylar Dias', category: 'Technology', views: 8920, date: '2025-06-14', status: 'Published' },
            { id: 3, title: 'Building Responsive Layouts', author: 'Craig Torff', category: 'Design', views: 6540, date: '2025-06-13', status: 'Draft' },
            { id: 4, title: 'Best Practices for Enterprise Apps', author: 'Lindsey Lipshutz', category: 'Architecture', views: 11200, date: '2025-06-12', status: 'Published' },
            { id: 5, title: 'Introduction to Chart Components', author: 'Abram Levin', category: 'Tutorial', views: 4320, date: '2025-06-11', status: 'Draft' }
        ]
    }
});
