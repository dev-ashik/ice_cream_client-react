import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await axios.get(
      "https://shopping-dot-com-server.onrender.com/api/v1/product/orders"
    );

    if (data.success) {
      setOrders(data.orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <MenuOfUsers />
          </div>
          <div className="col-md-9">
            <h2>All orders</h2>

            <div className="">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="m-2 p-2"
                  style={{ border: "1px solid black" }}
                >
                  {order.products.map((item) => (
                    <Link
                      to={`/product/${item.slug}`}
                      style={{ border: "1px solid black" }}
                    >
                      <img
                        src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${item._id}`}
                        className="card-img-top m-2"
                        alt="product image"
                        style={{
                          height: "200px",
                          width: "200px",
                          objectFit: "contain",
                          backgroundImage:
                            "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                        }}
                      />
                      <p>Name: {item.name}</p>
                      <p>price: {item.price}</p>
                    </Link>
                  ))}

                  <p>address: {order.address}</p>
                  <p>payment: {order.payment}</p>
                  <p>
                    Time: {new Date(order.createdAt).getDate()}-
                    {new Date(order.createdAt).getMonth() + 1}-
                    {new Date(order.createdAt).getFullYear()}{" "}
                    <small>dd/mm/yy</small>
                  </p>

                  <p>status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
