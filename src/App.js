import { createRoot } from 'react-dom';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AddMusica from "./components/pages/AddMusica";
import Search from "./components/pages/Search";
import MySongs from "./components/pages/MySongs";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/AddMusica">
            <AddMusica />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>
          <Route exact path="/MySongs">
            <MySongs />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;