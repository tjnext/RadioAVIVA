import React, { useRef } from 'react';
import { useData } from '../hooks/useData';

export default function Programacao() {
  const { programs } = useData();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="programacao-section" id="programacao">
      <div className="container">
        <div className="section-header">
          <h2>Nossa Programação</h2>
          <p>Acompanhe nossos programas diários feitos para edificar a sua fé</p>
        </div>
        
        <div className="carousel-container">
          <button className="carousel-arrow arrow-left" onClick={() => scroll('left')} aria-label="Anterior">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="schedule-grid" ref={scrollRef}>
            {programs.map((program) => (
              <div className="schedule-card" key={program.id}>
                <div className="time">{program.time}</div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            ))}
          </div>

          <button className="carousel-arrow arrow-right" onClick={() => scroll('right')} aria-label="Próximo">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
