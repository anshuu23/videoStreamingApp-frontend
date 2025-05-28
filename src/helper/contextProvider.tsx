import {   createContext  } from "react";

type AuthContextType = {
  token: string | null;
  role: string | null;
};

const DataContext =createContext<AuthContextType>({
  token: null,
  role: null,
});

export const ContextProvider = (props : any) =>{

    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");


        return(
            <DataContext.Provider value ={{ token, role}} >
                {props.children}
            </DataContext.Provider>
        )

    }