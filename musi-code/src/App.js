import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import AddMusica from './components/pages/AddMusica';
import Search from './components/pages/Search';
import MySongs from './components/pages/MySongs';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false); // Adicionado para garantir que o estado seja atualizado corretamente
    }
  }, []);

  function handleAuthentication(token) {
    setAuthenticated(true);
    localStorage.setItem('token', token);
    alert('Login bem-sucedido');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
  }

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isLoggedIn = authenticated; // Armazena o estado de autenticação em uma variável local

    useEffect(() => {
      if (!isLoggedIn) {
        console.log('Access denied. Redirecting to /Login.');
        alert('Acesso negado: Faça login para acessar essa página');
      }
    }, [isLoggedIn]);

    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/Login" replace />;
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated} onAuthentication={handleAuthentication} />} />
          <Route path="/Login" element={<Login onAuthentication={handleAuthentication} />} />
          <Route path="/AddMusica" element={<ProtectedRoute element={AddMusica} />} />
          <Route path="/Search" element={<ProtectedRoute element={Search} />} />
          <Route path="/MySongs" element={<ProtectedRoute element={MySongs} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
