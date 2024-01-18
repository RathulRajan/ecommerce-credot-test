import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavbarCopy from "../../../Components/NavBarCopy";
import Info from "../../../Components/Info";

import "./userlogin.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const [credone, setCredOne] = useState({ email: "", password: "" });

  const onChange = (e, key) => {
    setCredOne({ ...credone, [key]: e.target.value });

    console.log(credone);
  };
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        credone
      );

      console.log(response);
      const { token, userId, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="main">
      <ToastContainer position="top-center" />
      <NavbarCopy />
      <div className="login">
        <h1>Log In</h1>
        <label>email</label>
        <Input onChange={(e) => onChange(e, "email")} />
        <label>password</label>
        <Input.Password onChange={(e) => onChange(e, "password")} />
        <div className="login-btn">
          <Button onClick={onSubmit} type="primary">
            Submit
          </Button>
        </div>
        <p
          style={{
            fontSize: "smaller",
            textDecoration: "underline",
            color: "black",
            cursor: "pointer",
          }}
        >
          <NavLink to="/user/signup">Don't have an account ?</NavLink>
        </p>
      </div>
      <Info />
    </div>
  );
};

export default UserLogin;
