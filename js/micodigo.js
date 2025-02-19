let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
let marcas = JSON.parse(localStorage.getItem("marcas")) || [];
let stock = JSON.parse(localStorage.getItem("stock")) || [];
let nombresInstructores = JSON.parse(localStorage.getItem("nombresInstructores")) || [];
let identificacionInstructores = JSON.parse(localStorage.getItem("identificacionInstructores")) || [];
let equiposPrestados = JSON.parse(localStorage.getItem("equiposPrestados")) || [];
let marcasPrestadas = JSON.parse(localStorage.getItem("marcasPrestadas")) || [];
let cantidadPrestada = JSON.parse(localStorage.getItem("cantidadPrestada")) || [];
let instructoresPrestan = JSON.parse(localStorage.getItem("instructoresPrestan")) || [];

const botonEquipos = document.getElementById('btnAgregar');
const botonIntructores = document.getElementById('btnInstructores');
const botonPrestamo = document.getElementById('btnPrestamo');
const botonDevolver = document.getElementById('btnDevolver');
const botonLimpiar = document.getElementById('btnLimpiar');

function guardarDatos() {
    localStorage.setItem("equipos", JSON.stringify(equipos));
    localStorage.setItem("marcas", JSON.stringify(marcas));
    localStorage.setItem("stock", JSON.stringify(stock));
    localStorage.setItem("identificacionInstructores", JSON.stringify(identificacionInstructores));
    localStorage.setItem("nombresInstructores", JSON.stringify(nombresInstructores));
    localStorage.setItem("instructoresPrestan", JSON.stringify(instructoresPrestan));
    localStorage.setItem("equiposPrestados", JSON.stringify(equiposPrestados));
    localStorage.setItem("marcasPrestadas", JSON.stringify(marcasPrestadas));
    localStorage.setItem("cantidadPrestada", JSON.stringify(cantidadPrestada));
}

botonEquipos.addEventListener('click', ()=>{
    const inputEquipo = document.getElementById('inputEquipo');
    let nombreEquipo = inputEquipo.value;
    const inputMarca = document.getElementById('inputMarca');
    let marcaEquipo = inputMarca.value;
    const inputStock = document.getElementById('inputStock');
    let cantidadEquipo = parseInt(inputStock.value, 10);
    let captura = -1;

    if (isNaN(cantidadEquipo) || cantidadEquipo < 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La cantidad ingresada no es válida!",
          });
        return;
    }

    for(let i = 0; i < equipos.length; i++){
        if (nombreEquipo == equipos[i] && marcaEquipo == marcas[i]){
            captura = i;
        };
    };

    if (captura != -1){
        stock[captura] += cantidadEquipo;
    }else{
        equipos.push(nombreEquipo);
        marcas.push(marcaEquipo);
        stock.push(cantidadEquipo);
    };

    inputEquipo.value = '';
    inputMarca.value = '';
    inputStock.value = '';

    guardarDatos();
    imprimirEquipos();
});

function imprimirEquipos(){
    const tbodyEquipos = document.getElementById('equipos');
    tbodyEquipos.innerHTML = '';
    for(let i = 0; i < equipos.length; i++){
        const fila = document.createElement('tr');
        
        for (let j = 1; j <= 3; j++) {
            const td = document.createElement('td');
            (j==1) ? td.textContent = equipos[i] : false;
            (j==2) ? td.textContent = marcas[i] : false;
            (j==3) ? td.textContent = stock[i] : false;
            fila.appendChild(td);
        };
        tbodyEquipos.appendChild(fila);
    };
};

botonIntructores.addEventListener('click', ()=>{
    const inputID = document.getElementById('inputIdInstructor');
    let identificacion = inputID.value;
    const inputNombre = document.getElementById('inputNombre');
    let nombre = inputNombre.value;
    let verificar = identificacionInstructores.indexOf(identificacion);

    if(identificacion == "" && nombre == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se han ingresado datos",
        });
        return;
    } else {
        if (verificar == -1){
        identificacionInstructores.push(identificacion);
        nombresInstructores.push(nombre);

        guardarDatos();
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El instructor ya está registrado",
            });
        }
    }

    inputID.value = '';
    inputNombre.value = '';

    imprimirInstructores()
});

function imprimirInstructores(){
    const tbodyInstructores = document.getElementById('instructores');
    tbodyInstructores.innerHTML = '';

    for(let i = 0; i < nombresInstructores.length; i++){
        const filaInstru = document.createElement('tr');

        for (let j = 1; j <= 2; j++) {
            const td = document.createElement('td');
            (j==1) ? td.textContent = identificacionInstructores[i] : false; 
            (j==2) ? td.textContent = nombresInstructores[i] : false; 
            filaInstru.appendChild(td);
        };
        tbodyInstructores.appendChild(filaInstru);
    };
};

