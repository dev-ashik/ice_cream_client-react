import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async() => {
        try {
            const { data } = await axios.get(
              "https://shopping-dot-com-server.onrender.com/api/v1/category/get-categories"
            );
            if (data.success) {
              setCategories(data.categorys);
            }
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(()=> {
        getCategories();
    }, [])

  return categories
}

export default useCategory