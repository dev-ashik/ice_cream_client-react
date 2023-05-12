import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import { BiEditAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import "./AdminStyles.css";
import AdminTotalUserChart from "./AdminTotalUserChart";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../serverUrl";
import { loading_1 } from "../../assets";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

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

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/product/all-orders`
      );

      if (data.success) {
        setAllOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllOrders();
  }, []);

  console.log(products);
  return (
    <Layout>
      <SidebarLayout>
        <div className="adminDashboard">
          <div className="adminDashboard-firstrow">
            <div className="adminDashboard-profileInfo">
              <BsFillPersonFill className="adminDashboard-profileInfo-img"/>
              <h5>User Type: Admin</h5>
              <h5>
                Name: <strong>{auth?.user?.name}</strong>
              </h5>
              <h5>
                Email: <strong>{auth?.user?.email}</strong>
              </h5>
              <h5>
                Phone: <strong>{auth?.user?.phone}</strong>
              </h5>
              {/* <button className="adminDashboard-profileInfo-edit_button button_primary">
                <BiEditAlt />
              </button> */}
            </div>

            <div className="adminDashboard-firstrow-users">
              <h5>Total User</h5>

              <h3>40</h3>
              <AdminTotalUserChart />
            </div>
            <div className="adminDashboard-firstrow-products">
              <h5>Total Product</h5>

              {products.length < 1 ? (
                <>
                  <img
                    className="adminDashboard-firstrow-loading"
                    src={loading_1}
                    alt="loading..."
                  />
                </>
              ) : (
                <>
                  <h3>{products.length}</h3>
                  <AdminTotalUserChart />
                </>
              )}
            </div>
            <div className="adminDashboard-firstrow-orders">
              <h5>Total Orders</h5>
              
              {allOrders.length < 1 ? (
                <>
                  <img
                    className="adminDashboard-firstrow-loading"
                    src={loading_1}
                    alt="loading..."
                  />
                </>
              ) : (
                <>
                  <h3>{allOrders.length}</h3>
                  <AdminTotalUserChart />
                </>
              )}
            </div>
          </div>

          {/* <div className="userChart">user chart</div> */}
        </div>
      </SidebarLayout>
      {/* <div className="container-fluid m-3 p-3">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-2">
                    <h4>Admin Name: <strong>{auth?.user?.name}</strong></h4>
                    <h4>Admin Email: <strong>{auth?.user?.email}</strong></h4>
                    <h4>Admin contact: <strong>{auth?.user?.phone}</strong></h4>
                </div>
            </div>
            </div>
        </div> */}
    </Layout>
  );
};

export default AdminDashboard;
