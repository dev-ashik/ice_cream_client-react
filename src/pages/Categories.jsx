import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-6" key={category._id}>
              <Link className="btn btn-primary m-2" to={`/category/${category.slug}`}>{category.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
