const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("connect-mysql2")(session);
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const joinRouter = require("./routes/join");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const mypageRouter = require("./routes/mypage");
const wishListRouter = require("./routes/wishlist");
const cartRouter = require("./routes/cart");
const memberRouter = require("./routes/member");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const RecentOrdersRouter = require("./routes/recentOrders");
const ConfirmPasswordRouter = require("./routes/confirmPassword");
const ReviewRouter = require("./routes/review");
require('dotenv').config();

const app = express();

const options = {
  config: {
    user: "root",
    password: "root",
    database: "luks",
  },
};

const sessionStore = new MySQLStore(options);

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/join", joinRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/mypage", mypageRouter);
app.use("/wishlist", wishListRouter);
app.use("/cart", cartRouter);
app.use("/member", memberRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);
app.use("/recentOrders", RecentOrdersRouter);
app.use("/confirmPassword", ConfirmPasswordRouter);
app.use("/review", ReviewRouter);

// OAuth 경로 추가
app.use("/oauth", joinRouter);

// 세션 상태 확인 라우트 추가
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running at http://127.0.0.1:${PORT}`);
});
