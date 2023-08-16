import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  const [price, setPrice] = useState(0);

  const data = JSON.parse(localStorage.getItem("cart" || "[]"));
  const [about, setAbout] = useState(data);

  if (!about) return <div>your cart is null</div>;
  useEffect(() => {
    if (about.length === 1 && about) {
      setPrice(+about?.[0].data?.price * about?.[0].count + 5);
    }
    if (about.length > 1 && about) {
      let letPrice = 0;
      about.forEach((data) => {
        letPrice += data.data.price * data.count;
        if (about.length - 1 == about.findIndex((a) => a == data)) {
          setPrice(letPrice + 5);
        }
      });
    }
  }, [about]);

  function plusC(id) {
    const index = about.findIndex((a) => +a.id == +id);
    const mapped = [...about];
    mapped[index].count = mapped[index].count + 1;
    localStorage.setItem("cart", JSON.stringify(mapped));
    setAbout(mapped);
  }
  function deleteC(id) {
    let mapped = about.filter((a) => a.id !== +id);
    localStorage.setItem("cart", JSON.stringify(mapped));
    setAbout(mapped);
  }
  function minusC(id) {
    const index = about.findIndex((a) => +a.id == +id);
    const mapped = [...about];
    mapped[index].count = mapped[index].count - 1;
    localStorage.setItem("cart", JSON.stringify(mapped));
    setAbout(mapped);
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {about.length} items
                        </MDBTypography>
                      </div>
                      {about.map((product) => (
                        <div key={product.id}>
                          <hr className="my-4" />

                          <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src={product.data.images[0]}
                                fluid
                                className="rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography
                                tag="h6"
                                className="text-black mb-0"
                              >
                                {product.data.title}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol
                              md="3"
                              lg="3"
                              xl="3"
                              className="d-flex align-items-center "
                            >
                              <button onClick={() => minusC(product.id)}>
                                -
                              </button>
                              <MDBTypography className="d-flex align-items-center ">
                                {product.count}
                              </MDBTypography>

                              <button className="mr-3" onClick={() => plusC(product.id)}>
                                +
                              </button>
                              <button
                                onClick={() => deleteC(product.id)}
                                className="btn-danger"
                              >
                                delete
                              </button>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="text-end">
                              <MDBTypography tag="h6" className="mb-0">
                                {product.data.price} $
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <a href="#!" className="text-muted">
                                <MDBIcon fas icon="times" />
                              </a>
                            </MDBCol>
                          </MDBRow>
                        </div>
                      ))}

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          items {about.length}
                        </MDBTypography>
                        <MDBTypography tag="h5">$ {price}</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Give code
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          summary delivery 5$
                        </MDBTypography>
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">{price} $</MDBTypography>
                      </div>
                      <button
                        className="ripple ripple-surface ripple-surface-light btn btn-dark btn-lg btn-block"
                        role="button"
                      >
                        Start delivery
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
