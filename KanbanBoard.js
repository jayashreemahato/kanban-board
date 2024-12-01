import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';
import './KanbanBoard.css';
import TicketCard from './TicketCard';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);  // State for tickets data
  const [grouping, setGrouping] = useState('status');  // State for grouping (by status, user, priority)
  const [sortBy, setSortBy] = useState('priority');  // State for sorting (by priority, title)

  // Fetch ticket data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();  // Fetch data from the API
        setTickets(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  // Load saved preferences from localStorage when the component mounts
  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');  // Get saved grouping
    const savedSortBy = localStorage.getItem('sortBy');  // Get saved sorting option

    if (savedGrouping) setGrouping(savedGrouping);  // If saved, use it
    if (savedSortBy) setSortBy(savedSortBy);  // If saved, use it
  }, []);

  // Group tickets by the selected grouping option
  const groupedTickets = tickets.reduce((groups, ticket) => {
    const key = ticket[grouping];  // Use the grouping option (status, user, priority)
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
    return groups;
  }, {});

  // Sort tickets by the selected sorting option (priority or title)
  const sortedTickets = Object.entries(groupedTickets).map(([key, tickets]) => ({
    key,
    tickets: tickets.sort((a, b) =>
      sortBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
    ),
  }));

  // Save grouping and sorting preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('grouping', grouping);  // Save current grouping option
    localStorage.setItem('sortBy', sortBy);  // Save current sorting option
  }, [grouping, sortBy]);

  return (
    <div className="kanban-board">
      <header>
        {/* Dropdown for selecting grouping */}
        <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
          <option value="status">By Status</option>
          <option value="user">By User</option>
          <option value="priority">By Priority</option>
        </select>

        {/* Dropdown for selecting sorting */}
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
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
