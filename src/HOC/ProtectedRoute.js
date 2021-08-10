import React from 'react';
import { Navigate, Route } from 'react-router';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token')
    return (<Route {...rest} element={token ? Element : <Navigate to='/signin' />} />)
}
export default ProtectedRoute;