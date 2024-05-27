const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./routes/product");

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3001" }));

//router 추가
app.use("/product", productRouter);

app.listen(5000, () => {
  console.log("server is running...");
});
