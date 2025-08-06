

const PIN_CORRECTO = "1234";
const SALDO_INICIAL = 100000;
const INTENTOS_MAXIMOS = 3;

let saldoActual = SALDO_INICIAL;
let intentosFallidos = 0;
let sistemaActivo = true;


function iniciarCajero() {
    console.log("👋=====BIENVENIDO A TU CAJERO AUTOMATICO =====🏧");
    console.log("Por favor Inserte su Tarjeta");
    console.log("");

    saldoActual = SALDO_INICIAL;
    intentosFallidos = 0;
    sistemaActivo = true;

    autenticarUsuario();
}

//Autenticar usuario
function autenticarUsuario() {
    console.log("AUTENTIFICACION REQUERIDA");
    console.log("PIN_CORRECTO")
    console.log("");


    while (sistemaActivo && intentosFallidos < INTENTOS_MAXIMOS) {
        //Solicito Pin al usuario
        let pinIngresado = prompt("Por favor ingrese su Pin de 4 digitos:");

        if (pinIngresado === null) {
            console.log("❌Operación cancelada por el usuario");
            cerrarSistema();
            return;
        }


        //Validar Pin
        if (pinIngresado === PIN_CORRECTO) {
            console.log("✔PIN CORRECTO");
            console.log("Bienvenido");
            console.log("");

            //Retornar al menu Principal
            mostrarMenuPrincipal();
            return;
        } else {
            intentosFallidos++;
            let intentosRestantes = INTENTOS_MAXIMOS - intentosFallidos;
            console.log("❌PIN INCORRECTO");
            console.log(`intentos Restantes:${intentosRestantes}`);

            if (intentosRestantes > 0) {
                alert(`❌PIN INCORRECTO\n\nTe quedan ${intentosRestantes} intentos.`);

            }
        }
    }

    if (intentosFallidos >= INTENTOS_MAXIMOS) {
        console.log("Tarjeta Bloqueada");
        console.log("Comuniquese a su Banco para desbloquear la Tarjeta");
        alert("TARJETA BLOQUEADA\n\n❌ Demasiados Intentos Fallidos\n📞 Contacte a su banco para desbloquear");
        cerrarSistema();
    }
}


///menu principal

function mostrarMenuPrincipal() {
    let continuar = true;


    while (continuar && sistemaActivo) {
        console.log("=====MENÚ PRUNCIPAL");
        console.log("1️⃣ Ver saldo actual");
        console.log("2️⃣ Hacer un Retiro");
        console.log("3️⃣ Salir del sistema");
        console.log("=======================");

        let opcion = prompt(`📋 MENÚ PRINCIPAL

1️⃣ Ver saldo actual
2️⃣ Retirar dinero  
3️⃣ Salir del sistema

Seleccione una opción (1-3):`);

        if (opcion === null) {
            console.log("Operacioncancelada");
            cerrarSistema();
            return;
        }

        switch (opcion) {
            case "1":
                verSaldo();
                break;
            case "2":
                retirarDinero();
                break;
            case "3":
                cerrarSistema();
                continuar = false;
                break;
            default:
                console.log("❌ Opción inválida. Por favor seleccione otra opcion 1,2 o 3");
                alert("❌Opción inválida\n\nPor favor seleccione un número del 1 al 3 ");
        }

    }

}


// ver saldo

function verSaldo() {
    console.log("💰=======Consulta Saldo====");
    console.log(`Su Saldo es: $${saldoActual.toLocaleString()}`);
    console.log("==========");

    alert(`💰CONSULTA DE SALDO

        Su saldo actual es:
        $${saldoActual.toLocaleString()}`);

    let continuar = confirm("Desea realizar otra operación?");
    if (!continuar) {
        cerrarSistema();
    }

}


