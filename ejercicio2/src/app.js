// Datos de los elementos HTML
const selectOperacion = document.getElementById("select-operacion") // Obtiene el selector donde se elige entre depósito y retiro.
const txtMonto = document.getElementById("txt-monto") // Obtiene el campo donde se ingresa el monto de dinero.
const btnRegistrar = document.getElementById("btn-registrar") // Obtiene el botón que permite registrar la operación.

const tbMovimientos = document.getElementById("tb-movimientos") // Obtiene el cuerpo de la tabla donde se mostrarán los movimientos.

const txtDepositado = document.getElementById("txt-depositado") // Obtiene el elemento donde se muestra el total depositado.
const txtRetirado = document.getElementById("txt-retirado") // Obtiene el elemento donde se muestra el total retirado.
const txtSaldo = document.getElementById("txt-saldo") // Obtiene el elemento donde se muestra el saldo disponible.

// Vector para guardar los movimientos
let movimientos = [] // Crea un vector vacío que almacenará el tipo y el monto de cada operación.

// Saldo inicial de la cuenta
let saldo = 0 // Establece el saldo inicial de la cuenta en cero.

// Registrar movimiento
btnRegistrar.addEventListener("click", function(e) { // Ejecuta las instrucciones cuando el usuario presiona el botón de registrar.

    const tipo = selectOperacion.value // Obtiene el tipo de operación seleccionado.
    const monto = parseFloat(txtMonto.value) // Obtiene el monto ingresado y lo convierte a un número decimal.

    // Validar que el monto sea mayor que cero
    if (isNaN(monto) || monto <= 0) { // Comprueba si el monto no es un número o si es menor o igual a cero.
        alert("Ingrese un monto válido") // Muestra una alerta cuando el monto ingresado no es válido.

    } else if (tipo == "Depósito") { // Comprueba si la operación seleccionada corresponde a un depósito.

        // Registrar el depósito
        movimientos.push({tipo, monto}) // Agrega al vector el tipo de operación y el monto depositado.

        // Actualizar el saldo
        saldo = saldo + monto // Suma el monto depositado al saldo actual.

        fnMostrarMovimientos() // Llama a la función que muestra los movimientos registrados en la tabla.
        fnCalcularTotales() // Llama a la función que calcula y actualiza los totales de la cuenta.

        txtMonto.value = "" // Limpia el campo del monto después de registrar el depósito.

    } else if (tipo == "Retiro") { // Comprueba si la operación seleccionada corresponde a un retiro.

        // Verificar si existe saldo suficiente
        if (monto > saldo) { // Comprueba si el monto solicitado supera el saldo disponible.
            alert("Saldo insuficiente para realizar el retiro") // Muestra una alerta si no hay dinero suficiente.

        } else { // Se ejecuta cuando el saldo disponible permite realizar el retiro.

            // Registrar el retiro
            movimientos.push({tipo, monto}) // Agrega al vector el tipo de operación y el monto retirado.

            // Actualizar el saldo
            saldo = saldo - monto // Resta el monto retirado al saldo actual.

            fnMostrarMovimientos() // Actualiza la tabla para mostrar el nuevo retiro.
            fnCalcularTotales() // Actualiza el total depositado, retirado y el saldo disponible.

            txtMonto.value = "" // Limpia el campo del monto después de registrar el retiro.
        }
    }
})

// Mostrar los movimientos registrados
function fnMostrarMovimientos() { // Define la función encargada de mostrar el historial de operaciones.

    tbMovimientos.innerHTML = "" // Limpia el contenido anterior de la tabla para evitar repetir los movimientos.

    for (let i = 0; i < movimientos.length; i++) { // Recorre el vector desde la primera posición hasta el último movimiento registrado.

        const fila = document.createElement("tr") // Crea una nueva fila para la tabla.

        fila.innerHTML = ` 
            <td>${i + 1}</td>
            <td>${movimientos[i].tipo}</td>
            <td>$ ${movimientos[i].monto.toFixed(2)}</td>
        ` // Inserta en la fila el número de movimiento, el tipo de operación y el monto con dos decimales.

        tbMovimientos.appendChild(fila) // Agrega la nueva fila al cuerpo de la tabla.
    }
}

// Calcular los totales
function fnCalcularTotales() { // Define la función encargada de calcular los depósitos, retiros y saldo final.

    let totalDepositado = 0 // Inicializa en cero la variable que acumulará todos los depósitos.
    let totalRetirado = 0 // Inicializa en cero la variable que acumulará todos los retiros.

    // Recorrer el vector de movimientos
    for (let i = 0; i < movimientos.length; i++) { // Recorre todos los movimientos almacenados en el vector.

        if (movimientos[i].tipo == "Depósito") { // Comprueba si el movimiento actual es un depósito.

            totalDepositado = totalDepositado + movimientos[i].monto // Suma el monto del depósito al total depositado.

        } else if (movimientos[i].tipo == "Retiro") { // Comprueba si el movimiento actual es un retiro.

            totalRetirado = totalRetirado + movimientos[i].monto // Suma el monto del retiro al total retirado.
        }
    }

    // Mostrar los resultados
    txtDepositado.textContent = totalDepositado.toFixed(2) // Muestra el total depositado con dos decimales.
    txtRetirado.textContent = totalRetirado.toFixed(2) // Muestra el total retirado con dos decimales.
    txtSaldo.textContent = saldo.toFixed(2) // Muestra el saldo disponible de la cuenta con dos decimales.
}
