import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";

import './assets/styles/main.css';
import './assets/styles/responsive.css';
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";

import Home from "./pages/Home";
import Profile from "./pages/profile";
import VerifySuccessPage from "./pages/verifySuccessPage";
import JoinGroup from "./components/joinGroup/JoinGroup";
import Group from "./pages/Group";

export default function App() {
    let isLogin = false;
    if (localStorage.getItem("accessToken")) {
        isLogin = true;
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={isLogin ? <Navigate replace to="/home" /> : <Navigate replace to="/sign-in" />} />
                <Route path="/user" element={isLogin ? <Profile /> : <Navigate replace to="/sign-in" />} />
                <Route path="/sign-up" element={isLogin ? <Navigate replace to="/home" /> : <SignUp />} />
                <Route path="/sign-in" element={isLogin ? <Navigate replace to="/home" /> : <SignIn />} />
                <Route path="/verify-success" element={<VerifySuccessPage />} />
                <Route path="/group/invite" element={isLogin ? <JoinGroup /> : <Navigate replace to="/sign-in" />} />
                <Route path="/home" element={isLogin ? <Home /> : <Navigate replace to="/sign-in" />} />
                <Route path="/group" element={isLogin ? <Group /> : <Navigate replace to="/sign-in" />} />
            </Routes>
        </div>
    );
}
