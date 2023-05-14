import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuOfUsers = () => {
  return (
    <div className="text-center">
      <ul className="list-group">
        <NavLink to="/dashboard/user/profile" className="list-group-item">
          Profile
        </NavLink>
        <NavLink to="/dashboard/user/opinion" className="list-group-item">
        You valuable opinion or report
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item">
          Orders
        </NavLink>
      </ul>
    </div>
  )
}

export default MenuOfUsers