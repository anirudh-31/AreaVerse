import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    if (!images || images.length === 0) {
        return (
            <div className="no-images-message">
                <p>No images for this post.</p>
            </div>
        );
    }
    
    const goToSlide = (index) => {
        const newIndex = Math.max(0, Math.min(index, images.length - 1));
        setCurrentIndex(newIndex);
    };

    return (
        <div className="report-carousel-container">
            <div className="report-carousel-track-container">
                <ul className="report-carousel-track" ref={trackRef}>
                    {images.map((img, index) => (
                        <li className="report-carousel-slide" key={index}>
                            <img className="report-image" src={img.url} alt={img.alt} />
                        </li>
                    ))}
                </ul>
            </div>
            <button 
              className={`report-carousel-btn report-image-prev-btn ${currentIndex === 0 ? 'is-hidden' : ''}`}
              onClick={() => goToSlide(currentIndex - 1)}>
                <ChevronLeft />
            </button>
            <button 
              className={`report-carousel-btn report-image-next-btn ${currentIndex === images.length - 1 ? 'is-hidden' : ''}`}
              onClick={() => goToSlide(currentIndex + 1)}>
                <ChevronRight />
            </button>
            <div className="report-carousel-nav">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`report-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel