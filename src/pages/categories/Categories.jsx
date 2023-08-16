import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Categories.scss";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

export default function Categories() {
  const [array, setArray] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getCategoriesP() {
    useEffect(() => {
      fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
        .then((res) => res.json())
        .then((res) => {
          setArray(res);
        })
        .catch((err) => console.error(err));
    }, [id]);
  }
  getCategoriesP();

  if (!array || array == []) return <div>404 not found</div>;
  return (
    <>
      <MDBContainer fluid className="my-5 text-center">
        <MDBRow className="d-flex">
          {array &&
            array.map((product) => {
              return (
                <MDBCol
                  onClick={() => navigate(`/product/${product.id}`)}
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
                        src={product.images[0]}
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
                      <h5 className="card-title mb-3">{product.title}</h5>
                      <p>{product.price}$</p>
                      <h6 className="mb-3">{product.price}$</h6>
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
