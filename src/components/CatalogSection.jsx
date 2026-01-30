import '../styles/CatalogSection.scss'
const CatalogSection = () => {
  return (
    <section className="catalog-cta" id="catalogo">
      <div className="catalog-cta__container">

        <h2>Descubrí Nuestro Catálogo</h2>

        <p>
          Explorá nuestra selección exclusiva de mobiliario, ambientaciones
          e ideas para transformar tu evento en una experiencia única.
        </p>

        <a
          href="/catalogo-luzul.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="catalog-cta__button btn-primary"
        >
          Ver Catálogo
        </a>

      </div>
    </section>
  );
};

export default CatalogSection;
