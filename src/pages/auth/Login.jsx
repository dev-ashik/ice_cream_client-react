import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { serverUrl } from "../../serverUrl";
import { toast } from "react-toastify";
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success('Register Successful');
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
        <h4 className="header_text">Login form</h4>
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
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <button type="button" className="border-0 bg-transparent" onClick={()=>setShowPassword(showPassword => !showPassword)}>{showPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</button>
          </div>

          <button type="submit" className="button_primary w-100">
            Login
          </button>
          <p className="mt-2">Create a new Account <Link to={`/register`} style={{color: "#3d2815"}}>Register</Link></p>
          <div className="mt-2">
            <Link
              to="/forgot-password"
              type="button"
              style={{color: "#7c5531"}}
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
