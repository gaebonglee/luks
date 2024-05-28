const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/product");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Router 추가
app.use("/product", productRouter);

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running at http://127.0.0.1:${PORT}`);
});