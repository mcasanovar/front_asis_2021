export const CalculateIVA = (monto: number, tasa: number) => {
  let iva = (monto * tasa)/100;
  iva = Math.round(iva)

  return iva;
}