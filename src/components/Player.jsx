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
    script.src = "https://cdn.cloud.caster.fm/widgets/embed.js?v=" + new Date().getTime();
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
        data-publicToken="adaaaee4-040c-48e3-a91b-717487ba1445" 
        data-theme="light" 
        data-color="FFCC00" 
        data-channelId="a16eb248-03ab-4b5b-a239-dd2a9b1bd6c4" 
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
