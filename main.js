//////////////////////////////////////////////////
// CLASES                                       //
//////////////////////////////////////////////////
class Paciente {
  constructor(apellido, nombre, calle, numero, cpa, telefono, dni) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = {
      calle: calle,
      numero: numero,
      cPostal: cpa,
    };
    this.dni = dni;
    this.domicilio = `${calle} ${numero} CPA ${cpa}`;
  }
}
class Profesional {
  constructor(
    ivTurnos,
    nmProfesional,
    apProfesional,
    dniProfesional,
    matriculaProfesional,
    espProfesional
  ) {
    this.configuracionTurnos = {
      ivTurnos: ivTurnos,
      dias: {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
      },
    };
    this.nmProfesional = nmProfesional;
    this.apProfesional = apProfesional;
    this.dniProfesional = dniProfesional;
    this.matriculaProfesional = matriculaProfesional;
    this.espProfesional = espProfesional;
  }
  generarTurnos() {
    //metodo que configura un array de objeto con los turnos del profesional
    for (let dia in this.configuracionTurnos.dias) {
      //loop que recorre los dias de la semana

      if (this.configuracionTurnos.dias[dia].length > 0) {
        //evalua si el dia de la semana recorrido tiene algun horario asignado
        for (let innerDia in this.configuracionTurnos.dias[dia]) {
          //for que recorre los horarios asignados a cada dia en particular
          const horaInicio =
            this.configuracionTurnos.dias[dia][innerDia].horaInicio.split(":");
          const horaFinal =
            this.configuracionTurnos.dias[dia][innerDia].horaFin.split(":");
          let [hi, mi] = horaInicio; // dectructuracion de los array en 4 variables de cadena
          let [hf, mf] = horaFinal;
          let intervalo = parseInt(this.configuracionTurnos.ivTurnos);
          let diferenciaHoras = new Date(
            new Date().setHours(parseInt(hf), parseInt(mf)) -
              new Date().setHours(parseInt(hi), parseInt(mi))
          ); //se parsean a entero los valores destructuradsos se generan dos dates y se restan me devuelve un date con la diferencia en ms
          let hor = parseInt(hi);
          let min = parseInt(mi);
          let horario = "";
          let maxMinutos = diferenciaHoras.valueOf() / 60000;
          for (let minutos = 0; minutos <= maxMinutos; minutos += intervalo) {
            min > 59 ? ((min = 0), hor++) : (min = min);

            horario +=
              '"' +
              (hor < 10 ? "0" + hor.toString().trim() : hor.toString().trim()) +
              ":" +
              (min < 10 ? "0" + min.toString().trim() : min.toString().trim()) +
              '"' +
              ":" +
              '"LIBRE",';
            min += intervalo;
          }
          horario =
            "{ " + horario.substring(0, horario.length - 1) + "}";
          this.configuracionTurnos.dias[dia].push(JSON.parse(horario)); 
        }
        //aca hay que generar el objeto con los turnos existentes
      }
    }
  }
}

class Horario {
  constructor(a, b) {
    this.horaInicio = a;
    this.horaFin = b;
  }
}
/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////

