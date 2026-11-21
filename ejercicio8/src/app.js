// Elementos de entrada y mensajes
const txtCliente = document.getElementById("txt-cliente") // Obtener el campo del nombre del cliente
const divMensaje = document.getElementById("div-mensaje") // Obtener el espacio para mostrar mensajes
const divCierre = document.getElementById("div-cierre") // Obtener el espacio para el mensaje de cierre

// Elementos de pantalla y resultados
const tbTurnos = document.getElementById("tb-turnos") // Obtener el cuerpo de la tabla de turnos
const txtAtencion = document.getElementById("txt-atencion") // Obtener el cuadro del cliente en atención
const txtTotales = document.getElementById("txt-totales") // Obtener el espacio de turnos totales
const txtAtendidos = document.getElementById("txt-atendidos") // Obtener el espacio de turnos atendidos
const txtPendientes = document.getElementById("txt-pendientes") // Obtener el espacio de turnos pendientes
const txtPorcentaje = document.getElementById("txt-porcentaje") // Obtener el espacio del porcentaje atendido

// Botones
const btnAsignar = document.getElementById("btn-asignar") // Obtener el botón Asignar turno
const btnAtender = document.getElementById("btn-atender") // Obtener el botón Atender siguiente
const btnEstadisticas = document.getElementById("btn-estadisticas") // Obtener el botón Ver estadísticas

// Vectores paralelos y contadores
let turnos = [] // Almacenar los nombres de los clientes en espera
let codigos = [] // Almacenar los códigos generados (T-001, T-002...)
let contadorTurnos = 0 // Llevar el conteo total de turnos emitidos en el día
let atendidos = 0 // Llevar el conteo de clientes ya atendidos

// 1. Asignar turno
btnAsignar.addEventListener("click", function () {
    const nombre = txtCliente.value.trim() // Obtener el nombre sin espacios extra

    // Validar que no esté vacío
    if (nombre === "") {
        divMensaje.textContent = "Ingrese el nombre del cliente"
        return
    }

    // Validar que no esté duplicado
    for (let i in turnos) {
        if (turnos[i].toLowerCase() === nombre.toLowerCase()) {
            divMensaje.textContent = "El cliente ya tiene un turno asignado"
            return
        }
    }

    contadorTurnos = contadorTurnos + 1 // Aumentar el número de turno
    const numeroTurno = fnGenerarCodigo(contadorTurnos) // Generar el código Ej: T-001

    turnos.push(nombre) // Guardar el cliente en el vector turnos[]
    codigos.push(numeroTurno) // Guardar su código en el vector codigos[]

    txtCliente.value = "" // Limpiar la caja de texto
    divCierre.textContent = "" // Limpiar mensaje de cierre
    divMensaje.textContent = "Turno asignado: " + numeroTurno + " - " + nombre

    fnMostrarTurnos() // Actualizar la tabla en pantalla
})

// Función para dar formato T-001, T-002, etc.
function fnGenerarCodigo(numero) {
    if (numero < 10) {
        return "T-00" + numero
    } else if (numero < 100) {
        return "T-0" + numero
    } else {
        return "T-" + numero
    }
}

// 2. Mostrar lista completa de clientes y sus números de turno
function fnMostrarTurnos() {
    tbTurnos.innerHTML = "" // Limpiar la tabla

    for (let i in turnos) { // Recorrer los vectores paralelos
        const fila = document.createElement("tr") // Crear nueva fila

        fila.innerHTML = `
            <td>${codigos[i]}</td>
            <td>${turnos[i]}</td>
        ` // Insertar código y nombre del cliente

        tbTurnos.appendChild(fila) // Agregar fila a la tabla
    }
}

// 3. Atender siguiente cliente
btnAtender.addEventListener("click", function () {
    if (turnos.length === 0) {
        divMensaje.textContent = "No hay clientes pendientes por atender"
        return
    }

    // Obtener el primer cliente (posición 0) y eliminarlo con shift()
    const clienteAtendido = turnos.shift()
    const codigoAtendido = codigos.shift()

    atendidos = atendidos + 1 // Sumar 1 al contador de atendidos

    // Mostrar en pantalla como "en atención"
    txtAtencion.textContent = "En atención: " + codigoAtendido + " - " + clienteAtendido
    divMensaje.textContent = "Atendiendo a " + clienteAtendido

    fnMostrarTurnos() // Actualizar la lista en pantalla
})

// 4. Ver estadísticas del día
btnEstadisticas.addEventListener("click", function () {
    const totales = contadorTurnos // Total de turnos generados en el día
    const pendientes = turnos.length // Los que aún quedan en el vector
    let porcentaje = 0

    if (totales > 0) {
        porcentaje = Math.round((atendidos / totales) * 100) // Calcular porcentaje redondeado
    }

    // Mostrar resultados en pantalla
    txtTotales.textContent = totales
    txtAtendidos.textContent = atendidos
    txtPendientes.textContent = pendientes
    txtPorcentaje.textContent = porcentaje + "%"

    // Si ya no hay turnos pendientes, mostrar cierre de jornada
    if (pendientes === 0 && totales > 0) {
        divCierre.textContent = "Cierre de jornada: Todos los turnos han sido atendidos."
    } else {
        divCierre.textContent = ""
    }

    // Imprimir estado en consola (F12)
    console.log("Vector turnos[] pendiente:", turnos)
    console.log("Totales:", totales, "| Atendidos:", atendidos, "| Pendientes:", pendientes)
})
