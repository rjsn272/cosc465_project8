var express = require('express.io');
var app = express().http().io();

var baseurl = "http://localhost:3000"; // default development URL
if (process.env.BASE_URL) {            // if env var is set, use it
  baseurl = process.env.BASE_URL;
}
var url = require('url');
var port = url.parse(baseurl).port;    // parse out the port number
if (process.env.PORT) {
    port = process.env.PORT;
}
console.log("Using baseurl: " + baseurl);
console.log("Port: " + port);

var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user,done) {
    done(null, user);
});

passport.deserializeUser(function(user,done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
      return done(null, profile);
  }
));

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'secretkeywhichmustnotbenamed'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// set up socket.io routes
var perftests = require('./perftests.js');
app.io.route('ping', perftests.ping);
app.io.route('result', perftests.result);

// set up "normal" http routes
var views = require('./views.js');
app.get('/', views.index);
app.get('/tests', views.tests);

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

app.listen(port);
console.log("App started on port " + port);
