import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector("button");
const input = document.querySelector("#datetime-picker");

const fDays = document.querySelector("span[data-days]");
const fHours = document.querySelector("span[data-hours]");
const fMinutes = document.querySelector("span[data-minutes]");
const fSeconds = document.querySelector("span[data-seconds]");

let userSelectedDate = null;

button.disabled = true;
button.classList.add("disabled-button");
  
flatpickr("input#datetime-picker", {
  enableTime: true,   
  time_24hr: true,    
  defaultDate: new Date(),    
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];      
    
    if (userSelectedDate <= Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
      button.classList.add("disabled-button");
      return;
    }
    button.disabled = false;
    button.classList.remove("disabled-button");
  },  
});

class Timer {

  constructor({onTick}) {
    this.onTick = onTick;
    this.isActive = false;
    this.refresh(); 
    this.intervalID = null;
  }
  refresh(ms = 0) {
    const time = this.convertMs(ms);
    this.onTick(time);
  }
  start() {      
    if (this.isActive) { 
      return Promise.reject();      
    }
    this.isActive = true;
    button.disabled = true;
    input.disabled = true;    
    button.classList.add("disabled-button");
    new Promise ((resolve) => { 
    this.intervalID = setInterval(() => {      

      const currentTime = Date.now(); // Поточний час      
      const deltaTime = userSelectedDate - currentTime; // Скільки часу пройшло
      if (deltaTime <= 0) {
        this.stop().then(resolve);
        return;
      } 
        const time = this.convertMs(deltaTime) // вивидить час з відліком
        this.onTick(time);
    }, 1000);
    })
  }; 
  stop() {
    if (!this.isActive) {
      return Promise.reject();
    };
    clearInterval(this.intervalID); // зупинка відліку       
    this.isActive = false; // активування кнопки для повторного запуску     
    button.disabled = false;    
    input.disabled = false;    
    button.classList.remove("disabled-button");
    this.refresh(0) // скидання до 00  
        return Promise.resolve();
  }

  convertMs(ms) {    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;    
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, "0"); // додаємо парний нуль
  }
}
  
const time = new Timer({onTick: updateTimeFace});
button.addEventListener("click", time.start.bind(time));


function updateTimeFace({ days, hours, minutes, seconds }) {
  fDays.textContent = `${days}`;
  fHours.textContent = `${hours}`;
  fMinutes.textContent = `${minutes}`;
  fSeconds.textContent = `${seconds}`;  
}

