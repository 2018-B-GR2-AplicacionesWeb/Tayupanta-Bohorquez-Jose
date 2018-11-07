//02-observables.ts
import {distinct} from "rxjs/operators";
import {concat} from "rxjs";

declare var require: any;
declare var Promise: any;

const rxjs = require('rxjs')
const map = require('rxjs/operators').map;

const numeros$ = rxjs.of(1,2,3,4,5,6);
numeros$
    .pipe(
        distinct(),
        map(
            (valorActal)=>{
                return{
                    data: valorActal
                }
            }
        )
    )
    .subscribe(
    (ok)=>{
        console.log('en ok', ok)
    },
    (error) => {
        console.log('error', error)
    },
    ()=>{
        console.log('complete')
    }
)

const promesa = (funciona: boolean): Promise<string> => {
    return new Promise(
        (resolve, reject) => {
            if(funciona){
                resolve(':)')
            } else {
                reject(':(')
            }
        }
    )
}

const promesa$ = rxjs.from(promesa(true))
promesa$.subscribe(
    (ok)=>{
        console.log('promesa bien', ok)
    },
    (error)=>{
        console.log('promesa mal', error)
    },
    ()=>{
        console.log('completado')
    }

)

const observableConcatenado$ = numeros$.pipe(
    concat(promesa$),
    distinct(),
    map(
        (valorActal)=>{
            return{
                data: valorActal
            }
        }
    )
)

observableConcatenado$.subscribe(
    (ok)=>{
        console.log('promesa bien', ok)
    },
    (error)=>{
        console.log('promesa mal', error)
    },
    ()=>{
        console.log('completado')
    }
)