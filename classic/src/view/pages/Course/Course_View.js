Ext.define('DEMO.view.pages.Course.Course_View', {
    extend: 'Ext.container.Container',
    xtype: 'Course_View',
    controller: 'controller.course',
    viewModel: 'viewmodel.course',
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Course</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL COURSES</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">156</div><div style="font-size:12px;color:#22c55e;">&#9650; +8 new</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">ENROLLMENTS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">12,450</div><div style="font-size:12px;color:#22c55e;">&#9650; +324 this month</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">COMPLETION RATE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">72.8%</div><div style="font-size:12px;color:#22c55e;">&#9650; +3.2%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">AVG RATING</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">4.6/5.0</div><div style="font-size:12px;color:#22c55e;">&#9650; +0.2</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'panel',
            title: 'Popular Courses',
            header: { titleAlign: 'left' },
            style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
            bodyPadding: 16,
            html: '<div style="color:#999;text-align:center;padding:40px;">Course listing will be loaded here...</div>'
        }
    ]
});
