import React from "react";
import NavLink from "./nav-link/NavLink";

export default function Header() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home </NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/posts"}>Posts</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
