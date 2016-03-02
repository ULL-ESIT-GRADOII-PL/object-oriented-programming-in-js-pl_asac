(function(exports) {
  "use strict";

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

  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this, valor, tipo);
  }

  Temperatura.prototype = Object.create(Medida.prototype);
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor)
  {
  }

  function Farenheit(valor)
  {
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
        valor     = valor.match(regexp);

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
