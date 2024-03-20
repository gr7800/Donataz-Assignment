import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../page/HomePage'
import LoginPage from '../page/Login'
import Signup from '../page/SignupPage'
import PrivateRoute from './PrivateRoute'
import ProfilePage from '../page/ProfilePage'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default MainRoutes