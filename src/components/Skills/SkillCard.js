import React, { useEffect, useRef } from 'react';
import './Skills.css';

function SkillCard({ category, isVisible, delay }) {
  const cardRef = useRef(null);
  const skillsRef = useRef([]);

  
  useEffect(() => {
    skillsRef.current = skillsRef.current.slice(0, category.skills.length);
  }, [category.skills.length]);

  
  useEffect(() => {
    if (!isVisible || !cardRef.current) return;

    const timer = setTimeout(() => {
      
      cardRef.current.classList.add('card-visible');
      
      
      skillsRef.current.forEach((skill, index) => {
        if (!skill) return;
        
        setTimeout(() => {
          skill.classList.add('skill-visible');
        }, 100 * (index + 1)); 
      });
    }, delay); 

    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  return (
    <div className="skill-card" ref={cardRef}>
      <div className="skill-card-header">
        <div className="skill-category-icon">
          <i className={category.icon}></i>
        </div>
        <h3 className="skill-category-title">{category.title}</h3>
      </div>
      
      <div className="skills-grid">
        {category.skills.map((skill, skillIndex) => (
          <div 
            key={skill.name} 
            className="skill-item"
            ref={el => skillsRef.current[skillIndex] = el}
          >
            <div className="skill-icon-wrapper">
              <i className={`skill-icon ${skill.icon}`}></i>
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;