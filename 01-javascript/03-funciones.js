function sumar(numUno, numDos) {
    return numUno + numDos;
}

//envio otros parametros
console.log(sumar('a', null));

//no envio parametros
sumar();
//envio vvarios paramtros
console.log(sumar(1, 2, 3, 4, 5));

console.log(sumar(2, 3));

function saludar(nombre) {
    return `hola ${nombre.toUpperCase()}`;
    //console.log("hola a todos");
}

console.log(saludar("juan"));

function sumarNumeros(...paramtros) {
    console.log(paramtros);
}

console.log(sumarNumeros());

