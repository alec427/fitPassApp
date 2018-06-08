const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
passportSetup(passport);


mongoose.connect('mongodb://alec:Alec2403@ds251210.mlab.com:51210/fitpass');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'Express - Generated with IronGenerator';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((err, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETED,DELETE,OPTIONS')
  res.header('Allow', 'GET,POST,PUT,DELETED,DELETE,OPTIONS')

  next()
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth-routes');

app.use('/', authRoutes);
app.all((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(session({
  secret: 'alec',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
