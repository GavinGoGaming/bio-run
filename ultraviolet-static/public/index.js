"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = search(address.value, searchEngine.value);
  document.querySelector('#ie > .w11-body > iframe').src = __uv$config.prefix + __uv$config.encodeUrl(url);
  document.querySelector('#ie > .w11-body > iframe').classList.remove('hidden');
  document.querySelector('.first').classList.add('hidden');
  if(document.querySelector('.first > #uv-form')) {
    // move it to .second
    document.querySelector('.second').appendChild(document.querySelector('.first > #uv-form'));
  }
  document.querySelector('.second').classList.remove('hidden');
});
