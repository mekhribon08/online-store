import { MDBCardBody, MDBInput, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const auth = JSON.parse(token);

  if (auth === null || !auth)
    useEffect(() => {
      navigate("/auth");
    }, []);

  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

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
  async function getCategories() {
    useEffect(() => {
      setLoading(true);
      fetch("https://api.escuelajs.co/api/v1/categories")
        .then((res) => res.json())
        .then((res) => {
          setArray(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }, []);
  }
  getCategories();

  return (
    <>
      {/* <form onSubmit={(evt) => searchP(evt)} method="get">
      <MDBInput  name="name" label='Title' id='' type='search' />
      <MDBInput  name="min" label='min' id='' type='number' />
      <MDBInput  name="max" label='max' id='' type='number' />
        <button type="submit">search</button>
      </form> */}

      <form onSubmit={(evt) => searchP(evt)} method="get" className="form">
        <input name="name" placeholder="Title" id="" type="search" />
        <input name="min" placeholder="Min $" id="" type="number" />
        <input name="max" placeholder="Max $" id="" type="number" />
        <button className="btn-primary" type="submit">
          search
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center parent-scale ">
          <MDBSpinner className="scale" size="lg" role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      )}
      {!loading &&
        array.map((categorie) => (
          <MDBCardBody className="categories-card-body" key={categorie.id}>
            <div
              onClick={() => navigate(`/categories/${categorie.id}`)}
              className="d-flex align-items-center"
            >
              <img src={`${categorie.image}`} />
              <div className="ms-3">
                <p className="fw-bold mb-1">{categorie.name}</p>
              </div>
            </div>
          </MDBCardBody>
        ))}
    </>
  );
}
