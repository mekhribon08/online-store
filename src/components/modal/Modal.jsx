import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Modal(about) {
  const { id } = useParams();
  const { setAuth } = useContext(AuthContext);
  const me = about;
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  async function updateUser(form) {
    form.preventDefault();
    const formD = new FormData(form.target);
    useEffect(() => {
      fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formD.get("name"),
          email: formD.get("email"),
          avatar: "https://pngtree.com/so/avatar",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem(
            "id",
            JSON.stringify({
              id: res.id,
            })
          );
          setAuth(res.id);
        });
    }, []);
  }
  return (
    <div>
      <form onSubmit={(evt) => updateUser(evt)}>
        <input
          type="email"
          name="email"
          onChange={(evt) => setName(evt.target.value)}
          defaultValue={name}
          placeholder="email"
        />
        <input
          type="text"
          name="name"
          onChange={(evt) => setEmail(evt.target.value)}
          defaultValue={email}
          placeholder="nickname"
        />
        <button type="submit">update</button>
      </form>
    </div>
  );
}