///retirar diero
function retirarDinero() {
    console.log("======RETIRAR DINERO====");
    console.log(`💰Saldo Disponible: $${saldoActual.toLocaleString()}`);

    let monto = prompt(`RETIRO DE DINERO
   Saldo Disponible: $${saldoActual.toLocaleString()}
            
            Ingrese el monto a Retirar:`);

    if (monto === null) {
        console.log("Retiro Cancelado");
        return;
    }
    monto = parseFloat(monto);

    if (isNaN(monto)) {
        console.log(" ❌ERROR: Ingrese un numero válido");
        alert("❌ERROR\n\nDebe ingresar un monto válido");
        return;
    }

    if (monto <= 0) {
        console.log("❌ ERROR: El monto debe ser mayor a $0");
        alert("❌ ERROR\n\nEl monto debe ser mayor a $0");
        return;
    }

    // fondosinsuficientes

    if (monto > saldoActual){
        console.log("❌FONDOS INSUFICIENTES");
        console.log(`Su saldo Actual: $${saldoActual.toLocaleString()}`);
        console.log(`Monto solicitado: $${monto.toLocaleString()}`);
        console.log(`Faltante: $${(monto - saldoActual).toLocaleString()}`);

        alert(`❌ FONDOS INSUFICIENTES
            Su saldo: $${saldoActual.toLocaleString()}
            monto Solicitado: $${monto.toLocaleString()}
            Faltante: $${(monto-saldoActual).toLocaleString()}`);

        let intentarOtroMonto = confirm(" Quieres intentar otro monto?");
        if (intentarOtroMonto){
            retirarDinero();
        }
        return;

    }


    procesarRetiro(monto);

}

function procesarRetiro(monto) {
    let saldoAnterior = saldoActual;

    console.log(" Procesando  retiro");

    saldoActual = saldoActual - monto;

    generarComprobante(monto, saldoAnterior, saldoActual);

    let continuar = confirm("Desea realizar otra operación?");
    if (!continuar) {
        cerrarSistema();
    }

}

//generar comprobante
function generarComprobante(montoRetirado, saldoAnterior, nuevoSaldo) {
    let fecha = new Date();
    let fechaFormateada = fecha.toLocaleDateString('es-ES');
    let horaFormateada = fecha.toLocaleTimeString('es-ES');

    console.log("✅========TRANSACCIÓN EXITOSA=======");
    console.log("🎫========COMPROBANTE DE RETIRO=======");
    console.log(`📅Fecha: ${fechaFormateada}`);
    console.log(`🕐 Hora: ${horaFormateada}`);
    console.log(`💸 Monto retirado: $${montoRetirado.toLocaleString()} `);
    console.log(`💰 Saldo anterior: $${saldoAnterior.toLocaleString()} `);
    console.log(`💵 Nuevo saldo: $${nuevoSaldo.toLocaleString()} `);
    console.log("===================================");
    console.log("💵 Retire su dinero de la bandeja");
    console.log("===================================");

    alert(`TRANSACCIÓN EXITOSA

   🎫 COMPROBANTE DE RETIRO

📅 Fecha: ${fechaFormateada}
🕐 Hora: ${horaFormateada}
💸 Retirado: $${montoRetirado.toLocaleString()}
💰 Saldo anterior: $${saldoAnterior.toLocaleString()}
💵 Nuevo saldo: $${nuevoSaldo.toLocaleString()}
================================
💵 Retire su dinero de la bandeja`);

}


//CERRAR SISTEMA

function cerrarSistema() {
    sistemaActivo = false;

    console.log(" ===== CERRANDO SESIÓN =====");
    console.log("✅ Transacción completada");
    console.log("💳 Retire su tarjeta");
    console.log(" Gracias por usar nuestro cajero automático");
    console.log("😉Que tenga un excelente día");
    console.log("==============================");

    alert(` SESIÓN CERRADA

✅ Operaciones completadas
💳 Retire su tarjeta
 Gracias por usar nuestro servicio

😉 Que tenga un excelente día`);
}


//FUNCIONES

function reiniciarCajero() {
    saldoActual = SALDO_INICIAL;
    intentosFallidos = 0;
    sistemaActivo = true;

    console.clear();
    console.log(" Sistema Reiniciado");
    iniciarCajero();
}

function mostrarEstadoSistema() {
    console.log("📊 ===== ESTADO DEL SISTEMA =====");
    console.log(`💰 Saldo actual: $${saldoActual.toLocaleString()}`);
    console.log(`✔ PIN correcto: ${PIN_CORRECTO}`);
    console.log(`❌ Intentos fallidos: ${intentosFallidos}`);
    console.log(`🆗 Sistema activo: ${sistemaActivo}`);
    console.log("=================================");
}


//instrucciones para el ususario
console.log("🏧 CAJERO AUTOMÁTICO - INSTRUCCIONES");
console.log("====================================");
console.log("📝 Para comenzar, escriba: iniciarCajero()");
console.log("🔄 Para reiniciar: reiniciarCajero()");
console.log("📊 Para ver estado: mostrarEstadoSistema()");
console.log("====================================");
console.log("ℹ️  PIN de prueba: 1234");
console.log("💰 Saldo inicial: $100,000");
console.log("====================================");



iniciarCajero();




