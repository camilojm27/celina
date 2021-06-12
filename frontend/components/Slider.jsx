//idea https://github.com/briancodex/react-image-slider-carousel
import "./styles/slyder.module.css";
import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
// Todo: Hacer un renderizado condicional de las flechas, Hacer que se apliquen los estilos

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className='rslider'>
            <FaArrowAltCircleLeft size={30} className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight size={30} className='right-arrow' onClick={nextSlide} />
            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} height={400} alt='travel image' className='image' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;