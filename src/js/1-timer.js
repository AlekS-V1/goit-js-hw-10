import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
  
flatpickr("input#datetime-picker", {
  enableTime: true,   
  time_24hr: true,    
  defaultDate: new Date(),    
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];    
    console.log("Обраний час:", userSelectedDate); 
    button.disabled = false;
    button.classList.remove("disabled-button");
    
    
  },
  
});

const button = document.querySelector("button");
const input = document.querySelector("#datetime-picker");

input.disabled = false;
button.disabled = true;
button.classList.add("disabled-button");

const fDays = document.querySelector("span[data-days]");
const fHours = document.querySelector("span[data-hours]");
const fMinutes = document.querySelector("span[data-minutes]");
const fSeconds = document.querySelector("span[data-seconds]");

class Timer {

  constructor({onTick}) {
    this.onTick = onTick;
    this.isActive = false;
    this.init(); 
    this.intervalID = null;
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }
  start() {
    
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
    
    
    if (this.isActive) {      
      button.disabled = true;
      input.disabled = true;
      button.classList.add("disabled-button");
      
      return;
      
    }
    this.isActive = true;    
    this.intervalID = setInterval(() => {
      button.disabled = true;
      input.disabled = true;
      button.classList.add("disabled-button");
      const currentTime = Date.now(); // Поточний час      
      const deltaTime = userSelectedDate - currentTime; // Скільки часу пройшло
      if (deltaTime <= 0) {
        clearInterval(this.intervalID); // зупинка відліку
        this.init(); // скидання до 00        
        this.isActive = false; // активування кнопки для повторного запуску 
        button.disabled = false;
        input.disabled = false;
        button.classList.remove("disabled-button");
        return;
      }
      const time = this.convertMs(deltaTime) // вивидить час з відліком
      this.onTick(time);

    }, 1000);
  };  

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









// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";


// let userSelectedDate = null;
  
// flatpickr("input#datetime-picker", {
//   enableTime: true,   
//   time_24hr: true,    
//   defaultDate: new Date(),    
//   minuteIncrement: 1,
//   enableSeconds: true,
//   // minDate: new Date(),
//   onClose(selectedDates) {      
//     userSelectedDate = selectedDates[0];    
//     console.log("Обраний час:", userSelectedDate);    
//   },
  
// });


// const button = document.querySelector("button");
// const input = document.querySelector("input");

// const handleClick = () => {
//   console.log("The button was pressed and now the next image will appear");
// };

// button.disabled = false;

// button.addEventListener("click", handleClick);

// const fDays = document.querySelector("span[data-days]");
// const fHours = document.querySelector("span[data-hours]");
// const fMinutes = document.querySelector("span[data-minutes]");
// const fSeconds = document.querySelector("span[data-seconds]");

// class Timer {

//   constructor({onTick}) {
//     this.onTick = onTick;
//     this.isActive = false;
//     this.init(); 
//     this.intervalID = null;
//   }

//   init() {
//     const ms = this.convertMs(0);
//     this.onTick(ms);
//   }
//   start() {
    
//     if (this.isActive) {
//       input.disabled = true;
//       button.disabled = true;
//       button.classList.add("disabled-button");
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//       });
      
//       return;
      
//     }
    // this.isActive = true;
    // this.intervalID = setInterval(() => {
    //   const currentTime = Date.now(); // Поточний час
    //   const deltaTime = userSelectedDate - currentTime; // Скільки часу пройшло
    //   if (deltaTime <= 0) {
    //     clearInterval(this.intervalID); // зупинка відліку
    //     this.init(); // скидання до 00        
        //this.isActive = false; // активування кнопки для повторного запуску 
      //   return;
      // }
      // const time = this.convertMs(deltaTime) // вивидить час з відліком
      // console.log(time); 
  //     this.onTick(time);

  //   }, 1000)
  // };  

//   convertMs(ms) {  
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
    
//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//     return {days, hours, minutes, seconds}
//   }
//   addLeadingZero(value) {
//     return String(value).padStart(2, "0");
//   }
// }
  
// const time = new Timer({onTick: updateTimeFace});
// button.addEventListener("click", time.start.bind(time));

// function updateTimeFace({ days, hours, minutes, seconds }) {
//   fDays.textContent = `${days}`;
//   fHours.textContent = `${hours}`;
//   fMinutes.textContent = `${minutes}`;
//   fSeconds.textContent = `${seconds}`;

  
// }