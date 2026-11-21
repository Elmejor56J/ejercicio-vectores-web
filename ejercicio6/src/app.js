// Datos de los elementos HTML
const txtNombre = document.getElementById("txt-nombre") // Obtener el campo donde se escribe el nombre del estudiante
const txtNota = document.getElementById("txt-nota") // Obtener el campo donde se escribe la nota
const btnAgregar = document.getElementById("btn-agregar") // Obtener el botón para agregar al estudiante
const btnCalcular = document.getElementById("btn-calcular") // Obtener el botón para calcular las estadísticas

const tbEstudiantes = document.getElementById("tb-estudiantes") // Obtener el cuerpo de la tabla donde se muestran los estudiantes

const txtPromedio = document.getElementById("txt-promedio") // Obtener el campo del promedio general
const txtNotaMaxima = document.getElementById("txt-nota-maxima") // Obtener el campo de la nota más alta
const txtMejorEstudiante = document.getElementById("txt-mejor-estudiante") // Obtener el campo del estudiante con la nota más alta
const txtPorcentaje = document.getElementById("txt-porcentaje") // Obtener el campo del porcentaje de aprobados

// Vectores paralelos: la misma posición de cada vector pertenece al mismo estudiante
let nombres = [] // Almacenar los nombres de los estudiantes
let notas = [] // Almacenar la nota de cada estudiante

// Agregar un estudiante con su nota
btnAgregar.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Agregar
    const nombre = txtNombre.value // Obtener el nombre ingresado
    const nota = parseFloat(txtNota.value) // Obtener la nota ingresada y convertirla a número decimal

    // Validar los datos ingresados
    if (nombre == "") { // Comprobar si el nombre está vacío
        alert("Ingrese el nombre del estudiante") // Mostrar una alerta cuando falta el nombre

    } else if (isNaN(nota) || nota < 0 || nota > 10) { // Comprobar si la nota no es un número o está fuera del rango de 0 a 10
        alert("La nota debe estar entre 0 y 10") // Mostrar una alerta cuando la nota no es válida

    } else { // Ejecutar cuando el nombre y la nota son correctos
        nombres.push(nombre) // Guardar el nombre en su vector
        notas.push(nota) // Guardar la nota en su vector

        fnMostrarEstudiantes() // Ejecutar la función que muestra los estudiantes en la tabla

        txtNombre.value = "" // Limpiar el campo del nombre
        txtNota.value = "" // Limpiar el campo de la nota
    }
})

// Calcular las estadísticas del grupo
btnCalcular.addEventListener("click", function(e) { // Detectar cuando se presiona el botón Calcular estadísticas
    if (notas.length == 0) { // Comprobar si todavía no hay estudiantes registrados
        alert("Registre al menos un estudiante antes de calcular") // Mostrar una alerta porque no hay datos para calcular

    } else { // Ejecutar cuando existe al menos un estudiante
        fnCalcularEstadisticas() // Ejecutar la función que calcula los resultados
    }
})

// Mostrar los estudiantes en la tabla
function fnMostrarEstudiantes() { // Definir la función para mostrar los estudiantes registrados
    tbEstudiantes.innerHTML = "" // Limpiar el contenido anterior de la tabla

    for (let i in nombres) { // Recorrer las posiciones del vector de nombres
        const fila = document.createElement("tr") // Crear una nueva fila para la tabla

        const item = parseInt(i) + 1 // Obtener el número de ítem

        let estado = "" // Crear la variable que guardará si el estudiante aprobó o reprobó

        if (notas[i] >= 7) { // Comprobar si la nota es mayor o igual a 7
            estado = "Aprobado" // Asignar el estado aprobado
        } else { // Ejecutar cuando la nota es menor que 7
            estado = "Reprobado" // Asignar el estado reprobado
        }

        fila.innerHTML = `
            <td align="center">${item}</td>
            <td>${nombres[i]}</td>
            <td align="center">${notas[i].toFixed(2)}</td>
            <td align="center">${estado}</td>
        ` // Insertar los datos del estudiante en las celdas de la fila

        tbEstudiantes.appendChild(fila) // Agregar la fila a la tabla
    }
}

// Calcular promedio, nota más alta y porcentaje de aprobados
function fnCalcularEstadisticas() { // Definir la función para calcular las estadísticas
    let suma = 0 // Acumulador: guardará la suma de todas las notas
    let notaMaxima = notas[0] // Suponer que la primera nota es la más alta
    let posicionMaxima = 0 // Guardar la posición del estudiante con la nota más alta
    let aprobados = 0 // Contador: guardará cuántos estudiantes tienen nota mayor o igual a 7

    for (let i in notas) { // Recorrer las posiciones del vector de notas
        suma = suma + notas[i] // Sumar la nota actual al acumulador

        if (notas[i] > notaMaxima) { // Comprobar si la nota actual supera a la más alta encontrada
            notaMaxima = notas[i] // Guardar la nueva nota más alta
            posicionMaxima = i // Guardar la posición del estudiante que la obtuvo
        }

        if (notas[i] >= 7) { // Comprobar si la nota actual es de aprobado
            aprobados = aprobados + 1 // Aumentar en uno el contador de aprobados
        }
    }

    const promedio = suma / notas.length // Dividir la suma de las notas para la cantidad de estudiantes
    const porcentaje = (aprobados / notas.length) * 100 // Calcular el porcentaje de estudiantes aprobados

    txtPromedio.value = promedio.toFixed(2) // Mostrar el promedio con dos decimales
    txtNotaMaxima.value = notaMaxima.toFixed(2) // Mostrar la nota más alta con dos decimales
    txtMejorEstudiante.value = nombres[posicionMaxima] // Mostrar el nombre del estudiante con la nota más alta
    txtPorcentaje.value = porcentaje.toFixed(2) // Mostrar el porcentaje de aprobados con dos decimales
}
