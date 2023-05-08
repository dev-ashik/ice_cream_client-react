import React from "react";
import Layout from "../components/Layout/Layout";
import contact_img from "../assets/contact_img.jpg";

const Policy = () => {
  return (
    <Layout title={'apolicy'}>
      <div>
        <div className="contact_image">
          <img src={contact_img} alt="" />
        </div>
        <div>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
