import { useState } from "react";
import "../styles/Navbar.scss";
import logo from "../assets/logo-blanco.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="Luzul Design Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="navbar__menu">
          <a href="#inicio">Inicio</a>
          <a href="/catalogo-luzul.pdf" target="_blank" rel="noopener noreferrer">Catálogo</a>
          <a href="#sobrenosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#testimonios">Testimonios</a>
          <a href="#contacto" className="btn-primary">Contacto</a>
        </nav>

        {/* Mobile Button */}
        <button
          className={`navbar__toggle ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${open ? "show" : ""}`}>
        <a onClick={() => setOpen(false)} href="#home">Inicio</a>
        <a href="catalogo-luzul.pdf" target="_blank" rel="noopener noreferrer">Catálogo</a>

        <a onClick={() => setOpen(false)} href="#sobrenosotros">Nosotros</a>
        <a onClick={() => setOpen(false)} href="#servicios">Servicios</a>
        <a onClick={() => setOpen(false)} href="#testimonios">Testimonios</a>
        <a onClick={() => setOpen(false)} href="#contacto">Contacto</a>
      </div>
    </header>
  );
};

export default Navbar;
