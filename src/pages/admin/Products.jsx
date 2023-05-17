import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { HiPhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";
import { serverUrl } from "../../serverUrl";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/v1/product/products`);
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

  console.log(products);

  return (
    <Layout className="all_products">
      <SidebarLayout>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h3 className="header_text">All products list</h3>
          <h3 className="header_text">Total Products {products?.length} pice</h3>
          {products?.length > 0 ? (
            <div className="list-group">
              {products?.map((product, index) => (
                <Link
                  to={`/dashboard/admin/products/${product.slug}`}
                  className="row mb-3 text-decoration-none text-black allProduct_eachproduct p-3 position-relative"
                  key={product._id}
                >
                  <h4 className="position-absolute top-0 start-0">{index + 1}</h4>
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <img
                      src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
                      alt="product image"
                      style={{
                        height: "300px",
                        width: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div>
                      <h5 className="header_text">{product.name}</h5>
                      <h5 className="">Category: {product?.category?.name}</h5>
                      <p
                        style={{
                          margin: "0",
                          lineHeight: "18px",
                          textAlign: "justify",
                        }}
                      >
                        description: {product.description}
                      </p>
                      <p style={{ margin: "5px 0", fontSize: "22px" }}>
                        price: ${product.price}
                      </p>
                      <p style={{ margin: "0" }}>
                        quantity: {product.quantity}
                      </p>
                      <p style={{ margin: "0" }}>
                        shipping: {product.shipping ? "Yes" : "No"}
                      </p>
                      <p style={{ margin: "0" }}>
                        createdAt: {product?.createdAt}
                      </p>
                      <p style={{ margin: "0" }}>
                        updatedAt : {product?.updatedAt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </SidebarLayout>
    </Layout>
  );
};

export default Products;
