var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var session = require("express-session");
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var flash = require('express-flash');
var busboy = require('connect-busboy');

pool  = mysql.createPool({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'ischool'
});

var app = express();

app.use(session({resave: true, saveUninitialized: true, secret: 'flo', cookie: { maxAge: 600000 }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

if ( !(process.env.NODE_ENV === 'D') ) {

    //
    // Configuration de passport pour l'authentification
    //
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use('local', new LocalStrategy(
        function (username, password, done) {

            pool.getConnection(function(err, connection) {
                // Use the connection
                connection.query( 'SELECT * FROM users where username=? and password=?', [ username, password ], function(err, rows) {

                    // And done with the connection.
                    connection.release();

                    if ( rows[0] )
                        return done(null, rows[0]);
                    else
                        return done(null, false, {message: 'Login ou mot de passe incorrect'});

                });
            });

        }
    ));

    app.get('/login', function (req, res) {

        res.render("login");

    });


    app.post('/login', function (req, res, next) {

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);

    });

    app.get('/logout', function (req, res) {

        req.session.destroy(function (err) {

            return res.redirect('/login');

        });

    });

    app.all('*', function (req, res, next) {

        if (req.isAuthenticated()){
            console.log(req.user);
            next();
        }
        else
            res.redirect('/login');

    });

} else {

    app.all('*', function (req, res, next) {

        req.user = {
            id: 2,
            username: 'Flo',
            password: 'Flo'
        };

        next();

    });

}

__dirFiles = 'd:\\files';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/' + (process.env.NODE_ENV === 'D' ? 'development' : 'production'))));

app.use(busboy());

//var routes = require('./routes/index');
var users = require('./routes/users');
var classes = require('./routes/classes');
var eleves = require('./routes/eleves');
var devoirs = require('./routes/devoirs');
var documents = require('./routes/documents');

//app.use('/', routes);
app.use('/users', users);
app.use('/classes', classes);
app.use('/eleves', eleves);
app.use('/devoirs', devoirs);
app.use('/documents', documents);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
