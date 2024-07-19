import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import empty from "../../assets/empty.png";

const Home = ({ setAdd }) => {
  const navigate = useNavigate();

 
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    setAdd((prevAdd) => Math.max(prevAdd - 1, 0)); 
  };

  const updateQuantity = (index, delta) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          quantity: Math.max((item.quantity || 1) + delta, 1), 
        };
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className={styles.home_container}>
      <button className={styles.navigateBtn} onClick={() => navigate("/products")}>
        <MdOutlineKeyboardBackspace className="arrow" />
        <strong>Back to Shopping</strong>
      </button>
      <h1
        style={{
          marginBlock: "3.5rem",
        }}
      >
        SHOPPING CART
      </h1>

      <div className={styles.allContainer}>
        <div className={styles.leftContainer}>
          <ul className={styles.just_list}>
            <li>Product</li>
            <li>Quantity</li>
            <li>Price</li>
          </ul>

          <ul className={styles.product_list}>
            {cart.length === 0 ? (
              <div className={styles.emptyCartMessage}>
                <h1>Your Cart is empty</h1>
                <img src={empty} alt="empty cart image" />
                <button className={styles.homeBtn} onClick={() => navigate("/products")}>
                  <h2>
                    Let's add new products to the cart
                  </h2>
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <li key={index} className={styles.product_item}>
                  <button className={styles.deleteBtn} onClick={() => removeFromCart(index)}>
                    <RxCross1 className={styles.crossBtn} />
                  </button>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className={styles.product_image}
                  />
                  <div className={styles.dataContainer}>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "500",
                        marginBottom: "7px",
                      }}
                    >
                      {item.brand_name}
                    </div>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "300",
                        marginBottom: "5rem",
                      }}
                    >
                      {item.name}
                    </div>
                    <h5 style={{ fontSize: "1.6rem", fontWeight: "300" }}>Black</h5>
                    <h4 style={{ color: "#0BA42D", fontWeight: "300" }}>In Stock</h4>
                  </div>
                  <div className={styles.btnContainer}>
                    <button onClick={() => updateQuantity(index, -1)}><span>-</span></button>
                    {item.quantity || 1}
                    <button onClick={() => updateQuantity(index, 1)}><span>+</span></button>
                  </div>
                  <div className={styles.Price} style={{ fontWeight: "700", fontSize: "2.4rem" }}>
                    Price: ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <span className={styles.line}></span>

        <div className={styles.rightContainer}>
          <div className={styles.totalPrice}>
            <h1 className={styles.cartTotal}>CART TOTALS</h1>

            <div style={{ display: "flex", columnGap: "9rem" }}>
              <p style={{ color: "black", marginBottom: "2rem" }}>Shopping (3-5 Business Days)</p>
              <strong>Free</strong>
            </div>
            <div style={{ display: "flex", columnGap: "2rem" }}>
              <p style={{ color: "black", marginBottom: "2rem" }}>TAX (estimated for the United States (US))</p>
              <strong>$0</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "3rem", borderBottom: "2px dashed", marginBottom: "3rem" }}>
              <h4 style={{ color: "#0D2612", fontWeight: "300", fontSize: "1.8rem" }}>Subtotal</h4>
              <div style={{ fontWeight: "700", fontSize: "1.6rem" }}>
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6.8rem" }}>
              <h4 style={{ color: "#0D2612", fontSize: "1.8rem" }}>Total</h4>
              <div style={{ fontWeight: "700", fontSize: "2rem" }}>
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <Button>
              Proceed to Checkout
            </Button>

            <button style={{ marginTop: "5rem" }} className={styles.navigateBtn} onClick={() => navigate("/products")}>
              <MdOutlineKeyboardBackspace className="arrow" />
              <strong>Back to Shopping</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
