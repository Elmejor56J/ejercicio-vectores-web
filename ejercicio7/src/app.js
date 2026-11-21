// Datos del producto
const txtNombre = document.getElementById("txt-nombre") // Obtener el campo del nombre del producto
const txtPrecio = document.getElementById("txt-precio") // Obtener el campo del precio unitario
const divMensaje = document.getElementById("div-mensaje") // Obtener el espacio para mostrar mensajes

// Resultados de la factura y estadísticas
const txtSubtotal = document.getElementById("txt-subtotal") // Obtener el espacio del subtotal
const txtIva = document.getElementById("txt-iva") // Obtener el espacio del IVA
const txtTotal = document.getElementById("txt-total") // Obtener el espacio del total a pagar
const txtCantidad = document.getElementById("txt-cantidad") // Obtener el espacio de la cantidad total
const txtMasCaro = document.getElementById("txt-mas-caro") // Obtener el espacio del producto más costoso
const txtPromedio = document.getElementById("txt-promedio") // Obtener el espacio del promedio

// Botones y contenedores
const btnAgregar = document.getElementById("btn-agregar") // Obtener el botón para agregar productos
const btnFactura = document.getElementById("btn-factura") // Obtener el botón para generar factura
const tbProductos = document.getElementById("tb-productos") // Obtener el cuerpo de la tabla de productos
const secResultados = document.getElementById("sec-resultados") // Obtener la sección derecha de resultados

// Vectores paralelos inicialmente vacíos
let productos = [] // Almacenar los nombres de los productos ingresados
let precios = [] // Almacenar los precios de cada producto
    // Mostrar los vectores en la consola (F12)
    console.log("Productos:", productos)
    console.log("Precios:", precios)
// Agregar producto
btnAgregar.addEventListener("click", function () { // Evento escuchador en el botón agregar 
    const nombre = txtNombre.value.trim() // Obtener el nombre sin espacios extra
    const precio = parseFloat(txtPrecio.value) // Obtener el precio y convertirlo a número

    // Validar que el nombre no esté vacío
    if (nombre === "") {
        divMensaje.textContent = "Ingrese el nombre del producto"// mensaje para avisar que no ingresó nombre el usuario
        return
    }

    // Validar que el precio sea un número válido y mayor a cero
    if (isNaN(precio) || precio <= 0) {
        divMensaje.textContent = "Ingrese un precio válido"//mensaje de precio no válido
        return
    }

    productos.push(nombre) // Guardar el nombre en el vector productos
    precios.push(precio) // Guardar el precio en el vector precios

    txtNombre.value = "" // Limpiar el campo de nombre
    txtPrecio.value = "" // Limpiar el campo de precio
    divMensaje.textContent = "Producto agregado correctamente" // Mensaje de confirmación

    fnMostrarProductos() // Ejecutar la función que actualiza la tabla en pantalla
})

// Mostrar los productos en la tabla
function fnMostrarProductos() { // Definir la función para mostrar los productos registrados
    tbProductos.innerHTML = "" // Limpiar el contenido anterior de la tabla

    for (let i in productos) { // Recorrer las posiciones del vector productos
        const fila = document.createElement("tr") // Crear una nueva fila para la tabla
        const item = parseInt(i) + 1 // Obtener el número de ítem

        fila.innerHTML = `
            <td>${item}</td>
            <td>${productos[i]}</td>
            <td class="num">$${precios[i].toFixed(2)}</td>
        ` // Insertar los datos del producto en las celdas de la fila

        tbProductos.appendChild(fila) // Agregar la fila a la tabla
    }
}

// Generar factura
btnFactura.addEventListener("click", function () { //Evento escuchador en el botón Factura
    if (productos.length === 0) { // Comprobar si no hay productos registrados
        divMensaje.textContent = "No existen productos registrados"
        return
    }

    fnGenerarFactura() // Ejecutar la función que calcula la factura y estadísticas
})

// Calcular los totales y estadísticas de la factura
function fnGenerarFactura() { // Definir la función para calcular los valores
    let subtotal = 0 // Inicializar el subtotal en cero
    let iva = 0 // Inicializar el IVA en cero
    let total = 0 // Inicializar el total en cero
    let promedio = 0 // Inicializar el promedio en cero
    let posicionMayor = 0 // Guardar la posición del producto más costoso

    for (let i in productos) { // Recorrer los vectores paralelos
        subtotal = subtotal + precios[i] // Acumular el precio en el subtotal

        if (precios[i] > precios[posicionMayor]) { // Comprobar si el precio actual es mayor al guardado
            posicionMayor = i // Actualizar la posición del producto más costoso
        }
    }

    iva = subtotal * 0.15 // Calcular el IVA del 15% sobre el subtotal
    total = subtotal + iva // Calcular el valor final a pagar
    promedio = subtotal / productos.length // Calcular el promedio de precios

    // Mostrar los resultados en el HTML
    txtSubtotal.textContent = "$" + subtotal.toFixed(2) // Mostrar el subtotal con dos decimales
    txtIva.textContent = "$" + iva.toFixed(2) // Mostrar el IVA con dos decimales
    txtTotal.textContent = "$" + total.toFixed(2) // Mostrar el total con dos decimales

    txtCantidad.textContent = productos.length // Mostrar la cantidad total de productos
    txtMasCaro.textContent = productos[posicionMayor] + " ($" + precios[posicionMayor].toFixed(2) + ")" // Mostrar el más costoso
    txtPromedio.textContent = "$" + promedio.toFixed(2) // Mostrar el promedio con dos decimales
}   
