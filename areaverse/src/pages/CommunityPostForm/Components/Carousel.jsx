// src/components/Carousel.js
import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = (direction) => {
        const newIndex = (currentIndex + direction + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    if (images.length === 0) {
        return (
            <div className="carousel-wrapper">
                <div className="no-visuals">
                    <div className="no-visuals-icon">🖼️</div>
                    <p>No Visuals Attached</p>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-wrapper">
            <div className="carousel-container">
                {images.map((img, i) => {
                    const offset = i - currentIndex;
                    let transform, opacity, zIndex;

                    if (offset === 0) {
                        transform = 'translateX(-50%) translateZ(50px) scale(1)';
                        opacity = 1;
                        zIndex = 2;
                    } else if (offset === 1 || (currentIndex === images.length - 1 && i === 0)) {
                        transform = 'translateX(0) translateZ(0) scale(0.8) rotateY(-40deg)';
                        opacity = 0.7;
                        zIndex = 1;
                    } else if (offset === -1 || (currentIndex === 0 && i === images.length - 1)) {
                        transform = 'translateX(-100%) translateZ(0) scale(0.8) rotateY(40deg)';
                        opacity = 0.7;
                        zIndex = 1;
                    } else {
                        transform = `translateX(${Math.sign(offset) * -50}%) translateZ(-100px) scale(0.6)`;
                        opacity = 0;
                        zIndex = 0;
                    }

                    return (
                        <div
                            key={i}
                            className="carousel-item"
                            style={{
                                backgroundImage: `url(${img.dataUrl})`,
                                transform,
                                opacity,
                                zIndex
                            }}
                        />
                    );
                })}
            </div>
            <div className="carousel-nav">
                <button className="carousel-btn" onClick={() => navigate(-1)} disabled={images.length <= 1}>‹</button>
                <button className="carousel-btn" onClick={() => navigate(1)} disabled={images.length <= 1}>›</button>
            </div>
        </div>
    );
};

export default Carousel;