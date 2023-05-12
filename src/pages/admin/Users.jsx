import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import SidebarLayout from "../SidebarLayout/SidebarLayout";

const Users = () => {
  return (
    <Layout title={'dashboard all user'}>
      <SidebarLayout>
        <h3>All users</h3>
      </SidebarLayout>
      {/* <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>All users</h3>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Users;
