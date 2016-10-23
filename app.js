const koa = require('koa');
const serve = require('koa-static');
const session = require('koa-session');
const router = require('./routes');
const bodyParser = require('koa-body');
const compress = require('koa-compress');
const staticCache = require('koa-static-cache');
const path = require('path');

const app = koa();

app.keys = ['Secret key'];
app.use(session(app));

app.use(function* (next){
  var n = this.session.views || 0;
  this.session.views = ++n;
  yield next;
});

app.use(function* (next) {
  try {
    yield next;
  } catch(err) {
    if (401 === err.status) {
      this.status = 401;
      this.set("WWW-Authenticate", "Basics");
      this.body = 'You have no access here'
    } else {
      throw err;
    }
  }
});

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, 'images'), {
  maxAge: 365 * 24 * 60 * 60
}));

//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
  viewPath: './views',
  baseDir: './views',
  app: app
});

app.use(compress({
  filter: function (contentType) {
    return /text/i.test(contentType)
  },
  treshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(serve('./public'));
app.use(serve('./images'));

app.use(bodyParser({
  formidable: {
    uploadDir:'./uploads'
  },
  multipart: true,
  urlencoded: true
}));

app.use(router.routes());

app.listen(3000);




