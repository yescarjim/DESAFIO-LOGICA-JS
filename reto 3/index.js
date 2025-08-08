

let numero;
let continuar;

do {
    numero = prompt("Ingresa un número");
    let tabla = "";
    for (let i = 1; i <= 10; i++) {
      let resultado = numero * i;
        tabla += `${numero} x ${i}= ${resultado}\n`;
    }
    alert(tabla);
    continuar = prompt(
        "Deseas ver otra tabla? (Sí/no)");
}while (continuar.toLowerCase() === "sí"
    || continuar.toLowerCase() === "si");
