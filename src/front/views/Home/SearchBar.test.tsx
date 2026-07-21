/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar'; 

describe('SearchBar Component', () => {
  it('deve renderizar o input corretamente com o valor inicial', () => {
    render(<SearchBar value="Roadrunner" onChange={() => {}} />);
    
    const inputElement = screen.getByDisplayValue('Roadrunner');
    expect(inputElement).toBeInTheDocument();
  });

  it('deve disparar a função onChange quando o usuário digitar no input', () => {
    const mockOnChange = jest.fn(); 
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const inputElement = screen.getByRole('textbox');
    
    fireEvent.change(inputElement, { target: { value: 'Eagle' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('Eagle');
  });
});