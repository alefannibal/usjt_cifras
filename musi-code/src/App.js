import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Routes>
        
          <Route path="/" element={<Home />}/>
            
          <Route path="/Login" element={<Login />}/>
                      
          <Route path="/AddMusica" element={<AddMusica />}/>
                     
          <Route path="/Search" element={<Search />}/>
                     
          <Route path="/MySongs" element={<MySongs />}/>
                
      </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
