
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
    // Verificar se o usuário está autenticado ao carregar a página
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
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

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Home authenticated={authenticated} onAuthentication={handleAuthentication} />}
          />
          {authenticated ? (
            // Rotas acessíveis apenas para usuários autenticados
            <>
              <Route path="/AddMusica" element={<AddMusica />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/MySongs" element={<MySongs />} />
            </>
          ) : (
            // Redirecionar para a página de login se não estiver autenticado
            <Route path="/Login" element={<Login onAuthentication={handleAuthentication} />} />
          )}
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;