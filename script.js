"use strict";

const body = document.querySelector("#gradient");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
const h3 = document.querySelector("h3");
const direction = document.querySelector("#direction");
const degrees = document.querySelector("#degrees");
const randomBtn = document.querySelector("#randomBtn");

////--- FUNCTIONS ---\\\\
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

//generate color (#******)
const generateColor = () =>
  `#${randomNoGenerator()}${randomNoGenerator()}${randomNoGenerator()}`;

//copy css linear-gradient to clipboard
const copyCss = () => {
  h3.style.background = "#fff";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(h3.textContent).then(
      () => {
        alert(`${h3.textContent} Copied to clipboard successfully`);
        h3.style.background = "";
      },
      (err) => {
        alert("Failed to copy the text to clipboard.", err);
      }
    );
  } else if (window.clipboardData) {
    window.clipboardData.setData("Text", h3.textContent);
  }
};

//////-- EVENT LISTENERS --\\\\\\\\\
[color1, color2].forEach(function (color) {
  color.addEventListener("input", renderGradient);
});

h3.addEventListener("click", copyCss);

direction.addEventListener("change", renderGradient);

degrees.addEventListener("change", renderGradient);

//random bakground button
randomBtn.addEventListener("click", setColor);
