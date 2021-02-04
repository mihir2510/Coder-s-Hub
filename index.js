var appConfig = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var server_port = process.env.PORT || appConfig.server_port;
var session_secret = process.env.SESSION_SECRET || appConfig.session_secret;
var db_user = process.env.DB_USER || appConfig.db_user;
var db_pass = process.env.DB_PASS || appConfig.db_pass;
var connection_string = process.env.DB_STR || appConfig.connection_string;

mongoose.connect(connection_string)
.then(() => console.log('Mongoose connection successful!'))
.catch(() => console.log('Mongoose connection failed!'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: session_secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.set('view engine','ejs');

var index_route = require('./routes/index');
var admin_route = require('./routes/admin');
var problem_route = require('./routes/problem');
var api_route = require('./routes/api');
var leaderboard_route = require('./routes/leaderboard');
var leaderboard_route_json = require('./routes/leaderboard');
var aboutus_route = require('./routes/aboutus');
var rss_route = require('./routes/rss');

app.use('/', index_route);
app.use('/admin', admin_route);
app.use('/problems', problem_route);
app.use('/api', api_route);
app.use('/leaderboard', leaderboard_route); // end user
app.use('/aboutus', aboutus_route);
app.use('/leaderboardRSS', rss_route); // xml


var server = app.listen(server_port, function(){
    console.log('Listening on port %d',server_port);
});
