import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../page/HomePage'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}

export default MainRoutes