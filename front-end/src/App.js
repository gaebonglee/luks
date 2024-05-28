import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./components/login/Login";
import JoinPage from "./pages/JoinPage";
import Mypage from "./pages/Mypage";
import Category from "./pages/Category";
import ProductDetail from "./components/product/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="mypage/*" element={<Mypage />} />
          <Route path="/category/:category" element={<Category />} />
          <Route
            path="/category/:category/:subcategory"
            element={<Category />}
          />
          <Route
            path="/product/:productName/:productId"
            element={<ProductDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
