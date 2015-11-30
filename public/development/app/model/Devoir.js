Ext.define('iSchool.model.Devoir', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'libelle', type: 'auto' },
        { name: 'libcourt', type: 'auto' },
        { name: 'classe_id', type: 'int' }

    ]
});
