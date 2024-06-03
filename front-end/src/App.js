import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import PrivateRoute from "./components/private/PrivateRoute";
import Login from "./components/login/Login";
import JoinPage from "./pages/JoinPage";
import Mypage from "./pages/Mypage";
import Category from "./pages/Category";
import ProductDetail from "./components/product/ProductDetail";
import MyBag from "./components/mybag/MyBag";
import Checkout from "./pages/Checkout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Root isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/join" element={<JoinPage />} />
          <Route
            path="mypage/*"
            element={
              <PrivateRoute allowedRoles={["member"]}>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route path="/category/:category" element={<Category />} />
          <Route
            path="/category/:category/:subcategory"
            element={<Category />}
          />
          <Route
            path="/product/:productName/:productId"
            element={<ProductDetail />}
          />
          <Route path="/mybag" element={<MyBag />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