const configurarProfesional = () => {
  profesionalObj.apProfesional = prompt("Apellido del profesional");
  profesionalObj.nmProfesional = prompt("Nombre del profesional");
  profesionalObj.dniProfesional = prompt("DNI del profesional");
  profesionalObj.espProfesional = prompt("Especialidad del profesional");
  profesionalObj.matriculaProfesional = prompt("Matricula del profesional");
  profesionalObj.configuracionTurnos.ivTurnos = prompt("Intervalo de turnos");
  let opcionSemana = 1;
  while (opcionSemana !== 0) {
    opcionSemana = prompt(`Elija la opcion deseada:
                              0 - Salir
                              1 - Lunes
                              2 - Martes
                              3 - Miercoles
                              4 - Jueves
                              5 - Viernes
                              6 - Sabado
                              7 - Domingo`);
    opcionSemana = parseInt(opcionSemana);
    isNaN(opcionSemana) || opcionSemana < 0 || opcionSemana > 7
      ? alert("La respuesta debe ser un numero del 0 al 7")
      : definirHoras(opcionSemana);
  }

profesionalObj.generarTurnos()
};
const validarHora = () => {
  let regExHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  let inicio = prompt("Hora de inicio (formato 24 hs)");
  let final = prompt("Hora de finalizacion (formato 24 hs)");
  if (regExHora.test(inicio) && regExHora.test(final)) return [inicio, final];
  else return false;
};
const definirHoras = (opcion) => {
  let respuesta;
  switch (opcion) {
    case 1:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.lunes.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());

      break;
    case 2:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.martes.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 3:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.miercoles.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 4:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.jueves.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 5:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.viernes.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 6:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.sabado.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 7:
      respuesta = validarHora();
      respuesta !== false
        ? profesionalObj.configuracionTurnos.dias.domingo.push(
            new Horario(respuesta[0], respuesta[1])
          )
        : (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
  }
};
const diasAtencion= () =>{
let res =[];
let numero=1
    for (dia in profesionalObj.configuracionTurnos.dias)
{
if (profesionalObj.configuracionTurnos.dias[dia].length>0) {res.push(numero.toString().trim() + " - "+dia+"\n");
numero++
}
}
return res;
}
const turnosLibres = opcion=>{
console.log(profesionalObj.configuracionTurnos.dias[opcion].length)
let horarios = profesionalObj.configuracionTurnos.dias[opcion][profesionalObj.configuracionTurnos.dias[opcion].length-1] //esto esta mal hay que ver comohacer paraque agarre todoslos array excepto el indice 0
let libres =[]
let numero=1
libres[0]= "0 - Salir"
for (turno in horarios)
{
  if (horarios[turno]=="LIBRE") 
  {
    libres.push(numero+" - "+turno+"\n");
    numero++
}

}
console.log(libres) //NO ENTIENDO PORQUE ME PONEUN ESPACIO DESPUES DE LA COMA 
let opcionWhile=1
while(opcionWhile !=0)
{
  
  opcionWhile=prompt(`Elija el turno que desea:
  
  ${libres}`)

  if (opcionWhile !=0) {    
    let rta=prompt("DNI del paciente")
    const turnoSel=libres[opcionWhile].substring(4,libres[opcionWhile].length-1).toString().trim()
    profesionalObj.configuracionTurnos.dias[opcion][profesionalObj.configuracionTurnos.dias[opcion].length - 1]['"'+turnoSel+'"']=rta;
    console.log("Turno Asignado")
    opcionWhile=0;
      }
}
menuPrincipal()
}
const asignarTurno = ()=>{
let atencion= diasAtencion()//opciones en texto para el menu habria que generar tambien un array con las opciones indexadas para que pueda identificar el dia
let opcion=1

while (opcion !=0)
{
    opcion=prompt(`Elija el dia de atencion:
0 - Salir
${atencion}`); //NO SE PORQUE ME DEJA DESALINEADAS LAS OPCIONES 
    console.log(atencion)
console.log("opcion:",atencion[opcion-1].substring(4,atencion[opcion-1].length-1));
(opcion!=0) ?(turnosLibres(atencion[opcion-1].substring(4,atencion[opcion-1].length-1))) :opcion=0
}


}
const menuPrincipal = ()=>{

  while (opcion !== 0) {
    opcion = prompt(`Elija la opcion deseada
              0 - Salir
              1 - Configurar un profesional
              2 - Configurar un paciente
              3 - Asignar turnos`);
    opcion = parseInt(opcion);
    if (opcion == 0) break;
    isNaN(opcion) || opcion > 3 || opcion < 0
      ? alert("Opcion incorrecta ingrese un numero del 0 al 3")
      : opcion == 1
      ? configurarProfesional()
      : opcion == 2
      ? configurarPaciente()
      : asignarTurno(); //valida que el dato obtenido sea una opcion
  }
}
//////////////////////////////////////////
// LOGICA PRINCIPAL                     //
//////////////////////////////////////////

const profesionalObj = new Profesional();
const PacienteObj = new Paciente();
let opcion = 1;

menuPrincipal()
