import axios from "axios"
import { useState, createContext, useContext, useEffect } from "react"
import { serverUrl } from "../serverUrl"


const productdataContext = createContext()


const ProductsdataProvider = ({children}) => {
    const [productdata, setProductdata] = useState({})

    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(
            `${serverUrl}/api/v1/product/products`
          );
    
          if (data.success) {
            setProductdata(data);
            // setProducts(data.products);
          }
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(()=>{
        getAllProducts();
    }, [])

    return (
        <productdataContext.Provider value={[productdata, setProductdata]}>
            {children}
        </productdataContext.Provider>
    )

}

// custom hook
const useProductdata = () => useContext(productdataContext);

export {useProductdata, ProductsdataProvider}