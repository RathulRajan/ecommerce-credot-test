import { Input, Button } from "antd";
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credtwo, setCredTwo] = useState({ email: "", password: "" });

  const onChange = (e, key) => {
    setCredTwo({ ...credtwo, [key]: e.target.value });
    console.log(credtwo);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        credtwo
      );
      console.log(response);
      const { token, userId, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      navigate("/admin");
    } catch (e) {
      console.log(e);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-main">
      <ToastContainer position="top-center" />
      <div
        className="login"
        style={{ backgroundColor: "#80c0d9", color: "black" }}
      >
        <h1>Admin Login</h1>
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
            fontSize: "medium",
            textDecoration: "underline",
            color: "black",
            cursor: "pointer",
          }}
        >
          <NavLink to="/user/login">User Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
