import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", event => {
  event.preventDefault(); 

  const delay = Number(document.querySelector('input[name="delay"]').value);  
  const isSuccess = document.querySelector('input[name="state"]:checked').value;
  
   new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess === "fulfilled") {
        resolve(delay)
      } else {
        reject(delay)
      }
    }, delay);
   })
  
  .then(delay => iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise in ${delay} ms`,
    position: 'topRight',
  }))
	.catch(delay => iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay} ms`,
    position: 'topRight',
    }));
  
});
 
  