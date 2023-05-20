import React, { useState } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} />
          <Route
            path="/Login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/AddMusica"
            element={isAuthenticated ? <AddMusica /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Search"
            element={isAuthenticated ? <Search /> : <Navigate to="/Login" />}
          />
          <Route
            path="/MySongs"
            element={isAuthenticated ? <MySongs /> : <Navigate to="/Login" />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;