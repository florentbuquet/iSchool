Ext.define('iSchool.store.Classes', {
    extend: 'Ext.data.Store',
    model: 'iSchool.model.Classe',
    proxy: {
        type: 'ajax',
        url: '/classes',
        reader: {
            type: 'json'
        }
    }
});