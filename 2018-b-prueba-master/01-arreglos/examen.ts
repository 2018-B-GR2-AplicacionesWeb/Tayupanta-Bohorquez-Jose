import {first, map} from "rxjs";

var require
const fs = require('fs');
const rxjs = require('rxjs');

const nombreArchivo = 'people.json'

const iniciarBase = new Promise(
    (resolve, reject) => {
        fs.readFile(
            nombreArchivo,
            'utf-8',
            (error, contArchivo) =>{
                if(error){
                    reject({mensaje: 'Error leyendo'})
                }else{
                    resolve(JSON.parse(contArchivo))
                }
            }
        )
    }
);


//1) Busque los tipos de "gender" en el arreglo people.json,
iniciarBase
    .then(
        (baseDatos)=> {
            const contArchivo = JSON.parse(JSON.stringify(baseDatos))
            let generos = []
            contArchivo.forEach(

                        (actual, indiceActual, arreglo)=> {
                            generos.push( actual['gender'])
                            if(generos.indexOf(actual["gender"])!=null ){
                                console.log(actual['gender'])
                            }

                        }
                    )
                }

    )

//2) Busque los tipos de "eye_color" en el arreglo people.json
iniciarBase
    .then(
        (baseDatos)=> {
            const contArchivo = JSON.parse(JSON.stringify(baseDatos))
            contArchivo.forEach(
                (actual, indiceActual, arreglo)=> {
                    console.log(actual['eye_color'])
                }
            )
        }
    )


// 3) Busque los tipos de "skin_color" en el arreglo people.json
iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        contArchivo.forEach(
            (actual, indiceActual, arreglo) => {
                console.log(actual['skin_color'])
            }
        )
    }
)
//4) Busque los tipos de "hair_color" en el arreglo people.json
iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        contArchivo.forEach(
            (actual, indiActual, arrarRespuesta) => {
                console.log(actual['hair_color'])
            }
        )
    }
)

//5) Clasifique y cree diferentes arreglos dependiendo del gender, eye_color, skin y hair_color.


//6) Cree un arreglo del abecedario, revisar si existe al menos un personaje con cada letra del abecedario.
const arregloRespuesta =[]
iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        const abecedario = {'A':0, 'B': 0, 'C': 0,'D':0,'F':0,'G':0, 'H':0, 'I':0, 'J':0, 'K':0,
    'L':0, 'M':0, 'N': 0, 'O':0, 'P':0, 'Q': 0, 'R':0,'S':0,'T':0, 'U':0, 'V':0,'W':0, 'X':0,'Y':0,'Z':0}
    contArchivo.forEach(
        (actual, indiceActual, array) => {
            const letra = actual['name'].substring(0,1)
            if(abecedario[letra]){
                arregloRespuesta.push({letra: true})
            }
            else{
                arregloRespuesta.push({letra: false})
            }
        }
    )
    }
)

console.log(arregloRespuesta)

//7) Calcular la sumatoria de la propiedad "mass" y la propiedad "height".

const respuestaMasas = {
    masTotal: Number('0'),
    heightTotal: Number('0')
}

iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        contArchivo.forEach(
            (actual, indActual, array) => {
                const mass  = Number(JSON.stringify(actual["massTotal"]));
                const height= Number(actual["heightTotal"]);
                console.log(mass + height);
                respuestaMasas.masTotal = respuestaMasas.masTotal + mass;
                respuestaMasas.heightTotal = respuestaMasas.heightTotal +height;
                console.log(respuestaMasas);
            }
        )
    }
)

//8) Revisar si todos los personajes han usado vehicles.
iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        contArchivo.forEach(
            (actual, indiActual, arrarRespuesta) => {
                const persona = String(JSON.stringify(actual['name']))
                const vehiculo = String(JSON.stringify['vehicles'])
                console.log([persona, vehiculo])
            }
        )
    }
)

//9) Revisar si todos los personajes han usado starships.
iniciarBase.then(
    (baseDatos) => {
        const contArchivo = JSON.parse(JSON.stringify(baseDatos))
        contArchivo.forEach(
            (actual, indiActual, arrarRespuesta) => {
                const persona = String(JSON.stringify(actual['name']))
                const vehiculo = String(JSON.stringify['starships'])
                console.log([persona, vehiculo])
            }
        )
    }
)

//10) Calcular en cuantos films han aparecido cada personaje:

//11) Realizar la operacion de crear nuevos people con la libreria inquirer.js
const opcionesMenu ={
    type: 'list',
    name: 'opcionMenu',
    message: 'Escoge la opción qué desees: ',
    choices: [
        'Crear',
    ]
};

const preguntasAlUsuario = [
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del personaje: '},
    { type: 'input', name: 'specie', message: 'Ingrese la specie: '},

];
