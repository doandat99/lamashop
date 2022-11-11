import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "./components/Header/Header";
import Announcenment from "./components/Announcenment/Announcenment";
import Footer from "./components/Footer/Footer";
import { Delivery } from "./pages/Delivery";
import { Checkout } from "./pages/Checkout";
import { pathapp } from "./constant/path";
import { PaymentSuccess } from "./pages/PaymentSuccess";
//React lazy

const Home = lazy(() => import("./pages/Home"));

const About = lazy(() => import("./pages/About"));

const Cart = lazy(() => import("./pages/Cart"));

const Signin = lazy(() => import("./pages/Signin"));

const Products = lazy(() => import("./components/Products/Products"));

const DetailProduct = lazy(() =>
  import("./components/DetailProduct/DetailProduct")
);
const Signup = lazy(() => import("./pages/Signup"));

//

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Announcenment />
        <Header />
        <div className="Content">
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path={pathapp.home} element={<Home />} />
              <Route path={pathapp.about} element={<About />} />
              <Route path={pathapp.cart} element={<Cart />} />
              <Route path={pathapp.signin} element={<Signin />} />
              <Route path={pathapp.products} element={<Products />} />
              <Route path={pathapp.productId} element={<DetailProduct />} />
              <Route path={pathapp.signup} element={<Signup />} />
              <Route path={pathapp.delivery} element={<Delivery />} />
              <Route path={pathapp.checkout} element={<Checkout />} />
              <Route
                path={pathapp.checkout_success}
                element={<PaymentSuccess />}
              />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
