import React from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";
import { useAuth } from "../../context/auth";
import { BsFillPersonFill } from "react-icons/bs";

import './UserStyles.css';

const Profile = () => {
  const [auth] = useAuth();

  return (
    <Layout className="user_profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuOfUsers/>
          </div>
          <div className="col-md-9">
            
            <div className="user_profile-profileInfo">
              <BsFillPersonFill className="user_profile-profileInfo-img"/>
              <h5>
                Name: <strong>{auth?.user?.name}</strong>
              </h5>
              <h5>
                Email: <strong>{auth?.user?.email}</strong>
              </h5>
              <h5>
                Phone: <strong>{auth?.user?.phone}</strong>
              </h5>
              {/* <button className="user_profile-profileInfo-edit_button button_primary">
                <BiEditAlt />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
