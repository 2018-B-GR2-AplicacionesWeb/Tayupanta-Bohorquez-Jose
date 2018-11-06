const nombre = 'Jose';
let nombre1: String = 'Jose';
const edad = 23.2;
const casado = false;

//interface
const jose: {
    nombre: String;
    apellido?: String; //una propiedad es opcional si colocamos ?
    edad?: number,
    estado?: 'activo' | 'inactivo'
} = {
    nombre: 'Jose',
    edad: 25,
    // : new Date(),
    //saludar: ()=> {
    //    return ''
    //}
};
const arregloNumeros = [1,2,3];


const arregloNumeros1: number [] = [1,2,3,4];

arregloNumeros1.push(1);

const fecha: Date = new Date();

function saludar(
    nombre: String,
    apellido?: String,
    ...otrosNombres: number[]
): string {
    return 'hola';
}


saludar('Jose','Tayupanta',1,2,3);
console.log(saludar('Jose','Tayupanta',1,2,3));


class Usuario {

}

interface UsuarioInterfaz {

}

const usuario = {
    nombre: 'jose'
}
