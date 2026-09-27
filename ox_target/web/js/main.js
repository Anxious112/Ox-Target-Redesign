import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const heart = document.getElementById("heart");

window.addEventListener("message", (event) => {
  switch (event.data.event) {
    case "visible": {
      optionsWrapper.innerHTML = "";

      const isVisible = Boolean(event.data.state);

      body.style.visibility = isVisible ? "visible" : "hidden";
      // Start/reset hollow; setTarget below fills it in once something is actually targetable.
      heart.classList.remove("heart-hover");

      break;
    }

    case "leftTarget": {
      // No longer looking at a valid target, so go back to hollow.
      optionsWrapper.innerHTML = "";
      heart.classList.remove("heart-hover");
      break;
    }

    case "setTarget": {
      optionsWrapper.innerHTML = "";

      // Fill the crosshair in solid while looking at a valid target.
      heart.classList.add("heart-hover");

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }

      break;
    }
  }
});