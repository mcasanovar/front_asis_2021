const userLogged = localStorage.getItem('userLogged');

export const OutputsInitialization = {
  _id: '',
  codigo: '',
  fecha: '',
  tipo_salida: '',
  nro_documento: '',
  usuario: userLogged !== null ? JSON.parse(userLogged).gi.razon_social : '',
  categoria_general: '',
  subcategoria_uno: '',
  subcategoria_dos: '',
  subcategoria_tres: '',
  codigo_categoria_tres: '',
  descripcion: '',
  motivo_salida: '',
  cantidad: 0,
  costo_unitario: 0,
  costo_unitario_string: '',
  costo_total: 0,
  costo_total_string: '',
  precio_venta_unitario: 0,
  ingreso_total: 0
}