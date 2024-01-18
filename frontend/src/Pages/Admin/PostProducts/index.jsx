import { UploadOutlined } from "@ant-design/icons";
import { Input, Switch, Select, Button, Upload, Image } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import axios from "axios";

import "./postproducts.css";

const PostProducts = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    instock: false,
    Image: "",
    quantity: "",
  });

  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const response = await axios.get("http://localhost:5000/category");
    const op = response.data.map((item) => {
      return { label: item.name, value: item._id };
    });
    setCategory(op);
    console.log(category);
  };

  useEffect(() => {
    fetchCategory();
    if (id) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setProducts(response.data);
    const {
      name,
      description,
      price,
      image,
      brand,
      department,
      instock,
      quantity,
    } = response.data;
  };

  const editProduct = async () => {
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, products);
      navigate("/admin");
    } catch (e) {
      e.message;
    }
  };

  const onChange = (e, key) => {
    let value = e.target.value;
    if (key == "quantity" || key == "price") {
      value = parseFloat(value);
    }
    setProducts({ ...products, [key]: e.target.value });
  };
  console.log(products);

  const checkInstock = (e) => {
    setProducts({ ...products, instock: e });
  };

  const onSelect = (e) => {
    setProducts({ ...products, category: e });
  };

  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setProducts({ ...products, Image: info.file.response.url });
    }
    console.log(info);
  };
  console.log(products);

  const post = async () => {
    try {
      await axios.post("http://localhost:5000/product", products);
      navigate("/admin");
    } catch (e) {}
  };
  return (
    <div className="post-product">
      <Header text={id ? "EDIT PRODUCT" : "ADD PRODUCT"} />
      <div className="product-form">
        <div className="product-form-left">
          <div className="product-input">
            <label>Name</label>
            <Input
              value={products.name}
              onChange={(e) => onChange(e, "name")}
            />
          </div>
          <div className="product-input">
            <label>Description</label>
            <Input.TextArea
              value={products.description}
              rows={5}
              onChange={(e) => onChange(e, "description")}
            />
          </div>
          <div className="product-input">
            <label>Price</label>

            <Input
              value={products.price}
              type="number"
              onChange={(e) => onChange(e, "price")}
            />
          </div>
          <div className="product-input">
            <label>Brand</label>
            <Input
              value={products.brand}
              onChange={(e) => onChange(e, "brand")}
            />
          </div>
        </div>
        <div className="product-form-right">
          <div className="product-input">
            <label>In Stock</label>
            <Switch
              checked={products.instock}
              onChange={checkInstock}
              style={{ width: "50px" }}
            />
          </div>
          <div className="product-input">
            <label>Quantity</label>
            <Input
              value={products.quantity}
              type="number"
              onChange={(e) => onChange(e, "quantity")}
            />
          </div>

          <div className="product-input">
            <label>Category</label>

            <Select
              value={products.category}
              options={category}
              onChange={onSelect}
            />
          </div>
          <div className="product-input">
            <label>Image</label>
            <Upload
              name="file"
              action="http://localhost:5000/upload"
              onChange={onUploadChange}
            >
              <Button style={{ width: "200px" }} icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
            <Image className="upload-image" width={100} src={products.Image} />
          </div>
          <Button
            style={{ width: "150px" }}
            onClick={id ? editProduct : post}
            type="primary"
            className="post-product-btn"
          >
            {id ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostProducts;
