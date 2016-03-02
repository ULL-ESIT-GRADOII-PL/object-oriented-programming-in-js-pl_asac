(function(exports) {
  "use strict";

  var XRegExp = require('xregexp');

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

  function Celsius(valor){
    Temperatura.call(this, valor, 'c')
  }

  Celsius.prototype = Object.create(Temperatura.prototype);
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor){
    Temperatura.call(this, valor, 'f')
  }

  Farenheit.prototype = Object.create(Temperatura.prototype);
  Farenheit.prototype.constructor = Farenheit;

  function Kelvin(valor) {
     Temperatura.call(this, valor, 'k');
 }

 Kelvin.prototype = Object.create(Temperatura.prototype);
 Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

 // 32C to K
  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
        valor     = valor.match(regexp);

              /* '(?<tipo1> [a-z,A-Z]+)   # tipo1 \n' +
               '(?<to>    [to])?     # to \n' +
               '(?<tipo2> [a-z,A-Z]+'*/
        // Using named capture and flag x (free-spacing and line comments)
    var exp = XRegExp('(?<numero> \\d+)\\s*  # numero  \n' +
                      '(?<from> [a-z,A-Z]+)\\s+  # tipo1 \n' +
                      '(?<to> to\\s+)?' +
                      '(?<tipo2> [a-z,A-Z])+ # tipo2 \n', 'x');

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;

        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
