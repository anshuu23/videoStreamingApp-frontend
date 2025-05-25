import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


function UserRoutes() {

   const token = window.localStorage.getItem("token");
   const location = useLocation();
 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (token ) {
      console.log("token");
      navigate("/");
    }
    
    }, [location.pathname, navigate , token]);
   

  return (
    <Outlet />
  )
}
  

 


export { UserRoutes };
