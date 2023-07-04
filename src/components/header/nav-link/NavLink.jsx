import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import "./NavLink.scss";

export default function NavLink({
  className = "navlink",
  activeClassName = "active",
  pendingClassName = "pending",
  ...props
}) {
  return (
    <RouterNavLink
      {...props}
      className={({ isActive, isPending }) =>
        `${className} ${
          isPending ? pendingClassName : isActive ? activeClassName : ""
        }`
      }
    />
  );
}
