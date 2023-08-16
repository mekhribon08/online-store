import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

export default function Products() {
  const [search, setSearch] = useState([]);
  const [array, setArray] = useState([]);
  const { identifier } = useParams();
  const navigate = useNavigate();
  // const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  async function aboutP() {
    const identifierArray = [];
    identifier.split("&").forEach((path) => {
      identifierArray.push(path.split("=")[1]);
      useEffect(() => {
        fetch(
          `https://api.escuelajs.co/api/v1/products/?${
            identifierArray[0] != "null" ? "title=" + identifierArray[0] : ""
          }${
            identifierArray[1] != "null"
              ? "&price_min=" + identifierArray[1]
              : ""
          }${
            identifierArray[2] != "null"
              ? "&price_max=" + identifierArray[2]
              : ""
          }`
        )
          .then((res) => res.json())
          .then((res) => {
            res ? setArray([]) : setArray(array);
            res ? setSearch(res) : setSearch([]);
          })
          .catch((err) => console.error(err));
      }, [identifier]);
    });
  }
  async function searchP(evt) {
    evt.preventDefault();
    const form = new FormData(evt.target);
    const name = form.get("name");
    const min = form.get("min");
    const max = form.get("max");
    const link = `/products/${name ? "title=" + name : "title=null"}${
      min ? "&price_min=" + min : "&price_min=null"
    }${max ? "&price_max=" + max : "&price_max=null"}`;
    navigate(link);
  }
  aboutP();
  return (
    <>
      <form onSubmit={(evt) => searchP(evt)} method="get" className="form">
        <input name="name" placeholder="Title" id="" type="search" />
        <input name="min" placeholder="Min $" id="" type="number" />
        <input name="max" placeholder="Max $" id="" type="number" />
        <button className="btn-primary" type="submit">
          search
        </button>
      </form>
      <MDBContainer fluid className="my-5 text-center">
        <MDBRow>
          {search?.map((product) => {
            return (
              <MDBCol
                onClick={() => navigate(`/product/${product?.id}`)}
                key={product.id}
                md="12"
                lg="4"
                className="mb-4"
              >
                <MDBCard>
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom"
                  >
                    <MDBCardImage
                      src={product?.images[0]}
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div className="mask"></div>
                      <div className="hover-overlay">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody>
                    <h5 className="card-title mb-3">{product?.title}</h5>
                    <p>{product?.description}$</p>
                    <h6 className="mb-3">{product?.price}$</h6>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </>
  );
}
