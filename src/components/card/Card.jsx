import { FaCartShopping } from "react-icons/fa6";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import { CgEnter } from "react-icons/cg";

const Card = ({ product, setCart, setAdd }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCartCount = sessionStorage.getItem(`cartCount_${product.id}`);
    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount, 10));
    }
  }, [product.id]);

  const addToCart = (product) => {
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setAdd((prevAdd) => prevAdd + 1);
    sessionStorage.setItem(`cartCount_${product.id}`, newCartCount.toString());

    console.log("Qo'shilgan mahsulot:", product);
  };

  return (
    <div className={styles.cart_box}>
      <img src={product.image_url} alt={product.product_name} />
      <div className={styles.flex}>
        <h4>
          <Link to={`/products/${product.id}`} className={styles.navigate_link}>
            {product.name} <CgEnter className={styles.arrow} />
          </Link>
        </h4>
      </div>
      <p className={styles.par}>{product.description}</p>

      <div className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div key={index} style={{ background: color }} className={styles.color} />
        ))}
      </div>
      <div className={styles.price}>${product.price}</div>
      <div className={styles.basic}>
        <Button onClick={() => addToCart(product)}>
          <FaCartShopping />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
