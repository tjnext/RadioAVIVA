import React, { useEffect } from 'react';

export default function Player() {
  useEffect(() => {
    // In SPAs and dev environments, we need to ensure the script parses the new DOM element.
    const scriptId = 'caster-embed-script';
    let existingScript = document.getElementById(scriptId);
    
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://cdn.cloud.caster.fm//widgets/embed.js" + new Date().getTime();
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.getElementById(scriptId)) {
        document.getElementById(scriptId).remove();
      }
    };
  }, []);

  return (
    <div className="player-fixed" style={{ 
      position: 'fixed', 
      top: '87px', // Below the 84px header
      left: 0, 
      right: 0, 
      zIndex: 999, 
      display: 'flex', 
      justifyContent: 'center', 
      background: 'transparent',
      padding: '0'
    }}>
      <div 
        data-type="podcastsPlayer" 
        data-publicToken="a4a1705e-1dcf-4f58-9078-7245f8553e65" 
        data-theme="light" 
        data-color="FFCC00" 
        data-channelId="a253fa09-7330-4875-86bd-f5bc2f6dc563" 
        data-rendered="false" 
        className="cstrEmbed"
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <a href="https://www.caster.fm">Shoutcast Hosting</a>
        <a href="https://www.caster.fm">Stream Hosting</a>
        <a href="https://www.caster.fm">Radio Server Hosting</a>
      </div>
    </div>
  );
}
