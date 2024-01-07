import GamePlay from "./GamePlay";

const mainElement = document.getElementById("app");
const newGameElement = document.getElementById("newGameLink");

newGameElement.addEventListener("click", newGameHandler);

function newGameHandler(event) {
  event.preventDefault();
  const target = event.target;
  if (target) {
    const gamePlay = new GamePlay(mainElement);
    gamePlay.showGamePlay();
  }
}
