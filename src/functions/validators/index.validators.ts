export const FormatingRut = (rut: string) => {
  let cadena = "";
  let digito = "";
  if (rut.length > 1) {
    if(rut.length === 1){
      return rut;
    }
    if (rut.length === 2) {
      digito = rut.substr((rut.length - 1), rut.length)
      cadena = rut.substr(0, (rut.length - 1))
      rut = cadena + "-" + digito
    }
    else if (rut.length > 2) {
      rut = rut.replace('-', '')
      digito = rut.substr((rut.length - 1), rut.length)
      cadena = rut.substr(0, (rut.length - 1))
      rut = cadena + "-" + digito
    }

    return rut
  }
  else {
    return rut
  }
};

export const ValidateRut = (rut: string) => {
  // Despejar Puntos
  var valor:any = rut.replace('.', '');
  // Despejar Guión
  valor = valor.replace('-', '');

  // Aislar Cuerpo y Dígito Verificador
  var cuerpo = valor.slice(0, -1);
  var dv = valor.slice(-1).toUpperCase();

  // Formatear RUN
  rut = cuerpo + '-' + dv

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) return false;

  // Calcular Dígito Verificador
  var suma = 0;
  var multiplo = 2;

  // Para cada dígito del Cuerpo
  for (var i = 1; i <= cuerpo.length; i++) {

    // Obtener su Producto con el Múltiplo Correspondiente
    var index = multiplo * valor.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

  }

  // Calcular Dígito Verificador en base al Módulo 11
  var dvEsperado: number = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = (dv === 'K') ? 10 : dv;
  dv = (dv === 0) ? 11 : dv;

  console.log('sdsds', [dvEsperado, dv])

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado !== parseInt(dv)) return false;

  // Si todo sale bien, eliminar errores (decretar que es válido)
  return true;
};

export const validateEmail = (mail: string) => {
  return mail !== '' ? /.+@.+\..+/.test(mail) : true;
};