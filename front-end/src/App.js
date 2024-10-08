import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Root from "./pages/Root";
import LayoutRoot from "./pages/LayoutRoot"
// import Home from "./pages/Home";
import MainHome from "./pages/MainHome";
import PrivateRoute from "./components/private/PrivateRoute";
import ScrollToTop from "./pages/ScrollToTop";
import "./style/CustomSwal.scss";
//컴포넌트
import Login from "./components/login/Login";
import KakaoLogin from "./components/login/KakaoLogin";
import UserJoin from "./pages/UserJoin";
import Mypage from "./pages/Mypage";
import Category from "./pages/Category";
import ProductDetail from "./components/product/ProductDetail";
import MyBag from "./pages/MyBag";
import Checkout from "./pages/Checkout";
import Confirmed from "./pages/Confirmed";
// import Temperature from "./pages/Temperature";
// import ChooseOne from "./components/t-emperature/ChooseOne"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutRoot  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        >
          {/* <Route index element={<Home />} /> */}
          <Route index element={<MainHome />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/join" element={<UserJoin />} />
          <Route
            path="/oauth/kakaologin"
            element={<KakaoLogin setIsLoggedIn={setIsLoggedIn} />}
          />
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
          <Route path="/confirmed" element={<Confirmed />} />
          {/* <Route path="/t-emperature" element={<Temperature />} />
          <Route path="/t-emperature/chooseOne" element={< ChooseOne />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
