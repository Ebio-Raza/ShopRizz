import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };
  const startAutoMove = () => {
    const id = setInterval(() => {
      nextSlide();
    }, 3000); // Adjust the interval time (in milliseconds) as needed
    setIntervalId(id);
  };

  const stopAutoMove = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };
  useEffect(() => {
    startAutoMove();
    return () => {
      if (intervalId) {
        stopAutoMove();
      }
    };
  }, []);

  return (
    <div className="carousel m-0 p-0 ">
      {/* <button className="prev" onClick={prevSlide}>&lt;</button> */}
      <img src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
      {/* <button className="next" onClick={nextSlide}>&gt;</button> */}
    </div>
  );
};

export default Carousel;
