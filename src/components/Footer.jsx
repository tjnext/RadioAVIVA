import React from 'react';

export default function Footer() {
  return (
    <footer id="contato" style={{ backgroundColor: '#001a38', color: '#fff', borderTop: '4px solid #FFD700', padding: '60px 0 0' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'flex-start', paddingBottom: '40px' }}>
        
        {/* Left Column: Logo & Desc */}
        <div style={{ flex: '1 1 300px', textAlign: 'center', marginBottom: '30px' }}>
          <img src="./assets/RavivaSF.png" alt="Rádio AVIVA" style={{ height: '70px', marginBottom: '20px' }} />
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto', color: '#e9ecef' }}>
            Rádio AVIVA conecta você e Deus com adoração e fé todos os dias.
          </p>
        </div>

        {/* Right Column: Contato */}
        <div style={{ flex: '1 1 300px', textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#FFD700', fontSize: '1.3rem', marginBottom: '20px', fontWeight: 'bold' }}>Contato</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e9ecef', fontSize: '1.05rem', lineHeight: '2' }}>
            <li><i className="fas fa-phone-alt" style={{ marginRight: '10px' }}></i>(54) 99678-0822</li>
            <li><i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>ad.radioaviva@gmail.com</li>
            <li><i className="fas fa-map-marker-alt" style={{ marginRight: '10px' }}></i>Barra Funda, RS</li>
          </ul>
        </div>
      </div>

      <div style={{ backgroundColor: '#000d1a', textAlign: 'center', padding: '20px 0', fontSize: '0.9rem', color: '#adb5bd' }}>
        <p>&copy; 2026 Rádio AVIVA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