botonPrestamo.addEventListener('click', ()=>{
    const inputInstruPrestar = document.getElementById('inputInstruPrestar');
    let idPresta = inputInstruPrestar.value;
    const inputEquipoPrestar = document.getElementById('inputEquipoPrestar');
    let equipoPrestar = inputEquipoPrestar.value;
    const inputMarcaPrestar = document.getElementById('inputMarcaPrestar');
    let marcaPrestar = inputMarcaPrestar.value;
    const inputCantidadPrestar = document.getElementById('inputCantidadPrestar');
    let cantidadPrestar = parseInt(inputCantidadPrestar.value);
    let captura = -1;
    for(let i = 0; i < equipos.length; i++){
        if (equipoPrestar == equipos[i] && marcaPrestar == marcas[i]){
            captura = i;
        };
    };
    if (captura == -1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El equipo no existe!",
        });
    }else{
        if (cantidadPrestar <= stock[captura]){

            let captura2 = -1;
            
            for (let i = 0; i < equiposPrestados.length; i++ ){
                if( idPresta == instructoresPrestan[i] &&  equipoPrestar == equiposPrestados[i] && marcaPrestar == marcasPrestadas[i] ){
                    captura2 = i;
                };
            };

            if (captura2 == -1){
                instructoresPrestan.push(idPresta);
                equiposPrestados.push(equipoPrestar);
                marcasPrestadas.push(marcaPrestar);
                cantidadPrestada.push(cantidadPrestar);

            }else{
                cantidadPrestada[captura2] += cantidadPrestar

            }

            stock[captura] -= cantidadPrestar;
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No hay candidad suficiente!",
            });
        };
    };

    inputInstruPrestar.value = '';
    inputEquipoPrestar.value = '';
    inputMarcaPrestar.value = '';
    inputCantidadPrestar.value = '';

    guardarDatos();
    imprimirPrestamos();
    imprimirEquipos();
});

function imprimirPrestamos(){
    const tbodyPrestamos = document.getElementById('prestamos');
    tbodyPrestamos.innerHTML = '';

    for(let i = 0; i < equiposPrestados.length; i++){
        const filaPretar = document.createElement('tr');

        for (let j = 1; j <= 4; j++) {
            const td = document.createElement('td');
            (j==1) ? td.textContent = instructoresPrestan[i] : false;
            (j==2) ? td.textContent = equiposPrestados[i] : false;
            (j==3) ? td.textContent = marcasPrestadas[i] : false;
            (j==4) ? td.textContent = cantidadPrestada[i] : false;
            filaPretar.appendChild(td);
        };

        tbodyPrestamos.appendChild(filaPretar);
    };
};

botonDevolver.addEventListener('click', ()=>{
    const inputInstruDevolver = document.getElementById('inputInstruPrestar');
    let idInstructor = inputInstruDevolver.value;
    const inputEquipoPrestar = document.getElementById('inputEquipoPrestar');
    let nombreEquipo = inputEquipoPrestar.value;
    const inputMarcaPrestar = document.getElementById('inputMarcaPrestar');
    let marcaEquipo = inputMarcaPrestar.value;
    const inputCantidadPrestar = document.getElementById('inputCantidadPrestar');
    let cantidadDevolver = parseInt(inputCantidadPrestar.value);
    let captura = -1;

    for (let i = 0; i < equiposPrestados.length; i++ ){
        if( idInstructor == instructoresPrestan[i] &&  nombreEquipo == equiposPrestados[i] && marcaEquipo == marcasPrestadas[i] ){
            captura = i;
        };
    };

    if (captura == -1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay prestamos registrados con esa información!",
        });
    }else{
        if(cantidadDevolver <= cantidadPrestada[captura]){
            cantidadPrestada[captura] -= cantidadDevolver;
            if (cantidadPrestada[captura] == 0){
                instructoresPrestan.splice(captura, 1);
                equiposPrestados.splice(captura, 1);
                marcasPrestadas.splice(captura, 1);
                cantidadPrestada.splice(captura, 1);
            }
            for(let i = 0; i < equipos.length; i++){
                if (nombreEquipo == equipos[i] && marcaEquipo == marcas[i]){
                    stock[i] += cantidadDevolver;
                };
            };

        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La cantidad supera lo prestado!",
            });
        };
    };
    inputInstruPrestar.value = '';
    inputEquipoPrestar.value = '';
    inputMarcaPrestar.value = '';
    inputCantidadPrestar.value = '';

    guardarDatos();
    imprimirPrestamos();
    imprimirEquipos();
});

botonLimpiar.addEventListener('click', ()=>{
    localStorage.clear();
    equipos = [];
    marcas = [];
    stock = [];
    identificacionInstructores = [];
    nombresInstructores = [];
    instructoresPrestan = [];
    equiposPrestados = [];
    marcasPrestadas = [];
    cantidadPrestada = [];
    imprimirEquipos();
    imprimirInstructores();
    imprimirPrestamos();
    Swal.fire({
        title: "Datos eliminados!",
        icon: "success",
        draggable: true
    });
});

imprimirEquipos();
imprimirInstructores();
imprimirPrestamos();
