//idea https://github.com/briancodex/react-image-slider-carousel
import styles from "./styles/Slider.module.css";
import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

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
        <section>
            {length > 1 &&
            <div>
                <FaArrowAltCircleLeft size={30}  onClick={prevSlide} />
                <FaArrowAltCircleRight size={30}  onClick={nextSlide} />
            </div>}

            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? `${styles.slide} ${styles.active}` : `${styles.slide}`}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} height={400} alt='travel image' className={styles.image} />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;
