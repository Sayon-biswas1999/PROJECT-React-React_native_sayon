import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

const IPOCalendar = () => {
  const [ipoData, setIPOData] = useState([]);

  useEffect(() => {
    const fetchIPOData = async () => {
      try {
        const response = await axios.get('https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_3a32cbeded39453aa11bc7fac06f97db/ipo');
        setIPOData(response.data);
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      }
    };

    fetchIPOData();
  }, []);

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const h2Style = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const ulStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const liStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>Upcoming IPOs</h2>
      <Calendar />
      {/* Render IPO data */}
      <ul style={ulStyle}>
        {ipoData.map((ipo) => (
          <li key={ipo.id} style={liStyle}>{ipo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IPOCalendar;
