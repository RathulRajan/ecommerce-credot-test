import React, { useContext } from "react";
import NavbarCopy from "../../../Components/NavBarCopy";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../context";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const deleteProduct = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (data) => (
        <img
          style={{
            width: "200px",
            height: "150px",
            border: "1px solid black",
            borderRadius: "10px",
          }}
          src={data}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (id) => (
        <DeleteOutlined
          onClick={() => deleteProduct(id)}
          style={{ fontSize: "16px", color: "#ff0000", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <div className="cart-main">
      <div className="navbar">
        <div className="left">
          <h2>My Cart</h2>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
        <div className="right">
          <NavLink to="/">
            <b>Go back</b>
          </NavLink>
        </div>
      </div>
      <Table columns={columns} dataSource={cart} />
      <Button
        onClick={() => alert("Checkout functionality not implemented")}
        style={{
          backgroundColor: "green",
          color: "black",
          width: "200px",
          height: "50px",
          border: "2px solid black",
          fontSize: "medium",
          padding: "10px",
        }}
      >
        {" "}
        Proceed to Check Out
      </Button>
    </div>
  );
};

export default Cart;
