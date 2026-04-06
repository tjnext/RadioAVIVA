import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Programacao from '../components/Programacao';
import Cultos from '../components/Cultos';
import Eventos from '../components/Eventos';
import PedidoOracao from '../components/PedidoOracao';
import RedesSociais from '../components/RedesSociais';
import Footer from '../components/Footer';
import Player from '../components/Player';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Programacao />
      <Cultos />
      <Eventos />
      <PedidoOracao />
      <RedesSociais />
      <Footer />
      <Player />
    </>
  );
}
