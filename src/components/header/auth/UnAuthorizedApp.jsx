import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { AuthContext } from "../../../context/AuthContext";
export default function UnAuthorizedApp() {
  const navigate  = useNavigate()
  const { setAuth } = useContext(AuthContext);
  async function registerUser(form) {
    form.preventDefault();
    const formD = new FormData(form.target);
    const register = await fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formD.get("name"),
        email: formD.get("email"),
        password: formD.get("password"),
        avatar: "https://pngtree.com/so/avatar",
      }),
    });
    setAuth(register.json().id);
  }
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <>
      <button
        onClick={() => setLogin(!register)}
        className={`${login ? "d-n" : ""} ${register ? "d-n" : ""}`}
      >
        login
      </button>
      <button
        onClick={() => setRegister(!login)}
        className={`${login ? "d-n" : ""} ${register ? "d-n" : ""}`}
      >
        register
      </button>
      <form className={!login ? "d-n" : ""} action="">
        <input type="text" placeholder="email or nickname" />
        <input type="password" placeholder="password" />
      </form>
      <form
        onSubmit={(evt) => registerUser(evt)}
        className={!register ? "d-n" : ""}
        action=""
      >
        <input name="email" type="email" placeholder="email" />
        <input name="name" type="text" placeholder="nickname" />
        <input name="password" type="password" placeholder="password" />
        <button onClick={() => navigate(`/profile/${5}`)} type="submit">click</button>
      </form>
    </>
  );
}
