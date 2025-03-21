import React, { useEffect, useRef } from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faEye, faBullseye, faHeart } from '@fortawesome/free-solid-svg-icons';

function About() {
    const sectionRef = useRef(null);    
    const cardsRef = useRef([]);        

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            },
            { 
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px' 
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        cardsRef.current.forEach((card, index) => {
            if (card) {
                setTimeout(() => {
                    observer.observe(card);
                }, index * 200); 
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section id="about" className="about-container" ref={sectionRef}>
            <h2 className="section-title">Sobre Mí</h2>
            
            <div className="about-cards">
                <div 
                    className="about-card" 
                    ref={el => cardsRef.current[0] = el}
                >
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faUserTie} />
                    </div>
                    <h3>Perfil Profesional</h3>
                    <p>
                        Desarrollador Fullstack egresado de <span className="highlight">Analista Programador, INACAP</span>, 
                        especializado en crear interfaces atractivas y funcionales. Aunque disfruto más del Frontend, 
                        también tengo sólidos conocimientos en Backend, lo que me permite ofrecer soluciones 
                        completas y escalables.
                    </p>
                </div>
                
                <div 
                    className="about-card" 
                    ref={el => cardsRef.current[1] = el}
                >
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    <h3>Visión Integral</h3>
                    <p>
                        Experiencia en <span className="highlight">atención al cliente, ventas y control de inventarios</span>, 
                        lo que me permite desarrollar soluciones tecnológicas que generen un impacto real en las 
                        distintas áreas operativas de una empresa.
                    </p>
                </div>
                
                <div 
                    className="about-card" 
                    ref={el => cardsRef.current[2] = el}
                >
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faBullseye} />
                    </div>
                    <h3>Enfoque</h3>
                    <p>
                        Mi enfoque está orientado a resultados, buscando siempre la <span className="highlight">eficiencia</span>, 
                        optimización y calidad en cada proyecto. Me motiva enfrentar desafíos tecnológicos y 
                        aportar soluciones innovadoras.
                    </p>
                 
                </div>
                
                <div 
                    className="about-card" 
                    ref={el => cardsRef.current[3] = el}
                >
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <h3>Intereses Personales</h3>
                    <p>Fuera del mundo de la programación, disfruto de:</p>
                    <ul className="interest-list">
                        <li>Videojuegos</li>
                        <li>Peliculas y series</li>
                        <li>Disfrutar de la musica</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default About;