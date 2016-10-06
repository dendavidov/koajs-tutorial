const koa = require('koa');
const router = require('koa-router');
const app = koa();

//Instantiate the router:
var _ = router();

//Define routes:
_.get('/hello', getMessage);
_.post('/hello', postMessage);
_.all('/test', allMessages);
_.get('/test-id/:id', sendId);
_.get('/test-id/:id/:id2', sendTwoIds);
_.get('/test-5digits-id/:id([0-9]{5})', sendFiveDigitsId)


function* getMessage() {
  this.body = "Hello world\n";
}

function* postMessage() {
  this.body = "You just called the post method at '/hello'!\n";
}

function* allMessages() {
  this.body = "All HTTP calls regardless of the verb will get this response\n";
}

function* sendId() {
  this.body = `The id you specified is ${this.params.id}`;
}

function* sendTwoIds() {
  this.body = `The first id you specified is "${this.params.id}" and the second is "${this.params.id2}".`;
}

function* sendFiveDigitsId() {
  this.body = `id = ${this.params.id}`;
}

//Use the routes defined using the router
app.use(_.routes());

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});