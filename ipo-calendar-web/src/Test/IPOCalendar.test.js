// IPOCalendar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import IPOCalendar from './IPOCalendar';

describe('IPOCalendar Component', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('renders upcoming IPOs', async () => {
    const mockIPOData = [
      { id: 1, name: 'IPO 1' },
      { id: 2, name: 'IPO 2' },
    ];

    mock.onGet('https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_3a32cbeded39453aa11bc7fac06f97db/ipo')
      .reply(200, mockIPOData);

    render(<IPOCalendar />);

    // Check if the title "Upcoming IPOs" is present
    expect(screen.getByText('Upcoming IPOs')).toBeInTheDocument();

    // Wait for the data to load and then check if IPO names are rendered
    const ipoElements = await screen.findAllByRole('listitem');
    expect(ipoElements).toHaveLength(2); // Assuming there are 2 mock IPOs

    // Check if IPO names are rendered correctly
    expect(screen.getByText('IPO 1')).toBeInTheDocument();
    expect(screen.getByText('IPO 2')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    mock.onGet('https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_3a32cbeded39453aa11bc7fac06f97db/ipo')
      .reply(500, { error: 'Internal Server Error' });

    render(<IPOCalendar />);

    // Check if error message is displayed
    const errorMessage = await screen.findByText('Error fetching IPO data:');
    expect(errorMessage).toBeInTheDocument();
  });
});
