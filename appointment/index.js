const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const { appointments } = require('./data');
app.use(koaBody());

app.use(async (ctx, next) => {;
    if (ctx.request.method !== 'GET') ctx.request.body = JSON.parse(ctx.request.body);
    await next();
})

router.get('/Appointment', async ctx => {
    ctx.response.body = { resourceType: 'Bundle', entry: appointments.map(app => ({ resource: app })) };
});

router.post('/Appointment', async ctx => {
    const newApp = { id: appointments.length + 1, ...ctx.request.body };
    appointments.push(newApp);
    ctx.response.body = newApp;
    ctx.response.status = 201;
});


app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);