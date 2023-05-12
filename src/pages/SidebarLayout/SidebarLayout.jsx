import React, { useState } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import "./SidebarLayout.css";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate } from "react-icons/io";
import { BiBookAdd } from "react-icons/bi";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

const SidebarLayout = ({ children }) => {
  const [expand, setExpand] = useState(true);

  const handleCollaps = () => {
    setExpand(false);
    console.log(expand)
  };

  const handleExpand = () => {
    setExpand(true);
  };

  return (
    <div className="sidebar-layout">
      <div
        className={`${
          expand
            ? "sidebar-layout_sidebar-expand"
            : "sidebar-layout_sidebar-collaps"
        } sidebar-layout_sidebar`}
      >
        <div className={`sidebar-layout_sidebar-nav`}>
          {expand ? (
            <FiArrowLeft onClick={() => handleCollaps()} />
          ) : (
            <FiArrowRight onClick={() => handleExpand()} />
          )}
        </div>
        <div className="sidebar-layout_sidebar-allItem">
          <NavLink
            to="/dashboard/admin"
            className="sidebar-layout_sidebar-item"
          >
            <CgProfile />
            {
                expand && <span>Profile</span>
            }
            
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="sidebar-layout_sidebar-item"
          >
            <IoIosCreate /> 
            {
                expand && <span>Create Flavors</span>
            }
         
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="sidebar-layout_sidebar-item"
          >
            <BiBookAdd /> 
            {
                expand && <span>Create Product</span>
            }
           
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="sidebar-layout_sidebar-item"
          >
            <BsDatabaseFillAdd /> 
            {
                expand && <span>All Products</span>
            }
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-product"
            className="sidebar-layout_sidebar-item"
          >
            <AiFillShopping />
            {
                expand && <span>All Order</span>
            }
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="sidebar-layout_sidebar-item"
          >
            <BsPeopleFill />
            {
                expand && <span>Users</span>
            }
          </NavLink>
        </div>
      </div>
      <div
        className={`${
          expand
            ? "sidebar-layout_content-expand"
            : "sidebar-layout_content-collaps"
        } sidebar-layout_content`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
