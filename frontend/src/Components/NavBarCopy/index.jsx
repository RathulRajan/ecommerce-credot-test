import { Button } from "antd";
import { NavLink } from "react-router-dom";

import "./navbar.css";

const NavbarCopy = () => {
  return (
    <div className="navbar">
      <div className="left">
        <p>Home</p>
        <p>Contact</p>
      </div>
      <div className="right">
        <Button
          style={{ width: "150px", color: "white", backgroundColor: "black" }}
          type="primary"
        >
          <NavLink to="/admin/login">Admin login</NavLink>
        </Button>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  );
};

export default NavbarCopy;
