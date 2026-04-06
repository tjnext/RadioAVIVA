import React from 'react';
import { useData } from '../hooks/useData';

export default function Eventos() {
  const { eventos } = useData();

  if (!eventos || eventos.length === 0) return null;

  return (
    <section className="eventos-premium-section" id="eventos">
      <div className="container">
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          <p>Fique por dentro do que está acontecendo na Rádio AVIVA</p>
        </div>

        <div className="eventos-premium-grid">
          {eventos.map((evento) => (
            <div className="evento-premium-card" key={evento.id}>
              <div className="evento-image-wrapper">
                <img 
                  src={evento.image || 'public/assets/fundobiblia.jpg'} 
                  alt={evento.title} 
                  className="evento-img"
                />
                <div className="evento-date-badge">
                  <span className="day">{new Date(evento.date).getDate() + 1}</span>
                  <span className="month">
                    {new Date(evento.date).toLocaleString('pt-BR', { month: 'short' }).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="evento-info">
                <h3>{evento.title}</h3>
                <p>{evento.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
