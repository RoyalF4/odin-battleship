import Game from './Game';
import { domElements } from './dom';

function radioChangeEvent() {
  const isHidden =
    domElements.playerTwoInputContainer.classList.contains('hidden');
  if (isHidden) {
    domElements.playerTwoInputContainer.classList.toggle('hidden');
    domElements.playerTwoInput.setAttribute('required', '');
  } else {
    domElements.playerTwoInput.removeAttribute('required');
    domElements.playerTwoInputContainer.classList.toggle('hidden');
  }
}

function formSubmit() {
  const formData = Object.fromEntries(new FormData(domElements.form));
  Game.players = formData;
  domElements.form.reset();
}

export { radioChangeEvent, formSubmit };
