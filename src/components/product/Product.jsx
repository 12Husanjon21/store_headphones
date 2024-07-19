import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Product.module.scss";
import Button from "../button/Button";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import deliv from "../../assets/deliv.svg";
import deliv2 from "../../assets/deliv2.svg";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = ( setCart, setAdd) => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`${baseURL}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    }

    fetchProductById();
  }, [productId]);

  const navigate = useNavigate();


  return (
    <div className={styles.center}>
      <hr className={styles.line}/>
      <button onClick={() => navigate("/products")} className={styles.backBtn}>Back to Shop</button>
      {product && (
        <>
          <p className={styles.par}>
            Products / Gaming Headsets & Audio / 
            <strong>{product.name}</strong>
          </p>
          <div className={styles.product}>
            <div className={styles.product_img}>
              <img src={product.image_url} alt={product.name} />
              <div className={styles.imgContainer}>
                <ul>
                  <li><img src={product.image_url} alt="product-image" /></li>
                  <li><img src={product.image_url} alt="product-image" /></li>
                  <li><img src={product.image_url} alt="product-image" /></li>
                  <li><img src={product.image_url} alt="product-image" /></li>
                  <li><img src={product.image_url} alt="product-image" /></li>
                </ul>
              </div>
            </div>
  
            <div className={styles.productDetails}>
              <h2>{product.name}</h2>
              <p className={styles.desc}>{product.description}</p>
              <p className={styles.price}>Price: ${product.price}</p>
              <p className={styles.desc}>Suggested payments with 6 month special financing</p>
              {/* <p className={styles.category}> Brand: {product.brand_name}</p> */}
              <p style={{fontSize: "2.4rem"}}><strong>Choose a color</strong></p>
          
              <div className={styles.colors}>
                {product.color_options.map((color, index) => (
                  <div
                    key={index}
                    style={{ background: color }}
                    className={styles.color}
                  />
                ))}
              </div>
              <div className={styles.btnContainer}>
                <button><span>-</span></button>
                1
                <button><span>+</span></button>
              </div>
              <div className={styles.btnBox}>
              <Button>
                <FaCartShopping />
                    Add to Cart
              </Button>
              <button className={styles.likeBtn}>
                
                  <FaRegHeart className={styles.heartIcon}/>
              </button>
              </div>

              <div className={styles.deliveryBox}>
                  <div className={styles.delivery}>
                    <span>
                      <img className={styles.svgImg} src={deliv} alt="bus" />
                      <div>
                        <h5>Free delivery</h5>
                        <p style={{ borderBottom: "2px dashed", paddingBottom: "2rem" }}>Enter your Postal Code for Delivery Availability</p>
                      </div>
                    </span>
                    <span>
                      <img className={styles.svgImg} src={deliv2} alt="bus" />
                      <div>
                        <h5>Return Delivery</h5>
                        <p>Free delivery 30 Days return</p>
                      </div>
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
