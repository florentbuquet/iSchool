Ext.define('iSchool.Application', {
    name: 'iSchool',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
        'Classes',
        'Eleves',
        'Devoirs'
    ],

    controllers: [
        // TODO: add controllers here
        'Main',
        'Classes',
        'Eleves',
        'Devoirs'
    ],

    stores: [
        // TODO: add stores here
        'Classes',
        'Eleves',
        'Devoirs'
    ],

    models: [
        'Classe',
        'Eleve',
        'Devoir'
    ]
});
