import React from "react";
import styles from "./notfound.module.scss"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const NotFound = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/products");
        
    }


    return (
        <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button onClick={handleNavigate} className={styles.home_btn}>
        Go back to the ProductsPage
      </button>
        <ToastContainer />
    </div>
  );
};

export default NotFound;