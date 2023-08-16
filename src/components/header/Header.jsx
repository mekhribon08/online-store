import React from "react";
import NavLink from "./nav-link/NavLink";
import shoppingCart from "./../../assets/shopping-cart.png";
import user from "./../../assets/user.png";
import "./../header/Header.scss";
import logo from "./../../assets/logo.jpg";
import { useRef } from "react";

export default function Header() {
  return (
    <>
      <div className="header">
        <nav className="header__nav">
          <h1>
            <NavLink to={"/"}>
              <img src={logo} alt="logo" width={180} />
            </NavLink>
          </h1>
          <ul>
            <li>
              <NavLink to={`/profile`}>
                <img src={user} alt="user-icon" width={28} />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/cart"}>
                <img src={shoppingCart} alt="shopping-cart" width={26} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
