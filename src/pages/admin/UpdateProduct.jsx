import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from '../../serverUrl';
import SidebarLayout from '../SidebarLayout/SidebarLayout';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantitiy] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const params = useParams()
  
    // get single product
    const getSingleCategory = async () => {
        try {
          const { data } = await axios.get(
            `${serverUrl}/api/v1/product/products/${params.slug}`
          );
          if (data.success) {
            const {_id, name, photo, description, price, category, quantity, shipping} = data.product
            console.log(data.product)
            setName(name);
            // setPhoto(photo);
            setDescription(description);
            setPrice(price);
            setCategory(category?._id);
            setQuantitiy(quantity);
            setShipping(shipping);
            setId(_id);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong while geting single product");
        }
      };

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
      getSingleCategory();
    }, []);
  
    const handleUpdateProduct = async(e) => {
      e.preventDefault()
      try {
        const productData = new FormData();
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        photo && productData.append("photo", photo)
        productData.append("category", category)
        productData.append("shipping", shipping)
  
        const { data } = await axios.put(
          `${serverUrl}/api/v1/product/update-product/${id}`, productData
        );
        if (data?.success) {
          toast.success("product Successfully updated")
          navigate('/dashboard/admin/products')
        } else {
          toast.error(data?.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something wrong while updating product");
      }
    }

    const handleDeleteProduct = async(e) => {
      e.preventDefault()
      try {
        let answer = window.prompt('Are you sure want to delete this product?');
        if(!answer){
            return;
        }
        const { data } = await axios.delete(
          `${serverUrl}/api/v1/product/delete-product/${id}`
        );
        if (data?.success) {
          toast.success(data.message)
          navigate('/dashboard/admin/products')
        } else {
          toast.error(data?.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("failed deleteing product");
      }
    }
  return (
    <Layout title={"dashboard create product"}>
      <SidebarLayout>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h3 className='header_text'>Update Product</h3>
            <div className="w-100">
              <Select
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                showSearch
                value={category?.name}
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
                      alt="new product photo"
                      height={"250"}
                      width={"250"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                    <div className="text-center">
                    <img
                      src={`${serverUrl}/api/v1/product/product-photo/${id}`}
                      alt="old product photo"
                      height={"250"}
                      width={"250"}
                      className="img img-responsive"
                    />
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
                  defaultValue={shipping}
                  className="form-select"
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </div>

              <div className="mb-3">
                <button className="button_primary" onClick={handleUpdateProduct}>Update product</button>
              </div>

              <div className="mb-3">
                <button className="btn btn-danger" style={{padding: "7px 20px", fontSize: "20px"}} onClick={handleDeleteProduct}>Delete product</button>
              </div>

            </div>
          </div>
      </SidebarLayout>
    </Layout>
  )
}

export default UpdateProduct