import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext()

export function useLoading(){
    return useContext(LoadingContext)
}

export const LoadingProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(false)
    return(
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}
