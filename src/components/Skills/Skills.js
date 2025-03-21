import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import SkillCard from './SkillCard';

function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const skillColors = {
    primary: "#556052",
    accent: "#A3B18A", 
    dark: "#414833",   
  };
  
  const skillCategories = [
    {
      id: 'frontend',
      title: "Frontend",
      icon: "fas fa-laptop-code",
      color: skillColors.primary,
      skills: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "React", icon: "fab fa-react" }
      ]
    },
    {
      id: 'backend',
      title: "Backend",
      icon: "fas fa-server",
      color: skillColors.primary,
      skills: [
        { name: "Python", icon: "fab fa-python" },
        { name: "MongoDB", icon: "fas fa-database" },
        { name: "Django", icon: "fab fa-python" }
      ]
    },
    {
      id: 'tools',
      title: "Herramientas",
      icon: "fas fa-tools",
      color: skillColors.primary,
      skills: [
        { name: "GitHub", icon: "fab fa-github" },
        { name: "VS Code", icon: "fas fa-code" },
        { name: "Git", icon: "fab fa-git-alt" }
      ]
    },
    {
      id: 'soft-skills',
      title: "Soft Skills",
      icon: "fas fa-users",
      color: skillColors.primary,
      skills: [
        { name: "Trabajo en Equipo", icon: "fas fa-hands-helping" },
        { name: "Comunicación", icon: "fas fa-comments" },
        { name: "Adaptabilidad", icon: "fas fa-sync-alt" },
        { name: "Resolución de Problemas", icon: "fas fa-puzzle-piece" }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Mis Habilidades</h2>
        <p className="section-description">
        Las herramientas y tecnologías que utilizo a diario, junto con las habilidades que potencian mi forma de trabajar.
        </p>
        
        <div className="skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard 
              key={category.id}
              category={category}
              isVisible={isVisible}
              delay={categoryIndex * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;