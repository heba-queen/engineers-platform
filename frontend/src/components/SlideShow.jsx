import { useState } from 'react';
import { imageUrl } from '../static/urls';

const SlideShow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % images.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + images.length) % images.length);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        
        <div
          key={index}
          className={`mySlides ${index === currentSlide ? 'active' : ''}`}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <div className="numbertext">{`${index + 1} / ${images.length}`}</div>
          <img className="img" src={`${imageUrl}/media/${image}`} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '70vh' }} />
          
        </div>
      ))}
      <a className="prev" onClick={prevSlide}>❮</a>
      <a className="next" onClick={nextSlide}>❯</a>
      <br />
    
    </div>
  );
};

export default SlideShow;
