import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true' || localStorage.getItem('adminLoggedIn') === 'true';
      if (isLoggedIn) {
        const stored = localStorage.getItem('adminProfile');
        if (stored) {
          try {
            const profile = JSON.parse(stored);
            setUserName(profile.name);
            setUserAvatar(profile.avatar);
            return;
          } catch(e) {}
        }
        setUserName('Administrador');
        setUserAvatar('./assets/RavivaSF.png');
      } else {
        setUserName('');
        setUserAvatar(null);
      }
    };
    
    checkLogin();
    // Allow checking changes if navigated back in same window OR storage event from other tabs
    window.addEventListener('storage', checkLogin);
    window.addEventListener('profileUpdate', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('profileUpdate', checkLogin);
    };
  }, []);

  return (
    <header>
      <div className="container header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo-container">
          <a href="#" className="logo-link">
            <img src="./assets/RavivaSF.png" alt="Rádio AVIVA" className="logo" />
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
        >
          {userName && <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#f8f9fa' }}>{userName}</span>}
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt="Avatar do Usuário" 
              className="user-avatar-preview"
            />
          ) : (
            <i className="fas fa-user-circle" style={{ fontSize: '1.6rem' }}></i>
          )}
        </Link>
      </div>
    </header>
  );
}
