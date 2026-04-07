import React from 'react';
import { useData } from '../hooks/useData';

export default function Programacao() {
  const { programs } = useData();

  return (
    <section className="programacao-section" id="programacao">
      <div className="container">
        <div className="section-header">
          <h2>Nossa Programação</h2>
          <p>Acompanhe nossa rádio 24h e leve a Rádio AVIVA para onde você for!</p>
        </div>
        
        <div className="programacao-tri-wrapper">
          {/* Coluna 1: Programação */}
          <div className="tri-column tri-left">
            <h3 className="tri-title"><i className="fas fa-clock"></i> Horários</h3>
            <div className="programacao-vertical-list">
              {programs.map((program) => (
                <div className="schedule-card-v" key={program.id}>
                  <div className="time">{program.time}</div>
                  <div className="schedule-info">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Imagem Central (Estúdio) */}
          <div className="tri-column tri-center">
            <div className="studio-img-wrapper-tri">
              <img src="./assets/studio.png" alt="Estúdio Rádio AVIVA" className="studio-img-tri" />
            </div>
          </div>

          {/* Coluna 3: App Download */}
          <div className="tri-column tri-right">
            <div className="download-app-card-tri">
              <h3>Baixe o App Oficial</h3>
              <a href="#" className="btn-download-green-tri" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-download"></i> BAIXAR
              </a>
              <div className="mockup-container-tri">
                <img 
                  src="./assets/smartphones.png" 
                  alt="App Rádio AVIVA Mockup" 
                  className="app-mockup-img-tri" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
