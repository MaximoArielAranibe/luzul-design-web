import React, { useState } from "react";
import "../styles/Contact.scss";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    const text = `
  Hola Lucas\u{1F44B}

  Mi nombre es ${name}
  Mi teléfono es: ${phone}

  Me comunico a través de su página web, mi mensaje es el siguiente:

  ${message}
    `.trim();

    const url = `https://api.whatsapp.com/send?phone=5492477687768&text=${encodeURIComponent(
      text
    )}`;


    window.open(url, "_blank");
  };


  return (
    <section className="contact" id="contacto">
      {/* Header */}
      <div className="contact__header">
        <h2>Contacto <strong style={{ color: "#d4af37" }}>LUZUL DESIGN</strong></h2>
        <p>Hablemos sobre tu próximo evento</p>
      </div>

      {/* Grid */}
      <div className="contact__grid">
        {/* Info */}
        <div className="contact__info">
          <h3>Información</h3>

          <ul>
            <li>
              <span>📍</span> Río de Janeiro 136, Pergamino
            </li>

            <li>
              <a href="+5492477687768"><span>📞</span> 02477 68-7768</a>
            </li>

            <li>
              <span>🕘</span> Martes a Sábado · 9 a 18 hs
            </li>
          </ul>

          <a
            href="https://wa.me/5492477687768"
            target="_blank"
            rel="noreferrer"
            className="btn-primary contact__whatsapp"
          >
            Contactar por WhatsApp
          </a>
        </div>

        {/* Form */}
        <form className="contact__form" onSubmit={handleSubmit}>
          <h3>Solicitar Presupuesto</h3>

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              placeholder="Tu teléfono"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mensaje</label>
            <textarea
              name="message"
              placeholder="Contanos sobre tu evento..."
              value={form.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <p className="contact__note">
            📩 Respondemos en menos de 24 hs
          </p>

          <button type="submit" className="btn-primary form-btn">
            Enviar consulta
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
