import React from "react";
import { Link } from "react-router-dom";
import { IoIceCreamSharp } from "react-icons/io5";
import { GiSpoon } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_logo">
          <Link to="/" className="navbar-brand">
            <GiSpoon className="spoon_logo spoon_logo_footer" />
            <IoIceCreamSharp className="iceCream_logo iceCream_logo_footer" />
          </Link>
        </div>
        <div className="footer_links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/policy">Privacy Policy</Link>
            <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer_contact">
          <a href=""><AiFillPhone/>Phone: +86 0000 000 0000</a>
          <a href=""><MdEmail/>Email: testmail@email.com</a>
        </div>
      </div>
      <div className="footer_down">
        <small className="text-center">
          All Right Reserved &copy; ASHIK MAHMUD
        </small>
      </div>
    </div>
  );
};

export default Footer;
