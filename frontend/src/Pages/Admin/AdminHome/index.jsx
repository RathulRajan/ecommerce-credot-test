import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./adminHome.css";

const Listproducts = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/product");
    setItems(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      toast.success(" deleted ");
      getProduct();
    } catch (e) {
      e.message;
    }
  };

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/admin/login");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (data) => <img className="table-img" src={data} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Instock",
      dataIndex: "instock",
      key: "instock",
      render: (d) => {
        if (d) {
          return "yes";
        } else {
          return "no";
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (d) => d.name,
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "edit",
      render: (id) => (
        <EditOutlined
          onClick={() => editProduct(id)}
          style={{ cursor: "pointer" }}
        />
      ),
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
    <div className="list-product">
      <ToastContainer />
      <div className="top">
        <h1>Products</h1>
        <b onClick={onLogout}>logout</b>
      </div>
      <hr />
      <div className="add-product">
        <Button onClick={() => navigate("/add-product")} type="primary">
          ADD
        </Button>
      </div>
      <div className="table-div">
        <Table
          style={{ border: "5px solid black", margin: "-30px 0 20px 0" }}
          columns={columns}
          dataSource={items}
        />
      </div>
    </div>
  );
};

export default Listproducts;
