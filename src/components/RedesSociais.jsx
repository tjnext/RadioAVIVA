import React from 'react';

export default function RedesSociais() {
  return (
    <section className="social-section">
      <div className="container">
        <div className="section-header">
          <h2 style={{ color: '#FFD700' }}>Siga-nos nas Redes</h2>
          <p>Acompanhe Rádio AVIVA em todas as redes sociais</p>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/ieadebaf" className="social-btn facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/adbarrafundars_oficial/" className="social-btn instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
