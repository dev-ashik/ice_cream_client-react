import React from "react";
import Layout from "../components/Layout/Layout";
import contact_img from "../assets/ice-creams/contact-img.jpg";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import "../styles/pagesesStyles.css";

const About = () => {
  return (
    <Layout title={"about us shoppingDotCom"}>
      <div className="about_page">
        <h4 className="header_text">About Us</h4>
        <p className="about_page-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sint
          in exercitationem doloremque veritatis officia quod alias, ab,
          quibusdam labore corporis dolore autem esse nostrum repellendus
          eligendi cum adipisci. Quam.
        </p>

        <div className="map">
          <h4 className="header_text">Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277162.8348789994!2d102.4735449228011!3d25.01895771734553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36d083c31227d3cb%3A0xccb1f3a4984f0a36!2sKunming%2C%20Yunnan%2C%20China!5e0!3m2!1sen!2snl!4v1683477116993!5m2!1sen!2snl"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="contact-links">
          <a href="">
            <AiFillPhone />
            Phone: +86 0000 000 0000
          </a>
          <a href="">
            <MdEmail />
            Email: testmail@email.com
          </a>
        </div>
        {/* <div className="contact_form">
          <form action="">
            <input type="text" name="name" placeholder="Write you Name" />
            <input type="text" name="email" placeholder="Write you Email" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Write your message"
            ></textarea>
            <input type="submit" value="send message" />
          </form>
        </div> */}
      </div>
    </Layout>
  );
};

export default About;
