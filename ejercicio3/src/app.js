
// Datos del paciente
const txtNombre = document.getElementById("txt-nombre") // Obtener el campo del nombre
const selectPrioridad = document.getElementById("select-prioridad") // Obtener la lista de prioridades

const btnAgregar = document.getElementById("btn-agregar") // Obtener el botón para registrar pacientes
const btnAtender = document.getElementById("btn-atender") // Obtener el botón para atender pacientes

const txtAtendiendo = document.getElementById("txt-atendiendo") // Obtener el campo del paciente atendido

const tbTurnos = document.getElementById("tb-turnos") // Obtener el cuerpo de la tabla de turnos

// Vector de turnos
let turnos = [] // Almacenar los pacientes registrados con su prioridad


// Registrar paciente
btnAgregar.addEventListener("click", function(e) {

    // Obtener los datos ingresados
    const nombre = txtNombre.value.trim()
    const prioridad = selectPrioridad.value

    // Validar que el nombre no esté vacío
    if (nombre === "") {
        alert("Por favor, ingrese el nombre del paciente")
        txtNombre.focus()
        return
    }

    // Crear un objeto con los datos del paciente
    const paciente = {
        nombre: nombre,
        prioridad: prioridad
    }

    // Agregar el paciente al vector de turnos
    turnos.push(paciente)

    // Mostrar un mensaje de confirmación
    alert("Paciente registrado correctamente")

    // Limpiar el campo del nombre
    txtNombre.value = ""

    // Actualizar la lista de pacientes
    fnMostrarTurnos()

})



// Atender paciente
btnAtender.addEventListener("click", function(e) {

    // Verificar si existen pacientes registrados
    if (turnos.length === 0) {
        alert("No existen pacientes pendientes para atender")
        return
    }

    // Inicializar la posición del paciente prioritario
    let posicion = -1

    // Buscar pacientes con prioridad alta
    for (let i in turnos) {

        if (turnos[i].prioridad === "Alta") {
            posicion = parseInt(i)
            break
        }
    }

    // Declarar la variable del paciente atendido
    let pacienteAtendido

    // Comprobar si existe un paciente con prioridad alta
    if (posicion !== -1) {

        // Retirar al paciente prioritario del vector
        pacienteAtendido = turnos.splice(posicion, 1)[0]

    } else {

        // Si no hay prioridad alta, atender por orden de llegada
        pacienteAtendido = turnos.shift()

    }

    // Mostrar los datos del paciente atendido
    txtAtendiendo.textContent =
        pacienteAtendido.nombre + " - Prioridad: " +
        pacienteAtendido.prioridad

    // Mostrar un mensaje de atención
    alert("Se está atendiendo a: " + pacienteAtendido.nombre)

    // Actualizar la tabla de turnos pendientes
    fnMostrarTurnos()

})


// Mostrar los turnos pendientes
function fnMostrarTurnos() { // Definir la función para mostrar los pacientes

    tbTurnos.innerHTML = "" // Limpiar el contenido anterior de la tabla

    // Recorrer el vector de turnos
    for (let i in turnos) {

        const fila = document.createElement("tr") // Crear una nueva fila

        const item = parseInt(i) + 1 // Obtener el número del turno

        fila.innerHTML = `
            <td>${item}</td>
            <td>${turnos[i].nombre}</td>
            <td>${turnos[i].prioridad}</td>
        ` // Insertar los datos del paciente en la tabla

        tbTurnos.appendChild(fila) // Agregar la fila a la tabla

    }
}
