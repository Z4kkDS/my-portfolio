import React from 'react';
import './Logo.css';
import { ReactComponent as LogoSVG } from '../../Assets/logo.svg';

function Logo({ className = '', size = 'medium', showText = true }) {
  const logoClass = `logo-container ${size} ${className}`;
  
  return (
    <div className={logoClass}>
      <div className="logo-wrapper">
        <LogoSVG className="logo-svg" aria-label="Logo de Diego Sáez" />
        
        {showText && (
          <div className="logo-text">
            <span className="logo-text-main">ZDK</span>
            <span className="logo-text-dot">.</span>
            <span className="logo-text-dev">DEV</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logo;