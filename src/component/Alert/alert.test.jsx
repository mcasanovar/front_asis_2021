import { render } from '@testing-library/react'
import Alert from './Alert'
import '@testing-library/jest-dom/extend-expect'

describe('Alert component test', () => {
  
    test('render alert', () => {
        render(<Alert />)
    })

    test('render default props of alert', () => {
        const { getByTestId } = render(<Alert />)

        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-info'
        )
    })

    test('is a error alert', () => {
        const { getByTestId } = render(<Alert type="error" />)

        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-error'
        )
    })

    test('is a warning alert', () => {
        const { getByTestId } = render(<Alert type="warning" />)

        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-warning'
        )
    })

    test('is a success alert', () => {
        const { getByTestId } = render(<Alert type="success" />)

        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-success'
        )
    })

    test('display alert with a message', () => {
        const { getByTestId } = render(
            <Alert message="Sesion iniciada" />
        )

        expect(getByTestId('alert-id-test')).toHaveTextContent(
            'Sesion iniciada'
        )
        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-info'
        )
    })

    test('display alert with a error message', () => {
        const { getByTestId } = render(
            <Alert message="No se ha ingresado el usuario" type="error" />
        )

        expect(getByTestId('alert-id-test')).toHaveTextContent(
            'No se ha ingresado el usuario'
        )
        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-error'
        )
    })

    test('display alert with a warning message', () => {
        const { getByTestId } = render(
            <Alert message="Limite de ingresos a un 90%" type="warning" />
        )

        expect(getByTestId('alert-id-test')).toHaveTextContent(
            'Limite de ingresos a un 90%'
        )
        expect(getByTestId('alert-id-test')).toHaveAttribute(
            'class',
            'ant-alert ant-alert-warning'
        )
    })

    test('display alert with a succcess message', () => {
      const { getByTestId } = render(
          <Alert message="Usuario creado satisfactoriamente" type="success" />
      )

      expect(getByTestId('alert-id-test')).toHaveTextContent(
          'Usuario creado satisfactoriamente'
      )
      expect(getByTestId('alert-id-test')).toHaveAttribute(
          'class',
          'ant-alert ant-alert-success'
      )
  })
})
