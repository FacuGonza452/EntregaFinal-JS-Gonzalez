function validarNombre() {
    let nombre = prompt("Ingrese su nombre: ");
    if (nombre === "Juan") {
        alert("Buen nombre ;)");
    } else if (nombre.match(/^[A-Za-z]+$/)) {
        alert("¡Bienvenido, " + nombre + "!");
    } else {
        alert("Ingrese un nombre válido.");
        validarNombre();
    }
}

validarNombre();