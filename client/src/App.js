import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';

import './assets/styles/main.css';
import './assets/styles/responsive.css';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';

import Home from './pages/Home';
import Profile from './pages/profile';
import VerifySuccessPage from './pages/verifySuccessPage';
import JoinGroup from './components/joinGroup/JoinGroup';
import Group from './pages/Group';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate replace to="/sign-in" />} />
                <Route path="/id" element={<Profile />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/verify-success" element={<VerifySuccessPage />} />
                <Route path="/group/invite" element={<JoinGroup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/group" element={<Group />} />
            </Routes>
        </div>
    );
}
