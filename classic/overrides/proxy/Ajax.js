
Ext.define('DEMO.override.proxy.Ajax', {
    override: 'Ext.data.proxy.Ajax',
    timeout: 90000,

    // REQUEST GỬI
    doRequest: function (operation) {
        common.setLoading(true);
        this.loading = true;

        const me = this;
        const proxy = operation._proxy

        // KHI LÀ METHOD POST K TRUYỀN ĐƯỢC PAGE SIZE QUA URL
        if (proxy && proxy.paramsPageSize) {
            const request = me.buildRequest(operation);
            let url = request.getUrl();
            let params = request._params

            let newUrl = url.includes('?') ? `${url}&&page=${params.page}&&size=${params.size}` : `${url}?page=${params.page}&&size=${params.size}`

            operation.setUrl(newUrl)
        }

        return me.callParent(arguments);
    },
    // NHẬN PHẢN HỒI
    processResponse: function (success) {
        setTimeout(() => {
            this.fireEvent('override_load', success);
        }, 0);

        this.loading = false;
        common.setLoading(false);
        this.callParent(arguments);
    },
    destroy: function () {
        if (this.loading) {
            this.loading = false;
            common.setLoading(false);
        }
    }
});