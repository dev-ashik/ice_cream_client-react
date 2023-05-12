import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PrivetRoutes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PrivetAdminroute from "./components/Routes/PrivetAdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import { SearchProvider } from "./context/search";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import { CartProvider } from "./context/cart";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";

// react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import CheckOut from "./pages/user/CheckOut";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:slug" element={<CategoryProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user" element={<Dashboard />} />
                <Route path="user/orders" element={<Orders />} />
                <Route path="user/profile" element={<Profile />} />
                <Route path="user/checkout" element={<CheckOut />} />
              </Route>
              <Route path="/dashboard" element={<PrivetAdminroute />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route
                  path="admin/create-category"
                  element={<CreateCategory />}
                />
                <Route
                  path="admin/create-product"
                  element={<CreateProduct />}
                />
                <Route path="admin/products" element={<Products />} />
                <Route
                  path="admin/products/:slug"
                  element={<UpdateProduct />}
                />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/all-product" element={<AdminOrders />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

// https://www.motocms.com/website-templates/demo/54897.html
