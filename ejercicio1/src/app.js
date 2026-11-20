// Datos del producto
const selectProducto = document.getElementById("select-producto") // Obtener la lista desplegable de productos
const txtPrecio = document.getElementById("txt-precio") // Obtener el campo del precio
const txtCantidad = document.getElementById("txt-cantidad") // Obtener el campo de la cantidad
const txtSubtotal = document.getElementById("txt-subtotal") // Obtener el campo del subtotal
const txtDescuento = document.getElementById("txt-descuento") // Obtener el campo del descuento
const txtIva = document.getElementById("txt-iva") // Obtener el campo del IVA
const txtTotal = document.getElementById("txt-total") // Obtener el campo del total

const btnAgregar = document.getElementById("btn-agregar") // Obtener el botón para agregar productos

const tbDetalleFactura = document.getElementById("tb-id-detalle-factura") // Obtener el cuerpo de la tabla donde se muestran los productos

// Vectores del catálogo de productos
let productos = ["Arroz", "Azúcar", "Aceite", "Leche", "Huevos", "Fideos", "Atún", "Harina", "Café", "Sal"]; // Almacenar los nombres de los productos
let precios = [1.50, 1.20, 3.50, 1.10, 3.00, 0.85, 1.75, 1.30, 4.50, 0.60]; // Almacenar los precios de cada producto

// Vectores de los productos comprados
let productosComprados = []; // Almacenar los nombres de los productos seleccionados
let cantidades = []; // Almacenar las cantidades ingresadas
let preciosComprados = []; // Almacenar los precios de los productos comprados

// Seleccionar producto
selectProducto.addEventListener("change", function(e) { // Detectar cuando se selecciona un producto
    const precio = parseFloat(e.target.value) // Obtener el precio del producto seleccionado y convertirlo a número
    txtPrecio.value = precio.toFixed(2) // Mostrar el precio con dos decimales
    txtCantidad.value = 1.00 // Establecer la cantidad inicial en uno
})

// Agregar producto
btnAgregar.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Agregar
    const producto = selectProducto.options[selectProducto.selectedIndex].textContent // Obtener el nombre del producto seleccionado
    const precio = parseFloat(txtPrecio.value) // Obtener el precio del producto
    const cantidad = parseFloat(txtCantidad.value) // Obtener la cantidad ingresada

    productosComprados.push(producto) // Guardar el producto en su vector
    cantidades.push(cantidad) // Guardar la cantidad en su vector
    preciosComprados.push(precio) // Guardar el precio en su vector

    fnMostrarProductos() // Ejecutar la función que muestra los productos en la tabla
    fnCalcularTotales() // Ejecutar la función que calcula los valores de la factura
})

// Cargar los productos en la lista desplegable
fnCargarProductos() // Llamar a la función para cargar los productos

function fnCargarProductos() { // Definir la función para cargar los productos
    // Recorrer el vector productos
    for (let i in productos) { // Recorrer las posiciones del vector
        const producto = productos[i] // Obtener el producto de la posición actual
        const precio = precios[i] // Obtener el precio correspondiente

        // Crear la etiqueta option
        const option = document.createElement("option") // Crear una nueva opción para la lista desplegable
        option.value = precio // Asignar el precio como valor de la opción
        option.textContent = producto // Asignar el nombre del producto como texto

        // Agregar la opción a la lista desplegable
        selectProducto.appendChild(option) // Incorporar la opción al selector
    }
}

// Mostrar los productos en la tabla
function fnMostrarProductos() { // Definir la función para mostrar los productos comprados
    tbDetalleFactura.innerHTML = "" // Limpiar el contenido anterior de la tabla

    for (let i in productosComprados) { // Recorrer el vector de productos comprados
        const fila = document.createElement("tr") // Crear una nueva fila para la tabla

        const item = parseInt(i) + 1 // Obtener el número de ítem
        const total = preciosComprados[i] * cantidades[i] // Calcular el total de cada producto

        fila.innerHTML = `
            <td>${item}</td>
            <td>${cantidades[i]}</td>
            <td>${productosComprados[i]}</td>
            <td>${preciosComprados[i].toFixed(2)}</td>
            <td align="right">${total.toFixed(2)}</td>
        ` // Insertar los datos del producto en las celdas de la fila

        tbDetalleFactura.appendChild(fila) // Agregar la fila a la tabla
    }
}

// Calcular los totales de la factura
function fnCalcularTotales() { // Definir la función para calcular los valores de la factura
    let subtotal = 0 // Inicializar el subtotal en cero
    let iva = 0 // Inicializar el IVA en cero
    let descuento = 0 // Inicializar el descuento en cero
    let total = 0 // Inicializar el total en cero

    for (let i in productosComprados) { // Recorrer los productos comprados
        const totalItem = preciosComprados[i] * cantidades[i] // Multiplicar el precio por la cantidad
        subtotal = subtotal + totalItem // Acumular el resultado en el subtotal
    }

    if (subtotal > 20) { // Comprobar si el subtotal supera los 20 dólares
        descuento = subtotal * 0.05 // Calcular el descuento del 5%
    } else if (subtotal <= 20) { // Comprobar si el subtotal es menor o igual a 20 dólares
        descuento = 0 // No aplicar descuento
    }

    iva = subtotal * 0.15 // Calcular el IVA del 15% sobre el subtotal
    total = subtotal + iva - descuento // Calcular el valor final a pagar

    txtSubtotal.value = subtotal.toFixed(2) // Mostrar el subtotal con dos decimales
    txtDescuento.value = descuento.toFixed(2) // Mostrar el descuento con dos decimales
    txtIva.value = iva.toFixed(2) // Mostrar el IVA con dos decimales
    txtTotal.value = total.toFixed(2) // Mostrar el total con dos decimales
}
