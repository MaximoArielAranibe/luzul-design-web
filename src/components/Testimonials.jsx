import React, { useEffect, useRef } from "react";
import "../styles/Testimonials.scss";

const Testimonials = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" id="testimonios">
      <div className="section-header">
        <h2>Clientes Satisfechos</h2>
        <p>Opiniones reales</p>
      </div>

      <div className="testimonials-grid">
        {[
          {
            text: "Buen gusto y elegancia. Los mejores artículos para decorar.",
            author: "Maricel E.",
          },
          {
            text: "Excelente grupo de trabajo y ambientaciones de primer nivel.",
            author: "Bruno E.",
          },
          {
            text: "Gran variedad, precios accesibles y atención especializada.",
            author: "Ana L. P.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="testimonial"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <p>“{item.text}”</p>
            <h5>{item.author}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
