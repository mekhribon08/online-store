import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { AuthContext } from "../../../context/AuthContext";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
export default function UnAuthorizedApp({ registered = true }) {
  const navigate = useNavigate();
  const tokenJson = localStorage.getItem("token");
  const token = JSON.parse(tokenJson);
  const [register, setRegister] = useState(false);
  if (!token)
    useEffect(() => {
      navigate("/auth");
    }, []);
  const { setAuth } = useContext(AuthContext);
  async function registerUser(form) {
    form.preventDefault();
    const formD = new FormData(form.target);
    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/users", {
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
          navigate(`/login`);
        });
    }, []);
  }
  async function loginUser(form) {
    form.preventDefault();
    const formD = new FormData(form.target);
    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formD.get("email"),
          password: formD.get("password"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (+res.statusCode == 401) {
            setRegister(true);
          }
          if (+res.statusCode == 401) {
            setRegister(true);
          }
          localStorage.setItem(
            "token",
            JSON.stringify({
              token: res.access_token,
            })
          );
          setAuth(res.access__token);
        });
    }, []);
    useEffect(() => {
      fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      navigate(`/profile`);
    }, []);
  }
  const [justifyActive, setJustifyActive] = useState(
    registered ? "tab2" : "tab1"
  );

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  return (
    <>
      {/* <button
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
      <form
        onSubmit={(evt) => loginUser(evt)}
        className={!login ? "d-n" : ""}
        action=""
      >
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">sign in</button>
      </form>
      <form
        onSubmit={(evt) => {
          registerUser(evt);
        }}
        className={!register ? "d-n" : ""}
      >
        <input name="email" type="email" placeholder="email" />
        <input name="name" type="text" placeholder="nickname" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">click</button>
      </form> */}
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <form onSubmit={(evt) => loginUser(evt)}>
              <MDBInput
                wrapperClass="mb-4"
                name="email"
                label="Email address"
                id="form1"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                name="password"
                label="Password"
                id="form2"
                type="password"
              />
              <MDBBtn type="submit" className="mb-4 w-100">
                Sign in
              </MDBBtn>
            </form>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <form
              onSubmit={(evt) => {
                registerUser(evt);
              }}
            >
              <MDBInput
                wrapperClass="mb-4"
                name="name"
                label="Name"
                id="form1"
                type="text"
              />
              <MDBInput
                wrapperClass="mb-4"
                name="email"
                label="Email"
                id="form1"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                name="password"
                label="Password"
                id="form1"
                type="password"
              />
              <MDBBtn type="submit" className="mb-4 w-100">
                Sign up
              </MDBBtn>
            </form>
            {register && <h2>You Unauthorized</h2>}
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}
