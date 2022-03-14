"use strict";

const body = document.querySelector("#gradient");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
const h3 = document.querySelector("h3");
const direction = document.querySelector("#direction");
const randomBtn = document.querySelector("#randomBtn");

//run setGradient function on startup/refresh
renderGradient();

//create color string
function generateColorString() {
  return `linear-gradient(to ${direction.value}, ${color1.value}, ${color2.value})`;
}

// render gradient
function renderGradient() {
  body.style.background = generateColorString();
  randomBtn.style.background = generateColorString();
  direction.style.background = generateColorString();
  h3.textContent = `${body.style.background};`;
}

//--random color generator--\\
//random number generator
function randomNoGenerator() {
  return Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, 0);
}

// set and render random colors
function setColor() {
  color1.value = generateColor();
  color2.value = generateColor();
  renderGradient();
}

function generateColor() {
  return `#${randomNoGenerator()}${randomNoGenerator()}${randomNoGenerator()
    .toString(16)
    .padStart(2, 0)}`;
}

//-- event listeners --||
[color1, color2].forEach(function (color) {
  color.addEventListener("input", renderGradient);
});

//random bakground button
randomBtn.addEventListener("click", setColor);

direction.addEventListener("change", renderGradient);
