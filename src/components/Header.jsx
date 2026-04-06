import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo-container">
          <a href="#" className="logo-link">
            <img src="/assets/RavivaSF.png" alt="Rádio AVIVA" className="logo" />
          </a>
        </div>
        
        <nav>
          <ul className="menu-desktop" style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#" className="active-link" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: '500', paddingBottom: '5px', borderBottom: '2px solid #FFD700' }}>Início</a></li>
            <li><a href="#programacao" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Programação</a></li>
            <li><a href="#cultos" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Cultos</a></li>
            <li><a href="#eventos" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Eventos</a></li>
            <li><a href="#contato" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Contato</a></li>
          </ul>
        </nav>
        
        <Link 
          to="/admin" 
          className="admin-link-btn" 
          title="Painel Administrativo"
          style={{ 
            color: '#fff', 
            fontSize: '1.5rem', 
            border: '2px solid #FFD700', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textDecoration: 'none'
          }}
        >
          <i className="fas fa-user-circle"></i>
        </Link>
      </div>
    </header>
  );
}
