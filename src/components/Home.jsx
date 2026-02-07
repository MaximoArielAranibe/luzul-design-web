import { useEffect, useState } from "react";
import "../styles/Home.scss";
import { Link } from "react-router-dom";
import CatalogSection from "./CatalogSection";
import ServicesSection from "./ServicesSection";
import ShowcaseVideo from "./ShowcaseVideo";
import Testimonials from "./Testimonials";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  const images = [
    { id: 1, thumbnail: "https://i.ibb.co/6x0Nb25/475908950-629629076149439-5762507054999860065-n.jpg" },
    { id: 2, thumbnail: "https://i.ibb.co/1GqhfPSz/nuevas-3.jpg" },
    { id: 4, thumbnail: "https://i.ibb.co/qYLhPTNw/flores-2.jpg" },
    { id: 10, thumbnail: "https://i.ibb.co/cKSY7VSd/nuevas-5.jpg" },

    { id: 5, thumbnail: "https://i.ibb.co/qMkD9V39/flores-3.jpg" },
    { id: 6, thumbnail: "https://i.ibb.co/XZ9yLQ6Z/nuevas.jpg" },
    { id: 8, thumbnail: "https://i.ibb.co/QF8V1p4c/boda.jpg" },
    { id: 3, thumbnail: "https://i.ibb.co/yBn5XRvC/flores.jpg" },
    { id: 9, thumbnail: "https://i.ibb.co/W4y2RVyx/nuevas-4.jpg" },

  ]

  /* Button delay */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  /* Hero Parallax */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector(".hero");

      if (!hero) return;

      hero.style.setProperty(
        "--parallax-offset",
        `${scrolled * 0.3}px`
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
            className={`btn-primary animate__animated button__contact ${showButton ? "animate__bounceInUp" : "hidden"
              }`}
          >
            Solicitar Presupuesto
          </Link>

        </div>
      </section>

      {/* SERVICES */}
      <ServicesSection />

      {/* VIDEO */}
      <ShowcaseVideo />

      {/* CATALOG */}
      <CatalogSection />

      {/* PORTFOLIO */}
      <section className="portfolio" id="portfolio">

        <div className="section-header">
          <h2>ALGUNOS DE NUESTROS TRABAJOS</h2>
          <p>Profesionalismo y calidad en cada detalle</p>
        </div>

        <div className="portfolio-grid">

          {images.map((i) => (
            <img className="portfolio-grid-img" src={i.thumbnail} alt="Luzul Design Foto de evento" key={i.id} />
          ))}

        </div>

      </section>

      {/* TESTIMONIALS */}

      <Testimonials />


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
