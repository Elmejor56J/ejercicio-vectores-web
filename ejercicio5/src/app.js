// Datos de los elementos HTML
const txtPlacaEntrada = document.getElementById("txt-placa-entrada") // Obtener el campo donde se escribe la placa del auto que ingresa
const txtHoraEntrada = document.getElementById("txt-hora-entrada") // Obtener el campo donde se escribe la hora de entrada
const btnEntrada = document.getElementById("btn-entrada") // Obtener el botón para registrar la entrada

const txtPlacaSalida = document.getElementById("txt-placa-salida") // Obtener el campo donde se escribe la placa del auto que sale
const txtHoraSalida = document.getElementById("txt-hora-salida") // Obtener el campo donde se escribe la hora de salida
const btnSalida = document.getElementById("btn-salida") // Obtener el botón para registrar la salida

const tbEstacionados = document.getElementById("tb-estacionados") // Obtener el cuerpo de la tabla donde se muestran los autos estacionados

const txtEstacionados = document.getElementById("txt-estacionados") // Obtener el campo de la cantidad de autos estacionados
const txtTotalCobrado = document.getElementById("txt-total-cobrado") // Obtener el campo del total cobrado en el día
const tdUltimoCobro = document.getElementById("td-ultimo-cobro") // Obtener la celda donde se muestra el detalle del último cobro

// Vectores paralelos: la misma posición de cada vector pertenece al mismo auto
let placas = [] // Almacenar las placas de los autos estacionados
let horasEntrada = [] // Almacenar la hora de entrada de cada auto

// Tarifa del parqueadero
const TARIFA = 0.75 // Valor en dólares que se cobra por cada hora

// Total cobrado en el día
let totalCobrado = 0 // Iniciar en cero el dinero cobrado por el parqueadero

// Registrar la entrada de un auto
btnEntrada.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Registrar entrada
    const placa = txtPlacaEntrada.value // Obtener la placa ingresada
    const hora = parseInt(txtHoraEntrada.value) // Obtener la hora de entrada y convertirla a número entero

    // Validar los datos ingresados
    if (placa == "") { // Comprobar si la placa está vacía
        alert("Ingrese la placa del auto") // Mostrar una alerta cuando falta la placa

    } else if (isNaN(hora) || hora < 0 || hora > 23) { // Comprobar si la hora no es un número o está fuera del rango de 0 a 23
        alert("Ingrese una hora de entrada válida (entre 0 y 23)") // Mostrar una alerta cuando la hora no es válida

    } else if (placas.indexOf(placa) != -1) { // Buscar la placa en el vector; si existe, el auto ya está estacionado
        alert("Esa placa ya se encuentra estacionada") // Mostrar una alerta para no repetir la misma placa

    } else { // Ejecutar cuando todos los datos son correctos
        placas.push(placa) // Guardar la placa en su vector
        horasEntrada.push(hora) // Guardar la hora de entrada en su vector

        fnMostrarEstacionados() // Ejecutar la función que muestra los autos en la tabla
        fnActualizarResumen() // Ejecutar la función que actualiza la cantidad y el total cobrado

        txtPlacaEntrada.value = "" // Limpiar el campo de la placa
        txtHoraEntrada.value = "" // Limpiar el campo de la hora
    }
})

// Registrar la salida de un auto y calcular el cobro
btnSalida.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Registrar salida
    const placa = txtPlacaSalida.value // Obtener la placa del auto que sale
    const horaSalida = parseInt(txtHoraSalida.value) // Obtener la hora de salida y convertirla a número entero

    // Búsqueda por índice: indexOf devuelve la posición de la placa o -1 si no existe
    const posicion = placas.indexOf(placa) // Buscar la placa en el vector de placas

    // Validar los datos ingresados
    if (placa == "") { // Comprobar si la placa está vacía
        alert("Ingrese la placa del auto que sale") // Mostrar una alerta cuando falta la placa

    } else if (isNaN(horaSalida) || horaSalida < 0 || horaSalida > 23) { // Comprobar si la hora no es un número o está fuera del rango de 0 a 23
        alert("Ingrese una hora de salida válida (entre 0 y 23)") // Mostrar una alerta cuando la hora no es válida

    } else if (posicion == -1) { // Comprobar si la placa no se encontró en el vector
        alert("La placa no se encuentra en el parqueadero") // Mostrar una alerta cuando el auto no está registrado

    } else if (horaSalida < horasEntrada[posicion]) { // Comprobar si la hora de salida es menor que la de entrada
        alert("La hora de salida no puede ser menor que la hora de entrada") // Mostrar una alerta porque el tiempo sería negativo

    } else { // Ejecutar cuando la placa existe y la hora de salida es correcta
        const horaEntrada = horasEntrada[posicion] // Obtener la hora de entrada del auto que sale
        const horas = horaSalida - horaEntrada // Calcular la diferencia de horas
        const cobro = horas * TARIFA // Multiplicar las horas por la tarifa para obtener el cobro

        totalCobrado = totalCobrado + cobro // Acumular el cobro en el total del día

        tdUltimoCobro.textContent = `Último cobro (${placa}): ${horas} horas × $${TARIFA.toFixed(2)} = $${cobro.toFixed(2)}` // Mostrar el detalle del cobro realizado

        placas.splice(posicion, 1) // Eliminar la placa del vector usando su posición
        horasEntrada.splice(posicion, 1) // Eliminar la hora de entrada que está en la misma posición

        fnMostrarEstacionados() // Ejecutar la función que actualiza la tabla de autos
        fnActualizarResumen() // Ejecutar la función que actualiza la cantidad y el total cobrado

        txtPlacaSalida.value = "" // Limpiar el campo de la placa
        txtHoraSalida.value = "" // Limpiar el campo de la hora
    }
})

// Mostrar los autos estacionados en la tabla
function fnMostrarEstacionados() { // Definir la función para mostrar los autos que siguen en el parqueadero
    tbEstacionados.innerHTML = "" // Limpiar el contenido anterior de la tabla

    for (let i in placas) { // Recorrer las posiciones del vector de placas
        const fila = document.createElement("tr") // Crear una nueva fila para la tabla

        const item = parseInt(i) + 1 // Obtener el número de ítem

        fila.innerHTML = `
            <td align="center">${item}</td>
            <td>${placas[i]}</td>
            <td align="center">${horasEntrada[i]}:00</td>
        ` // Insertar los datos del auto en las celdas de la fila

        tbEstacionados.appendChild(fila) // Agregar la fila a la tabla
    }
}

// Actualizar la cantidad de autos y el total cobrado
function fnActualizarResumen() { // Definir la función para mostrar los resultados del parqueadero
    txtEstacionados.value = placas.length // Mostrar cuántos autos hay en el vector de placas
    txtTotalCobrado.value = totalCobrado.toFixed(2) // Mostrar el total cobrado con dos decimales
}
