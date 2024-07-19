import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { sortByPrice } from "../../store/productsSlice";
import styles from "./sortby.module.scss";

const SortBy = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSort = (sortOrder) => {
    dispatch(sortByPrice(sortOrder));
  };

  const giveClass = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.greenBox}>
      <h4>Filter By:</h4>
      
      <div className="sorter">

      <button style={{
        display: "flex",
        marginBottom: "-8px",
        // marginTop: "-1rem"
        }} onClick={() => giveClass("top-btn")}>
        <MdKeyboardArrowDown className="arrow-down" />
        <a><h3>Sort By Price</h3></a>
      </button>
      {isDropdownOpen && (
          <ul className={styles.sortPrices}>
          <li className={styles.sort}>
            <button className={styles.sortBtn} onClick={() => handleSort("asc")}>
              
              <h3>Low to High</h3>
            </button>
          </li>
          <li className={styles.sort}>
            <button className={styles.sortBtn} onClick={() => handleSort("desc")}>
             
              <h3>High to Low</h3>
            </button>
          </li>
        </ul>
      )}
      </div>
      </div>
  );
};

export default SortBy;
