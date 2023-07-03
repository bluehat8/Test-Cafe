
//Campos del Formulario
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const personsSelect = document.querySelector('#persons');
const horaInput = document.querySelector('#hora');
const fechaInput = document.querySelector('#fecha');

const contenedorReserva = document.querySelector('.reservas');

class Reservas{
    constructor(){
        this.reservas = [];
    }

    agregarReserva(reserva){
        this.reservas = [...this.reservas, reserva];
    }

    eliminarReserva(id){
        this.reservas = this.reservas.filter( reserva => reserva.id !== id);
    }
}

class UI{

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('reservas__section--alerta');
    
        //Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.style.backgroundColor = '#E74C3C';
           
        } else {
            divMensaje.style.backgroundColor = '#2ECC71';
        }
    
        // Agregar el mensaje de error al div
        divMensaje.textContent = mensaje; 

        //Agregar al DOM
        document.querySelector('.heading').appendChild(divMensaje);
    
        //Quitar la alerta después de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    

    imprimirReservas({reservas}){

        this.limpiarHTML();

        reservas.forEach(reserva => {
            const { nombre, telefono, persons, hora, fecha, id } = reserva;

            const divReserva = document.createElement('div');
            divReserva.classList.add('reservas__section');
            divReserva.dataset.id = id;

            //Scripting de los elementos de la reserva
            const reservaParrafo = document.createElement('h2');
            reservaParrafo.classList.add('reservas__section--heading');
            reservaParrafo.textContent = nombre;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.classList.add('reservas__section--p');
            telefonoParrafo.innerHTML = `
                <span class="reservas__section--span">Teléfono: </span> ${telefono}
            `;

            const personsParrafo = document.createElement('p');
            personsParrafo.classList.add('reservas__section--p');
            personsParrafo.innerHTML = `
                <span class="reservas__section--span">Número de Personas: </span> ${persons}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.classList.add('reservas__section--p');
            horaParrafo.innerHTML = `
                <span class="reservas__section--span">Hora de Reserva: </span> ${hora}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.classList.add('reservas__section--p');
            fechaParrafo.innerHTML = `
                <span class="reservas__section--span">Fecha: </span> ${fecha}
            `;


            //Agregar boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('reservas__section--button-eliminar');
            btnEliminar.innerHTML = 'Eliminar';
            
            btnEliminar.onclick = () => eliminarReserva(id);

            //Parrafos
            divReserva.appendChild(reservaParrafo);
            divReserva.appendChild(telefonoParrafo);
            divReserva.appendChild(personsParrafo);
            divReserva.appendChild(horaParrafo);
            divReserva.appendChild(fechaParrafo);
            divReserva.appendChild(btnEliminar);

            //Agregar la reserva al html
            contenedorReserva.appendChild(divReserva);
        });
    }

    limpiarHTML(){
        while(contenedorReserva.firstChild){
            contenedorReserva.removeChild(contenedorReserva.firstChild);
        }
    }

}

const ui = new UI();
const administrarReservas = new Reservas();

eventListeners();
function eventListeners(){
    nombreInput.addEventListener('input', datosReserva);
    telefonoInput.addEventListener('input', datosReserva);
    personsSelect.addEventListener('input', datosReserva);
    horaInput.addEventListener('input', datosReserva);
    fechaInput.addEventListener('input', datosReserva);

    formulario.addEventListener('submit', nuevaReserva);
}

//Objeto principal de Reserva 
const reservaObj = {
    nombre: '',
    telefono: '',
    persons: '',
    hora: '',
    fecha: ''
}

function datosReserva(e){
    reservaObj[e.target.name] = e.target.value;
}

function nuevaReserva(e){
    e.preventDefault();

    //Extraer información del objeto de cita

    const { nombre, telefono, persons, hora, fecha } = reservaObj;

    reservaObj.id = Date.now();

    administrarReservas.agregarReserva({...reservaObj});

    //Reiniciar formulario
    formulario.reset();

    //Mostrar el HTML
    ui.imprimirReservas(administrarReservas);
}

function reiniciarObjeto(){
    reservaObj.nombre = '';
    reservaObj.telefono = '';
    reservaObj.persons = '';
    reservaObj.hora = '';
    reservaObj.fecha = '';
}

function eliminarReserva(id){
    
    //Eliminar Reserva
    administrarReservas.eliminarReserva(id);

    ui.imprimirAlerta('La cita se eliminó correctamente');
    ui.imprimirReservas(administrarReservas);
}