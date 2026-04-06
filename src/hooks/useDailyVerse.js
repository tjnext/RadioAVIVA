import { useState, useEffect } from 'react';

const FALLBACK_VERSES = [
  { text: "O SENHOR é o meu pastor; nada me faltará.", reference: "Salmos 23:1" },
  { text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
  { text: "O amor é paciente, o amor é bondoso.", reference: "1 Coríntios 13:4" },
  { text: "Seja forte e corajoso! Não se apavore nem desanime.", reference: "Josué 1:9" },
  { text: "Porque eu sei os planos que tenho para vocês, diz o Senhor.", reference: "Jeremias 29:11" },
  { text: "E o meu Deus suprirá todas as vossas necessidades.", reference: "Filipenses 4:19" },
  { text: "O Senhor é bom, um refúgio em tempos de angústia.", reference: "Naum 1:7" },
  { text: "O temor do Senhor é o princípio da sabedoria.", reference: "Provérbios 1:7" },
  { text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", reference: "Mateus 11:28" },
  { text: "O amor nunca falha.", reference: "1 Coríntios 13:8" }
];

export function useDailyVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      const today = new Date().toDateString();
      
      try {
        const cached = localStorage.getItem('daily_verse_data');
        const cachedDate = localStorage.getItem('daily_verse_date');

        if (cached && cachedDate === today) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.text && parsed.reference) {
              setVerse(parsed);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Corrupted verse cache, refetching...');
            localStorage.removeItem('daily_verse_data');
          }
        }

        const response = await fetch('https://www.abibliadigital.com.br/api/verses/nvi/random');
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        const newVerse = {
          text: data.text,
          reference: `${data.book.name} ${data.chapter}:${data.number}`
        };

        localStorage.setItem('daily_verse_data', JSON.stringify(newVerse));
        localStorage.setItem('daily_verse_date', today);
        setVerse(newVerse);
      } catch (error) {
        console.error('Failed to fetch verse, using fallback:', error);
        const dayOfMonth = new Date().getDate();
        const fallback = FALLBACK_VERSES[dayOfMonth % FALLBACK_VERSES.length];
        setVerse(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  return { verse, loading };
}
