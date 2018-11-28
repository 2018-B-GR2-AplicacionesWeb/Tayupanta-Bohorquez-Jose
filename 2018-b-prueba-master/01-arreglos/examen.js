"use strict";
exports.__esModule = true;
var require;
var fs = require('fs');
var rxjs = require('rxjs');
var nombreArchivo = 'people.json';
var iniciarBase = new Promise(function (resolve, reject) {
    fs.readFile(nombreArchivo, 'utf-8', function (error, contArchivo) {
        if (error) {
            reject({ mensaje: 'Error leyendo' });
        }
        else {
            resolve(JSON.parse(contArchivo));
        }
    });
});
//1) Busque los tipos de "gender" en el arreglo people.json,
iniciarBase
    .then(function (baseDatos) {
    var contArchivo = JSON.parse(JSON.stringify(baseDatos));
    var generos = [];
    contArchivo.forEach(function (actual, indiceActual, arreglo) {
        generos.push(actual['gender']);
        if (generos.indexOf(actual["gender"]) != null) {
            console.log(actual['gender']);
        }
    });
});
//2) Busque los tipos de "eye_color" en el arreglo people.json
iniciarBase
    .then(function (baseDatos) {
    var contArchivo = JSON.parse(JSON.stringify(baseDatos));
    contArchivo.forEach(function (actual, indiceActual, arreglo) {
        console.log(actual['eye_color']);
    });
});
// 3) Busque los tipos de "skin_color" en el arreglo people.json
iniciarBase.then(function (baseDatos) {
    var contArchivo = JSON.parse(JSON.stringify(baseDatos));
    contArchivo.forEach(function (actual, indiceActual, arreglo) {
        console.log(actual['skin_color']);
    });
});
//4) Busque los tipos de "hair_color" en el arreglo people.json
iniciarBase.then(function (baseDatos) {
    var contArchivo = JSON.parse(JSON.stringify(baseDatos));
    contArchivo.forEach(function (actual, indiActual, arrarRespuesta) {
        console.log(actual['hair_color']);
    });
});
