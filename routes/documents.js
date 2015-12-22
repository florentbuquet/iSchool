var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET documents listing. */
router.get('/', function(req, res, next) {

    console.log('----------------------------------------');
    console.log(req.query.path);

    // parcours du dossier de la personne ..
    var entirePath = __dirname + '/../files/' + req.user.id + '/' ;
    var documents = [] ;
    var path = '' ;

    if ( req.query.path ){

        console.log(req.query.path , entirePath);
        console.log(req.query.path === entirePath);

        path+= req.query.path + '/' ;
        if ( req.query.path !== entirePath ) {
            documents.push({
                name: '..',
                type: 'D',
                path: path
            });
        }

    } else {

        console.log('path : entirePath');
        path+= entirePath;

    }

    console.log('Path : ' + path);

    fs.readdir(path, function(err, files){

        if ( files ) {

            files.forEach(function (file) {

                console.log(file);

                var stats = fs.statSync(path + file);
                documents.push({
                    name: file,
                    type: (stats.isDirectory() ? 'D' : (stats.isFile() ? 'F' : 'Inconnu')),
                    path: path
                });

            });

        }

        res.send(documents);

    });

});

/* POST document */
router.post('/', function(req, res, next) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        var path = __dirname + '/../files/' + req.user.id + '/' ;
        fs.exists(path, function(exists){

            var Traitement = function(){

                fstream = fs.createWriteStream(path + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    res.status(200).send({success : true});
                });

            }

            if ( !exists )
                fs.mkdir(path, function(){
                    Traitement();
                });
            else
                Traitement();


        }) ;

    });

});


module.exports = router;
