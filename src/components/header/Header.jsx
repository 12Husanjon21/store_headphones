import React from 'react'
import s from "./header.module.scss" 
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiCursorClick, HiOutlineGlobeAlt } from "react-icons/hi";
import GG from "../../assets/GG.svg";

const Header = () => {
  return (
    <div>
        <header>
            <div className={s.phoneBox}>
            <div>
                <img className={s.image} src={GG} alt="Logo" />
            </div>
            <MdOutlinePhoneCallback className={s.phone}/>
            <p>+998-91-019-47-44</p>
            </div>
            
            <div className={s.centerHead}>
              <p>Get 50% Off on the Selected items </p>
              <span className={s.lent}></span>
              <p className={s.lan}>Shop now</p>
            </div>

            <div className={s.rightHeader}>
              <div className={s.lang}>
                <MdKeyboardArrowDown className={s.arrow}/>
                <p className={s.lan}>English</p>
                <img className={s.image_USA} src="../../.././public/USA.png" alt="flag " />
              </div>
              <div className={s.global}>
                <HiOutlineGlobeAlt className={s.globe}/>
                <p className={s.lan}>Location</p>
              </div>
            </div>
        </header>
    </div>
  )
}

export default Header;