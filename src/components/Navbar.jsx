import { useState } from "react";
import "../styles/Navbar.scss";
import logo from "../assets/logo-blanco.png";
import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Servicios", id: "servicios" },
  { label: "Catálogo", id: "catalogo" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonios", id: "testimonios" },
  { label: "Nosotros", id: "sobrenosotros" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const handleHomeClick = (e) => {
    setOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      navigate("/");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={handleHomeClick}>
          <span className="logo-wrapper">
            <img src={logo} alt="Luzul Design Logo" />
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="navbar__menu">

          <Link className="active" to="/" onClick={handleHomeClick}>
            Inicio
          </Link>

          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleSectionClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}

          <Link to="/videos">Videos</Link>

          <a
            href="#contacto"
            className="btn-primary"
            onClick={(e) => handleSectionClick(e, "contacto")}
          >
            Contacto
          </a>

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

        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleSectionClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}

        <Link to="/videos" onClick={() => setOpen(false)}>
          Videos
        </Link>

        <a
          href="#contacto"
          onClick={(e) => handleSectionClick(e, "contacto")}
        >
          Contacto
        </a>

      </div>
    </header>
  );
};

export default Navbar;