import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <img src={"/TPNlogo.png"} alt="TPN Logo" className="navbar-logo" />
      <h1 className="navbar-title">Tu Primer Negocio</h1>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
        <li><Link to="/quienes-somos" onClick={() => setIsMenuOpen(false)}>¿Quiénes somos?</Link></li>
        <li><Link to="/testimonios" onClick={() => setIsMenuOpen(false)}>Testimonios</Link></li>
        <li><Link to="/como-iniciar" onClick={() => setIsMenuOpen(false)}>¿Como iniciar?</Link></li>

        <li><Link to="/contactenos" onClick={() => setIsMenuOpen(false)}>Contáctenos</Link></li>
        <li><Link to="/iniciar-sesion" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link></li>
      </ul>
    </nav>
    
  );
}

export default Navbar;
