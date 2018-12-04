
const preguntaMenu = {
    type: 'list',
    name: 'opcionesMenu',
    message: 'Opción a escoger: ',
    choice: [
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
    
]

