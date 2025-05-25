import { useEffect , createContext , useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


function ProtectedRoutes() {

   const token = window.localStorage.getItem("token");
   const location = useLocation();
 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token ) {
      console.log("no token");
      navigate("/user/login");
    }
    else{
        if(location.pathname === "/signup" || location.pathname === "/login"){
            navigate('/main')
        }
    }

    console.log("hello");

    
    }, [location.pathname, navigate , token]);
   

    const DataContext = createContext('');

    const ContextProvider = (props : any) =>{
    return(
        <DataContext.Provider value = {token || ''} >
            {props.children}
        </DataContext.Provider>
    )
}

  return (
    <ContextProvider>
        <Outlet />
    </ContextProvider>
  )
}
  

 


export { ProtectedRoutes };
