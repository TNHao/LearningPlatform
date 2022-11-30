import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export default function RequireAuth({ children, redirectTo }) {

    let isAuthenticated = false;
    if (localStorage.getItem("accessToken")) {
        isAuthenticated = true;
    }
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}