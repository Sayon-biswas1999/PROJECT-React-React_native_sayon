// ExchangeRates.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ExchangeRates from './ExchangeRates'; // Path to your component

describe('ExchangeRates Component', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('renders currency exchange rates', async () => {
    const mockExchangeRates = [
      { symbol: 'USDCAD', rate: 1.25, timestamp: 1641102961000 },
      { symbol: 'GBPUSD', rate: 1.35, timestamp: 1641102962000 },
    ];

    mock.onGet('https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_3a32cbeded39453aa11bc7fac06f97db')
      .reply(200, mockExchangeRates);

    render(<ExchangeRates />);

    // Check if the title "Currency Exchange Rates" is present
    expect(screen.getByText('Currency Exchange Rates')).toBeInTheDocument();

    // Wait for the data to load and then check if exchange rates are rendered
    const rateElements = await screen.findAllByRole('cell');
    expect(rateElements).toHaveLength(6); // 2 rates * 3 columns (Symbol, Rate, Timestamp)

    // Check if specific exchange rates are rendered correctly
    expect(screen.getByText('USDCAD')).toBeInTheDocument();
    expect(screen.getByText('1.25')).toBeInTheDocument();
    expect(screen.getByText('GBPUSD')).toBeInTheDocument();
    expect(screen.getByText('1.35')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    mock.onGet('https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_3a32cbeded39453aa11bc7fac06f97db')
      .reply(500, { error: 'Internal Server Error' });

    render(<ExchangeRates />);

    // Check if error message is displayed
    const errorMessage = await screen.findByText('Error fetching exchange rates:');
    expect(errorMessage).toBeInTheDocument();
  });
});
