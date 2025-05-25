import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { LoginPage } from "../components/loginPage";
import { MainPage } from "../components/mainPage";
import { ProtectedRoutes } from "./protectedRoutes";
import {  SignupPage } from "../components/signupPage";
import { AdminDashBoard } from "../components/adminDashboard";
import WatchVideoPage from "../components/watchVideo";
import { VideoDetailsForm } from "../components/uploads/videoDetails";
import { UserRoutes } from "./userRoutes";


const  AppRouter = createBrowserRouter([
    {
        path : '/user',
        element :  <UserRoutes />,
        children : [
            
                {
                path : '/user/login' ,
                element : (
                    <>
                        <LoginPage />
                    </>
                )

            },
            {
                path : '/user/signup' ,
                element : (
                    <>
                        <SignupPage />
                    </>
                )

            },
            
        ]
    },
    {
        path : '/' ,
         element :  <ProtectedRoutes />,
         //element :  <Outlet />,
        children : [            
            
            {
                path : '/upload' ,
                element : (
                    <>
                        <VideoDetailsForm />
                    </>
                )

            },
            {
                path : '/video/:id' ,
                element : (
                    <>
                        <Navbar />    
                        <WatchVideoPage />
                    </>
                )

            },
            {
                path : '/' ,
                element : (
                    <>
                        <Navbar /> 
                        <MainPage />
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
        
        ]
    }
])

export {AppRouter}