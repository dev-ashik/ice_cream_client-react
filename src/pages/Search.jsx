import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { serverUrl } from "../serverUrl";
import { BiCartAdd } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h4 className="header_text">Search Results</h4>
          <h5>
            {values?.results.length < 1
              ? "No products Founded"
              : `Found result: ${values?.results.length}`}
          </h5>

          <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
            {values?.results.map((product) => (
              <div className="col" key={product._id}>
                <div className="card h-100">
                  <img
                    src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="product image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>

                    {product.description.length > 30 ? (
                      <p className="card-text">
                        {product.description.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text">{product.description}</p>
                    )}

                    <p>${product.price}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary d-flex justify-content-between w-100">
                      <Link
                        to={`/product/${product.slug}`}
                        className="button_primary"
                      >
                        <BsFillEyeFill />
                      </Link>
                      <button
                        className="button_primary"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Item Added", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 2000,
                          });
                        }}
                      >
                        <BiCartAdd />
                      </button>
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
