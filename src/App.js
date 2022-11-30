import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { pathapp } from "./constant/path";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/Admin/AdminLayout";
import Dashboard from "./layouts/Admin/pages/Dashboard";
import AdminProduct from "./layouts/Admin/pages/AdminProduct";
import AdminCategory from "./layouts/Admin/pages/AdminCategory";

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

const Delivery = lazy(() => import("./pages/Delivery"));

const Checkout = lazy(() => import("./pages/Checkout"));

const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));

//

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
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
          </Route>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to={pathapp.admin} />} />
            <Route path={pathapp.admin} element={<Dashboard />} />
            <Route path={pathapp.adminproduct} element={<AdminProduct />} />
            <Route path={pathapp.admincategory} element={<AdminCategory />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
