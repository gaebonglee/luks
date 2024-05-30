const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const joinRouter = require("./routes/join");
const loginRouter = require("./routes/login");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/join", joinRouter);
app.use("/login", loginRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running at http://127.0.0.1:${PORT}`);
});
