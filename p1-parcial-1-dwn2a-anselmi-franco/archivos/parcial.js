'use strict';

/*
 * ANSELMI, FRANCO
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     'Código': 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             'Duración': 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             'Duración': 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             'Duración': 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             'Duración': 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             'Duración': 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             'Duración': 720,
//         },
//     ],
// };



let aCodigos = [];
let aDiscos = [];

mostrarCantidadDeDiscos();

function mostrarCantidadDeDiscos() {

    let contadorDeDiscos = contarDiscos();


    let html = '';

    html += `
    <p class="cantidad-discos">${contadorDeDiscos} discos cargados</p>
    `;



    document.getElementById('cantidad-discos').innerHTML = html;
    
}

// Función Cargar:
const Cargar = () => {

    let nuevoDisco = {
        nombre: '',
        autor: '',
        codigo: '',
        pistas: [],
    };

    // Cositas:
    let nombreDelDisco = nombreDisco();
    let autorDelDisco = autorDisco();
    let codigo = codigoDisco();

    // Valido si el código ya existe
    if (!validarCodigo(codigo)) {
        // Si el código no es válido, salir de la función
        return;

    } else {
        // Si el código es válido, agregarlo al array
        aCodigos.push(codigo);

    }

    /* Pista */
    pedirPista(nuevoDisco);

    nuevoDisco.nombre = nombreDelDisco;
    nuevoDisco.autor = autorDelDisco;
    nuevoDisco.codigo = codigo;

    aDiscos.push(nuevoDisco);
};

// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let html = '';

    // Cositas:

    for(let disco of aDiscos) {
        let contadorDePistas = contarPistas(disco);
        let duracionDeDisco = acumuladorDuracionDisco(disco);
        let promedioDuracionDeDisco = promediarDuracionDisco(duracionDeDisco, contadorDePistas);
        let pistaDeMayorDuracionPorDisco = pistaMayorDuracionPorDisco(disco);

        html += `

            <article>
                <div>
                    <h2>${capitalizeFirstLetter(disco.nombre)}</h2>
                    <h3>${capitalizeFirstLetter(disco.autor)}</h3>
                    <p>Codigo ID: #${disco.codigo}</p>
                    <p>Cantidad de pistas: ${contadorDePistas}</p>
                </div>
                    <h4>Pistas</h4>  
        `;

        for(let pista of disco.pistas){

            let estiloDuracion = '';

            if(pista.duracion >= 180){
                estiloDuracion = 'color: red;';
            }

            html += `
                    <div class="div-pistas">
                        <p>${capitalizeFirstLetter(pista.nombre)}</p>
                        <p><span style="${estiloDuracion}">${pista.duracion} segundos</span></p>
                    </div>
                
            `;
        }

        html += `
            <div>
                <details>
                <summary>Mas informacion</summary>
                    <ul>
                        <li><span>Duracion del disco:</span> ${duracionDeDisco} segundos</li>
                        <li><span>Promedio del disco:</span> ${promedioDuracionDeDisco} segundos</li>
                        <li><span>Pista de mayor duración por disco:</span> ${capitalizeFirstLetter(pistaDeMayorDuracionPorDisco.nombre)} - ${pistaDeMayorDuracionPorDisco.duracion} segundos</li>
                    </ul>
                </details>
            </div>
        </article>
        `;
    }

    let pistaDeMayorDuracion = pistaMayorDuracion();
    html += `
        <article>
            <h3 class="h3">Pista de mayor duración entre todos los discos</h3>
            <p>${capitalizeFirstLetter(pistaDeMayorDuracion.nombre)} - ${pistaDeMayorDuracion.duracion} segundos</p>
        </article>
    `;

    mostrarCantidadDeDiscos();

    let html2 = document.getElementById('info').innerHTML;

    let contenidoFinal = html2 + html;

    // Si modificaste el nombre de la variable para ir armando la cadena, también hazlo acá:
    document.getElementById('info').innerHTML = contenidoFinal; // <--- ahí es acá
};


/* Funcion buscar disco */

const MostrarDiscoPorCodigo = () => {

    let codigo = ingresarCodigoParaBusqueda();
    let disco = buscarDiscoPorCodigo(codigo);


    if (disco) {
        let html = '';
        let contadorDePistas = contarPistas(disco);
        let duracionDeDisco = acumuladorDuracionDisco(disco);
        let promedioDuracionDeDisco = promediarDuracionDisco(duracionDeDisco, contadorDePistas);
        let pistaDeMayorDuracionPorDisco = pistaMayorDuracionPorDisco(disco);

        html += `
        <article>
            <div>
                <h2>${disco.nombre}</h2>
                <h3>${disco.autor}</h3>
                <p>Codigo ID: #${disco.codigo}</p>
                <p>Cantidad de pistas: ${contadorDePistas}</p>
            </div>
            <h4>Pistas</h4>  
        `;

        for (let pista of disco.pistas) {
            let estiloDuracion = '';
            if (pista.duracion >= 180) {
                estiloDuracion = 'color: red;';
            }
            html += `
            <div class="div-pistas">
                <p>${pista.nombre}</p>
                <p><span style="${estiloDuracion}">${pista.duracion} segundos</span></p>
            </div>
            `;
        }

        html += `
            <div>
                <details>
                <summary>Mas informacion</summary>
                    <ul>
                        <li><span>Duracion del disco:</span> ${duracionDeDisco} segundos</li>
                        <li><span>Promedio del disco:</span> ${promedioDuracionDeDisco} segundos</li>
                        <li><span>Pista de mayor duración por disco:</span> ${pistaDeMayorDuracionPorDisco.nombre} - ${pistaDeMayorDuracionPorDisco.duracion} segundos</li>
                    </ul>
                </details>
            </div>
        </article>
        `;

        document.getElementById('info').innerHTML = html;
    } else {
        alert('Disco no encontrado con el código proporcionado.');
    }
};


