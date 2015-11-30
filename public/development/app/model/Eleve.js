Ext.define('iSchool.model.Eleve', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'nom', type: 'auto' },
        { name: 'prenom', type: 'auto' },
        { name: 'date_naissance', type: 'date' },
        { name: 'classe_id', type: 'int' }

    ]
});
