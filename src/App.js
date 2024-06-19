import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NavBar from './components/Navbar';
import Home from './components/home';
import Profile from './components/profile';
import LanguageSwitcher from './components/languageSwitcher';
import Footer from './components/Footer';
import Productos from './components/productos';
import './App.css';
import './i18n';

function App() {
  const { loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

  const handleLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <LanguageSwitcher />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/productos" element={<Productos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;