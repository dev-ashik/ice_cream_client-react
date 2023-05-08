import React from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";

const Profile = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuOfUsers/>
          </div>
          <div className="col-md-9">
            <h2>Your Profile</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
