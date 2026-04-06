import { useState, useEffect } from 'react';

const DEFAULT_PROGRAMS = [
    { id: 1, time: '00:00', title: 'Mistério da Madrugada', description: 'Uma companhia espiritual para os que buscam a presença de Deus nas horas silenciosas' },
    { id: 2, time: '05:00', title: 'O Despertar da Fé', description: 'Sua primeira oração do dia com louvores que renovam as esperanças' },
    { id: 3, time: '08:00', title: 'Alvorecer com Cristo', description: 'Comece seu dia com músicas de adoração e reflexão bíblica' },
    { id: 4, time: '10:00', title: 'Manhã Vitoriosa', description: 'Entrevistas, testemunhos e os maiores sucessos da música cristã' },
    { id: 5, time: '12:00', title: 'Almoço com Louvor', description: 'Seu intervalo de meio-dia com energia e mensagens edificantes' },
    { id: 6, time: '15:00', title: 'Tarde de Bênçãos', description: 'Acompanhe as melhores seleções musicais e pedidos de oração' },
    { id: 7, time: '18:00', title: 'Voz da Esperança', description: 'Reflexões especiais para o encerramento da jornada de trabalho' },
    { id: 8, time: '20:00', title: 'Noite de Adoração', description: 'Encerre seu dia com as mais belas canções de fé e adoração' },
    { id: 9, time: '22:00', title: 'Momento de Reflexão', description: 'Meditações profundas e orações para uma noite abençoada' }
];

const DEFAULT_CULTOS = [
    { id: 1, name: 'Igreja Sede', domingo: '19:30h', quinta: '19:30h', rua: 'Rua da Fonte, 457', cidade: 'Centro Barra Funda - RS' },
    { id: 2, name: 'Extensão 1', domingo: '09:00h', quinta: '20:00h', rua: 'Rua Exemplo, 123', cidade: 'Bairro Novo - RS' },
    { id: 3, name: 'Extensão 2', domingo: '18:00h', quinta: '19:00h', rua: 'Av. Cristã, 777', cidade: 'Vila da Fé - RS' }
];

const DEFAULT_EVENTOS = [
    { id: 1, date: '2026-04-12', title: 'Congresso de Jovens', description: 'Uma noite de muito louvor e adoração com pregações edificantes.', image: '/assets/adoracao.jpg' },
    { id: 2, date: '2026-04-25', title: 'Chá das Mulheres', description: 'Um momento especial de comunhão e oração para todas as mulheres.', image: '/assets/programa.jpg' }
];

export function useData() {
    const [programs, setPrograms] = useState(() => {
        const stored = localStorage.getItem('programs');
        return stored ? JSON.parse(stored) : DEFAULT_PROGRAMS;
    });

    const [cultos, setCultos] = useState(() => {
        const stored = localStorage.getItem('cultos');
        if (!stored) return DEFAULT_CULTOS;
        const parsed = JSON.parse(stored);
        // Migration: If it's not an array, reset to default (3 churches)
        return Array.isArray(parsed) ? parsed : DEFAULT_CULTOS;
    });

    const [eventos, setEventos] = useState(() => {
        const stored = localStorage.getItem('eventos');
        return stored ? JSON.parse(stored) : DEFAULT_EVENTOS;
    });

    // Set defaults if local storage was entirely empty
    useEffect(() => {
        if (!localStorage.getItem('programs')) localStorage.setItem('programs', JSON.stringify(DEFAULT_PROGRAMS));
        if (!localStorage.getItem('cultos')) localStorage.setItem('cultos', JSON.stringify(DEFAULT_CULTOS));
        if (!localStorage.getItem('eventos')) localStorage.setItem('eventos', JSON.stringify(DEFAULT_EVENTOS));
    }, []);

    const savePrograms = (newPrograms) => {
        localStorage.setItem('programs', JSON.stringify(newPrograms));
        setPrograms(newPrograms);
    };

    const saveCultos = (newCultos) => {
        localStorage.setItem('cultos', JSON.stringify(newCultos));
        setCultos(newCultos);
    };

    const saveEventos = (newEventos) => {
        localStorage.setItem('eventos', JSON.stringify(newEventos));
        setEventos(newEventos);
    };

    return {
        programs, cultos, eventos, 
        savePrograms, saveCultos, saveEventos
    };
}
