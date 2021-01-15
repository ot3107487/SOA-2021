const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

app.use(koaBody());
let imageUrl;
var imgur = require('imgur');
imgur.setClientId('77573a9597aff96');
imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getInfo('gLrQ2fy')
    .then(function (json) {
        imageUrl = json.data.link
    })
    .catch(function (err) {
        console.error(err.message);
    });


router.get('/photo', ctx => {
    ctx.response.body = { photo: imageUrl };
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);