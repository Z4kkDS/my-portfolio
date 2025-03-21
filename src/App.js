import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; 

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section id="home" className="hero-section">
          <Hero />
        </section>
        <section id="about" className="about-section">
          <About />
        </section>
        <section id="projects" className="projects-section">
          <Projects />
        </section>
        <section id="skills" className="skills-section">
          <Skills />
        </section>
        <section id="contact" className="contact-section">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop /> 
    </div>
  );
}

export default App;