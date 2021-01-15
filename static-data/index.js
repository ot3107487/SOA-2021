const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const { practitioners, patients, getUserInfo } = require('./data');
app.use(koaBody());

router.get('/Patient', ctx => {
    ctx.response.body = { resourceType: 'Bundle', entry: patients.map(app => ({ resource: app })) };
});

router.get('/UserInfo', ctx => {
    const user = ctx.url.split('?')[1].split('=')[1];
    const res = getUserInfo(user);
    ctx.response.body = res;
});

router.get('/Practitioner', ctx => {
    ctx.response.body = { resourceType: 'Bundle', entry: practitioners.map(app => ({ resource: app })) };    
});


app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);