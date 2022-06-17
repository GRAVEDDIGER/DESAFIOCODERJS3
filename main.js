//////////////////////////////////////////////////
// CLASES                                       //
//////////////////////////////////////////////////
class Paciente {
    constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
        this.apellido = [apellido];
        this.nombre = [nombre];
        this.telefono = [telefono];
        this.direccion = [{
            calle: calle,
            numero: numero,
            cPostal: cpa,
            localidad: localidad,
        }, ];
        this.dni = [dni];
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
                    horario = "{ " + horario.substring(0, horario.length - 1) + "}";
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
    profesionalObj.apProfesional = prompt(
        "Apellido del profesional"
    ).toUpperCase();
    profesionalObj.nmProfesional = prompt("Nombre del profesional").toUpperCase();
    profesionalObj.dniProfesional = prompt("DNI del profesional").toUpperCase();
    profesionalObj.espProfesional = prompt(
        "Especialidad del profesional"
    ).toUpperCase();
    profesionalObj.matriculaProfesional = prompt(
        "Matricula del profesional"
    ).toUpperCase();
    profesionalObj.configuracionTurnos.ivTurnos = prompt(
        "Intervalo de turnos"
    ).toUpperCase();

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
        isNaN(opcionSemana) || opcionSemana < 0 || opcionSemana > 7 ?
            alert("La respuesta debe ser un numero del 0 al 7") :
            definirHoras(opcionSemana);
    }
    configuracionOk
        ?
        profesionalObj.generarTurnos() :
        (alert("Hay datos mal en la configuracion del profesional"),
            configurarProfesional());
};
const configuracionOk = () => {
    //EVALUA CON TRUE SI LOS DATOS NECESARIOS PARA GENERAR TURNOS ESTAN EN EL OBJ
    const semana = profesionalObj.configuracionTurnos.dias;
    let res = false;
    for (dia in semana) {
        if (
            semana[dia].length > 1 &&
            !parseInt(profesionalObj.configuracionTurnos.ivTurnos).isNaN
        )
            res = true;
        return res;
    }
};
const validarHora = () => {
    //EVALUA SI LA EXPRESION DEVUELTA RESPONDE A HORA EN FORMATO 24 HS
    let regExHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    let inicio = prompt("Hora de inicio (formato 24 hs)");
    let final = prompt("Hora de finalizacion (formato 24 hs)");
    if (regExHora.test(inicio) && regExHora.test(final)) return [inicio, final];
    else return false;
};
const definirHoras = (opcion) => {
    //GUARDA LOS HORARIOS DE INICIO Y FIN EN LOS DIAS SELECCIONADOS
    let respuesta;
    switch (opcion) {
        case 1:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.lunes.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());

            break;
        case 2:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.martes.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
        case 3:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.miercoles.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
        case 4:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.jueves.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
        case 5:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.viernes.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
        case 6:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.sabado.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
        case 7:
            respuesta = validarHora();
            respuesta !== false ?
                profesionalObj.configuracionTurnos.dias.domingo.push(
                    new Horario(respuesta[0], respuesta[1])
                ) :
                (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
            break;
    }
};
const diasAtencion = () => {
    //CARGA LOS DIAS QUE EL PROFESIONAL ATIENDE EN UN ARRAY
    let res = [];
    let numero = 1;
    const semana = profesionalObj.configuracionTurnos.dias;
    for (dia in semana) {
        if (semana[dia].length > 0) {
            res.push(numero.toString().trim() + " - " + dia + "\n");
            numero++;
        }
    }
    return res;
};
const turnosLibres = (opcion) => {
    //MUESTRA LOS TURNOS LIBRES Y PERMITE SELECCIONAR EL HORARIO. CARGA EL DNI DEL PACIENTE EN EL HORARIO
    // EL PARAMETRO OPCION ES EL DATO SELECCIONADO POR EL USUARIO DEL DIA DE SEMANA

    console.log(profesionalObj.configuracionTurnos.dias[opcion].length);
    const dia = profesionalObj.configuracionTurnos.dias[opcion];
    let libres = [];
    let numero = 1;

    for (let index = 0; index < dia.length; index++) {
        let horarios = dia[index];
        libres[0] = "0 - Salir\n";
        for (turno in horarios) {
            if (horarios[turno] == "LIBRE") {
                libres.push(numero + " - " + turno + "\n");
                numero++;
            }
        }

        console.log(libres); //NO ENTIENDO PORQUE ME PONEUN ESPACIO DESPUES DE LA COMA
    }
    let opcionWhile = 1;
    while (opcionWhile != 0) {
        opcionWhile = prompt(`Elija el turno que desea:
  
  ${libres}`);

        if (opcionWhile != 0) {
            let rta = prompt("DNI del paciente");
            const turnoSel = libres[opcionWhile]
                .substring(4, libres[opcionWhile].length - 1)
                .toString()
                .trim();
            profesionalObj.configuracionTurnos.dias[opcion][
                profesionalObj.configuracionTurnos.dias[opcion].length - 1
            ][`${turnoSel}`] = rta;
            console.log("Turno Asignado");
            opcionWhile = 0;
        }
    }
    menuPrincipal();
};
const asignarTurno = () => {
    //PERMITE SELECCIONAR EL DIA DE ATNECION DEL PROFESIONAL
    let atencion = diasAtencion(); //LLAMA A LA FUNCION DIAS Y TRAE EL ARRAY ATENCION CON LOS DIAS DEL
    // PROFESIONAL
    let opcion = 1;

    while (opcion != 0) {
        opcion = prompt(`Elija el dia de atencion:
0 - Salir
${atencion}`); //NO SE PORQUE ME DEJA DESALINEADAS LAS OPCIONES
        //EL OPERADOR TERNARIO LLAMA A LA FUNCION TURNOSLIBRES PASANDO COMO PARAMETRO EL DIA SELECCIONADO POR EL USR
        // SI LA OPCION ES 0 TERMNA EL BUCLE
        opcion != 0 ?
            turnosLibres(
                atencion[opcion - 1].substring(4, atencion[opcion - 1].length - 1)
            ) :
            (opcion = 0);
    }
};
const menuPrincipal = () => {
    // FUNCION QUE  MUESTRA EL MENU PRINCIPAL

    while (opcion !== 0) {
        opcion = prompt(`Elija la opcion deseada
              0 - Salir
              1 - Configurar un profesional
              2 - Configurar un paciente
              3 - Asignar turnos`);
        opcion = parseInt(opcion);
        if (opcion == 0) break; // SALE SI ES = 0 SINO EL OPERADOR TERNARIO EVALUA 1( SI LO ENVIADO POR EL USR ES ADECUADO AL MENU)
        //LUEGO LLAMA A LA FUNCION PERTINENTE PARA CADA OPCION
        isNaN(opcion) || opcion > 3 || opcion < 0 ?
            alert("Opcion incorrecta ingrese un numero del 0 al 3") :
            opcion == 1 ?
            configurarProfesional() :
            opcion == 2 ?
            configurarPaciente() :
            asignarTurno(); //valida que el dato obtenido sea una opcion
    }
};
const errDNI = () => {
    alert("DNI debe ser un numero");
    let dni = parseInt(prompt("Ingrese su DNI:"));
    if (dni.isNaN) errDNI();
    else PacienteObj.dni = dni;
};
const telefonoPaciente = (error) => {
    let regexTelefono =
        /\([0-9]{3}[0-9]?[0-9]?\)[-]?([0-9]{2})?[0-9]?[-]?[0-9]{2}[0-9]?[-]?[0-9]{4}/g;
    if (error) alert("ingresaste mal el numero de telefono");
    let telefono = prompt(`Ingrese el telefono del paciente:
Formato: (011)-aaa-bbb-cccc
aaa Puede contener el 15 del celular o solo codigo de area si es fijo
bbb puede ser de 2 o 3 caracteres`);
    let condicion = regexTelefono.test(telefono);
    if (condicion) {
        PacienteObj.telefono[indice] = telefono;
    } else telefonoPaciente(true);
};

