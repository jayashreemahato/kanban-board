import React, { useState, useEffect } from 'react';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchedTickets = [
      { id: 1, title: 'Task 1', priority: 4 },
      { id: 2, title: 'Task 2', priority: 2 },
    ];
    setTickets(fetchedTickets);
  }, []);

  return (
    <div>
      <h1>Kanban Board</h1>
      <div>
        {tickets.map((ticket) => (
          <div key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>Priority: {ticket.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

