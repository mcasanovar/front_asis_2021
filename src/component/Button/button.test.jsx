import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button component test', () => {
    test('render button', () => {
        expect(render(<Button />)).toBeTruthy()
    })

    test('render button with title', () => {
      const { getByRole } = render(<Button title="Nuevo Usuario" />)
      
      // const buttonWithText = screen.getByRole('button', { name: 'Nuevo Usuario' })

      expect(getByRole('button', { name: 'Nuevo Usuario' })).toBeInTheDocument()
    })
})
