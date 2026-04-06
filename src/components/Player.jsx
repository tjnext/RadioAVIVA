import React, { useEffect } from 'react';

export default function Player() {
  useEffect(() => {
    // Only append the script if it doesn't already exist
    if (!document.getElementById('caster-embed-script')) {
      const script = document.createElement('script');
      script.id = 'caster-embed-script';
      script.src = "//cdn.cloud.caster.fm/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
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
