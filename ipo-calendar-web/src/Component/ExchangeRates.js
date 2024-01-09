import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_3a32cbeded39453aa11bc7fac06f97db');
        setExchangeRates(response.data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const h2Style = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const thTdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>Currency Exchange Rates</h2>
      {/* Render exchange rates */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Symbol</th>
            <th style={thStyle}>Rate</th>
            <th style={thStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rateData, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{rateData.symbol}</td>
              <td style={thTdStyle}>{rateData.rate}</td>
              <td style={thTdStyle}>{new Date(rateData.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRates;
