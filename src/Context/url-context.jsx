import { createContext, useState } from "react";

const UrlContext = createContext();

const UrlProvider = ({children}) => {
    const [currentUrlGroup, setCurrentUrlGroup] = useState();

    return (
        <UrlContext.Provider value={{currentUrlGroup, setCurrentUrlGroup}}>
            {children}
        </UrlContext.Provider>
    )
}

export {UrlContext, UrlProvider};