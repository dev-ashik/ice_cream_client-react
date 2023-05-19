import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { BiCartAdd } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";

import "../styles/PagesesStyles.css";

import Carousel from "../components/Carousel/Carousel";
import CusomerReview from "../components/CusomerReview/CusomerReview";
import { icecream_bg, loading_1, yellow_ice } from "../assets";

import "../styles/pagesesStyles.css";
import Skeleton from "react-loading-skeleton";

import home_small_girl from "../assets/ice-creams/home-small-girl.png";
import { serverUrl } from "../serverUrl";
import { toast } from "react-toastify";
import { useProductdata } from "../context/productsdata";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  // console.log(auth)
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(12);
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [cart, setCart] = useCart();
  const [productdata, setProductdata] = useProductdata();

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoading(false)
  //   }, 5000)
  // }, [])

  // get all products
  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${serverUrl}/api/v1/product/products`
  //     );

  //     if (data.success) {
  //       setProducts(data.products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // set resent products
  const handleRecentProducts = () => {
    const result = productdata?.products?.slice(0, 6);
    setRecentProducts(result);
  };
  useEffect(() => {
    handleRecentProducts();
  }, [productdata]);

  // set old products
  const handleOldProducts = () => {
    const result = productdata?.products?.slice(6, 12);
    setOldProducts(result);
  };

  const handleSeemoreProduct = () => {
    const result = productdata?.products?.slice(6, count + 6);
    setCount((count) => count + 6);
    setOldProducts(result);
  };

  useEffect(() => {
    handleOldProducts();
  }, [productdata]);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/category/get-categories`
      );
      if (data.success) {
        setCategories(data.categorys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getAllCategory();
  //   if (!checked.length || !priceRange.length) {
  //     getAllProducts();
  //   }
  // }, [checked.length, priceRange.length]);

  // useEffect(() => {
  //   if (checked.length || priceRange.length) {
  //     filterProduct();
  //   }
  // }, [checked, priceRange]);

  // filter category
  const handleFilterCategory = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filterd product
  const filterProduct = async () => {
    console.log("Filter product");
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/product/product-filters`,
        {
          checked,
          priceRange,
        }
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(products);
  // console.log(oldProducts);
  // console.log(count);
  return (
    <Layout title={"all products best offers"}>
      {/* *****carocel***** */}
      <Carousel />

      {/* *********Our Product******* */}
      <div className="home_page-recent_product our_product">
        <h4 className="text-center header_text">OUR RECENT PRODUCT</h4>

        <div>
          <div className="product_card-section">
            {productdata.success ? (
              <>
                {recentProducts?.map((product, index) => (
                  <div className="product_card" key={index}>
                    <img
                      src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
                      alt="ice cream photo"
                    />
                    <div className="product_card-body">
                      <h2 className="product_header">{product.name}</h2>
                      {product.description.length > 30 ? (
                        <p className="card-text">
                          {product.description.substring(0, 70)}...
                        </p>
                      ) : (
                        <p className="card-text">{product.description}</p>
                      )}
                      <p>${product.price}</p>
                    </div>
                    <div className="product_card-footer">
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
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Loading */}
                {Array(4)
                  .fill()
                  .map((data, index) => (
                    <div className="product_card" key={index}>
                      {/* for image */}
                      <Skeleton
                        height={220}
                        width={220}
                        style={{ borderRadius: "100%" }}
                      />

                      <br />
                      <div className="product_card-body">
                        {/* for header */}
                        <Skeleton height={35} width={230} />

                        {/* description */}
                        <Skeleton height={24} width={250} count={3} />
                        <Skeleton height={24} width={100} />
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="homepage_first_addvertasment">
        <div className="homepage_first_addvertasment-left">
          <h1>Indulging in a scoop of creamy</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            illum error, veritatis nobis eos odit aperiam at quam sunt, ipsum
            consectetur sit omnis ut itaque unde labore voluptas similique
            deleniti dignissimos fugiat explicabo eaque ab et! Quaerat placeat
            veniam voluptatem?
          </p>
        </div>
        <div className="homepage_first_addvertasment-right">
          <img src={yellow_ice} alt="" />
        </div>
      </div>

      {/*  extra */}
      <h4 className="text-center header_text">Some of our BEST products</h4>
      <div className="best_products row row-cols-1 row-cols-md-3 g-4">
        {!productdata.success && (
          <>
            {Array(4)
              .fill()
              .map((data, index) => (
                <div
                  className="col"
                  key={index}
                  style={{ textAlign: "center" }}
                >
                  <Skeleton height={200} width={280} />

                  <Skeleton
                    height={45}
                    width={260}
                    style={{ margin: "5px 0" }}
                  />
                  <Skeleton height={24} width={280} count={3} />
                </div>
              ))}
          </>
        )}

        {oldProducts?.map((product, index) => (
          <div className="col old_product-card" key={index}>
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
                <small className="text-body-secondary">
                  <Link
                    to={`/product/${product.slug}`}
                    className="button_primary me-1"
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        {count < productdata.quantity && (
          <button className="button_primary" onClick={handleSeemoreProduct}>
            See more
          </button>
        )}
      </div>

      {/* advertasment */}
      <div className="homepage_addvertasment">
        <h2>
          Indulging in a scoop of creamy, delicious ice cream is like taking a
          sweet, satisfying escape to a world of pure joy and happiness.
        </h2>
        <img src={home_small_girl} alt="img" />
      </div>

      {/* Customer review */}
      <CusomerReview />
    </Layout>
  );
};

export default HomePage;
