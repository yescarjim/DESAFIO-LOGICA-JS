

let nombre = prompt("Ingresa Tu Nombre");
let edad = parseInt(prompt("Cual Es Tu Edad?"));
let invitacion = prompt("Tiene Invitación (Sí/No)");

let tieneInvitacion = (invitacion.toLowerCase() === "sí" ||
    invitacion.toLowerCase() === "si");

//console.log("El tipo de datos es:" +typeof(nombre))
//console.log("El tipo de datos es:" +typeof(edad))
//console.log("El tipo de datos es:" +typeof(invitacion))




if (edad < 18) {
    alert("No puedes ingresar")
} else if (edad >= 18 && !tieneInvitacion) {
    alert("No puedes ingresar")
} else if (edad >= 18 && tieneInvitacion) {
    alert("Puedes ingresar");
}



