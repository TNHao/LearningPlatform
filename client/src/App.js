import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';

import './assets/styles/main.css';
import './assets/styles/responsive.css';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';

import Home from './pages/home';
import Profile from './pages/profile';
import VerifySuccessPage from './pages/verifySuccessPage';
import JoinGroup from './components/joinGroup/JoinGroup';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate replace to="/sign-in" />} />
                <Route path="/user/:email" element={<Profile />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/verify-success" element={<VerifySuccessPage />} />
                <Route path="/group/invite" element={<JoinGroup />} />
            </Routes>
        </div>
    );
}
