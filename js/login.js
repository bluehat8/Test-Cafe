
const loginForm = document.querySelector('.sForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
let nombre;

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email.value && user.password === password.value);

    if(!validUser){
        loginForm.reset();
        mostrarAlerta('El correo y/o contraseña son incorrectos!');
        return;
    }

    for(let i=0; i<=users.length; i++){
        if(users[i].email === email.value && users[i].password === password.value){
            nombre = users[i].nombre;
            alert(`Bienvenido ${nombre}`);
            window.location.href = 'index.html';
            loginForm.reset();
        }
    }

    function mostrarAlerta(mensaje){
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('error');

        loginForm.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 3000);
    }
});