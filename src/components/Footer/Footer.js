import React, { useEffect, useRef } from 'react';
import './Footer.css';
import Logo from '../Logo/Logo'; // Importamos el componente Logo

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  
  // Social media links con URLs actualizadas
  const socialLinks = [
    {
      id: 1,
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://www.linkedin.com/in/diego-saez-figueroa-a68b00251',
    },
    {
      id: 2,
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/Z4kkDS',
    },
    {
      id: 3,
      name: 'Email',
      icon: 'fas fa-envelope',
      url: 'mailto:diego_saez96@hotmail.com',
    }
  ];

  // Animación de entrada para el footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          footerRef.current.classList.add('footer-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-wrapper">
              <Logo size="medium" className="footer-logo-component" />
            </div>
            <p>Audentes fortuna iuvat</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navegación</h4>
              <ul>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#about">Sobre Mí</a></li>
                <li><a href="#projects">Proyectos</a></li>
                <li><a href="#skills">Habilidades</a></li>
                <li><a href="#contact">Contacto</a></li>
              </ul>
            </div>
            
            <div className="footer-social">
              <h4>Conectar</h4>
              <div className="social-icons">
                {socialLinks.map(social => (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${social.name}`}
                    className="social-icon-link"
                  >
                    <span className="icon-bg"></span>
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Diego Sáez. Todos los derechos reservados.</p>
          </div>
          <div className="footer-message">
            <p>Hecho con <i className="fas fa-heart"></i> y <i className="fas fa-coffee"></i> en Coronel, Chile</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;