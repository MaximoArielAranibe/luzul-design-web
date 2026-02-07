import React from 'react'
import '../styles/Testimonials.scss'

const Testimonials = () => {
  return (
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
  )
}

export default Testimonials