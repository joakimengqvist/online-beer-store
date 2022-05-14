import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Checkout from '../pages/checkout';
 
 it('should render correct info for checkout page', async () => {
     render(<Checkout />);
 
     expect(screen.getByText(/Cart/gi)).toBeVisible();
     
 });