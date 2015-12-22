Ext.define('iSchool.Application', {
    name: 'iSchool',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
        'Classes',
        'Eleves',
        'Devoirs',
        'Documents'
    ],

    controllers: [
        // TODO: add controllers here
        'Main',
        'Classes',
        'Eleves',
        'Devoirs',
        'Documents'
    ],

    stores: [
        // TODO: add stores here
        'Classes',
        'Eleves',
        'Devoirs',
        'Documents'
    ],

    models: [
        'Classe',
        'Eleve',
        'Devoir',
        'Document'
    ]
});
