import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", event => {
  event.preventDefault(); 

  const delay = document.querySelector('input[name="delay"]').value;  
  const  isSuccess = document.querySelector('input[name="state"]:checked').value;
  
   new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess === "fulfilled") {
        resolve(iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise in ${delay} ms`,
})
)
      } else {
    reject(iziToast.error({
    title: 'Error',
      message: `❌ Rejected promise in ${delay} ms`,
    })
  )
      }
    }, delay);
  });
});
  

  