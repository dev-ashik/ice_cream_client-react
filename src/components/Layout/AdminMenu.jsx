import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <ul className="list-group">
        <NavLink to="/dashboard/admin/create-category" className="list-group-item">create category</NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item">create product</NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item">All products</NavLink>
        <NavLink to="/dashboard/admin/all-product" className="list-group-item">All order</NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item">Users</NavLink>
        
      </ul>
    </div>
  );
};

export default AdminMenu;
