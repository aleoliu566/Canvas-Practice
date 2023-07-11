import React from 'react';
import { render, screen } from '@testing-library/react';
import CanvasPart from './CanvasPart';

describe('CanvasPart', () => {
  test('renders canvas', () => {
    render(<CanvasPart />);

    const canvasElement = screen.getByTestId('Canvas');
    const canvasContext = canvasElement.getContext('2d');

    expect(canvasElement.width).toBe(800);
    expect(canvasElement.height).toBe(800);
  });
});
