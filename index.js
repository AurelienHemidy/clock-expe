import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm";

const parameters = {
  hours: 1,
  minutes: 15,
  seconds: 30,
};

const gui = new GUI();
gui
  .add(parameters, "minutes")
  .min(0)
  .max(360)
  .onChange((value) => {
    console.log(value);
    document.querySelector(
      ".seconds-needle"
    ).style.transform = `translate(0, calc(-100% + 5px)) rotate(${value}deg)`;
  });

const radiansToDegree = (radians) => {
  let pi = Math.PI;
  return radians * (180 / pi);
};

class Clock {
  constructor() {
    this.setHoursOnClock();
    this.setSecondsOnClock();
    this.update();
    setInterval(() => {
      this.update();
    }, 1000);
  }

  setHoursOnClock() {
    const hours = 12;
    const radius = 280 / 2;
    const center = {
      x: 350 / 2,
      y: 350 / 2,
    };

    for (let i = 1; i < hours + 1; i++) {
      const hour = document.createElement("div");
      hour.classList.add(`hour-number`);
      hour.classList.add(`hour-number-${i}`);
      hour.innerText = i;
      document.querySelector(".clock").appendChild(hour);

      let x = radius * Math.cos((Math.PI / 6) * i - Math.PI / 2) + center.x;
      let y = radius * Math.sin((Math.PI / 6) * i - Math.PI / 2) + center.y;
      hour.style.left = `${x}px`;
      hour.style.top = `${y}px`;
      hour.style.transform = "translate(-50%, -50%)";

      const pointHour = document.createElement("div");
      pointHour.classList.add(`hour-point`);
      pointHour.classList.add(`hour-point-${i}`);
      document.querySelector(".clock").appendChild(pointHour);

      let xPoint =
        (radius + 20) * Math.cos((Math.PI / 6) * i - Math.PI / 2) + center.x;
      let yPoint =
        (radius + 20) * Math.sin((Math.PI / 6) * i - Math.PI / 2) + center.y;
      pointHour.style.left = `${xPoint}px`;
      pointHour.style.top = `${yPoint}px`;
      pointHour.style.transform = "translate(-50%, -50%)";
    }
  }

  setSecondsOnClock() {
    const seconds = 60;
    const radius = 345 / 2;
    const center = {
      x: 350 / 2,
      y: 350 / 2,
    };

    for (let i = 1; i < seconds + 1; i++) {
      const seconds = document.createElement("div");
      seconds.classList.add(`seconds-tick`);
      document.querySelector(".clock").appendChild(seconds);

      let x = radius * Math.cos((Math.PI / 30) * i) + center.x;
      let y = radius * Math.sin((Math.PI / 30) * i) + center.y;
      seconds.style.left = `${x}px`;
      seconds.style.top = `${y}px`;
      seconds.style.transform = `translate(-50%, -50%) rotate(${
        radiansToDegree((Math.PI / 30) * i) - 90
      }deg)`;
    }
  }

  update() {
    this.updateHours();
    this.updateMinutes();
    this.updateSeconds();
  }

  updateHours() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let hourPercent = ((Math.PI / 6) * minutes) / 60;
    document.querySelector(
      ".hours-needle"
    ).style.transform = `translate(-50%, -100%) rotate(${
      (hours * 360) / 12 + radiansToDegree(hourPercent)
    }deg)`;
  }

  updateMinutes() {
    let minutes = new Date().getMinutes();
    document.querySelector(
      ".minutes-needle"
    ).style.transform = `translate(-50%, -100%) rotate(${
      (minutes * 360) / 60
    }deg)`;
  }

  updateSeconds() {
    let seconds = new Date().getSeconds();
    document.querySelector(
      ".seconds-needle"
    ).style.transform = `translate(-50%, -100%) rotate(${
      (seconds * 360) / 60
    }deg)`;
  }
}

const clock = new Clock();
