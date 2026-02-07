import {
  FaUtensils,
  FaHeadphones,
  FaChair,
  FaCamera,
  FaShuttleVan,
  FaCalendarCheck,
  FaCocktail,
  FaCar,
  FaChargingStation,
  FaBuilding,
  FaListAlt,
} from "react-icons/fa";

import "../styles/ServicesSection.scss";
import { FaTent } from "react-icons/fa6";

const services = [
  /*   {
      icon: <FaUtensils />,
      title: "Catering",
      text: "Gastronomía propia elaborada con productos de primera calidad.",
    }, */
  {
    icon: <FaHeadphones />,
    title: "DJ, sonido e iluminación",
    text: "Musicalización, locución, iluminación y pantallas.",
  },
  {
    icon: <FaChair />,
    title: "Ambientación",
    text: "Mobiliario premium y diseño personalizado.",
  },
  {
    icon: <FaCamera />,
    title: "Fotografía y video",
    text: "Proveedores profesionales del mercado.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Planeación y coordinación",
    text: "Supervisión integral del evento.",
  },
  {
    icon: <FaCocktail />,
    title: "Cocktelería",
    text: "Barra con personal especializado.",
  },
  {
    icon: <FaChargingStation />,
    title: "Grupo electrógeno",
    text: "Continuidad energética garantizada.",
  },
  {
    icon: <FaBuilding />,
    title: "Centro administrativo",
    text: "Oficina céntrica para seguimiento.",
  },
  {
    icon: <FaTent />,
    title: "Carpas beduinas",
    text: "Ideal para stands.",
  },
  {
    icon: <FaListAlt />,
    title: "Otros recomendados",
    text: "Cabina, pista LED, shows y más.",
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section" id="servicios">
      <div className="services-section__container">

        {/* Header */}
        <div className="services-section__header">
          <h2>Servicios</h2>
          <div className="services-section__divider" />
          <p>Conocé todos los servicios que ofrecemos.</p>
        </div>

        {/* Grid */}
        <div className="services-section__grid">

          {services.map((service, index) => (
            <div className="service-box" key={index}>
              <div className="service-box__icon">
                {service.icon}
              </div>

              <div className="service-box__content">
                <h4>{service.title}</h4>
                <p>{service.text}</p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
