import { useEffect , createContext , useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


function ProtectedRoutes() {

   const token = window.localStorage.getItem("token");
   const role = window.localStorage.getItem("role");
   const location = useLocation();
 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token || !role) {
      console.log("no role or token");
      navigate("/login");
    }

    console.log("hello");

    if (role == "ADMIN") {
      if (location.pathname == "/createAccount") {
        navigate("/createAccount");
      }

      navigate("/adminDashboard");
    }

    if (role == "Employee") {
      if (location.pathname == "/employeeDashboard") {
        navigate("/employeeDashboard");
      }

      navigate("/employeeDashboard");
    }
    }, [location.pathname, navigate, role, token]);
   

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
