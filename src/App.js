import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Products from "./components/Products/Products";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import Announcenment from "./components/Announcenment/Announcenment";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup";
import { pathapp } from "./constant/path";
import { Checkout } from "./pages/Checkout";
import { PaymentSuccess } from "./pages/PaymentSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Announcenment />
        <Header />
        <div className="Content">
          <Routes>
            <Route path={pathapp.home} element={<Home />} />
            <Route path={pathapp.about} element={<About />} />
            <Route path={pathapp.cart} element={<Cart />} />
            <Route path={pathapp.signin} element={<Signin />} />
            <Route path={pathapp.products} element={<Products />} />
            <Route path={pathapp.productId} element={<DetailProduct />} />
            <Route path={pathapp.signup} element={<Signup />} />
            <Route path={pathapp.checkout} element={<Checkout />} />
            <Route
              path={pathapp.checkout_success}
              element={<PaymentSuccess />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
