"use strict";
const koaRouter = require('koa-router');
const auth = require('koa-basic-auth');
const credentials = {name: "John", pass:"Dow"};

const Person = require('./chemas/person');

//Instantiate the router:
const router = koaRouter();

function* renderForm() {
  this.render('file_upload')
}

function* handleForm() {
  this.body = this.request.body
}

function* getRoot() {
  this.render('index')
}

function* getPerson() {
  this.render('person');
}

function* postPerson(next) {
  let personalInfo = this.request.body;
  if (!personalInfo.name || !personalInfo.age || !personalInfo.nationality) {
    this.render('show_message', {
      message: "Sorry, you provided wrong info",
      type: "error"
    })
  } else {
      const newPerson = new Person({
        name: personalInfo.name,
        age: personalInfo.age,
        nationality: personalInfo.nationality
      });
      yield newPerson.save((err, res) => {
        if (err) {
          this.render('show_message', {
            message: "Database error",
            type: "error"
          });
        } else {
          this.render('show_message', {
            message: "New Person added",
            type: "success",
            person: personalInfo
          })
        }
      })
  }
}

function* getPersons(next) {
  yield Person.find((err, response) => {
    this.body = response;
  });
}

function* setACookie() {
  this.cookies.set('foo', 'bar', {
    httpOnly: false,
    expires: new Date(Date.now() + 60000 * 60 * 24)
  });
  this.body = 'Welcome here for the first time!';
}

function* count(next) {
  let n = this.session.views;
  if (n === 1) {
    this.body = 'Welcome here for the first time!';
  } else {
    this.body = "You've visited this page " + n + " times!";
  }
}

router.get('/', getRoot);
router.get('/person', getPerson);
router.post('/person', postPerson);
router.get('/persons', getPersons);

router.get('/cookie', setACookie);
router.get('/counter', count);
router.get('/files', renderForm);
router.post('/upload', handleForm);

// Set up authentication here as first middleware. This returns an error if user is not authenticated.
router.get('/protected', auth(credentials), function *(next){
  this.body = 'You have access to the protected area.';
  yield next;
});

// No authentication middleware present here.
router.get('/unprotected', function*(next){
  this.body = "Anyone can access this area";
  yield next;
});

module.exports = router;