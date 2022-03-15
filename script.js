"use strict";

const body = document.querySelector("#gradient");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
const h3 = document.querySelector("h3");
const direction = document.querySelector("#direction");
const degrees = document.querySelector("#degrees");
const randomBtn = document.querySelector("#randomBtn");

//create color string
const generateColorString = () =>
  degrees.value == 0
    ? `linear-gradient(to ${direction.value}, ${color1.value}, ${color2.value})`
    : `linear-gradient(${degrees.value}deg, ${color1.value}, ${color2.value})`;

// render gradient
const renderGradient = () => {
  const colorString = generateColorString();
  body.style.background =
    randomBtn.style.background =
    direction.style.background =
    degrees.style.background =
      colorString;
  h3.textContent = `${body.style.background};`;
};

//run setGradient function on startup/refresh
window.onload = renderGradient();

//--random color generator--\\
//random number generator
const randomNoGenerator = () =>
  Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, 0);

// set and render random colors
const setColor = () => {
  color1.value = generateColor();
  color2.value = generateColor();
  renderGradient();
};

const generateColor = () =>
  `#${randomNoGenerator()}${randomNoGenerator()}${randomNoGenerator()}`;
//-- event listeners --||
[color1, color2].forEach(function (color) {
  color.addEventListener("input", renderGradient);
});

direction.addEventListener("change", renderGradient);

degrees.addEventListener("change", renderGradient);

//random bakground button
randomBtn.addEventListener("click", setColor);
