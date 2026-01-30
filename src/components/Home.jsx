import { useEffect, useState } from "react";
import "../styles/Home.scss";
import { Link } from "react-router-dom";
import CatalogSection from "./CatalogSection";
import ServicesSection from "./ServicesSection";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="home" id="inicio">

    {/* HERO */}
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="animate__animated animate__backInLeft slow">
          LUZUL DESIGN
        </h1>

        <p className="animate__animated animate__backInRight slow">
          Ambientaciones premium para eventos, hogares y espacios comerciales.
          Elegancia y excelencia en cada detalle.
        </p>

        <Link
          to="#contacto"
          className={`btn-primary animate__animated button__contact ${
            showButton ? "animate__bounceInUp" : "hidden"
          }`}
        >
          Solicitar Presupuesto
        </Link>
      </div>
    </section>

    {/* SERVICES */}
    <ServicesSection />

    {/* CATALOG CTA */}
    <CatalogSection />

    {/* PORTFOLIO */}
    <section className="portfolio" id="portfolio">

      <div className="section-header">
        <h2>Portfolio</h2>
        <p>Algunos de nuestros trabajos</p>
      </div>

      <div className="portfolio-grid">
        <img src="../../public/edu-0010_7_143593-1553744891.webp" alt="" />
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87" alt="" />
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="" />
        <img src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe" alt="" />
      </div>

    </section>

    {/* TESTIMONIALS */}
    <section className="testimonials" id="testimonios">

      <div className="section-header">
        <h2>Clientes Satisfechos</h2>
        <p>Opiniones reales</p>
      </div>

      <div className="testimonials-grid">

        <div className="testimonial">
          <p>“Buen gusto y elegancia. Los mejores artículos para decorar.”</p>
          <h5>Maricel E.</h5>
        </div>

        <div className="testimonial">
          <p>“Excelente grupo de trabajo y ambientaciones de primer nivel.”</p>
          <h5>Bruno E.</h5>
        </div>

        <div className="testimonial">
          <p>“Gran variedad, precios accesibles y atención especializada.”</p>
          <h5>Ana L. P.</h5>
        </div>

      </div>

    </section>

    {/* ABOUT */}
    <section className="about" id="sobrenosotros">

      <div className="section-header">
        <h2>Sobre Nosotros</h2>
        <p>Pasión por el diseño y la ambientación</p>
      </div>

      <div className="about-content">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Ambientación Luzul"
          />
        </div>

        <div className="about-text">

          <h3>Diseñamos Experiencias Memorables</h3>

          <p>
            En Luzul Design transformamos espacios en experiencias únicas.
            Nos especializamos en eventos sociales, corporativos y proyectos personalizados.
          </p>

          <p>
            Contamos con mobiliario premium, iluminación decorativa,
            textiles y soluciones integrales.
          </p>

        </div>

      </div>

    </section>

    {/* CONTACT */}
    <section className="contact" id="contacto">

      <div className="section-header">
        <h2>Contacto</h2>
        <p>Hablemos sobre tu próximo evento</p>
      </div>

      <div className="contact-info">

        <p>📍 Río de Janeiro 136, Pergamino</p>
        <p>📞 02477 68-7768</p>
        <p>🕘 Martes a Sábado · 9 a 18 hs</p>

        <a
          href="https://wa.me/5492477687768"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Contactar por WhatsApp
        </a>

      </div>

    </section>

  </main>

  );
};

export default Home;
