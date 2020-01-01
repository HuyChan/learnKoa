const Koa = require("koa");

const app = new Koa();




const router = require("koa-router")();

router.get("/", async (ctx, next) => {
    await next();
    ctx.response.body = `<h1>首页</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
})

router.post('/signin', async (ctx, next) => {
    const    name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})

// app.use(async function(ctx, next) {
//    await next();
//    ctx.response.type = "text/html";
//    ctx.response.body = "你好";
// })


app.use(router.routes());

app.listen(3000);
console.log("app started at port 3000...");