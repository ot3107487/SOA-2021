const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const fetch = require('node-fetch');

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    console.log('client connected');
    console.log(wss.clients.size);
})

const broadcast = (data) => {
    wss.clients.forEach(c => c.send(data));
}

const urls = {
    auth: {
        login: 'http://auth:3000/login',
        verify: 'http://auth:3000/verify',
        userInfo: 'http://auth:3000/userInfo'
    },
    staticData: {
        practitioner: 'http://static-data:3000/Practitioner',
        patient: 'http://static-data:3000/Patient',
        userInfo: 'http://static-data:3000/UserInfo'
    },
    Appointment: 'http://appointment:3000/Appointment',
    imgur: 'http://imgur-photo:3000/photo'
}

app.use(koaBody());

router.post('/auth', async ctx => {
    const authResponse = await fetch(urls.auth.login, { method: 'POST', body: JSON.stringify(ctx.request.body) })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = authResponse;
});


const authorize = async (ctx, next) => {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader) {
        ctx.status = 401;
        return;
    }
    const [type, token] = authHeader.split(' ');
    const authResponse = await fetch(urls.auth.verify, { method: 'POST', body: JSON.stringify({ token }) })
        .then(res => res.json()) // expecting a json response
    if (authResponse) {
        await next();
    } else {
        ctx.status = 401;
    }
}

router.get('/UserInfo', authorize, async ctx => {
    const { user } = await fetch(urls.auth.userInfo, { method: 'GET', headers: { Authorization: ctx.request.headers.authorization } })
        .then(res => res.json());

    const authResponse = await fetch(`${urls.staticData.userInfo}?user=${user}`, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
    const photo = await fetch(urls.imgur, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = { ...authResponse, ...photo };
});

router.get('/Appointment', authorize, async ctx => {
    const authResponse = await fetch(urls.Appointment, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = authResponse;
});

router.get('/Practitioner', authorize, async ctx => {
    const authResponse = await fetch(urls.staticData.practitioner, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = authResponse;
});


router.get('/Patient', authorize, async ctx => {
    const authResponse = await fetch(urls.staticData.patient, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = authResponse;
});




router.post('/Appointment', authorize, async ctx => {
    const authResponse = await fetch(urls.Appointment, { method: 'POST', body: JSON.stringify(ctx.request.body) })
        .then(res => res.json()) // expecting a json response
    ctx.response.body = authResponse;
    broadcast(JSON.stringify(authResponse));
});


app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);