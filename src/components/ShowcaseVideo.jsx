import "../styles/ShowcaseVideo.scss";

const ShowcaseVideo = () => {
  return (
    <section className="showcase-video">

      <div className="showcase-video__container">

        <div className="showcase-video__text">
          <h2>Viví la Experiencia LUZUL</h2>

          <p>
            Cada evento es único. Diseñamos ambientes que generan
            momentos inolvidables.
          </p>

          <a
            href="/catalogo-luzul.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ver Catálogo
          </a>
        </div>

        <div className="showcase-video__media">
          <video
            src="/showcase.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

      </div>

    </section>
  );
};

export default ShowcaseVideo;
