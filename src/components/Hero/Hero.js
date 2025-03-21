import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  
  const [isProfessionalMode, setIsProfessionalMode] = useState(false);
  
  
  const toggleMode = () => {
    setIsProfessionalMode(!isProfessionalMode);
    
    document.body.classList.toggle('dark-mode');
  };

  
  const avatarImage = `${process.env.PUBLIC_URL}/images/avatar.png`;
  const professionalImage = `${process.env.PUBLIC_URL}/images/professional.png`;

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Hola, soy <span className="highlight">Diego Sáez</span></h1>
        <h2>Analista Programador y Desarrollador Fullstack en proceso</h2>
        <p>¡Bienvenido a mi portafolio! Aquí podrás encontrar información sobre mi formación academica, habilidades y proyectos realizados</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            <i className="fas fa-code"></i> Ver Proyectos
          </a>
          <a href="#contact" className="btn btn-secondary">
            <i className="fas fa-envelope"></i> Contactar
          </a>
          <a 
            href={`${process.env.PUBLIC_URL}/cv.pdf`} 
            className="btn btn-cv"
            target="_blank"
            rel="noopener noreferrer"
            download="Diego_Saez_CV.pdf" 
          >
            <i className="fas fa-file-download"></i> Descargar CV
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src={isProfessionalMode ? professionalImage : avatarImage} 
          alt={isProfessionalMode ? "Foto profesional" : "Avatar"} 
          onClick={toggleMode}
          className={`profile-image ${isProfessionalMode ? 'professional' : 'avatar'}`}
        />
      </div>
    </div>
  );
}

export default Hero;