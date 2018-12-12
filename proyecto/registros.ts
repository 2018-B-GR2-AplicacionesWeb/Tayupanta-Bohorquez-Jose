const fs = require('fs');
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const find = require('rxjs/operators').find;
const filter = require('rxjs/operators').filter;

const preguntaMenu = {
    type: 'list',
    name: 'opcionesMenu',
    message: 'Opción a escoger: ',
    choices: [
        'CREAR',
        'BORRAR',
        'BUSCAR',
        'ACTUALIZAR', 
    ]
}

const preguntaIngresoPaciente = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre del paciente: '
    },
    {
        type: 'input',
        name: 'historia',
        message: 'Ingrese la historia medica: '
    },
    {
        type: 'input',
        name: 'edad',
        message: 'Escriba la edad del paciente: '
    }
]

const preguntaPacienteBusqueda = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre paciente a buscar'
    }
]

const preguntaActualizarPaciente = [
    {
        type: 'input',
        name: 'actualizar',
        message: 'Paciente que va actualizar: '
    },
    {
        type: prev => prev != '' ? 'input': null,
        name: 'nombre',
        message: 'Nombre corregido del paciente: '
    },
    {
        type: prev => prev != '' ? 'input': null,
        name: 'historia',
        message: 'Historia medica corregida del paciente: '
    },
    {
        type: prev => prev != '' ? 'input': null,
        name: 'edad',
        message: 'Edad corregido del paciente: '
    },
]

function main(){
    iniciarBase()
        .pipe(
            mergeMap(
                (respuestaBdd: RespuestaBDD) => {
                    return Menu()
                        .pipe(
                            map(
                                (respuesta: OpcionesPregunta) => {
                                    return {
                                        respuestaPaciente: respuesta,
                                        respuestaBdd
                                    }
                                }
                            )
                        )
                }
            ),
            mergeMap(
                (respuesta: RespuestaPaciente) => {
                    switch(respuesta.respuestaPaciente.opcionMenu){
                        case 'Crear':
                            return rxjs
                                .from(inquirer.prompt(preguntaIngresoPaciente))
                                .pipe(
                                    map(
                                        (paciente) => {
                                            respuesta.paciente = paciente
                                            return respuesta
                                        }
                                    )
                                )
                        case 'Borrar':
                            return rxjs
                                .from(inquirer.prompt(preguntaPacienteBusqueda))
                                .pipe(
                                    map(
                                        (nombre) => {
                                            respuesta.paciente = nombre
                                            return respuesta 
                                        }
                                    )
                                )
                        case 'Buscar':
                            return rxjs
                                .from(inquirer.prompt(preguntaPacienteBusqueda))
                                .pipe(
                                    map(
                                        (nombre) => {
                                            respuesta.paciente = nombre
                                            return respuesta
                                        }
                                    )
                                )
                        case 'Actualizar':
                        return  rxjs
                            .from(inquirer.prompt(preguntaActualizarPaciente))
                            .pipe(
                                map(
                                    (respuestaActual: respuestaActualizar) => {
                                        respuesta.respuestaBDD.mensaje = respuestaActual.actualizar
                                        respuesta.paciente = respuestaActual.paciente
                                        return respuesta
                                    }
                                )
                            )
                        default: 
                        respuesta.paciente = {
                            nombre: null,
                            historia: null,
                            edad: null
                        }
                        rxjs.of(respuesta)
                    }
                }
            ),
            map(
                (respuesta: RespuestaPaciente) => {
                    switch(respuesta.respuestaPaciente.opcionMenu){
                        case 'Crear':
                            const pacienteNuevo = respuesta.paciente
                            respuesta.respuestaBDD.bdd.pacientes.push(pacienteNuevo)
                            return respuesta
                        case 'Borrar':
                            const contenido = JSON.stringify(respuesta.respuestaBDD.bdd)
                            const bdd = JSON.parse(contenido)
                            const indicePaciente = bdd.pacientes
                                .findIndex(
                                    (paciente) => {
                                        return paciente.nombre === respuesta.paciente.nombre
                                    }
                                )
                                bdd.pacientes
                                    .splice(indicePaciente, 1)
                                respuesta.respuestaBDD.mensaje = 'Paciente Eliminado'
                                respuesta.respuestaBDD.bdd = bdd

                                return respuesta
                        
                        case 'Buscar':
                            const baseDatos = JSON.parse(JSON.stringify(respuesta.respuestaBDD.bdd))
                            const respuestaFind = baseDatos.pacientes
                                .find(
                                    (paciente: Paciente) => {
                                        return paciente.nombre === respuesta.paciente.nombre
                                    }
                                )
                                if (respuestaFind){
                                    console.log('paciente encontrado: '+JSON.stringify(respuestaFind,null,2));
                                }else {
                                    console.log('paciente no existe')
                                }
                                respuesta.respuestaBDD.mensaje= 'Busqueda';
    
                                return respuesta;
                        case 'Actualizar':
                            const contenidoActual = JSON.stringify(respuesta.respuestaBDD.bdd)
                            const baseActual = JSON.parse(contenidoActual)
                            const indice = baseActual.pacientes
                                .findIndex(
                                    (paciente) => {
                                        return paciente.nombre === respuesta.respuestaBDD.mensaje
                                    }
                                )
                                if (indice ){ //mayor -1
                                    
                                    respuesta.respuestaBDD.bdd.pacientes[indice].nombre = respuesta.paciente.nombre
                                    respuesta.respuestaBDD.bdd.pacientes[indice].historia = respuesta.paciente.historia
                                    
                                }else {
                                    
                                }
                                respuesta.respuestaBDD.bdd.pacientes[indice].nombre = respuesta.paciente.nombre
                                respuesta.respuestaBDD.bdd.pacientes[indice].historia = respuesta.paciente.historia
                                respuesta.respuestaBDD.bdd.pacientes[indice].edad = respuesta.paciente.edad                                
                                respuesta.respuestaBDD.mensaje= 'Actualizar';
    
                                return respuesta;
                    }
                }
            ),
            mergeMap(
                (respuesta: RespuestaPaciente) => {
                    //return guardarBase(respuesta.respuestaBDD.bdd)
                }
            )
        )
        .subscribe(
            (mensaje) => {
                console.log(mensaje)
            },
            (error) => {
                console.log(error)
            }, () => {
                console.log('completado')
                main()
            }
        )
}


