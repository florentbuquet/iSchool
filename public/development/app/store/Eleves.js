Ext.define('iSchool.store.Eleves', {
    extend: 'Ext.data.Store',
    model: 'iSchool.model.Eleve',
    proxy: {
        type: 'ajax',
        url: '/eleves',
        reader: {
            type: 'json'
        }
    },
    groupers: [{
        property : 'classe_id'
    }]
});