import React, { useEffect } from 'react';

export default function Player() {
  useEffect(() => {
    const scriptId = 'caster-embed-script';
    
    // Remove o script antigo se ele já existir no DOM para evitar duplicações
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Cria e insere o script do widget do Caster.fm
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://cdn.cloud.caster.fm//widgets/embed.js?v=${new Date().getTime()}`;
    script.async = true;
    
    document.body.appendChild(script);

    // Limpeza ao desmontar o componente
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div 
      className="player-fixed" 
      style={{ 
        position: 'fixed', 
        top: '87px', 
        left: 0, 
        right: 0, 
        zIndex: 999, 
        display: 'flex', 
        justifyContent: 'center', 
        background: 'transparent',
        padding: '0'
      }}
    >
      <div 
        data-type="podcastsPlayer" 
        data-publictoken="a4a1705e-1dcf-4f58-9078-7245f8553e65" 
        data-theme="dark" 
        data-color="FFF900" 
        data-channelid="a253fa09-7330-4875-86bd-f5bc2f6dc563" 
        data-rendered="false" 
        className="cstrEmbed"
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Shoutcast Hosting</a>
        <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Stream Hosting</a>
        <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Radio Server Hosting</a>
      </div>
    </div>
  );
}
