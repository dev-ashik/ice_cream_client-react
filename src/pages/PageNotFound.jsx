import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={'page not found'}>
      <div className="pnf d-flex flex-column justify-content-center align-items-center ">
        <h1>404</h1>
        <h2>Oops ! Page Not Found</h2>
        <Link to="/">Go Back</Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
