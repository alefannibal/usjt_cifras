import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import AddMusica from './components/pages/AddMusica';
import Search from './components/pages/Search';
import Profile from './components/pages/Profile';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PublicProfile from "./components/pages/PublicProfile"
function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
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

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    // Verificamos se o token está presente no localStorage ao renderizar o componente
    const isLoggedIn = localStorage.getItem('token') ? true : false;

    // Removemos a função useEffect e o alerta de "Acesso negado" para evitar exibições desnecessárias
    // Se o usuário não estiver autenticado, o Navigate redirecionará para a rota de login
    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" replace />;
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
          <Route path="/Profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/PublicProfile/:userId" element={<ProtectedRoute element={PublicProfile} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
