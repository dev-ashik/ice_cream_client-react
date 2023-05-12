import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../serverUrl";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantitiy] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  // get all product
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/category/get-categories`
      );
      if (data.success) {
        setCategories(data?.categorys);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in geting category.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCrateProduct = async(e) => {
    e.preventDefault()
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)
      productData.append("shipping", shipping)

      const { data } = await axios.post(
        `${serverUrl}/api/v1/product/create-product`, productData
      );
      if (data?.success) {
        toast.success(data.message)
        navigate('/dashboard/admin/products');
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while creating product");
    }
  }

  // console.log(category);

  return (
    <Layout title={"dashboard create product"}>
      <SidebarLayout>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h3 className="header_text">Create Product</h3>
            <div className="m-1 w-75">
              <Select
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                showSearch
              >
                {/* <Select.Option value="" disabled>Category</Select.Option> */}
                {categories?.map((data) => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.name}
                  </Select.Option>
                ))}
              </Select>

              <div className="mb-3">
                <label
                  htmlFor="upImage"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "Upload image"}
                </label>
                <input
                  type="file"
                  id="upImage"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div
                      className="border border-dark d-flex justify-content-center align-items-center"
                      style={{
                        height: "200px",
                        width: "270px",
                        margin: "0 auto",
                        background: "#D3D3D3",
                      }}
                    >
                      <HiPhotograph style={{ fontSize: "40px" }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Write product name"
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write product description"
                  style={{resize: "none", height: '150px'}}
                ></textarea>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="price"
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantitiy(e.target.value)}
                  placeholder="quantity"
                />
              </div>

              <div className="mb-3">
                <select
                  defaultValue="no"
                  className="form-select"
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </div>

              <div className="mb-3">
                <button className="button_primary" onClick={handleCrateProduct}>create product</button>
              </div>

            </div>
          </div>
      </SidebarLayout>
    </Layout>
  );
};

export default CreateProduct;
