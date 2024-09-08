import { render, screen, fireEvent } from '@testing-library/react';
import STabs from '../components/STab';
import { describe, it, expect } from 'vitest';

describe('STab', () => {
  const tabsData = [
    { name: 'tab1', label: 'Tab 1', badge: '1' },
    { name: 'tab2', label: 'Tab 2', badge: '2' },
    { name: 'tab3', label: 'Tab 3' },
    { name: 'tab4', label: 'Tab 4' },
  ];

  it('renders', () => {
    render(<STabs tabs={tabsData} />);
    
    expect(screen.getByText(/Tab 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Tab 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Tab 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Tab 4/i)).toBeInTheDocument();
  });

  it('displays content', () => {
    render(<STabs tabs={tabsData} />);

    expect(screen.getByText(/tab1/i)).toBeInTheDocument();

    const tab2 = screen.getByText(/Tab 2/i);
    fireEvent.click(tab2);
    expect(screen.getByText(/tab2/i)).toBeInTheDocument();
  });

  it('updates content', () => {
    render(<STabs tabs={tabsData} />);

    expect(screen.getByText(/tab1/i)).toBeInTheDocument();

    const tab3 = screen.getByText(/Tab 3/i);
    fireEvent.click(tab3);

    expect(screen.getByText(/tab3/i)).toBeInTheDocument();

    const tab4 = screen.getByText(/Tab 4/i);
    fireEvent.click(tab4);

    expect(screen.getByText(/tab4/i)).toBeInTheDocument();
  });
});