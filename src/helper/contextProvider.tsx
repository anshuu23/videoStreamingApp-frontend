import {   createContext  } from "react";

const DataContext = createContext('');

const ContextProvider = (props : any) =>{

    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");


        return(
            <DataContext.Provider value ={{ token, role}} >
                {props.children}
            </DataContext.Provider>
        )

    }