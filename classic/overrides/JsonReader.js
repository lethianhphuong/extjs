
Ext.define('DEMO.override.JsonReader', {
    override: 'Ext.data.reader.Json',
    /**
     * Make additional processing available on the raw response.
     */
    processRawResponse: null,
    getResponseData: function (response) {
        if (this.processRawResponse) { this.processRawResponse(response); }
        return this.callParent([response]);
    }
});