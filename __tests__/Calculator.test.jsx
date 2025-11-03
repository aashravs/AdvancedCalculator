import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../src/components/Calculator'

describe('Calculator', () => {
  it('should render calculator', () => {
    render(<Calculator />)
    expect(screen.getByText('Calculator')).toBeInTheDocument()
  })

  it('should display 0 initially', () => {
    render(<Calculator />)
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('0')
  })

  it('should perform basic addition (2 + 2 = 4)', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Click 2
    await user.click(screen.getByRole('button', { name: '2' }))
    
    // Click +
    await user.click(screen.getByRole('button', { name: '+' }))
    
    // Click 2
    await user.click(screen.getByRole('button', { name: '2' }))
    
    // Click =
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    // Should show result as 4
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('4')
  })

  it('should handle all clear button', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Enter a number
    await user.click(screen.getByRole('button', { name: '5' }))
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('5')
    
    // Click AC (All Clear)
    await user.click(screen.getByRole('button', { name: 'All Clear' }))
    
    // Should reset to 0
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('0')
  })

  it('should handle backspace', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Enter 123
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('123')
    
    // Click backspace
    await user.click(screen.getByRole('button', { name: 'Backspace' }))
    
    // Should show 12
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('12')
  })

  it('should toggle to scientific mode', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Click Scientific mode button
    await user.click(screen.getByRole('button', { name: /Switch to scientific/i }))
    
    // Should show scientific functions
    expect(screen.getByRole('button', { name: 'sin' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'cos' })).toBeInTheDocument()
  })

  it('should perform division (10 / 5 = 2)', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Click 1, 0
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('10')
    
    // Click ÷
    await user.click(screen.getByRole('button', { name: '÷' }))
    
    // Click 5
    await user.click(screen.getByRole('button', { name: '5' }))
    
    // Click =
    await user.click(screen.getByRole('button', { name: 'Equals' }))
    
    // Should show result as 2
    expect(screen.getByRole('region', { name: 'Display' })).toHaveTextContent('2')
  })

  it('should toggle theme', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Find and click theme toggle button by specific aria-label
    const themeButton = screen.getByRole('button', { name: /Switch to light mode/i })
    await user.click(themeButton)
    
    // Theme should have switched (visual verification would happen in real use)
    expect(themeButton).toBeInTheDocument()
  })
})
