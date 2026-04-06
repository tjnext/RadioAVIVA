import React, { useState } from 'react';
import { useDailyVerse } from '../hooks/useDailyVerse';
import { generateVerseImage } from '../utils/imageGenerator';

export default function Hero() {
  const { verse, loading } = useDailyVerse();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!verse || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const imageFile = await generateVerseImage(verse);
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          files: [imageFile],
          title: 'Versículo do Dia - Rádio AVIVA',
          text: `"${verse.text}" - ${verse.reference}\n\nOUÇA A RÁDIO AVIVA: ${window.location.origin}`
        });
      } else {
        // Fallback for Desktop: Download
        const url = URL.createObjectURL(imageFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = `versiculo-${new Date().getTime()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show a quick alert to explain it downloaded
        alert('Imagem baixada com sucesso! Agora você pode postá-la no Instagram ou WhatsApp.');
      }
    } catch (error) {
      console.error('Error generating/sharing image:', error);
      alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title-main">Rádio AVIVA</h2>
        <p className="hero-subtitle-main">A RÁDIO QUE TOCA VOCÊ!</p>
        
        {!loading && verse && (
          <div className="daily-verse-container">
            <p className="daily-verse-text">
              "{verse.text}"
            </p>
            <div className="daily-verse-footer">
              <p className="daily-verse-reference">
                {verse.reference}
              </p>
              <button 
                className={`share-verse-btn ${isGenerating ? 'loading' : ''}`} 
                onClick={handleShare}
                disabled={isGenerating}
                title={isGenerating ? "Gerando imagem..." : "Compartilhar Versículo"}
              >
                {isGenerating ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-share"></i>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
