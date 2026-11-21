
// Datos de los elementos HTML
const txtPlato = document.getElementById("txt-plato") // Obtener el campo donde se ingresa el nombre del plato

const btnRegistrar = document.getElementById("btn-registrar") // Obtener el botón para registrar pedidos
const btnLimpiar = document.getElementById("btn-limpiar") // Obtener el botón para limpiar el campo

const tbPedidos = document.getElementById("tb-pedidos") // Obtener el cuerpo de la tabla de pedidos
const tbInventario = document.getElementById("tb-inventario") // Obtener el cuerpo de la tabla del inventario

const listaAgotados = document.getElementById("lista-agotados") // Obtener la lista donde se mostrarán los platos agotados

// Vectores del catálogo de platos
let platos = ["Hamburguesa", "Ensalada", "Sopa"] // Almacenar los nombres de los platos disponibles

let stock = [2, 1, 1] // Almacenar las unidades disponibles de cada plato

// Vector para guardar los pedidos realizados
let pedidos = [] // Crear un vector vacío para almacenar los pedidos aceptados

// Registrar pedido
btnRegistrar.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Registrar Pedido

    const nombrePlato = txtPlato.value.trim() // Obtener el nombre del plato ingresado y eliminar espacios innecesarios

    // Validar que el campo no esté vacío
    if (nombrePlato === "") { // Comprobar si el usuario no ingresó ningún plato

        alert("Ingrese el nombre del plato que desea solicitar") // Mostrar un mensaje de advertencia

        txtPlato.focus() // Colocar el cursor nuevamente en el campo del plato

        return // Detener la ejecución si el campo está vacío
    }

    // Inicializar la posición del plato
    let posicion = -1 // Indicar que inicialmente el plato no existe en el vector

    // Recorrer el vector de platos
    for (let i = 0; i < platos.length; i++) { // Recorrer todas las posiciones del vector platos

        if (platos[i].toLowerCase() === nombrePlato.toLowerCase()) { // Comparar el nombre ingresado con los platos existentes sin distinguir mayúsculas

            posicion = i // Guardar la posición del plato encontrado

            break // Finalizar el recorrido cuando se encuentra el plato
        }
    }

    // Verificar si el plato existe
    if (posicion === -1) { // Comprobar si el plato no se encuentra en el catálogo

        alert("El plato ingresado no existe en el inventario") // Mostrar un mensaje indicando que el producto no existe

    } else if (stock[posicion] <= 0) { // Comprobar si el plato no tiene unidades disponibles

        alert("Producto agotado: " + platos[posicion]) // Mostrar una alerta indicando que el plato está agotado

    } else { // Ejecutar cuando el plato existe y tiene unidades disponibles

        // Registrar el pedido
        pedidos.push(platos[posicion]) // Agregar el nombre del plato al vector pedidos

        // Actualizar el inventario
        stock[posicion] = stock[posicion] - 1 // Descontar una unidad del stock disponible

        // Mostrar mensaje de confirmación
        alert("Pedido registrado correctamente: " + platos[posicion]) // Informar que el pedido fue aceptado

        // Actualizar las tablas y listas
        fnMostrarPedidos() // Ejecutar la función para mostrar los pedidos realizados

        fnMostrarInventario() // Ejecutar la función para actualizar el inventario

        fnMostrarAgotados() // Ejecutar la función para mostrar los platos agotados
    }

    txtPlato.value = "" // Limpiar el campo después de registrar o validar el pedido

})

// Limpiar el campo del plato
btnLimpiar.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Limpiar

    txtPlato.value = "" // Borrar el contenido del campo de texto

    txtPlato.focus() // Colocar nuevamente el cursor en el campo

})

// Mostrar los pedidos realizados
function fnMostrarPedidos() { // Definir la función encargada de mostrar los pedidos

    tbPedidos.innerHTML = "" // Limpiar el contenido anterior de la tabla

    // Recorrer el vector de pedidos
    for (let i = 0; i < pedidos.length; i++) { // Recorrer todas las posiciones del vector pedidos

        const fila = document.createElement("tr") // Crear una nueva fila para la tabla

        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${pedidos[i]}</td>
            <td>Aceptado</td>
        ` // Insertar el número, nombre del plato y estado del pedido

        tbPedidos.appendChild(fila) // Agregar la fila al cuerpo de la tabla
    }
}

// Mostrar el inventario disponible
function fnMostrarInventario() { // Definir la función para mostrar los platos y sus existencias

    tbInventario.innerHTML = "" // Limpiar el contenido anterior de la tabla

    // Recorrer el vector de platos
    for (let i = 0; i < platos.length; i++) { // Recorrer todas las posiciones del vector platos

        const fila = document.createElement("tr") // Crear una nueva fila para la tabla

        const estado = stock[i] > 0 ? "Disponible" : "Agotado" // Determinar el estado del plato según su stock

        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${platos[i]}</td>
            <td>${stock[i]}</td>
            <td>${estado}</td>
        ` // Insertar el número, nombre, cantidad y estado del plato

        tbInventario.appendChild(fila) // Agregar la fila a la tabla del inventario
    }
}

// Mostrar los platos agotados
function fnMostrarAgotados() { // Definir la función para identificar los platos sin existencias

    listaAgotados.innerHTML = "" // Limpiar la lista anterior de platos agotados

    let encontrados = 0 // Inicializar un contador de platos agotados

    // Recorrer el vector de stock
    for (let i = 0; i < stock.length; i++) { // Recorrer todas las posiciones del vector stock

        if (stock[i] === 0) { // Comprobar si el plato no tiene unidades disponibles

            const item = document.createElement("li") // Crear un nuevo elemento de lista

            item.textContent = platos[i] + " - Sin unidades disponibles" // Mostrar el nombre del plato agotado

            item.className = "agotado" // Asignar la clase de estilo para identificar los productos agotados

            listaAgotados.appendChild(item) // Agregar el plato a la lista de agotados

            encontrados++ // Incrementar el contador de platos agotados
        }
    }

    // Comprobar si existen platos agotados
    if (encontrados === 0) { // Verificar si ningún plato está agotado

        listaAgotados.innerHTML = "<li>No existen platos agotados</li>" // Mostrar un mensaje cuando todos los platos tienen stock
    }
}

// Cargar los datos iniciales del sistema
fnMostrarPedidos() // Mostrar inicialmente la tabla de pedidos

fnMostrarInventario() // Mostrar inicialmente el inventario disponible

fnMostrarAgotados() // Mostrar inicialmente los platos agotados
