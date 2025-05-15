import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { LoginPage } from "../components/loginPage";
import { MainPage } from "../components/mainPage";
import { ProtectedRoutes } from "./protectedRoutes";
import { CreateAccount } from "../components/createAccountPage";
import { AdminDashBoard } from "../components/adminDashboard";
import { EmployeeDashboard } from "../components/EmployeeDashboard";


const  AppRouter = createBrowserRouter([
    {
        path : '/' ,
        // element :  <ProtectedRoutes />,
         element :  <Outlet />,
        children : [            
            {
                path : '/login' ,
                element : (
                    <>
                        <Navbar />    
                        <LoginPage />
                    </>
                )

            },
            {
                path : '/main' ,
                element : (
                    <>
                        <Navbar /> 
                        <MainPage />
                    </>
                )
            },
            {
                path : '/createAccount' ,
                element : (
                    <>
                        <Navbar /> 
                        <CreateAccount />
                    </>
                )
            },
            {
                path : '/adminDashboard' ,
                element : (
                    <>
                        <Navbar /> 
                        <AdminDashBoard />
                    </>
                )
            },
            {
                path : '/employeeDashboard' ,
                element : (
                    <>
                        <Navbar /> 
                        <EmployeeDashboard />
                    </>
                )
            },
        ]
    }
])

export {AppRouter}