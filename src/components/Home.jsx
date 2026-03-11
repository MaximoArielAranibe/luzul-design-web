import React from 'react';
import { useEffect, useState } from "react";
import "../styles/Home.scss";
import CatalogSection from "./CatalogSection";
import ServicesSection from "./ServicesSection";
import ShowcaseVideo from "./ShowcaseVideo";
import Testimonials from "./Testimonials";
import About from './About';
import Contact from './Contact';
import Portfolio from './Portfolio';
import Carousel from './Carousel';


const Home = () => {
  const [showButton, setShowButton] = useState(false);


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

          <a
            href="#contacto"
            className={`btn-primary animate__animated button__contact ${showButton ? "animate__bounceInUp" : "hidden"
              }`}
          >
            Solicitar Presupuesto
          </a>
        </div>

        {/* WAVE INFERIOR */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path
              d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,117.3C1120,128,1280,128,1360,128L1440,128L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
              fill="#0f0f0f"
            />
          </svg>
        </div>
      </section>


      {/* SERVICES */}
      <ServicesSection />

      {/* VIDEO */}
      <ShowcaseVideo />

      <CatalogSection />
      {/* CATALOG */}

      <Carousel />

      {/* PORTFOLIO */}
      <Portfolio />

      {/* TESTIMONIALS */}

      <Testimonials />


      {/* ABOUT */}
      <About />

      {/* CONTACT */}

      <Contact />

    </main>
  );
};

export default Home;
