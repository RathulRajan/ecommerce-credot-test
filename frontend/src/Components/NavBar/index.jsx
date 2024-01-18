import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context";
import { useContext } from "react";
import "./navbar.css";

const Navbar = ({ scrollToShoes, scrollToBags, scrollToContact, size }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const onLogout = (e) => {
    if (e.target.name === "logout" && role === "Admin") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");

      navigate("/admin/login");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/user/login");
    }
    console.log(e);
  };

  return (
    <div className="navbar">
      <div className="left">
        <p>Home</p>
        <p onClick={scrollToShoes}>Shoes</p>
        <p onClick={scrollToBags}>Backpacks</p>
        <p onClick={scrollToContact}>Contact</p>
      </div>
      <div className="right">
        {token ? (
          <button className="logout-btn" name="logout" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <button name="login">
            <NavLink to="/user/login">Log in</NavLink>
          </button>
        )}
        <div className="cart">
          <NavLink to="/home/cart">
            <i className="fa-solid fa-cart-shopping">
              <span className="cart-value">{cart.length}</span>
            </i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
