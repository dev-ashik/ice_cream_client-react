import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import './UserStyles.css';
import { useAuth } from "../../context/auth";

const UserOpinion = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState(auth.user.name)
    const [email, setEmail] = useState(auth.user.email)

    // console.log(auth.user.email)
  return (
    <Layout>
      <div className="about_page">
        <div className="contact_form">
          <form action="">
            <input type="text" name="name" placeholder="Write you Name" value={name}/>
            <input type="text" name="email" placeholder="Write you Email" value={email}/>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Write your message"
            ></textarea>
            <input type="submit" value="send message" />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserOpinion;
