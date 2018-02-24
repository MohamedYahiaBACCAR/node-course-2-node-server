
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var PORT = 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMsg: 'Welcome to our new Website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.render('bad.hbs', {
    pageTitle: 'Error 404 Not found!!!',
    errMsg: 'This route does not exist!'
  });
});

app.listen(PORT , () => {
  console.log(`Server is up on ${PORT}.`);
});
