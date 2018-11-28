import {first, map} from "rxjs";
import { basename } from "path";

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
