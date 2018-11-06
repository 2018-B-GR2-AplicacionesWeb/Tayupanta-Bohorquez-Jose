var nombre = 'Jose';
var nombre1 = 'Jose';
var edad = 23.2;
var casado = false;
//interface
var jose = {
    nombre: 'Jose',
    edad: 25,
};
var arregloNumeros = [1, 2, 3];
var arregloNumeros1 = [1, 2, 3, 4];
arregloNumeros1.push(1);
var fecha = new Date();
function saludar(nombre, apellido) {
    var otrosNombres = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otrosNombres[_i - 2] = arguments[_i];
    }
    return 'hola';
}
saludar('Jose', 'Tayupanta', 1, 2, 3);
console.log(saludar('Jose', 'Tayupanta', 1, 2, 3));
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());
var usuario = {
    nombre: 'jose'
};
