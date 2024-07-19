import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Header from "./components/header/Header";
import { IoSearch } from "react-icons/io5";
import NotFound from "./components/notfound/NotFound";
import Categories from "./components/Pages/Categories";
import Brands from "./components/Pages/Brands";
import Sales from "./components/Pages/Sales";
import Help from "./components/Pages/Help";
import About from "./components/Pages/About";
import User from "./components/Pages/User";
import GameGeek from "./assets/GameGeek.svg";

function App() {
  const [cart, setCart] = useState([]);
  const [add, setAdd] = useState(0);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseURL}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [add, baseURL]);

  return (
    <div>
      <Router>
        <Header />
          <nav className="navbar">
            <img src={GameGeek} className="gamegeek" alt="logo"/>

            <ul className="header-link">
              {/* <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/"
                >
                  Home
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/sales"
                >
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/help"
                >
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
            </ul>
            <ul>
             <button className="search-btn">
             <div className="cart-icon">
                <IoSearch />
              </div>
             </button>
             <NavLink to="/user">
              <div className="cart-icon">
                <FaUser />
              </div>
             </NavLink>
             <NavLink to="/">
              <div className="cart-icon">
                <FaCartShopping />
                {add > 0 && <span className="cart-count">{add}</span>}
              </div>
             </NavLink>

            </ul>
          </nav>
        <Routes>
          <Route
            path="/"
            element={<Home cart={cart} setCart={setCart} setAdd={setAdd} />}
          />
          <Route
            path="/products"
            element={<Products cart={cart} setCart={setCart} setAdd={setAdd} />}
          />
          <Route path="/about" element={<About />}></Route>
          <Route path="/brands" element={<Brands />}></Route>
          <Route path="/sales" element={<Sales />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/user" element={<User />}></Route>
          <Route path="/*" element={<NotFound />}/>    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
