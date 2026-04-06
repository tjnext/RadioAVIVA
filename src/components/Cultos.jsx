import React from 'react';
import { useData } from '../hooks/useData';

export default function Cultos() {
  const { cultos } = useData();

  return (
    <section className="cultos-section" id="cultos">
      <div className="container">
        <div className="section-header">
          <h2>Nossos Cultos</h2>
          <p>Junte-se a nós em nossas celebrações semanais</p>
        </div>

        <div className="events-grid">
          {/* Loop over all fixed cults (Churches) */}
          {Array.isArray(cultos) && cultos.map((igreja) => (
            <div className="event-card" key={igreja.id}>
              <div className="event-icon">
                <i className="fas fa-church"></i>
              </div>
              <h3>{igreja.name || 'Cultos Semanais'}</h3>
              <div className="event-details">
                <p><strong><i className="fas fa-clock"></i> Cultos:</strong></p>
                <p>{igreja.domingo}</p>
                <p>{igreja.quinta}</p>
                <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
                <p><strong><i className="fas fa-map-marker-alt"></i> Local:</strong></p>
                <p>{igreja.rua}</p>
                <p>{igreja.cidade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
