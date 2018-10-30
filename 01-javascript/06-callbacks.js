//06-callbacks

//leer un archivo con node
const fs = require('fs');

/*fs.readFile(
    '03-funciones.js',//archivo a leer
    'utf-8',
    (error, textoArchivo)=>{
        console.log(error);
        console.log(textoArchivo);
    }
);*/

console.log('inicio');
fs.readFile(
    '06-text.txt',//archivo a leer
    'utf-8',
    (error, textoArchivo)=>{
        if (error){
                try {
                    throw new Error(error);
                } catch (e){
                        console.log(e)
                }
        } else {
                console.log(textoArchivo)
        }
    }
);
console.log('fin')