import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { serverUrl } from "../serverUrl";
import { BiCartAdd } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const param = useParams();
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/product/product-category/${param.slug}`
      );

      setProducts(data?.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [param.slug]);
  // console.log(products, category)
  return (
    <Layout>
      <div className="container">
        <h4>Category: {category.name}</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.length < 1 && <h5>loading...</h5>}

          {products?.map((product) => (
            <div className="col" key={product._id}>
              <div className="card h-100">
                <img
                  src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
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
                  <h5 className="card-title">{product.name}</h5>

                  {product?.description.length > 30 ? (
                    <p className="card-text">
                      {product.description.substring(0, 70)}...
                    </p>
                  ) : (
                    <p className="card-text">{product.description}</p>
                  )}

                  <p>${product.price}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
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
    </Layout>
  );
};

export default CategoryProduct;
