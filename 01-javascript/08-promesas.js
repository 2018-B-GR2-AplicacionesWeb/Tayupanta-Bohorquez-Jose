// 08-promesas.js
const fs = require('fs');

const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};

const promesaEscritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};

console.log(promesa);
promesa('07-texto.txt')
    .then(
        (contenido) => {
            console.log('Ok', contenido);
            return promesaEscritura(
                '07-texto.txt',
                contenido + 'Nuevo Contenido');
            // Promesa
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log(contenidoCompleto);
        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );

/// Deber
/DEBER: transformar el for each a promesa

promesaForEach = (arregloStrings)=>{
    return new Promise(
        (resolve, reject) => {
            const arregloRespuestas = [];
            arregloStrings.forEach(
                (string, indice)=>{
                    const nombreArchivo = `${indice}-${string}.txt`;
                    const contenidoArchivo = 'string';

                    fs.writeFile(nombreArchivo,
                        contenidoArchivo,
                        (err)=>{
                            const respuesta = {
                                nombreArchivo:nombreArchivo,
                                contenidoArchivo:contenidoArchivo,
                                error:err
                            };
                            arregloRespuestas.push(respuesta);
                            const terminoElArreglo = arregloStrings.length == arregloRespuestas.length;
                            if(terminoElArreglo){
                                resolve(arregloRespuestas);
                            }

                        })
                }

            );

        });

};


promesaForEach(['A', 'B', 'C'])
    .then(
        (arregloRespuestas) => {
            console.log('Ok', arregloRespuestas);

        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );