import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";

export default function Profile() {
  const [about, setAbout] = useState({});
  const [modal, setModal] = useState(false);
  const tokenJson = localStorage.getItem("token");
  const token = JSON.parse(tokenJson);
  async function aboutRegisteredUser() {
    useEffect(() => {
      fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAbout(res);
        });
    }, []);
  }
  aboutRegisteredUser();
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{about?.name}</p>
                <p className="text-muted mb-4">{about?.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={() => setModal(true)}>update user</MDBBtn>
                  {modal && <Modal about={about} />}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {about.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {about.email}
                    </MDBCardText>
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
