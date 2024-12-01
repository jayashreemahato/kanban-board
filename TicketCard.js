import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => (
  <div className={`ticket-card priority-${ticket.priority}`}>
    <h3>{ticket.title}</h3>
    <p>{ticket.description}</p>
    <span>{`Priority: ${ticket.priority}`}</span>
  </div>
);

export default TicketCard;