const nombreBdd = 'pacientes.json'

//funciones
function Menu(){
    return rxjs.from(inquirer.prompt(preguntaMenu))
}

function iniciarBase(){
    const leerBdd$ = rxjs.from(leerBddPromesa())
    return leerBdd$
        .pipe(
            mergeMap(
                (respuestaBdd: RespuestaBDD) => {
                    if(respuestaBdd.bdd){
                        return rxjs.of(respuestaBdd)
                    }else {
                        return rxjs.from(crearBdd())
                    }
                }
            )
        )
}

function leerBddPromesa(){
    return new Promise(
        (resolve) => {
            fs.readFile(
                nombreBdd,
                'utf-8',
                (error, contenLeido) => {
                    if(error){
                        resolve({
                            mensaje: 'Base de datos esta vacia',
                            bdd:null
                        })
                    } else {
                        resolve({
                            mensaje: 'Existe la base',
                            bdd: JSON.parse(contenLeido)
                        })
                    }
                }
            )
        }
    )
}

function crearBdd() {
    const base = '{"pacientes": []}';
    // @ts-ignore
    return new Promise(
        (resolve,reject) => {
            fs.writeFile(
                nombreBdd,
                base,
                (err) => {
                    if(err){
                        reject({Mensaje: 'error creando Base', error: 500});
                    }else {
                        resolve({Mensaje: 'Base creada', bdd: JSON.parse(base)});
                    }
                }
            )
        }
    )
}


function eliminarPaciente(nombre){
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreBdd,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error){
                        reject('Error leyendo')
                    }  else {
                        const bdd = JSON.parse(contenidoLeido);
                        const indicePaciente = bdd.pacientes
                            .findIndex(
                                (paciente) => {
                                    return paciente.nombre = nombre;
                                }
                            );

                        if (indicePaciente){
                            bdd.canciones
                                .splice(indicePaciente, 1);
                            resolve({
                                mensaje: 'paciente Eliminado',
                                bdd: bdd
                            })
                        } else {
                            reject()
                        }

                        
                    }
                });
        }
    );
}

function guardarBase(bdd: BaseDatos) {
    return new Promise(
        (resolve,reject)=> {
            fs.writeFile(
                nombreBdd,
                JSON.stringify(bdd,null,2),
                (error) => {
                    if(error){
                        reject({Mensaje: 'error guardando', error: 500});
                    } else {
                        resolve({Mensaje: 'Base guardada'});
                    }
                }
            )
        }
    )
}
//Interfaces

interface Paciente {
    nombre: string,
    historia: string,
    edad: number
}

interface respuestaActualizar {
    actualizar: string,
    paciente: Paciente
}

interface BaseDatos {
    pacientes: Paciente[]
}

interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDatos
}

interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface RespuestaPaciente {
    respuestaPaciente: OpcionesPregunta,
    respuestaBDD: RespuestaBDD,
    paciente?: Paciente
}

main()
