import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/loginPage';
import HomePage from './Pages/HomePage/homePage';
import AdminPage from './Pages/AdminPage/adminPage';
import SuperAdminPage from './Pages/SuperAdmin/superAdminPage';
import { observer } from 'mobx-react';

export const AppRoutes = observer(() => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/super-admin" element={<SuperAdminPage />} />
                <Route path="/home/:program_id" element={<HomePage />} />
                <Route path="/admin/:program_id" element={<AdminPage />} />                
            </Routes>
        </Router>
    );
});