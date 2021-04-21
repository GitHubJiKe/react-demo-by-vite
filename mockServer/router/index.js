const Router = require("koa-router");
const path = require("path");
const fs = require("fs");

const router = new Router();

router.post("/login", (ctx, next) => {
  if (
    ctx.request.body.username === "admin" &&
    ctx.request.body.password === "666666"
  ) {
    ctx.body = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../mock/login/login.json"))
        .toString()
    );
  } else {
    ctx.body = {
      data: {
        success: false,
      },
      errmsg: "wrong username or password",
      code: 1000,
    };
  }
});

router.get("/", (ctx, next) => {
  ctx.body = "<h1>Welcome to Mock API Server</h1>";
});

module.exports = router;
