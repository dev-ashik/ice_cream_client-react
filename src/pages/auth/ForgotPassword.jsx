import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { serverUrl } from "../../serverUrl";
import { toast } from "react-toastify";
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        question,
      });
      if (res && res.data.success) {
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
    <Layout title="Forgot password">
      <div className="register text-center">
        <h4 className="header_text">Reset Password</h4>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" className="border-0 bg-transparent" onClick={()=>setShowPassword(showPassword => !showPassword)}>{showPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</button>
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
            reset password
          </button>
          <div className="mt-2">
            <Link to="/login" style={{ color: "#3d2815" }}>
              go to login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
