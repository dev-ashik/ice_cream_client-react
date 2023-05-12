import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/ComponentStyles.css';
import { BsSearch } from "react-icons/bs";
import { serverUrl } from "../../serverUrl";

const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/product/search/${values.keyword}`)

            setValues({...values, results: data});
            navigate("/search")

        } catch(error) {
            console.log(error)
        }
    }
  return (
    <>
      <form className="d-flex nav_search" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e)=> setValues({...values, keyword: e.target.value})}
        />
        <button className="" type="submit">
        <BsSearch/>
        </button>
      </form>
    </>
  );
};

export default SearchInput;
