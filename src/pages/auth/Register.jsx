import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/AuthStyles.css";
import { serverUrl } from "../../serverUrl";
import { toast } from "react-toastify";
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
// import { BsFillEyeFill } from 'react-icons/bs';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        question,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Layout title="Register">
      <div className="register text-center">
        <form onSubmit={handleSubmit}>
          <h4 className="header_text">Register page</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 d-flex">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="border-0 bg-transparent" onClick={()=>setShowPassword(showPassword => !showPassword)}>{showPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</button>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputQuestion"
              placeholder="what is your favorite sports"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button_primary w-100">
            Register
          </button>
        </form>

        <p className="mt-2">I have an account <Link to={`/login`} style={{color: "#3d2815"}}>Login</Link></p>
      </div>
    </Layout>
  );
};

export default Register;
