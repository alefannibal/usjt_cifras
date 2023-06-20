import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
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
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  function handleBeforeUnload() {
    handleLogout();
  }

  function handleAuthentication(token) {
    setAuthenticated(true);
    localStorage.setItem('token', token);
    alert('Login bem-sucedido');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
  }

  function ProtectedRoute({ element, ...rest }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessDenied, setAccessDenied] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
      }
    }, []);
  
    useEffect(() => {
      if (!authenticated && location.pathname !== '/') {
        alert('Acesso negado: Faça login para acessar essa página');
        setAccessDenied(true);
      }
    }, [authenticated, location]);
  
    if (accessDenied) {
      return <Navigate to="/" replace />;
    }
  
    return authenticated ? React.cloneElement(element, { authenticated }) : null;
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
          <Route
            path="/Login"
            element={
              authenticated ? <Navigate to="/" replace /> : <Login onAuthentication={handleAuthentication} />
            }
          />
          <Route path="/AddMusica" element={<ProtectedRoute element={<AddMusica />} />} />
          <Route path="/Search" element={<ProtectedRoute element={<Search />} />} />
          <Route path="/MySongs" element={<ProtectedRoute element={<MySongs />} />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
