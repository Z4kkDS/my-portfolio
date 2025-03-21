import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); 

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;