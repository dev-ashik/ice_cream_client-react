import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIceCreamSharp } from "react-icons/io5";
import { GiSpoon } from "react-icons/gi";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { BsList } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  };

  const handleOpenSearch = () => {
    setShowLinks(false);
    setShowSearch((showSearch) => !showSearch);
  };

  const handletoggle = () => {
    setShowSearch(false);
    setShowLinks((showLinks) => !showLinks);
  };

  // console.log(cart)
  return (
    <>
      <nav className="nav">
        <div className="nav_logo">
          <Link to="/">
            <GiSpoon className="spoon_logo" />
            <IoIceCreamSharp className="iceCream_logo" />
          </Link>
        </div>
        <div className="search_bar">
          <SearchInput />
        </div>

        <div className="nabBar_rightPart">
          <div className="nav-mobile_icons">
            <li className="navItem search">
              <BiSearchAlt2 onClick={handleOpenSearch} />
              <span
                className={`mobileSearchInput ${
                  showSearch ? "showMobileSearchInput" : "hideMobileSearchInput"
                }`}
              >
                <SearchInput />
              </span>
            </li>

            <li className="navItem nav-list_icon">
              <BsList onClick={handletoggle} />
            </li>
          </div>

          <ul className={`nav_links ${showLinks ? "showLinks" : "hideLinks"}`}>
            <GrFormClose className="cross_icon" onClick={handletoggle} />
            <li className="navItem">
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
            </li>
            <li className="navItem navCategoy">
              <span className="navLink navCategoy_title">
                Flavors
                <IoIosArrowDown />
              </span>
              <span className="navCategoy_item">
                {/* <li>
                <Link to={`/categories`} className="dropdown-item">
                  All Categories
                </Link>
              </li> */}
                {categories.length ? (
                  categories.map((category) => (
                    <Link
                    key={category._id}
                      to={`/category/${category.slug}`}
                      className="dropdownItem"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <span className="navCategoy_item-loading">
                    <Skeleton height={24} width={150} count={4} />
                  </span>
                )}
              </span>
            </li>

            {/* login user */}
            {!auth.user ? (
              <>
                <li className="navItem">
                  <NavLink to="/register" className="navLink">
                    Register
                  </NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/login" className="navLink">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="navItem navProfile">
                <span className="navLink navProfile_title">
                  {auth?.user?.name}
                  <IoIosArrowDown />
                </span>
                <span className="navProfile_item">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className=""
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      LogOut
                    </NavLink>
                  </li>
                </span>
              </li>
            )}
          </ul>
        </div>
        <NavLink
          to="/cart"
          className={`${cart.length > 0 ? "open" : "close"} fixed_cart`}
        >
          <HiShoppingCart />
          <span>{cart.length}</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Header;
