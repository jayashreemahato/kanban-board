import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';
import './KanbanBoard.css';
import TicketCard from './TicketCard';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setTickets(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const groupedTickets = tickets.reduce((groups, ticket) => {
    const key = ticket[grouping];
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
    return groups;
  }, {});

  const sortedTickets = Object.entries(groupedTickets).map(([key, tickets]) => ({
    key,
    tickets: tickets.sort((a, b) =>
      sortBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
    ),
  }));

  return (
    <div className="kanban-board">
      <header>
        <select onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">By Status</option>
          <option value="user">By User</option>
          <option value="priority">By Priority</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </header>
      <main>
        {sortedTickets.map(({ key, tickets }) => (
          <section key={key}>
            <h2>{key}</h2>
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default KanbanBoard;
