import { Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/Admin/AdminHome";
import PostProducts from "./Pages/Admin/PostProducts";
import LandingPage from "./Pages/Home/LandingPage";
import AdminLogin from "./Pages/Admin/AdminLogin";
import { Navigate } from "react-router-dom";
import UserSignUp from "./Pages/Home/UserSignUp";
import UserLogin from "./Pages/Home/UserLogin";
import "./App.css";
import Cart from "./Pages/Home/Cart";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const Token = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "Admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/admin/login" />;
    }
  };

  return (
    <div>
      <Routes>
        {/* admin */}

        <Route
          path="/admin"
          element={
            <Token>
              <AdminHome />
            </Token>
          }
        />
        <Route
          path="/add-product"
          element={
            <Token>
              <PostProducts />
            </Token>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Token>
              <PostProducts />
            </Token>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* home  */}
        <Route
          path="/"
          element={
            token && role === "User" ? (
              <LandingPage />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/home/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
