class Paciente {
    constructor(apellido,nombre,calle,numero,cpa,telefono) {
        this.apellido=apellido
        this.nombre=nombre
        this.telefono=telefono
        this.direccion = { 
            calle: calle,
            numero: numero,
            cPostal: cpa
        }
        this.domicilio= `${calle} ${numero} CPA ${cpa}`
    }
}
class Turnos{
    constructor(ivTurnos,horas,nmProfesional,pac)
    {
        this.ivTurnos=ivTurnos
        this.horas=horas
        this.nmProfesional=nmProfesional
        this.nTurnos=parseInt(ivTurnos)*parseInt(horas)
    }
}
class Historia {
    constructor (paciente,turnos){
        this.paciente=paciente
        this.turnos=turnos
    }
}
let base =[]
const obj=new Paciente
for (let i=0;i<2;i++) {
let ap=prompt("Apellido")
let nm=prompt("nombre")
base.push(new Paciente(ap,nm))


}
const turnera =new Turnos
const hc =new Historia(base,turnera)
console.log(hc)

