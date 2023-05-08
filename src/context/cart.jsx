import { useState, createContext, useContext, useEffect } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(()=> {
    let existiongCartItem = localStorage.getItem('cart');
    if(existiongCartItem) {
        setCart(JSON.parse(existiongCartItem))
    }
  }, [])
  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(cartContext);

export { useCart, CartProvider };
