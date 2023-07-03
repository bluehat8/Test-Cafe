
let timeInput = document.getElementById("hora");
let dateInput = document.getElementById("fecha");

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
let minDate = year + "-" + month + "-" + day;

dateInput.setAttribute("min", minDate);


let horaTranscurrida = today.getHours();
let minutosTranscurridos = today.getMinutes();
let minTime = horaTranscurrida.toString().padStart(2, "0") + ":" + minutosTranscurridos.toString().padStart(2, "0");
timeInput.setAttribute('min', minTime);


timeInput.addEventListener("input", function(e) {
    e.preventDefault();
    
    let selectedTime = this.value;
    let minTime = "09:00";
    let maxTime = "22:00";

    if (selectedTime < minTime || selectedTime > maxTime) {
      this.setCustomValidity("La hora seleccionada está fuera del horario permitido.");
      return;
    } 
    this.setCustomValidity("");
});



