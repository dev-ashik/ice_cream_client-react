import React from "react";
import { Link } from "react-router-dom";
import { IoIceCreamSharp } from "react-icons/io5";
import { GiSpoon } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import footer_bg from "../../assets/ice-creams/footer bg.jpg";
import { MdLocationPin } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer_background" src={footer_bg} alt="" />
      <div className="footer_top">
        <div className="footer_logo">
          <Link to="/" className="navbar-brand">
            <GiSpoon className="spoon_logo spoon_logo_footer" />
            <IoIceCreamSharp className="iceCream_logo iceCream_logo_footer" />
          </Link>
        </div>
        <div className="footer_links">
          <p className="footer_section_header">QUICK LINKS</p>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer_contact">
          <p className="footer_section_header">CONTACT US</p>
          <small>
            <MdLocationPin />
            Yunnan, Kunming, China
          </small>
          <a href="">
            <AiFillPhone />
            Phone: +86 0000 000 0000
          </a>
          <a href="">
            <MdEmail />
            Email: testmail@email.com
          </a>
        </div>

        <div className="footer_social_links">
          <p className="footer_section_header">SOCIAL LINK</p>
          <div className="footer_social_links-div">
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <AiFillInstagram />
            </a>
            <a href="">
              <AiFillTwitterCircle />
            </a>
          </div>
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
