import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mock context to prevent context-related errors
jest.mock('../Context/ThemeContext', () => ({
  useTheme: () => ({ themeMode: 'dark', toggleTheme: jest.fn() })
}));

describe('Home Page', () => {
  test('renders Hero section features', () => {
    // Suppress console warnings from mock routing
    const originalError = console.error;
    console.error = jest.fn();

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verify presence of Hero and Services sections based on text content
    const heroTitle = screen.getByText(/SPARKLING/i);
    expect(heroTitle).toBeInTheDocument();

    const servicesSection = screen.getByText(/Our Services/i);
    expect(servicesSection).toBeInTheDocument();

    // Verify trending banner
    const trending = screen.getByText(/🔥 Trending/i);
    expect(trending).toBeInTheDocument();
    
    console.error = originalError;
  });
});
