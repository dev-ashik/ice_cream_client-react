import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import moment from "moment/moment";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://shopping-dot-com-server.onrender.com/api/v1/product/all-orders"
      );

      if (data.success) {
        setAllOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatusChange = async (value, orderId) => {
    try {
      setLoadingStatus(true);
      const { data } = await axios.put(
        `https://shopping-dot-com-server.onrender.com/api/v1/product/order-status-update/${orderId}`,
        { status: value }
      );

      //   console.log(result);
      if (data.success) {
        setSelectedOption(value);
        getAllOrders();
        toast.success(data.message);
        setLoadingStatus(false);
      } else {
        toast.error(data.message);
        setLoadingStatus(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingStatus(false);
    }

    // console.log(value, orderId)
  };

  //   console.log(selectedOption)
  return (
    <Layout title={"dashboard all orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>All orders</h3>
            <div>
              {allOrders.map((ord, i) => {
                return (
                  <div className="border shadow m-2" key={i}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Buyer</th>
                          <th>Date</th>
                          <th>Payment</th>
                          <th>quantity</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{ord.buyer?.name}</td>
                          <td>{moment(ord?.createAt).fromNow()}</td>
                          <td>{ord.payment > 0 ? "Success" : "Failed"}</td>
                          <td>{ord.products?.length}</td>
                          <td>
                            {loadingStatus ? (
                              "loading..."
                            ) : (
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  handleStatusChange(e.target.value, ord._id)
                                }
                              >
                                {status.map((st, i) => (
                                  <option value={st} key={i}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="container">
                      {ord.products.map((pd, i) => (
                        <div className="row m-1 mb-2 p-3 card flex-row" key={i}>
                          <div className="col md-4">
                            <img
                              src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${pd._id}`}
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
                          </div>
                          <div className="col-md-8">
                            <p>{pd.name}</p>
                            <p>{pd?.description?.substring(0, 50)}</p>
                            <p>{pd.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
