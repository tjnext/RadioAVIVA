import React, { useRef } from 'react';
import { useData } from '../hooks/useData';

export default function Eventos() {
  const { eventos } = useData();
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

  // Filter events from today onwards, and sort by closest date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEventos = [...eventos]
    .filter((evento) => evento.date)
    .sort((a, b) => {
      const [yA, mA, dA] = a.date.split('-');
      const [yB, mB, dB] = b.date.split('-');
      const dateA = new Date(yA, mA - 1, dA);
      const dateB = new Date(yB, mB - 1, dB);
      
      const isPastA = dateA < today;
      const isPastB = dateB < today;

      // Se um é futuro e outro é passado, o futuro vem primeiro
      if (!isPastA && isPastB) return -1;
      if (isPastA && !isPastB) return 1;

      // Se ambos são futuros, o mais próximo (menor data) vem primeiro
      if (!isPastA && !isPastB) {
        return dateA - dateB;
      }

      // Se ambos são passados, o mais recente (maior data) vem primeiro
      return dateB - dateA;
    });

  if (!upcomingEventos || upcomingEventos.length === 0) return null;

  return (
    <section className="eventos-premium-section" id="eventos">
      <div className="container">
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          <p>Fique por dentro da programação da Igreja Assembléia de Deus do campo da Barra Funda!</p>
        </div>

        <div className="carousel-container" style={{ marginTop: '30px' }}>
          <button className="carousel-arrow arrow-left" onClick={() => scroll('left')} aria-label="Anterior">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="eventos-premium-grid" ref={scrollRef}>
            {upcomingEventos.map((evento) => (
              <div className="evento-premium-card" key={evento.id}>
                <div className="evento-image-wrapper">
                  <img 
                    src={evento.image || './assets/fundobiblia.jpg'} 
                    alt={evento.title} 
                    className="evento-img"
                    style={{ objectFit: evento.imageFit || 'cover' }}
                  />
                  <div className="evento-date-badge">
                    {(() => {
                      const [y, m, d] = evento.date.split('-');
                      const dateObj = new Date(y, m - 1, d);
                      return (
                        <>
                          <span className="day">{d}</span>
                          <span className="month">
                            {dateObj.toLocaleString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase()}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="evento-info">
                  <h3>{evento.title}</h3>
                  <p>{evento.description}</p>
                </div>
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