// Todas las funciones que necesites:

function nombreDisco(){
    let nombreDisco;

    do{
        nombreDisco = prompt('Ingrese el nombre del disco');

        if(!nombreDisco){
            nombreDisco = '';
            alert('Lo siento, el nombre del disco no puede quedar vacio')
        }

    }while(!isNaN(nombreDisco));

    nombreDisco = nombreDisco.trim();

    return nombreDisco;
}

function autorDisco(){
    let autorDisco;

    do{
        autorDisco = prompt('Ingrese el autor del disco');

        if(!autorDisco){
            autorDisco = '';
            alert('Lo siento, el nombre del autor del disco no puede quedar vacio')
        }

    }while(!isNaN(autorDisco));
    
    autorDisco = autorDisco.trim();
    return autorDisco;
}


/* Funcion para pedir el codigo */

function codigoDisco(){
    let codigoDisco;

    do{
        codigoDisco=parseInt(prompt('Ingrese un codigo numerico entre 1 a 999 para el disco. (Si ya existe, se le solicitara que ingrese otro nuevamente)'));

        if(!codigoDisco){
            codigoDisco = '';
            alert('Lo siento, el codigo del disco no puede quedar vacio')

        } else if(isNaN(codigoDisco)){
            codigoDisco = '';
            alert('Lo siento, debe introducir un codigo numerico')

        }

    }while(isNaN(codigoDisco) || !(codigoDisco >= 1 && codigoDisco <=999) || !validarCodigo(codigoDisco));


    return codigoDisco;
}


/* Funcion para validar el codigo */

function validarCodigo(codigo){
    
    for (let valor of aCodigos) {
        
        if (valor === codigo) {
            alert("El código ingresado ya existe. Por favor, ingrese otro.");
            return false; // Indicar que el código no es válido
        }
    }

    // Si el código no existe en el array, entonces es válido
    return true;
}


/* Funcion para pistas */

function pedirPista(disco){
    let nombrePista, duracionPista;
    let pista;
    
    do{
        do{
            nombrePista = prompt("Ingrese el nombre de la pista");

            if(!nombrePista){
                nombrePista = '';
                alert('Lo siento, el nombre de la pista no puede quedar vacio')
            }

        } while(!isNaN(nombrePista));
        
        do{
            duracionPista = parseInt(prompt("Ingrese la duracion de la pista (Duracion permitida: 0 a 7200 segundos)"));

            if (!duracionPista) {
                alert('Lo siento, el código del disco no puede quedar vacío');

            } else if (!(duracionPista >= 0 && duracionPista <= 7200)) {
                alert('La duración de la pista debe ser entre 0 y 7200 segundos. Intentelo nuevamente');
            }

        } while(!(duracionPista >= 0 && duracionPista <= 7200));

        nombrePista = nombrePista.trim();
        pista = { nombre: nombrePista, duracion: duracionPista};
        disco.pistas.push(pista);

    } while(confirm('Desea ingresar otra pista?'));

    return pista;
}

function contarDiscos() {
    return aDiscos.length;
}


function contarPistas(disco) {    
    return disco.pistas.length;
}

function acumuladorDuracionDisco(disco) {

    let acumuladorDuracionDisco = 0;

    for(let pista of disco.pistas){
        acumuladorDuracionDisco += pista.duracion;
    }

    return acumuladorDuracionDisco;
}

function promediarDuracionDisco(duracion, cantidadPistas) {

    let promedio = duracion / cantidadPistas ;
    return promedio.toFixed();

}

function pistaMayorDuracionPorDisco(disco) {
    let maxPista = { nombre: '', duracion: 0 };
    for (let pista of disco.pistas) {
        if (pista.duracion > maxPista.duracion) {
            maxPista = pista;
        }
    }
    return maxPista;
}

function pistaMayorDuracion() {
    let maxPista = { nombre: '', duracion: 0 };
    for (let disco of aDiscos) {
        for (let pista of disco.pistas) {
            if (pista.duracion > maxPista.duracion) {
                maxPista = pista;
            }
        }
    }
    return maxPista;
}

/* Funcion para buscar disco con codigo */

function buscarDiscoPorCodigo(codigo) {
    return aDiscos.find(disco => disco.codigo === codigo);
}

function ingresarCodigoParaBusqueda() {
    let codigoDisco;
    do {
        codigoDisco = parseInt(prompt('Ingrese un codigo numerico entre 1 a 999 para iniciar la busqueda'));

        if (!codigoDisco) {
            codigoDisco = '';
            alert('Lo siento, el codigo del disco no puede quedar vacio');

        } else if (isNaN(codigoDisco)) {
            codigoDisco = '';
            alert('Lo siento, debe introducir un codigo numerico');
        }

    } while (isNaN(codigoDisco) || !(codigoDisco >= 1 && codigoDisco <= 999));

    return codigoDisco;
}


/* Funcion para borrar discos */

const BorrarDiscos = () => {

    if (aDiscos.length === 0) {
        document.getElementById('info').innerHTML = '<p>Aún no hay discos cargados para eliminar.</p>';
    } else {
        aCodigos = [];
        aDiscos = [];
        mostrarCantidadDeDiscos();
        document.getElementById('info').innerHTML = '<p>Todos los discos han sido eliminados.</p>';
    }
}


/* Funcion para capitalizar la primer letra */

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}