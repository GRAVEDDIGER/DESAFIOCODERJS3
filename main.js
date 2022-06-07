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
    for (let item in this.configuracionTurnos.dias) {
      console.log(item);
      console.log(this.configuracionTurnos.dias[item]["length"]);
      if (this.configuracionTurnos.dias[item]["length"] > 0) {
        for (let propiedad in this.configuracionTurnos.dias[item][propiedad]) {
          //aca hay que generar el objeto con los turnos existentes
        }
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

//////////////////////////////////////////
// LOGICA PRINCIPAL                     //
//////////////////////////////////////////

const profesionalObj = new Profesional();
const PacienteObj = new Paciente();
let opcion = 1;
profesionalObj.configuracionTurnos.dias.lunes.push(
  new Horario("15:00", "22:00")
);
profesionalObj.configuracionTurnos.dias.miercoles.push(
  new Horario("15:00", "22:00")
);
profesionalObj.generarTurnos();

// while (opcion !== 0) {
//   opcion = prompt(`Elija la opcion deseada
//             0 - Salir
//             1 - Configurar un profesional
//             2 - Configurar un paciente
//             3 - Asignar turnos`);
//   opcion = parseInt(opcion);
//   if (opcion == 0) break;
//   isNaN(opcion) || opcion > 4 || opcion < 0
//     ? alert("Opcion incorrecta ingrese un numero del 0 al 4")
//     : opcion == 1
//     ? configurarProfesional()
//     : opcion == 2
//     ? configurarPaciente()
//     : asignarTurno(); //valida que el dato obtenido sea una opcion
// }
