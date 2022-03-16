"use strict";

const body = document.querySelector("#gradient");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const btnsDiv = document.querySelector(".buttonsDiv");
const direction = document.querySelector("#direction");
const degrees = document.querySelector("#degrees");
const randomBtn = document.querySelector("#randomBtn");

////--- FUNCTIONS ---\\\\
//create color string
const generateColorString = () =>
  degrees.value < 1 || ""
    ? `linear-gradient(to ${direction.value}, ${color1.value}, ${color2.value})`
    : `linear-gradient(${degrees.value}deg, ${color1.value}, ${color2.value})`;

const compareHsp = (color1Hsp, color2Hsp) => {
  console.log(color1Hsp, color2Hsp);
  color1Hsp == "dark" && color2Hsp == "dark"
    ? (body.style.color =
        h1.style.color =
        direction.style.color =
        degrees.style.color =
        randomBtn.style.color =
          "rgba(250,250,250,0.5)")
    : (body.style.color =
        h1.style.color =
        direction.style.color =
        degrees.style.color =
        randomBtn.style.color =
          "rgba(0, 0, 0, 0.6)");
};

// render gradient
const renderGradient = () => {
  const colorString = generateColorString();

  body.style.background =
    randomBtn.style.background =
    direction.style.background =
    degrees.style.background =
      colorString;
  h3.textContent = `${body.style.background};`;
  document.activeElement.blur(); //remove focus from curent element -- mainly for degrees input field
  const color1Hsp = lightOrDark(color1.value);
  const color2Hsp = lightOrDark(color2.value);

  compareHsp(color1Hsp, color2Hsp);
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
      err => {
        alert("Failed to copy the text to clipboard.", err);
      }
    );
  } else if (window.clipboardData) {
    window.clipboardData.setData("Text", h3.textContent);
  }
};

function lightOrDark(color) {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  //if (color.match(/^rgb/)) {
  if (color.includes("RGB")) {
    //If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];

    console.log(r, g, b);
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
    //console.log("light");
  } else {
    return "dark";
    //console.log("Dark");
  }
}

//////-- EVENT LISTENERS --\\\\\\\\\
[color1, color2].forEach(function (color) {
  color.addEventListener("input", renderGradient);
});

h3.addEventListener("click", copyCss);

direction.addEventListener("change", () => {
  degrees.value = 0;
  renderGradient();
});

degrees.addEventListener("change", renderGradient);

//random bakground button
randomBtn.addEventListener("click", setColor);
