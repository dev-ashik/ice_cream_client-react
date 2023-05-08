import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { HiPhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "https://shopping-dot-com-server.onrender.com/api/v1/product/products"
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while geting product.");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All products list</h2>
          {products?.length > 0 ? (
            <div>
              <div className="list-group">
                {products?.map((product) => (
                  <Link
                    to={`/dashboard/admin/products/${product.slug}`}
                    className="list-group-item"
                    key={product._id}
                    style={{ display: "flex", gap: "20px" }}
                  >
                    <div
                      style={{
                        height: "120px",
                        width: "25%",
                      }}
                    >
                      <img
                        src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${product._id}`}
                        alt="product image"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <div>
                        <h5>{product.name}</h5>
                        <p style={{ margin: "0" }}>
                          description: {product.description}
                        </p>
                        <p style={{ margin: "0" }}>price: ${product.price}</p>
                        <p style={{ margin: "0" }}>
                          quantity: {product.quantity}
                        </p>
                        <p style={{ margin: "0" }}>
                          shipping: {product.shipping}
                        </p>
                        <p style={{ margin: "0" }}>
                          category: {product?.category?.name}
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-primary me-3">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
