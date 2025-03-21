import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import ProjectCard from './ProjectCard';

function Projects() {
  // Reference for the section container
  const sectionRef = useRef(null);
  // Referencias para proyectos (se poblarán dinámicamente)
  const projectsRef = useRef([]);
  // Estado para filtrar proyectos - inicializado en "featured"
  const [activeFilter, setActiveFilter] = useState('featured');
  // Estado para controlar animación cuando se cambia de filtro
  const [isChangingFilter, setIsChangingFilter] = useState(false);
  // Estado para controlar si los proyectos están cargados inicialmente
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Linktree Personal",
      description: "Página de enlaces personales al estilo Linktree, usando HTML, CSS Y Javascript con un diseño minimalista y funcional. Implementé una interfaz fácil de usar con efectos hover suaves y un diseño responsive que se adapta perfectamente a cualquier dispositivo.",
      image: `${process.env.PUBLIC_URL}/images/projects/linktree.jpeg`,
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://linktree-five-navy.vercel.app/",
      codeUrl: "https://github.com/Z4kkDS/linktree",
      category: "frontend",
      featured: true
    },
    // Aquí puedes agregar más proyectos
   
    
    {
      id: 2,
      title: "Portfolio Personal",
      description: "Portfolio profesional desarrollado con React, mostrando mis proyectos, habilidades y experiencia. Diseño responsive con modo claro/oscuro y animaciones elegantes.",
      image: `${process.env.PUBLIC_URL}/images/projects/Portfolio.jpeg`,
      technologies: ["React", "CSS", "JavaScript"],
      demoUrl: "q",
      codeUrl: "https://github.com/usuario/portfolio",
      category: "frontend",
      featured: true
    },

    {
      id: 3,
      title: "Rawg Game Explorer",
      description: "Este proyecto representó mi primer acercamiento a React, Axios y el consumo de una API REST. Desarrollé un buscador de juegos con filtrado y scroll infinito, ordenando los juegos según su puntuación en Metacritic. Además, implementé una pantalla de detalles con información del juego, incluyendo capturas de pantalla y tráilers si están disponibles.",
      image: `${process.env.PUBLIC_URL}/images/projects/rawg.jpeg`,
      technologies: ["React", "JavaScript", "CSS", "Axios", "React Router"],
      demoUrl: "https://rawggameexplorer.vercel.app/",
      codeUrl: "https://github.com/Z4kkDS/rawg-game-explorer",
      category: "frontend",
      featured: true
    }
  ];

  // Filtros simplificados: solo destacados, frontend y backend
  const filters = [
    { id: 'featured', label: 'Destacados', icon: 'fas fa-star' },
    { id: 'frontend', label: 'Frontend', icon: 'fas fa-laptop-code' },
    { id: 'backend', label: 'Backend', icon: 'fas fa-server' }
  ];
  
  // Proyectos filtrados
  const filteredProjects = (() => {
    switch (activeFilter) {
      case 'featured':
        return projects.filter(project => project.featured);
      case 'frontend':
        return projects.filter(project => project.category === 'frontend');
      case 'backend':
        return projects.filter(project => project.category === 'backend');
      default:
        return projects.filter(project => project.featured);
    }
  })();

  // Manejador para cambio de filtro con animación
  const handleFilterChange = (category) => {
    if (category === activeFilter) return;
    
    setIsChangingFilter(true);
    
    // Breve retraso para permitir animación de salida
    setTimeout(() => {
      setActiveFilter(category);
      setIsChangingFilter(false);
    }, 300);
  };

  // Inicializar la matriz de referencias al montar o cuando cambia la cantidad de proyectos
  useEffect(() => {
    projectsRef.current = new Array(filteredProjects.length);
  }, [filteredProjects.length]);
  
  // Efecto para cargar los proyectos destacados automáticamente al inicio
  useEffect(() => {
    // Cargar los proyectos después de un breve tiempo para dar tiempo al DOM a inicializarse
    const timer = setTimeout(() => {
      if (!isInitiallyLoaded) {
        setIsInitiallyLoaded(true);
        
        // Aplicar fade-in al contenedor principal si no lo tiene ya
        if (sectionRef.current && !sectionRef.current.classList.contains('fade-in')) {
          sectionRef.current.classList.add('fade-in');
        }
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isInitiallyLoaded]);
  
  // Configurar intersection observer para las animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Esperar a que el DOM se actualice antes de observar los proyectos
    const timer = setTimeout(() => {
      // Aplicar fade-in al contenedor principal
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      // Observar cada proyecto con retraso progresivo
      projectsRef.current.forEach((project, index) => {
        if (project) {
          // Aseguramos que cualquier animación previa se elimina
          project.classList.remove('fade-in');
          
          setTimeout(() => {
            observer.observe(project);
          }, index * 200); // Retraso progresivo para efecto cascada
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [filteredProjects, isInitiallyLoaded]); // Añadido isInitiallyLoaded como dependencia

  return (
    <section id="projects" className="projects-container" ref={sectionRef}>
      <h2 className="section-title">Mis Proyectos</h2>
      
      <div className="projects-filter">
        {filters.map(filter => (
          <button 
            key={filter.id} 
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter.id)}
            aria-label={`Filtrar por ${filter.label.toLowerCase()}`}
          >
            <i className={`${filter.icon} filter-icon`}></i>
            {filter.label}
          </button>
        ))}
      </div>

      <p className="projects-count">
        Mostrando {filteredProjects.length} proyectos 
        {activeFilter !== 'featured' ? ` de ${activeFilter}` : ' destacados'}
      </p>
      
      <div className={`projects-grid ${isChangingFilter ? 'filter-changing' : ''}`}>
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            project={project}
            ref={el => projectsRef.current[index] = el}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="no-projects">No hay proyectos que coincidan con este filtro.</p>
      )}
    </section>
  );
}

export default Projects;