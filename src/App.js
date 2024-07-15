import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import './scss/style.scss';
import LoginDemo from './views/base/users/Logindemo';
import ActiveDemo from './views/base/users/Activedemo';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const DashboardLayout = React.lazy(() => import('./layout/DashboardLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/login" />} />
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/users/logindemo" element={<LoginDemo />} />
              <Route exact path="/users/activedemo" element={<ActiveDemo />} />
              <Route exact path="/live" name="Home 2" element={<ProtectedRoute element={DashboardLayout} />} />
              <Route path="*" name="Home" element={<ProtectedRoute element={DefaultLayout} />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </AuthProvider>
    );
  }
}

export default App;