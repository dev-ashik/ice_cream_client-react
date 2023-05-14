import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../../serverUrl";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await axios.get(`${serverUrl}/api/v1/product/orders`);

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
            <h4 className="header_text">All orders</h4>

            <div className="user_orders-each_time_order">
              {orders.map((order) => (
                <div key={order._id} className="m-2 p-2">
                  <div>
                    {order.products.map((item) => (
                      <Link
                        to={`/product/${item.slug}`}
                        style={{
                          // border: "1px solid black",
                          textDecoration: "none",
                        }}
                        className="row user_orders-card m-1"
                      >
                        <div className="col-md-3">
                          <img
                            src={`${serverUrl}/api/v1/product/product-photo/${item._id}`}
                            className=""
                            alt="product image"
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "contain",
                              backgroundImage:
                                "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                            }}
                          />
                        </div>
                        <div className="col-md-9 pt-2">
                          <h4>Name: {item.name}</h4>
                          <p>price: {item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="user_orders-each_time_order-info">
                    <p>address: {order.address}</p>
                    <p>payment: {order.payment}</p>
                    <p>
                      Time: {new Date(order.createdAt).getDate()}-
                      {new Date(order.createdAt).getMonth() + 1}-
                      {new Date(order.createdAt).getFullYear()}{" "}
                    </p>

                    <p>status: {order.status}</p>
                  </div>
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
