"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//02-observables.ts
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var rxjs = require('rxjs');
var map = require('rxjs/operators').map;
var numeros$ = rxjs.of(1, 2, 3, 4, 5, 6);
numeros$
    .pipe(operators_1.distinct(), map(function (valorActal) {
    return {
        data: valorActal
    };
}))
    .subscribe(function (ok) {
    console.log('en ok', ok);
}, function (error) {
    console.log('error', error);
}, function () {
    console.log('complete');
});
var promesa = function (funciona) {
    return new Promise(function (resolve, reject) {
        if (funciona) {
            resolve(':)');
        }
        else {
            reject(':(');
        }
    });
};
var promesa$ = rxjs.from(promesa(true));
promesa$.subscribe(function (ok) {
    console.log('promesa bien', ok);
}, function (error) {
    console.log('promesa mal', error);
}, function () {
    console.log('completado');
});
var observableConcatenado$ = numeros$.pipe(rxjs_1.concat(promesa$), operators_1.distinct(), map(function (valorActal) {
    return {
        data: valorActal
    };
}));
observableConcatenado$.subscribe(function (ok) {
    console.log('promesa bien', ok);
}, function (error) {
    console.log('promesa mal', error);
}, function () {
    console.log('completado');
});
