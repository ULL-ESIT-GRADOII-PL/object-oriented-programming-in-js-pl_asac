(function(exports) {
  "use strict";

//  var XRegExp = require('xregexp');

  function Medida(valor,tipo){
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    if(!tipo){
      tipo = ""
      var unit = valor + tipo;
      console.log("valor de unit: "+ unit)
      var regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
      unit = unit.match(regexp);
      this.valor = unit[1];
      this.tipo = unit[2];
    }
    /* ademas de new Medida(45.2, "Km") */
    else{
      this.valor = valor
      this.tipo = tipo
    }
  }

  function Temperatura(valor,tipo){
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this, valor, tipo);
  }

  Temperatura.prototype = Object.create(Medida.prototype);
  Temperatura.prototype.constructor = Temperatura;

/////////////////////////////////////////////////////////////////FUNCIÓN CELSIUS
  function Celsius(valor){
    Temperatura.call(this, valor, 'c')
  }

  Celsius.prototype = Object.create(Temperatura.prototype);


  Celsius.prototype.toFarenheit = function () { //CELSIUS TO FARENHEIT
     return (this.valor*1.8 + 32);
  }
  Celsius.prototype.toKelvin = function () { //CELSIUS TO KELVIN
     return (this.valor + 273.15)
 }


  Celsius.prototype.constructor = Celsius;

///////////////////////////////////////////////////////////////FUNCIÓN FARENHEIT
  function Farenheit(valor){
    Temperatura.call(this, valor, 'f')
  }

  Farenheit.prototype = Object.create(Temperatura.prototype);

  //FARENHEIT TO CELSIUS
   Farenheit.prototype.toCelsius = function () {
      return ((this.valor -32)/1.8)
   }
  //FARENHEIT TO KELVIN
   Farenheit.prototype.toKelvin = function () {
      return ((this.valor + 459.67)*5/9)
   }

  Farenheit.prototype.constructor = Farenheit;

//////////////////////////////////////////////////////////////////FUNCIÓN KELVIN
  function Kelvin(valor) {
     Temperatura.call(this, valor, 'k');
  }

 Kelvin.prototype = Object.create(Temperatura.prototype);


  Kelvin.prototype.toCelsius = function () { //KELVIN TO CELSIUS
     return (this.valor - 273.15);
  }
  Kelvin.prototype.toFarenheit = function () {  //KELVIN TO FARENHEIT
     return (this.valor*(9/5) - 459.67)
  }


 Kelvin.prototype.constructor = Kelvin;

///////////////////////////////////////////////////////////////////FIN FUNCIONES

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

 // 32C to K
  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        //regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,

//        regexp    = /^\s*([+-]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*([ckf])\s*(?:to)?\s*([ckf])\s*$/i,
        regexp    = XRegExp('^\\s*(?<numero> [+-]?\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?)\\s*  # numero  \n' +
                          '(?<tactual> [ckf])\\s+  # TempActual \n' +
                          '(?<to> to\\s+)?' +
                          '(?<tdestino> [ckf])\\s*$ # TempDestino \n', 'xi'),
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
           from   = valor[2].toLowerCase(),
           to     = valor[4].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Temperatura actual: " + from + ", Temperatura a convertir: " + to);

      var aux = from+to

      switch (aux) {
          case 'cf':
             var celsius = new Celsius(numero);
             elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
             break;
          case 'ck':
             var celsius = new Celsius(numero);
             elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
             break;
          case 'fc':
             var farenheit = new Farenheit(numero);
             elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
             break;
          case 'fk':
             var farenheit = new Farenheit(numero);
             elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
             break;
          case 'kc':
             var kelvin = new Kelvin(numero);
             elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
             break;
          case 'kf':
             var kelvin = new Kelvin(numero);
             elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
             break;
          default:
           /* rellene este código */
           elemento.innerHTML = " Conversión imposible";
      }
//      document.getElementById("converted").style.color = "green";
    }
    else
      elemento.innerHTML = "Error, cadena incorrecta. Ejemplo válido: -3.5e2c to f";
//      document.getElementById("converted").style.color = "red";
  }

})(this);
