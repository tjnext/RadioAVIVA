import React from 'react';

export default function AppShowcase() {
  return (
    <section className="app-showcase-section">
      <div className="container">
        <div className="app-showcase-wrapper">
          <div className="app-showcase-text">
            <span className="app-tag">NOVIDADE</span>
            <h2>Sua rádio favorita, agora no seu bolso!</h2>
            <p>
              Baixe agora o aplicativo oficial da <strong>Rádio AVIVA</strong> e acompanhe nossa 
              programação ao vivo, peça louvores e receba palavras de fé onde quer que você esteja.
            </p>
            
            <div className="app-showcase-actions">
              <a href="#" className="btn-download-green-large" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-download"></i> BAIXAR APP OFICIAL
              </a>
              <div className="app-availability">
                <span>Disponível para iOS e Android</span>
                <div className="availability-icons">
                  <i className="fab fa-apple"></i>
                  <i className="fab fa-google-play"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="app-showcase-visual">
            <img 
              src="./assets/smartphones.png" 
              alt="App Rádio AVIVA" 
              className="app-main-mockup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