const configurarPaciente = () => {
    let dni = prompt("DNI");
    let documento = PacienteObj.dni;

    if (parseInt(dni).isNaN) errDNI()
    if (documento.length < 2) {
        if (documento[0] == undefined) {
            documento[0] = dni;
            indice = 0
        } else {
            if (documento[0] == dni) {
                indice = 0
                alert("dni repetido")
            } else {
                documento.push(dni);
                indice = documento.length - 1
            }
        }
    } else {
        indice = documento.forEach(item => {
            if (item.indexOf(dni) == -1) return false
            else {
                indice = item.indexOf(dni)
            }
        })
        if (indice == false) {
            documento.push(dni);
            indice = documento.length - 1

        }

    }
    let apellido1 = prompt("Apellido del paciente:").toUpperCase();
    PacienteObj.apellido[indice] = apellido1
    PacienteObj.nombre = prompt("Nombre del paciente").toUpperCase();

    telefonoPaciente(false);
    if (indice > 0) {
        PacienteObj.direccion.push({
            calle: "",
            numero: "",
            cPostal: "",
            localidad: ""
        })
    }
    PacienteObj.direccion[indice].calle = prompt("Calle donde vive:");
    PacienteObj.direccion[indice].numero = prompt("Altura de la calle:");
    PacienteObj.direccion[indice].cPostal = prompt("Codigo postal");
    PacienteObj.direccion[indice].localidad = prompt("Localidad");
};
//////////////////////////////////////////
// LOGICA PRINCIPAL                     //
//////////////////////////////////////////

const profesionalObj = new Profesional();
const PacienteObj = new Paciente();
let opcion = 1;
let indice;
menuPrincipal()