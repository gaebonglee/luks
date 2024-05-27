import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./components/login/Login";
import JoinPage from "./pages/JoinPage";
import Mypage from "./pages/Mypage";
import ProductList from "./components/product/ProductList";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="mypage/*" element={<Mypage />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/detail" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
