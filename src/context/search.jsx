import { useState, createContext, useContext } from "react"

const searchContext = createContext();

const SearchProvider = ({children}) => {
    const [values, setValues] = useState({
        keyword: "",
        results: []
    })

    return (
        <searchContext.Provider value={[values, setValues]}>
            {children}
        </searchContext.Provider>
    )

}

// custom hook
const useSearch = () => useContext(searchContext);

export {useSearch, SearchProvider}
