import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products Founded"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
            {values?.results.map(({ _id, name, description, price }) => (
              <div className="col" key={_id}>
                <div className="card h-100">
                  <img
                    src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${_id}`}
                    className="card-img-top"
                    alt="product image"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>

                    {description.length > 30 ? (
                      <p className="card-text">
                        {description.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text">{description}</p>
                    )}

                    <p>${price}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <button className="btn btn-primary me-3">see more</button>
                      <button className="btn btn-primary">add to cart</button>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
