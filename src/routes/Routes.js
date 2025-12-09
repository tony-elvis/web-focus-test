import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginRoute } from '../components/LoginRoute.js';
import { ProtectedRoute } from '../components/ProtectedRoute.js';
import { HomePanel, LoginPage, Users, CreateUser, Books, CreateBook } from '../pages/index.js';

export default function AppRoutes() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route exact path="/" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<HomePanel />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/users/new" element={<CreateUser />} />
            <Route exact path="/users/edit/:id" element={<CreateUser />} />
            <Route exact path="/books" element={<Books />} />
            <Route exact path="/books/new" element={<CreateBook />} />
            <Route exact path="/books/edit/:id" element={<CreateBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
