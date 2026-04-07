import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('adminLoggedIn') === 'true' || localStorage.getItem('adminLoggedIn') === 'true'
  );
  const [rememberMe, setRememberMe] = useState(false);

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : { username: 'admin', password: '123456', name: 'Administrador', avatar: './assets/RavivaSF.png' };
  });
  const [draftProfile, setDraftProfile] = useState(() => {
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : { username: 'admin', password: '123456', name: 'Administrador', avatar: './assets/RavivaSF.png' };
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [activeTab, setActiveTab] = useState('programacao');
  const navigate = useNavigate();
  
  const { programs, cultos, eventos, savePrograms, saveCultos, saveEventos } = useData();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('program'); // 'program' or 'evento'
  const fileInputRef = useRef(null);

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      e.target.value = null;
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande! Escolha uma imagem com menos de 5MB.');
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Redimensionar para no máximo 800px de largura/altura para economizar localStorage
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxSize = 800;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Converter para Base64 (JPEG com densidade 0.8 para otimizar tamanho)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        setEditItem(prev => ({ ...prev, image: compressedBase64 }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = null; // Clears the input so the same or another file can be re-selected easily
  };
  const [editItem, setEditItem] = useState({ id: null, time: '', title: '', description: '', image: '', imageFit: 'cover' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === adminProfile.username && password === adminProfile.password) {
      if (rememberMe) {
        localStorage.setItem('adminLoggedIn', 'true');
      } else {
        sessionStorage.setItem('adminLoggedIn', 'true');
      }
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    navigate('/'); // Use o navigate do React Router, ele respeita o basename!
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      setEditItem({ id: item.id, time: item.time || item.date, title: item.title, description: item.description, image: item.image || '', imageFit: item.imageFit || 'cover' });
    } else {
      const newId = type === 'program' 
        ? Math.max(...programs.map(p => p.id), 0) + 1
        : Math.max(...eventos.map(e => e.id), 0) + 1;
      setEditItem({ id: newId, time: '', title: '', description: '', image: '', imageFit: 'cover' });
    }
    setModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalType === 'program') {
      const newPrograms = [...programs];
      const index = newPrograms.findIndex(p => p.id === editItem.id);
      const updated = { id: editItem.id, time: editItem.time, title: editItem.title, description: editItem.description };
      if (index >= 0) newPrograms[index] = updated;
      else newPrograms.push(updated);
      newPrograms.sort((a, b) => a.time.localeCompare(b.time));
      savePrograms(newPrograms);
    } else {
      const newEventos = [...eventos];
      const index = newEventos.findIndex(ev => ev.id === editItem.id);
      const updated = { id: editItem.id, date: editItem.time, title: editItem.title, description: editItem.description, image: editItem.image, imageFit: editItem.imageFit };
      if (index >= 0) newEventos[index] = updated;
      else newEventos.push(updated);
      newEventos.sort((a, b) => a.date.localeCompare(b.date));
      saveEventos(newEventos);
    }
    setModalOpen(false);
  };

  const handleDeleteModal = () => {
    if (!window.confirm('Tem certeza que deseja deletar este item?')) return;
    if (modalType === 'program') {
      savePrograms(programs.filter(p => p.id !== editItem.id));
    } else {
      saveEventos(eventos.filter(e => e.id !== editItem.id));
    }
    setModalOpen(false);
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div style={{
        backgroundColor: '#134B62',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '80px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        color: '#fff',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'border 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.border = '2px solid #fff'}
          onMouseOut={e => e.currentTarget.style.border = '2px solid rgba(255,255,255,0.4)'}
          title="Voltar ao site"
        >
          <i className="fas fa-arrow-left"></i>
        </button>

        <div style={{ marginBottom: '70px' }}>
          <img src="./assets/RavivaSF.png" alt="Rádio AVIVA" style={{ height: '110px' }} />
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
          <div>
            <input 
              type="text" 
              placeholder="Usuário"
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.5)',
                padding: '10px 0',
                color: '#fff',
                textAlign: 'center',
                fontSize: '1.05rem',
                outline: 'none',
                boxShadow: 'none'
              }}
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Senha"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.5)',
                padding: '10px 0',
                color: '#fff',
                textAlign: 'center',
                fontSize: '1.05rem',
                outline: 'none',
                boxShadow: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '0.95rem' }}>
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: '#FFD700', width: '16px', height: '16px' }}
            />
            <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Lembre-me</label>
          </div>
          {errorMsg && <div style={{color:'#ff6b6b', textAlign: 'center', fontSize: '0.9rem'}}>{errorMsg}</div>}
          <button 
            type="submit" 
            style={{
              background: '#134B62',
              color: '#fff',
              borderRadius: '50px',
              padding: '16px',
              fontSize: '1rem',
              fontWeight: '600',
              letterSpacing: '1px',
              cursor: 'pointer',
              marginTop: '5px',
              transition: 'background 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#2B749A'}
            onMouseOut={e => e.currentTarget.style.background = '#235F7E'}
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-body" style={{ backgroundColor: '#134B62', minHeight: '100vh', marginTop: '-80px', paddingTop: '40px' }}>
      <div className="admin-container">
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginBottom: '30px' }}>
          <div className="admin-title-group">
            <div className="admin-title">
              <div className="logo-icon"><i className="fas fa-cogs"></i></div>
              <h1>Painel de Controle</h1>
            </div>
            <button className="btn-logout" onClick={() => navigate('/')} style={{ backgroundColor: '#dc3545', marginTop: '10px', width: 'fit-content' }}>
              <i className="fas fa-arrow-left"></i> Voltar
            </button>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#fff', fontSize: '1rem', fontWeight: '600' }}>{adminProfile.name}</div>
              <img 
                src={adminProfile.avatar} 
                alt="Profile" 
                style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFD700' }} 
              />
            </div>
            <button className="btn-logout" onClick={handleLogout} style={{ backgroundColor: '#dc3545' }}>
              <i className="fas fa-sign-out-alt"></i> Sair
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-tabs">
            <button className={`tab-btn ${activeTab === 'programacao' ? 'active' : ''}`} onClick={() => setActiveTab('programacao')}>
              <i className="fas fa-music"></i> Programação
            </button>
            <button className={`tab-btn ${activeTab === 'eventos' ? 'active' : ''}`} onClick={() => setActiveTab('eventos')}>
              <i className="fas fa-calendar-alt"></i> Eventos
            </button>
            <button className={`tab-btn ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
              <i className="fas fa-user-circle"></i> Perfil
            </button>
          </div>

          {activeTab === 'programacao' && (
            <div className="tab-content active">
              <div className="tab-header">
                <h2>Programação da Rádio</h2>
                <button className="btn-admin-primary" onClick={() => openModal('program')}>
                  <i className="fas fa-plus"></i> Novo Programa
                </button>
              </div>
              <div className="items-list">
                {programs.map(p => (
                  <div className="item-card" key={p.id}>
                    <div className="item-time">{p.time}</div>
                    <div className="item-content">
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                    </div>
                    <button className="btn-edit" onClick={() => openModal('program', p)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'eventos' && (
            <div className="tab-content active">
              <div className="tab-header">
                <h2>Cultos e Eventos</h2>
                <button className="btn-admin-primary" onClick={() => openModal('evento')}>
                  <i className="fas fa-plus"></i> Adicionar Evento
                </button>
              </div>
              <div className="admin-form-group">
                <h3>Editar Informações Fixas de Cultos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                  {cultos.map((igreja, index) => (
                    <div key={igreja.id} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
                      <h4 style={{ color: '#001a38', marginBottom: '15px', borderBottom: '2px solid #FFD700', paddingBottom: '5px' }}>
                        {index === 0 ? "📍 Igreja Sede" : `📍 Extensão ${index}`}
                      </h4>
                      <div className="form-group">
                        <label>Nome da Igreja</label>
                        <input 
                          type="text" 
                          value={igreja.name} 
                          onChange={e => {
                            const newCultos = [...cultos];
                            newCultos[index].name = e.target.value;
                            saveCultos(newCultos);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Culto 1 (Dia/Horário)</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Domingos 19:30h"
                          value={igreja.domingo} 
                          onChange={e => {
                            const newCultos = [...cultos];
                            newCultos[index].domingo = e.target.value;
                            saveCultos(newCultos);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Culto 2 (Dia/Horário)</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Quintas 20h00"
                          value={igreja.quinta} 
                          onChange={e => {
                            const newCultos = [...cultos];
                            newCultos[index].quinta = e.target.value;
                            saveCultos(newCultos);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Rua</label>
                        <input 
                          type="text" 
                          value={igreja.rua} 
                          onChange={e => {
                            const newCultos = [...cultos];
                            newCultos[index].rua = e.target.value;
                            saveCultos(newCultos);
                          }} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Cidade</label>
                        <input 
                          type="text" 
                          value={igreja.cidade} 
                          onChange={e => {
                            const newCultos = [...cultos];
                            newCultos[index].cidade = e.target.value;
                            saveCultos(newCultos);
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="eventos-section">
                <h3>Eventos Dinâmicos</h3>
                <div className="items-list">
                  {eventos.map(ev => (
                    <div className="item-card" key={ev.id}>
                      <div className="item-time">{ev.date ? ev.date.split('-').reverse().join('/') : 'Data indefinida'}</div>
                      <div className="item-thumb" style={{ width: '80px', height: '60px', marginLeft: '15px', borderRadius: '5px', overflow: 'hidden' }}>
                        <img src={ev.image || './assets/fundobiblia.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="item-content">
                        <h3>{ev.title}</h3>
                        <p>{ev.description}</p>
                      </div>
                      <button className="btn-edit-event" onClick={() => openModal('evento', ev)}>
                        <i className="fas fa-edit"></i> Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="tab-content active">
              <div className="tab-header">
                <h2>Perfil do Administrador</h2>
              </div>
              <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '15px', border: '1px solid #ddd', maxWidth: '600px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                  <img src={draftProfile.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #134B62' }} />
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#001a38' }}>Alterar Avatar</label>
                    <input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          let width = img.width;
                          let height = img.height;
                          
                          // Redimensionar para no máximo 400px (economizar espaço no localStorage)
                          const MAX_SIZE = 400;
                          if (width > height) {
                            if (width > MAX_SIZE) {
                              height *= MAX_SIZE / width;
                              width = MAX_SIZE;
                            }
                          } else {
                            if (height > MAX_SIZE) {
                              width *= MAX_SIZE / height;
                              height = MAX_SIZE;
                            }
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx.drawImage(img, 0, 0, width, height);
                          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                          setDraftProfile(prev => ({ ...prev, avatar: compressedBase64 }));
                        };
                        img.src = ev.target.result;
                      };
                      reader.readAsDataURL(file);
                      e.target.value = null;
                    }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Nome de Exibição</label>
                  <input type="text" value={draftProfile.name} onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Usuário de Login</label>
                  <input type="text" value={draftProfile.username} onChange={(e) => setDraftProfile({ ...draftProfile, username: e.target.value })} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Senha de Login</label>
                  <input type="password" value={draftProfile.password} onChange={(e) => setDraftProfile({ ...draftProfile, password: e.target.value })} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
                </div>
                
                {(() => {
                  const hasChanges = JSON.stringify(adminProfile) !== JSON.stringify(draftProfile);
                  return (
                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                      <button 
                        disabled={!hasChanges}
                        onClick={() => {
                          const updated = { ...draftProfile };
                          setAdminProfile(updated);
                          localStorage.setItem('adminProfile', JSON.stringify(updated));
                          window.dispatchEvent(new CustomEvent('profileUpdate'));
                        }}
                        style={{ flex: 1, padding: '12px', backgroundColor: '#134B62', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: hasChanges ? 'pointer' : 'not-allowed', transition: '0.3s', opacity: hasChanges ? 1 : 0.5 }}
                        onMouseOver={e => hasChanges && (e.currentTarget.style.backgroundColor = '#2B749A')}
                        onMouseOut={e => hasChanges && (e.currentTarget.style.backgroundColor = '#134B62')}
                      >
                        <i className="fas fa-save"></i> Salvar
                      </button>
                      <button 
                        disabled={!hasChanges}
                        onClick={() => setDraftProfile(adminProfile)}
                        style={{ flex: 1, padding: '12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: hasChanges ? 'pointer' : 'not-allowed', transition: '0.3s', opacity: hasChanges ? 1 : 0.5 }}
                        onMouseOver={e => hasChanges && (e.currentTarget.style.backgroundColor = '#e85d6b')}
                        onMouseOut={e => hasChanges && (e.currentTarget.style.backgroundColor = '#dc3545')}
                      >
                        <i className="fas fa-times"></i> Descartar
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div style={{ 
          display: 'flex', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.6)', 
          zIndex: 10000, 
          justifyContent: 'center', 
          alignItems: 'center',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '500px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eaeaea',
              paddingBottom: '15px',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: '#001a38', 
                fontSize: '1.4rem', 
                fontWeight: '700' 
              }}>
                {modalType === 'program' ? (editItem.id && programs.find(p => p.id === editItem.id) ? 'Editar Programa' : 'Novo Programa') : (editItem.id && eventos.find(e => e.id === editItem.id) ? 'Editar Evento' : 'Novo Evento')}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveModal}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#001a38', fontSize: '0.95rem' }}>
                  {modalType === 'program' ? 'Horário' : 'Data'}
                </label>
                <input 
                  type={modalType === 'program' ? "time" : "date"} 
                  value={editItem.time} 
                  onChange={e => setEditItem({...editItem, time: e.target.value})} 
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#001a38', fontSize: '0.95rem' }}>
                  Título
                </label>
                <input 
                  type="text" 
                  value={editItem.title} 
                  onChange={e => setEditItem({...editItem, title: e.target.value})} 
                  required 
                  placeholder={modalType === 'program' ? "Ex: Alvorecer com Cristo" : "Ex: Culto de Jovens"}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                />
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#001a38', fontSize: '0.95rem' }}>
                  Descrição
                </label>
                <textarea 
                  rows="4" 
                  value={editItem.description} 
                  onChange={e => setEditItem({...editItem, description: e.target.value})}
                  placeholder="Descrição do programa"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              {modalType === 'evento' && (
                <div style={{ marginBottom: '25px' }}>
                  {editItem.image && (
                    <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', background: '#f5f5f5' }}>
                       <img src={editItem.image} alt="Preview" style={{ width: '100%', height: '160px', objectFit: editItem.imageFit || 'cover' }} />
                    </div>
                  )}

                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#001a38', fontSize: '0.95rem' }}>
                    Imagem do Evento
                  </label>
                  
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input 
                      type="text" 
                      value={editItem.image} 
                      onChange={e => setEditItem({...editItem, image: e.target.value})} 
                      placeholder="URL da imagem (ex: ./assets/evento.jpg)"
                      style={{
                        flex: 1,
                        padding: '12px 15px',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      style={{
                        padding: '0 20px',
                        background: '#001a38',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <i className="fas fa-upload"></i> Upload
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageFile} 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                    />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px' }}>
                    Dica: Escolha um arquivo do seu dispositivo ou cole um link externo.
                  </p>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#001a38', fontSize: '0.95rem' }}>
                      Enquadramento da Imagem
                    </label>
                    <select 
                      value={editItem.imageFit || 'cover'}
                      onChange={e => setEditItem({...editItem, imageFit: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      <option value="cover">Preencher Espaço (Corta bordas)</option>
                      <option value="contain">Ajustar Inteira (Mostra por completo)</option>
                    </select>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                {(modalType === 'program' ? programs.find(p => p.id === editItem.id) : eventos.find(e => e.id === editItem.id)) && (
                  <button 
                    type="button" 
                    onClick={handleDeleteModal}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background 0.3s'
                    }}
                  >
                    <i className="fas fa-trash"></i> Deletar
                  </button>
                )}
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#20c997', // Mint green matching the screenshot
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.3s',
                    textTransform: 'uppercase'
                  }}
                >
                  <i className="fas fa-save"></i> SALVAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
