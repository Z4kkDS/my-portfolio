import React, { useRef, useEffect } from 'react';
import './Contact.css';

function Contact() {
  const sectionRef = useRef(null);
  const socialRef = useRef(null);

  const socialLinks = [
    {
      id: 1,
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://www.linkedin.com/in/diego-saez-figueroa-a68b00251',
      description: 'Revisa mi experiencia profesional y conecta conmigo'
    },
    {
      id: 2,
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/Z4kkDS',
      description: 'Explora mis proyectos y contribuciones de código'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (socialRef.current) observer.observe(socialRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-container" ref={sectionRef}>
      <div className="contact-header">
        <h2>¡Trabajemos Juntos!</h2>
        <p>
          Estoy buscando oportunidades para colaborar con empresas/agencias que busquen 
          desarrolladores comprometidos con la calidad y la innovación. 
          Conecta conmigo a través de cualquiera de estas plataformas.
        </p>
      </div>
      
      <div className="social-links-container" ref={socialRef}>
        <div className="social-links">
          {socialLinks.map(social => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={`Conectar en ${social.name}`}
            >
              <div className="social-icon-wrapper">
                <div className="social-icon-container">
                  <i className={social.icon}></i>
                </div>
                <div className="social-info">
                  <span className="social-name">{social.name}</span>
                  <span className="social-description">{social.description}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="contact-note">
          <i className="fas fa-map-marker-alt location-icon"></i>
          <p>
            Basado en <strong>Coronel, Chile</strong> 
            <span className="availability">• Disponible para posiciones remotas o híbridas</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;