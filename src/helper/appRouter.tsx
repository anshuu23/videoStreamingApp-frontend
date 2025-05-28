import { createBrowserRouter } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { LoginPage } from "../components/loginPage";
import { MainPage } from "../components/mainPage";
import { ProtectedRoutes } from "./protectedRoutes";
import {  SignupPage } from "../components/signupPage";
import { AdminDashBoard } from "../components/adminDashboard";
import WatchVideoPage from "../components/watchVideo";
import { VideoDetailsForm } from "../components/uploads/videoDetails";
import { UserRoutes } from "./userRoutes";
import DashboardPage from "../components/dashboard/dashboardPage";
import { SearchResultPage } from "../components/SearchResultPage/serachResultPage";


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
                        <Navbar />    
                        <VideoDetailsForm />
                    </>
                )

            },
            {
                path : '/video/:id' ,
                element : (
                    <>
                        <Navbar searchBar />    
                        <WatchVideoPage />
                    </>
                )

            },
            {
                path : '/' ,
                element : (
                    <>
                        <Navbar searchBar/> 
                        <MainPage />
                    </>
                )
            },
            {
                path : '/dashboard' ,
                element : (
                    <>
                        <Navbar /> 
                        <DashboardPage />
                    </>
                )
            },
            {
                path : '/search' ,
                element : (
                    <>
                        <Navbar searchBar/> 
                        <SearchResultPage />
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