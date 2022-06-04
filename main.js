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
class Turnos {
    constructor(ivTurnos, horas, nmProfesional, horaInicio) {
        this.ivTurnos = ivTurnos
        this.horas = horas
        this.nmProfesional = nmProfesional
        this.turnos = [] //ARRAY DE DNI DE LOS PACIENTES QUE TIENEN TURNOS EL ARRAY NO DEBE SUPERAR IVTURNOS*HORAS
        this.horaInicio = new Date(horaInicio).getTime() // VER SI ESTO ESTA BIEN NO ESTA PROBADO 

    }

}


class Historia {
    constructor(paciente, turnos) {
        this.paciente = paciente
        this.turnos = turnos
    }
}
let base = []
const obj = new Paciente
for (let i = 0; i < 2; i++) {
    let ap = prompt("Apellido")
    let nm = prompt("nombre")
    base.push(new Paciente(ap, nm))
}
const turnera = new Turnos
turnera.turnos.push(28278216)
const hc = new Historia(base, turnera)
console.log(hc)