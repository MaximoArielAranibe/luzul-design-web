import React, { useEffect, useState, useCallback } from "react";
import "../styles/About.scss";
import Waves from "./decorations/Waves.jsx";

const IMAGE_SRC =
  "https://i.ibb.co/q3CKLbGj/quincea-era-2.jpg";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, handleClose]);

  return (
    <section className="about" id="sobrenosotros">
      {/* Wave arriba */}
      <Waves backgroundColor="#0f0f0f" pos="top" />

      <div className="about-content" >
        <div
          className="about-image"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleOpen();
          }}
          aria-label="Ver imagen ampliada"

        >
          <img
            src={IMAGE_SRC}
            alt="Ambientación premium realizada por Luzul Design en evento social con iluminación decorativa y mobiliario exclusivo"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="about-text">
          <div className="about-text_wrapper">
            <h2>Sobre Nosotros</h2>
            <p className="about-subtitle">
              Creamos experiencias que transforman espacios en momentos inolvidables.
            </p>
          </div>

          <p>
            En <strong>Luzul Design</strong> diseñamos ambientaciones premium para
            eventos sociales, corporativos y espacios exclusivos. Cada proyecto
            es pensado estratégicamente para reflejar identidad, elegancia y
            detalle.
          </p>

          <p>
            Combinamos mobiliario de alta calidad, iluminación decorativa y
            soluciones personalizadas para lograr escenarios que impacten
            visualmente y generen una experiencia memorable en cada invitado.
          </p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="about-modal"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="about-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="about-modal-close"
              onClick={handleClose}
              aria-label="Cerrar imagen"
            >
              ×
            </button>

            <img
              src={IMAGE_SRC}
              alt="Imagen ampliada de ambientación premium"
            />
          </div>
        </div>
      )}

      {/* Wave abajo */}
      <Waves inverted backgroundColor="#0f0f0f" pos="bottom" />
    </section>
  );
};

export default About;
