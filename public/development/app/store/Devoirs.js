Ext.define('iSchool.store.Devoirs', {
    extend: 'Ext.data.Store',
    model: 'iSchool.model.Devoir',
    proxy: {
        type: 'ajax',
        url: '/devoirs',
        reader: {
            type: 'json'
        }
    }
});