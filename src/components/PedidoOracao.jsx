import React from 'react';

export default function PedidoOracao() {
  const whatsappNumber = "555581380911"; // O usuário pode trocar depois
  const message = encodeURIComponent("Olá! Gostaria de fazer um pedido de oração.");

  return (
    <section className="prayer-section">
      <div className="container">
        <div className="section-header dark">
          <h2>Pedido de Oração</h2>
        </div>
        <div className="prayer-button-container">
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${message}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp-prayer"
          >
            <i className="fab fa-whatsapp"></i> ENVIAR PEDIDO
          </a>
        </div>
      </div>
    </section>
  );
}
