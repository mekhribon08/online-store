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

export default function Product() {
  const [array, setArray] = useState([]);
  const [arrayAll, setArrayAll] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = JSON.parse(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : "[]"
  );

  async function aboutP(id) {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setArray(res);
        console.log(res.category.id);
        getCategoriesP(res?.category?.id);
      })
      .catch((err) => console.log(err));
  }
  function setCard(id, evt) {
    evt.target.textContent = "added";
    let trueFalseArr = [];
    console.log(cart);
    if (!cart) {
      trueFalseArr = [];
      cart.forEach((product) => {
        product.id == id ? trueFalseArr.push(true) : trueFalseArr.push(false);
      });
    } else {
      trueFalseArr = [true];
    }
    console.log(
      cart,
      trueFalseArr.every((a) => a == false),
      trueFalseArr
    );
    if (trueFalseArr.every((a) => a == false)) return;
      fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart, { data: res, count: 1, id: id }])
          );
        })
        .catch((err) => console.log(err));
  }
  async function getCategoriesP(id) {
    fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
      .then((res) => res.json())
      .then((res) => {
        setArrayAll(res);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    aboutP(id);
  }, [id]);
  return (
    <>
      {array && (
        <MDBCol key={array?.id} md="12" lg="4" className="mb-4">
          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-zoom"
            >
              <MDBCardImage
                src={
                  array?.images?.[0] !== "https://placeimg.com/640/480/any"
                    ? array?.images?.[0]
                    : "https://picsum.photos/640/640?r=6462"
                }
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
              <h5 className="card-title mb-3">{array?.title}</h5>
              <p>{array?.description}$</p>
              <h6 className="mb-3">{array?.price}$</h6>
              <button className="btn-primary" onClick={(evt) => setCard(array.id, evt)}>
                add to cart
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      )}

      <MDBContainer fluid className="my-5 text-center">
        <MDBRow>
          {arrayAll?.map((product) => {
            if (product?.id !== +id)
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
