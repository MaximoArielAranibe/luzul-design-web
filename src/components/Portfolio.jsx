import React from 'react'
import '../styles/Portfolio.scss'

const images = [
  { id: 1, thumbnail: "https://i.ibb.co/6x0Nb25/475908950-629629076149439-5762507054999860065-n.jpg" },
  { id: 2, thumbnail: "https://i.ibb.co/1GqhfPSz/nuevas-3.jpg" },
  { id: 6, thumbnail: "https://i.ibb.co/XZ9yLQ6Z/nuevas.jpg" },

  { id: 10, thumbnail: "https://i.ibb.co/cKSY7VSd/nuevas-5.jpg" },
  { id: 5, thumbnail: "https://i.ibb.co/qMkD9V39/flores-3.jpg" },
  { id: 4, thumbnail: "https://i.ibb.co/qYLhPTNw/flores-2.jpg" },

  { id: 8, thumbnail: "https://i.ibb.co/QF8V1p4c/boda.jpg" },
  { id: 3, thumbnail: "https://i.ibb.co/yBn5XRvC/flores.jpg" },
  { id: 9, thumbnail: "https://i.ibb.co/W4y2RVyx/nuevas-4.jpg" },

]


const Portfolio = () => {
  return (
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
  )
}

export default Portfolio