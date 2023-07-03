
const signupForm = document.querySelector('.sForm');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegister =  users.find( user => user.email === email.value);

    if(isUserRegister){
        mostrarAlerta('El usuario ya está registrado');
        signupForm.reset();
        return;
    }

    users.push({
        nombre: nombre.value,
        email: email.value,
        password: password.value
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso');
    window.location.href = 'login.html';


    function mostrarAlerta(mensaje){
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('error');

        signupForm.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 3000);
    }

});