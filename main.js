//////////////////////////////////////////////////
// CLASES                                       //
//////////////////////////////////////////////////
class Paciente {
    constructor(apellido, nombre, calle, numero, cpa, telefono, dni) {
        this.apellido = apellido
        this.nombre = nombre
        this.telefono = telefono
        this.direccion = {
            calle: calle,
            numero: numero,
            cPostal: cpa
        }
        this.dni = dni
        this.domicilio = `${calle} ${numero} CPA ${cpa}`
    }
}
class Profesional {
    constructor(ivTurnos, nmProfesional, apProfesional, dniProfesional, matriculaProfesional, espProfesional) {
        this.configuracionTurnos = {
            ivTurnos: ivTurnos,
            dias: {
                lunes: [],
                martes: [],
                miercoles: [],
                jueves: [],
                viernes: [],
                sabado: [],
                domingo: []
            }
        }
        this.nmProfesional = nmProfesional
        this.apProfesional = apProfesional
        this.dniProfesional = dniProfesional
        this.matriculaProfesional = matriculaProfesional
        this.espProfesional = espProfesional

    }

}
class Horario {
    constructor() {
        this.horaInicio = []
        this.horaFin = []
    }
}
/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////
const configurarProfesional = () => {
    profesionalObj.apProfesional = prompt("Apellido del profesional")
    profesionalObj.nmProfesional = prompt("Nombre del profesional")
    profesionalObj.dniProfesional = prompt("DNI del profesional")
    profesionalObj.espProfesional = prompt("Especialidad del profesional")
    profesionalObj.matriculaProfesional = prompt("Matricula del profesional")
    profesionalObj.configuracionTurnos.ivTurnos = prompt("Intervalo de turnos")
    let opcionSemana = 1
    while (opcionSemana !== 0) {
        opcionSemana = parseInt(prompt(`Elija la opcion deseada:
                              0 - Salir
                              1 - Lunes
                              2 - Martes
                              3 - Miercoles
                              4 - Jueves
                              5 - Viernes
                              6 - Sabado
                              7 - Domingo`))
            (isNaN(opcionSemana) || opcionSemana < 0 || opcionSemana > 7) ? alert("La respuesta debe ser un numero del 0 al 7") : definirHoras(opcionSemana)
    }
}

const definirHoras = opcion => {
    switch (opcion) {
        case 1:

            let reg = /^ ([01] ? [0 - 9] | 2[0 - 3]): [0 - 5][0 - 9] $/
            let inicio = prompt("Hora de inicio (formato 24 hs)")
            let final = prompt("Hora de finalizacion (formato 24 hs)")
                (reg.test(inicio) && reg.test(final)) ? profesionalObj.configuracionTurnos.dias.lunes.push(new Horario(inicio, final)) : alert("Debe ingresar la hora en formato HH:MM")
            break;
        case 2:
            profesionalObj.configuracionTurnos.dias.martes.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
        case 3:
            profesionalObj.configuracionTurnos.dias.miercoles.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
        case 4:
            profesionalObj.configuracionTurnos.dias.jueves.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
        case 5:
            profesionalObj.configuracionTurnos.dias.viernes.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
        case 6:
            profesionalObj.configuracionTurnos.dias.sabado.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
        case 7:
            profesionalObj.configuracionTurnos.dias.domingo.push(new Horario(prompt("Hora de inicio (formato 24 hs)"), prompt("Hora de finalizacion (formato 24 hs)")))
            break;
    }
}


//////////////////////////////////////////
// LOGICA PRINCIPAL                     //
//////////////////////////////////////////


const profesionalObj = new Profesional
const PacienteObj = new Paciente
let opcion = 1
while (opcion !== 0) {
    opcion = parseInt(prompt(`Elija la opcion deseada
            0 - Salir
            1 - Configurar un profesional
            2 - Configurar un paciente
            3 - Asignar turnos`))
        (isNaN(opcion)) ? alert("Opcion incorrecta ingrese un numero") :
        (opcion > 4) ? alert("Debes ingresar una opcion de 0 a 4") :
        (opcion == 1) ?
        configurarProfesional() :
        (opcion == 2) ? configurarPaciente() :
        asignarTurno() //valida que el dato obtenido sea una opcion

}