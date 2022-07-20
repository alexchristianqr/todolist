export default {
  code: 'es',
  messages: {
    alpha: 'El campo solo debe contener letras',
    alpha_dash: 'El campo solo debe contener letras, números y guiones',
    alpha_num: 'El campo solo debe contener letras y números',
    alpha_spaces: 'El campo solo debe contener letras y espacios',
    between: function (field, value) {
      return `El campo debe estar entre ${value[0]} y ${value[1]}`
    },
    confirmed: 'El campo no coincide',
    digits: function (field, value) {
      return `El campo debe ser numérico y contener exactamente ${value} dígitos`
    },
    dimensions: function (field, value) {
      return `El campo debe ser de ${value[0]} píxeles por ${value[0]} píxeles`
    },
    email: 'El campo debe ser un correo electrónico válido',
    excluded: 'El campo debe ser un valor válido',
    ext: 'El campo debe ser un archivo válido',
    image: 'El campo debe ser una imagen',
    oneOf: 'El campo debe ser un valor válido',
    integer: 'El campo debe ser un entero',
    length: function (field, value) {
      return `El largo del campo debe ser ${value}`
    },
    max: function (field, value) {
      return `El campo no debe ser mayor a ${value} caracteres`
    },
    max_value: function (field, value) {
      return `El campo debe de ser ${value} o menor`
    },
    mimes: 'El campo debe ser un tipo de archivo válido',
    min: function (field, value) {
      return `El campo debe tener al menos ${value} caracteres`
    },
    min_value: function (field, value) {
      return `El campo debe ser ${value} o superior`
    },
    numeric: 'El campo debe contener solo caracteres numéricos',
    regex: 'El formato del campo no es válido',
    required: 'El campo es obligatorio',
    required_if: 'El campo es obligatorio',
    size: function (field, value) {
      return `El campo debe ser menor a ${value}KB`
    },
    double: 'El campo debe ser un decimal válido',
    is: function (field, value) {
      return `El campo no coincide con ${value}`
    },
    is_not: function (field, value) {
      return `El campo debe ser diferente a ${value}`
    },
  },
}
