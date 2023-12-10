import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  for (let i = 0; i < amount.value; i++) {
    const delays = Number(delay.value) + step.value * i;
    createPromise(i + 1, delays)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.currentTarget.reset();
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
