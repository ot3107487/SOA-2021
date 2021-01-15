const { credentials } = require('./data');

const Koa = require('koa');
const app = new Koa();

var jwt = require('jsonwebtoken');
const Router = require('@koa/router');
const router = new Router();
const koaBody = require('koa-body');
const secret = 'soa-key';
app.use(koaBody());

app.use(async (ctx,next)=> {
    if (ctx.method !== 'GET') ctx.request.body = JSON.parse(ctx.request.body);
    await next();
})

router.post('/login', ctx => {
    ctx.status = 200;
    const {user, password } = ctx.request.body;
    if (credentials[user] === password) {
        ctx.body = {
          token: jwt.sign(ctx.request.body, secret)
        };
    } else {
        ctx.status = 403;
    }
});

router.post('/verify', ctx => {
    ctx.status = 200;
    try {
        const {user, password } = jwt.verify(ctx.request.body.token, secret);
        if (credentials[user] === password) {
            ctx.body = true;
        } else {
            ctx.status = 401;
            ctx.body = false;
        }
    } catch (err) {
        ctx.status = 401;
    }
})

router.get('/userInfo', ctx => {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader) {
        ctx.status = 401;
        return;
    }
    const [type, token] = authHeader.split(' ');
    try {
        const {user} = jwt.verify(token, secret);
        ctx.body = {user};
    } catch (err) {
        ctx.status = 401;
    }
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);