import React from "react";
import "../../styles/CategoryStyle.css";

const CategoryForm = ({
  handleSubmitCategory,
  categoryName,
  setCategoryName,
}) => {
  return (
    <>
      <form onSubmit={handleSubmitCategory} className="categoryForm p-3 w-20"
        style={{width: '300px'}}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <button type="submit" className="button_primary modalSubmitButton">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
