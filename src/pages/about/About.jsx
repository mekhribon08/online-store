import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ backgroundColor: "blue" }}>
      About,{" "}
      <Link style={{ color: "white" }} to={"/"}>
        got to home
      </Link>
    </div>
  );
}
