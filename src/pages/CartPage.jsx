import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { serverUrl } from "../serverUrl";
import { toast } from "react-toastify";

import "./UserStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [address, setAddress] = useState(auth?.user?.address);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // calculate total price
  const calculateTotalPrice = () => {
    try {
      let total = 0;
      cart.map((product) => (total += product.price));
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  useEffect(() => {
    setAddress(auth?.user?.address);
  }, [auth]);

  // remove Cart Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);

      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNow = async (token) => {
    // console.log(address, token, cart)
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/product/product-checkout`,
        {
          totalPrice: totalPrice,
          address,
          token,
          products: cart,
          auth: auth,
        }
      );

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
      } else {
        toast.error("something is wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong");
    }
  };

  return (
    <Layout>
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-8">
            {cart.length < 1 && (
              <div className="cart_empty_message">
                <h4>cart is empty</h4>
              </div>
            )}
            {cart?.map((product) => (
              <div
                className="cart_page-each_product row m-2 mb-4 flex-row shadow"
                key={product._id}
              >
                <div className="col-md-4 p-0">
                  <img
                    src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="product image"
                  />
                </div>
                <div className="col-md-8">
                  <h4 className="header_text">{product.name}</h4>
                  <p>{product.description.substring(0, 50)}...</p>
                  <p>Price: {product.price}</p>
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4 className="header_text">Cart Summary</h4>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>-----</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product, index) => (
                  <tr key={index}>
                    <td> {product.name} </td>
                    <td>-----</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>-----</th>
                  <th>${totalPrice}</th>
                </tr>
              </tfoot>
            </table>

            <br />
            {/* {cart?.map((product, index)=> (
              <>
              <p> {product.name} ---------- ${product.price}</p>
              </>
            ))}
            ______________________________________
            <p> Total ---------- ${totalPrice}</p> */}

            {auth?.token ? (
              <>
                <div className="mb-3">
                  {/* <StripeCheckout
                    stripeKey="pk_test_51KOcnlE6mLAE4h3PUxtfXb1ZSl4sQiPAd0AFk0dWetSkd0eSfTfSKHsd8eupNzwhnK4ekgz5SP6xilxSj5de4Zdq00eRzUaBDp"
                    label="checkout"
                    name="Pay With Credit Card"
                    billingAddress
                    // shippingAddress
                    amount={totalPrice * 100}
                    description={`Your total is ${totalPrice}`}
                    token={handlePayNow}
                  /> */}

                  {cart?.length > 0 ? (
                    <Link
                      to="/dashboard/user/checkout"
                      className="button_primary"
                      style={{ textDecoration: "none" }}
                    >
                      Checkout
                    </Link>
                  ) : (
                    <button className="button_disable">Checkout</button>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  className="button_primary"
                  to={"/dashboard/user/profile"}
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
