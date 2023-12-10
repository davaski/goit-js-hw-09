const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

const changeBody = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      changeColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    if (!this.isActive) {
      return;
    }
    this.isActive = false;
  },
};
refs.startBtn.addEventListener('click', () => {
  changeBody.start();
});

refs.stopBtn.addEventListener('click', () => {
  changeBody.stop();
});
