"use strict";

const body = document.querySelector("#gradient");
const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");
const h3 = document.querySelector("h3");

//run setGradient function on startup/refresh
setGradient();

function setGradient() {
  body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  h3.textContent = body.style.background + ";";
}

[color1, color2].forEach(function (color) {
  color.addEventListener("input", setGradient);
});
