import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import SortBy from "../sortby/SortBy";
import { MdOutlineArrowDropUp } from "react-icons/md";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart, setAdd }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [colors, setColors] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [brandOpen, setBrandOpen] = useState(true); // Default open
  const [colorOpen, setColorOpen] = useState(true); // Default open

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(`${query}`);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400){
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400){
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };





  return (
    <div className={styles.box_wrapper}>
      <SortBy />
      <div className={styles.container}>
        <aside>
          <div>
            <div className={styles.title}>
              <h2>BRAND</h2>
              <button onClick={() => setBrandOpen(!brandOpen)}>
                <MdOutlineArrowDropUp
                  className={`${styles.arrow} ${
                    brandOpen ? styles.arrowUp : styles.arrowDown
                  }`}
                  style={{ fontSize: "2rem", marginTop: "2.5rem" }}
                />
              </button>
            </div>
            <div className={`${styles.dropdown} ${brandOpen ? styles.open : styles.closed}`}>
              <ul>
                {brands.map((brand, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      value={brand}
                      name="brand"
                      id={brand}
                      checked={brand === selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                    <label htmlFor={brand}>{brand}</label>
                  </li>
                ))}
              </ul>
              <button  className={styles.resetBtn} onClick={() => setSelectedBrand("")}>
                Reset
              </button>
            </div>
          </div>
          <div>
            <div className={styles.title}>
              <h2 style={{marginTop: "2rem"}}>COLORS</h2>
              <button onClick={() => setColorOpen(!colorOpen)}>
                <MdOutlineArrowDropUp
                  className={`${styles.arrow} ${
                    colorOpen ? styles.arrowUp : styles.arrowDown
                  }`}
                  style={{ fontSize: "2rem", marginTop: "2.5rem" }}
                />
              </button>
            </div>
            <div className={`${styles.dropdown} ${colorOpen ? styles.open : styles.closed}`}>
              <ul className={styles.colorsContainer}>
                {colors.map((color, index) => (
                  <li key={index}>
                    <div
                      style={{
                        background: color,
                        outline: selectedColor === color ? "3px solid red" : "",
                      }}
                      className={styles.color}
                      onClick={() => setSelectedColor(color)}
                    />
                  </li>
                ))}
              </ul>
              <button className={styles.resetBtn} onClick={() => setSelectedColor("")}>
                Reset
              </button>
            </div>
          </div>
        </aside>
        <main>
          {loading ? (
            <p>Loading...</p>
          ) : products.length ? (
            <div className={styles.grid}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  setAdd={setAdd}
                />
              ))}
            </div>
          ) : (
            <p>No products</p>
          )}
        </main>
      </div>
      {showScroll && (
        <button className={styles.scrollTop} onClick={scrollTop}>
          <MdOutlineArrowDropUp />
        </button>
      )}
    </div>
  );
};

export default Products;
