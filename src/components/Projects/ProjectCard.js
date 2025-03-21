import React, { forwardRef } from 'react';
import './Projects.css';

const techLogos = {
  "HTML": "fab fa-html5",
  "CSS": "fab fa-css3-alt",
  "JavaScript": "fab fa-js",
  "React": "fab fa-react",
  "Node.js": "fab fa-node-js",
  "Python": "fab fa-python",
  "PHP": "fab fa-php",
  "Laravel": "fab fa-laravel",
  "Bootstrap": "fab fa-bootstrap",
  "Git": "fab fa-git-alt",
  "GitHub": "fab fa-github",
  "Font Awesome": "fab fa-font-awesome",
  "MongoDB": "fas fa-database",
  "MySQL": "fas fa-database",
  "Docker": "fab fa-docker",
  "TypeScript": "fab fa-js",
  "Express": "fas fa-server",
  "Next.js": "fas fa-fast-forward",
  "TailwindCSS": "fab fa-css3"
};

const techColors = {
  "HTML": "#E34F26",
  "CSS": "#1572B6",
  "JavaScript": "#F7DF1E",
  "React": "#61DAFB",
  "Node.js": "#339933",
  "Python": "#3776AB",
  "PHP": "#777BB4",
  "Laravel": "#FF2D20",
  "Bootstrap": "#7952B3",
  "Git": "#F05032",
  "GitHub": "#181717",
  "MongoDB": "#47A248",
  "MySQL": "#4479A1",
  "Docker": "#2496ED",
  "TypeScript": "#3178C6"
};

const ProjectCard = forwardRef(({ project }, ref) => {
  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/images/projects/placeholder.jpg`;
  };

  return (
    <div 
      className={`project-card ${project.featured ? 'featured' : ''}`}
      ref={ref}
    >
      <div className="project-image-container">
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-image" 
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="project-content">
        <div>
          <h3 className="project-title">{project.title}</h3>
          
          <div className="tech-badges-container">
            {project.technologies.map(tech => (
              <span key={tech} className="tech-badge" title={tech}>
                <i 
                  className={techLogos[tech] || "fas fa-code"}
                  style={{color: techColors[tech] || "var(--primary-color)"}}
                ></i>
                {tech}
              </span>
            ))}
          </div>
          
          <p className="project-description">{project.description}</p>
        </div>
        
        <div className="project-links">
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link demo-link"
              aria-label={`Ver demo de ${project.title}`}
            >
              <i className="fas fa-external-link-alt"></i> Demo
            </a>
          )}
          {project.codeUrl && (
            <a 
              href={project.codeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link code-link"
              aria-label={`Ver código de ${project.title}`}
            >
              <i className="fab fa-github"></i> Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;