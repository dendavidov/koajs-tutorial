const koa = require('koa');
const router = require('koa-router');
const app = koa();

//Instantiate the router:
var _ = router();

//Define routes:
_.get('/hello', getMessage);
_.post('/hello', postMessage);
_.all('/test', allMessages);

function* getMessage() {
  this.body = "Hello world\n";
}

function* postMessage() {
  this.body = "You just called the post method at '/hello'!\n";
}

function* allMessages() {
  this.body = "All HTTP calls regardless of the verb will get this response\n";
}

//Use the routes defined using the router
app.use(_.routes());

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});