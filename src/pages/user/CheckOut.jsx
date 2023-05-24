import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./UserStyles.css";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../serverUrl";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(auth.user.name);
  const [phone, setPhone] = useState(auth.user.phone);
  const [country, setCountry] = useState("");
  const [provience, setProvience] = useState("");
  const [city, setCity] = useState("");
  const [road, setRoad] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

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




  console.log(auth.user)
  const handlePayNow = async (token) => {
    // console.log(address, token, cart)
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/product/product-checkout`,
        {
          name,
          phone: phone,
          address: [houseNumber, road, city, provience, country],
          totalPrice: totalPrice,
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
        toast.error("something is wrong. payment is not successful");
      }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong");
    }
  };

  return (
    <Layout>
      <div className="checkoutForm">
        <form>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="Phone"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            type="address"
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="address"
            placeholder="provience"
            onChange={(e) => setProvience(e.target.value)}
          />
          <input
            type="address"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="address"
            placeholder="road"
            onChange={(e) => setRoad(e.target.value)}
          />
          <input
            type="address"
            placeholder="HouseNumber"
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </form>
        <div className="checkout_bun-div">
          <StripeCheckout
            stripeKey="pk_test_51KOcnlE6mLAE4h3PUxtfXb1ZSl4sQiPAd0AFk0dWetSkd0eSfTfSKHsd8eupNzwhnK4ekgz5SP6xilxSj5de4Zdq00eRzUaBDp"
            label="checkout"
            name="Pay With Credit Card"
            // billingAddress
            // shippingAddress
            amount={totalPrice * 100}
            description={`Your total is ${totalPrice}`}
            token={handlePayNow}
          />
        </div>
      </div>

      <br />
    </Layout>
  );
};

export default CheckOut;
