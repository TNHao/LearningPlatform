import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import VerifySuccessPage from "./pages/verifySuccessPage";
import JoinGroup from "./components/joinGroup/JoinGroup";
import Group from "./pages/Group";
import RequireAuth from "./components/requireAuth";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/user"
          element={
            <RequireAuth redirectTo="/login">
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/verify-success" element={<VerifySuccessPage />} />
        <Route
          path="/groups/invite"
          element={
            <RequireAuth redirectTo="/login">
              <JoinGroup />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/group/:id"
          element={
            <RequireAuth redirectTo="/login">
              <Group />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
