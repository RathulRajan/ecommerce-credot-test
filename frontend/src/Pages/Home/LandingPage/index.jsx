import Navbar from "../../../Components/NavBar";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import { Card, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Meta } = Card;
import { CartContext } from "../../../context";

import "./landingpage.css";

const LandingPage = ({ product }) => {
  const [shoesdata, setShoesData] = useState([]);
  const [bagsdata, setBagsData] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  const fourthDivRef = useRef(null);
  const fifthDivRef = useRef(null);
  const finalDivRef = useRef(null);

  const handleAddToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem._id === item._id);

    if (!isItemInCart) {
      setCart((prevCart) => [...prevCart, item]);
    } else {
      toast.warning("Item is already in the cart");
    }
  };
  console.log(cart);

  const getProductShoe = async () => {
    const response = await axios.get(
      "http://localhost:5000/product/category/65a3890342e317363364d8e9"
    );
    setShoesData(response.data);
  };
  const getProductBag = async () => {
    const response = await axios.get(
      "http://localhost:5000/product/category/65a4006409f756e679dd28f9"
    );
    setBagsData(response.data);
  };

  useEffect(() => {
    getProductShoe();
    getProductBag();
  }, []);

  const handleScrollToShoes = () => {
    fourthDivRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToBags = () => {
    fifthDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    finalDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main-landing">
      <ToastContainer position="bottom-center" autoClose={1000} />

      <Navbar
        scrollToShoes={handleScrollToShoes}
        scrollToBags={handleScrollToBags}
        scrollToContact={handleScrollToContact}
      />

      <div className="second-div"></div>
      <div className="third-div">
        <div className="category-box category-box-blue">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "100px",
            }}
            className="img"
          >
            <h1>Watch</h1>
            <img
              style={{ width: "100px", height: "80px" }}
              src="/watch.png"
              alt=""
            />
          </div>
        </div>
        <div
          style={{ display: "flex" }}
          className="category-box category-box-green"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "100px",
            }}
            className="img"
          >
            <h1>Bag</h1>
            <img
              style={{ width: "100px", height: "80px" }}
              src="/bags.png"
              alt=""
            />
          </div>
        </div>
        <div className="category-box category-box-red">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "100px",
            }}
            className="img"
          >
            <h1>Shoes</h1>
            <img
              style={{ width: "100px", height: "80px" }}
              src="/shoes.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div ref={fourthDivRef} className="fourth-div">
        <h1>Shoes</h1>
        <div className="card-div">
          {shoesdata.map((item) => {
            return (
              <Card
                hoverable
                key={item._id}
                style={{
                  width: 400,
                }}
                cover={
                  <img
                    height={250}
                    alt="example"
                    src={item.Image}
                    crossOrigin="anonymous"
                  />
                }
              >
                <Meta
                  title={<p style={{ textAlign: "center" }}>{item.name}</p>}
                  description={
                    <>
                      <p style={{ textAlign: "center" }}>{item.description}</p>
                      <h1 style={{ textAlign: "center" }}>${item.price}</h1>
                      <div className="buy-button">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          style={{
                            width: "100px",
                            height: "35px",
                            background: "#080808",
                            color: "#ffffff",
                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div>
      <div ref={fifthDivRef} className="fifth-div">
        <h1>Bags</h1>
        <div className="card-div">
          {bagsdata.map((item) => {
            return (
              <Card
                hoverable
                key={item._id}
                style={{
                  width: 400,
                }}
                cover={
                  <img
                    height={250}
                    alt="example"
                    src={item.Image}
                    crossOrigin="anonymous"
                  />
                }
              >
                <Meta
                  title={<p style={{ textAlign: "center" }}>{item.name}</p>}
                  description={
                    <>
                      <p style={{ textAlign: "center" }}>{item.description}</p>
                      <h1 style={{ textAlign: "center" }}>${item.price}</h1>
                      <div className="buy-button">
                        <Button
                          onClick={() => {
                            handleAddToCart(item);
                          }}
                          style={{
                            width: "100px",
                            height: "35px",
                            background: "#080808",
                            color: "#ffffff",
                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div>
      <div ref={finalDivRef} className="final-div">
        <div className="info-div">
          <h2>LET'S STAY IN TOUCH</h2>
          <p>get updates on sales specials and more</p>
          <Input placeholder="Enter your email" />
          <Button
            style={{ width: "100px", height: "30px", background: "#e4007c" }}
            type="primary"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
