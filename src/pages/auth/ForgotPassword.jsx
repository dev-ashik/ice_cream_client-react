import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { serverUrl } from "../../serverUrl";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        question
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} >
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

          <button type="submit" className="btn btn-primary">
            reset password
          </button>
          <div className="mt-2">
            <Link
              to="/login"
              className=""
            >
              go to login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
