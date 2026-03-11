import { useState, useEffect, useCallback } from "react";
import "../styles/Carousel.scss";

const Carousel = ({
  slides = [
    { id: 1, thumbnail: "https://i.ibb.co/6x0Nb25/475908950-629629076149439-5762507054999860065-n.jpg" },
    { id: 2, thumbnail: "https://i.ibb.co/1GqhfPSz/nuevas-3.jpg" },
    { id: 6, thumbnail: "https://i.ibb.co/XZ9yLQ6Z/nuevas.jpg" },
    { id: 10, thumbnail: "https://i.ibb.co/cKSY7VSd/nuevas-5.jpg" },
    { id: 5, thumbnail: "https://i.ibb.co/qMkD9V39/flores-3.jpg" },
    { id: 4, thumbnail: "https://i.ibb.co/qYLhPTNw/flores-2.jpg" },
    { id: 8, thumbnail: "https://i.ibb.co/QF8V1p4c/boda.jpg" },
    { id: 3, thumbnail: "https://i.ibb.co/yBn5XRvC/flores.jpg" },
    { id: 9, thumbnail: "https://i.ibb.co/W4y2RVyx/nuevas-4.jpg" }
  ],
  autoPlay = true,
  interval = 4000,
  showDots = true,
  showArrows = true
}) => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval, autoPlay]);

  if (!slides.length) return null;

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="carousel__slide" key={slide.id}>
              <img
                src={slide.thumbnail}
                alt={slide.alt || "carousel image"}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              className="carousel__arrow carousel__arrow--left"
              onClick={prev}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className="carousel__arrow carousel__arrow--right"
              onClick={next}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}

        {showDots && (
          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot ${i === current ? "is-active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;