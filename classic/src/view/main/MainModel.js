Ext.define('DEMO.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: 'app',
        currentUser: {
            name: 'Jaydon Frankie',
            role: 'Admin'
        }
    },

    formulas: {
        currentViewText: function (get) {
            var map = {
                'app': 'App',
                'ecommerce': 'Ecommerce',
                'analytics': 'Analytics',
                'banking': 'Banking',
                'booking': 'Booking',
                'file': 'File',
                'course': 'Course',
                'user': 'User',
                'user-list': 'User List',
                'user-roles': 'User Roles',
                'product': 'Product',
                'product-list': 'Product List',
                'product-categories': 'Categories',
                'order': 'Order',
                'order-list': 'Order List',
                'invoice': 'Invoice',
                'invoice-list': 'Invoice List',
                'blog': 'Blog',
                'to-trinh': 'Tờ Trình',
                'icons': 'Icons',
                'test-noti': 'Test NotiCommon'
            };
            return map[get('currentView')] || 'Dashboard';
        }
    },

    stores: {
        navigationTree: {
            type: 'tree',
            root: {
                expanded: true,
                children: [
                    {
                        text: 'TỔNG QUAN',
                        iconCls: 'x-fa fa-folder-o',
                        expanded: true,
                        selectable: false,
                        children: [
                            { text: 'Dashboard', iconCls: 'x-fa fa-home', route: 'app', component: 'Dashboard_View', leaf: true },
                            { text: 'Ecommerce', iconCls: 'x-fa fa-shopping-cart', route: 'ecommerce', component: 'Ecommerce_View', leaf: true },
                            { text: 'Analytics', iconCls: 'x-fa fa-bar-chart', route: 'analytics', component: 'Analytics_View', leaf: true },
                            { text: 'Banking', iconCls: 'x-fa fa-university', route: 'banking', component: 'Banking_View', leaf: true },
                            { text: 'Booking', iconCls: 'x-fa fa-calendar-check-o', route: 'booking', component: 'Booking_View', leaf: true },
                            { text: 'File', iconCls: 'x-fa fa-folder-open', route: 'file', component: 'FilePage_View', leaf: true },
                            { text: 'Course', iconCls: 'x-fa fa-graduation-cap', route: 'course', component: 'Course_View', leaf: true },
                            { text: 'Icons', iconCls: 'x-fa fa-icons', route: 'icons', component: 'Icons_View', leaf: true }
                        ]
                    },
                    {
                        text: 'QUẢN LÝ',
                        iconCls: 'x-fa fa-folder-o',
                        expanded: true,
                        selectable: false,
                        children: [
                            {
                                text: 'User', iconCls: 'x-fa fa-users', route: 'user',
                                expanded: false,
                                children: [
                                    { text: 'User List', iconCls: 'x-fa fa-angle-right', route: 'user-list', component: 'UserList_View', leaf: true },
                                    { text: 'User Roles', iconCls: 'x-fa fa-angle-right', route: 'user-roles', component: 'UserRoles_View', leaf: true }
                                ]
                            },
                            {
                                text: 'Product', iconCls: 'x-fa fa-cube', route: 'product',
                                expanded: false,
                                children: [
                                    { text: 'Product List', iconCls: 'x-fa fa-angle-right', route: 'product-list', component: 'ProductList_View', leaf: true },
                                    { text: 'Categories', iconCls: 'x-fa fa-angle-right', route: 'product-categories', component: 'ProductCategories_View', leaf: true }
                                ]
                            },
                            {
                                text: 'Order', iconCls: 'x-fa fa-shopping-bag', route: 'order',
                                expanded: false,
                                children: [
                                    { text: 'Order List', iconCls: 'x-fa fa-angle-right', route: 'order-list', component: 'OrderList_View', leaf: true }
                                ]
                            },
                            {
                                text: 'Invoice', iconCls: 'x-fa fa-file-text-o', route: 'invoice',
                                expanded: false,
                                children: [
                                    { text: 'Invoice List', iconCls: 'x-fa fa-angle-right', route: 'invoice-list', component: 'InvoiceList_View', leaf: true }
                                ]
                            },
                            { text: 'Blog', iconCls: 'x-fa fa-pencil-square', route: 'blog', component: 'BlogPage_View', leaf: true }
                        ]
                    },
                    {
                        text: 'VĂN BẢN',
                        iconCls: 'x-fa fa-folder-o',
                        expanded: true,
                        selectable: false,
                        children: [
                            { text: 'Tờ Trình', iconCls: 'x-fa fa-file-text', route: 'to-trinh', component: 'ToTrinh_View', leaf: true }
                        ]
                    },
                    {
                        text: 'TEST',
                        iconCls: 'x-fa fa-flask',
                        expanded: true,
                        selectable: false,
                        children: [
                            { text: 'Test NotiCommon', iconCls: 'x-fa fa-bell-o', route: 'test-noti', component: 'TestNoti_View', leaf: true }
                        ]
                    }
                ]
            }
        }
    }
});
