import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { ReactModal } from "../../components/ReactModal";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { serverUrl } from "../../serverUrl";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import { toast } from "react-toastify";

import "./AdminStyles.css";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/category/get-categories`
      );
      if (data.success) {
        setCategories(data.categorys);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in geting category.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/category/create-category`,
        { name: categoryName }
      );

      if (data.success) {
        toast.success(`New category ${categoryName} successfully created`);
        setCategoryName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while creageing category");
    }
  };

  const handleEditCategory = (category) => {
    setModalIsOpen(true);
    setUpdatedCategoryName(category.name);
    setSelectedCategory(category);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/v1/category/update-category/${selectedCategory._id}`,
        { name: updatedCategoryName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelectedCategory("");
        setUpdatedCategoryName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("someting went wrong");
    }

    setModalIsOpen(false);
  };

  const handleDeleteCategory = async (category) => {
    try {
      const { data } = await axios.delete(
        `${serverUrl}/api/v1/category/delete-category/${category._id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("someting went wrong");
    }

    setModalIsOpen(false);
  };

  // console.log(categories)
  return (
    <Layout title={"dashboard create category"}>
      <SidebarLayout>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <h3 className="header_text">Manage category</h3>

          <div className="p-3">
            <CategoryForm
              handleSubmitCategory={handleSubmitCategory}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
            />
          </div>

          <div className="w-75 " style={{ margin: "0 auto" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr key={category._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.name}</td>
                    <td className="d-flex flex-row justify-content-center align-items-center gap-3">
                      <button
                        className="button_primary d-flex flex-row justify-content-center align-items-center gap-3"
                        onClick={() => handleEditCategory(category)}
                      >
                        <span>Edit</span>
                        <GrEdit />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
            <CategoryForm
              categoryName={updatedCategoryName}
              setCategoryName={setUpdatedCategoryName}
              handleSubmitCategory={handleUpdateCategory}
            />
          </ReactModal>
        </div>
      </SidebarLayout>
    </Layout>
  );
};

export default CreateCategory;
