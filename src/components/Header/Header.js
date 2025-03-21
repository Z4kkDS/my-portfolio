import React, { useState, useEffect, useMemo } from 'react';
import { scrollToSection } from '../../utils/scrollUtils';
import Logo from '../Logo/Logo';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = useMemo(() => [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' }
  ], []);

  // Detección de scroll para cambiar el header
  useEffect(() => {
    const handleScroll = () => {
      // Usamos un umbral para evitar el "temblor" en animaciones de scroll
      const scrollThreshold = 20;
      const shouldHaveScrolled = window.scrollY > scrollThreshold;
      
      if (shouldHaveScrolled !== hasScrolled) {
        setHasScrolled(shouldHaveScrolled);
      }
      
      // Detección de sección activa
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return { id: item.id, top: 0, height: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: item.id,
          top: rect.top + window.scrollY,
          height: rect.height
        };
      });
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        if (
          scrollPosition >= section.top &&
          scrollPosition <= section.top + section.height
        ) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar inmediatamente para establecer el estado inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, hasScrolled, navItems]);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${hasScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="logo">
          <a href="#home" aria-label="Ir al inicio">
            <Logo size={hasScrolled ? "small" : "medium"} showText={true} />
          </a>
        </div>
        
        <div 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;