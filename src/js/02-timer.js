import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  date: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  min: document.querySelector('span[data-minutes]'),
  sec: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      refs.start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    }
    if (selectedDates[0] > new Date()) {
      refs.start.disabled = false;
    }
  },
};

refs.start.addEventListener('click', () => {
  refs.start.disabled = true;
  refs.date.disabled = true;
  intervalId = setInterval(() => {
    const choosenDate = new Date(refs.date.value);
    const differenceInTime = choosenDate - Date.now();
    if (differenceInTime < 1000) {
      clearInterval(intervalId);
    }
    const readout = convertMs(differenceInTime);
    viewOfTimer(readout);
  }, 1000);
});
flatpickr('#datetime-picker', options);

function viewOfTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.min.textContent = `${minutes}`;
  refs.sec.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
