import GoblinImage from "../img/goblin.png";

export default class GamePlay {
  constructor(element) {
    this.mainElement = element;
    this.boardSize = 4 ** 2;
    this.goblinPositionId = 0;
    this.intervalId = null;
    this.score = 0;
    this.missedGoblins = 5;
    this.timeOut = 4000;
  }

  addScoreElement() {
    this.scoreElement = document.createElement("div");
    this.scoreElement.classList.add("score");
    this.scoreElement.textContent = `score ${this.score} attempts ${this.missedGoblins}`;
    this.mainElement.insertAdjacentElement("beforeend", this.scoreElement);
  }

  renderBoard() {
    this.cleanBoard();
    this.addScoreElement();

    this.board = document.createElement("div");
    this.board.id = "game-board";
    this.board.style.display = "grid";
    this.board.style.gridTemplateColumns = `repeat(${Math.sqrt(
      this.boardSize
    )}, 105px)`;

    this.mainElement.insertAdjacentElement("beforeend", this.scoreElement);
    for (let i = 1; i <= this.boardSize; i++) {
      const cell = document.createElement("cell");
      cell.classList.add("cell");
      cell.id = i;
      cell.textContent = i;
      this.board.appendChild(cell);
    }
    this.mainElement.insertAdjacentElement("beforeend", this.board);
  }

  cleanBoard() {
    Array.from(this.mainElement.children).forEach((element) => {
      element.remove();
    });
  }

  goblinPosition() {
    this.goblin = document.createElement("img");

    this.goblin.src = GoblinImage;
    this.goblin.classList.add("goblin");

    const oldGoblinPosition = this.goblinPositionId;

    do {
      this.goblinPositionId = Math.ceil(Math.random() * this.boardSize);
    } while (this.goblinPositionId === oldGoblinPosition);

    this.renderBoard();
    const newGoblinPosition = document.getElementById(this.goblinPositionId);
    newGoblinPosition.appendChild(this.goblin);

    Array.from(this.board.querySelectorAll(".cell")).forEach((cell) => {
      cell.addEventListener("mouseenter", this.hammerCursor.bind(this));
      cell.addEventListener("mouseleave", this.hammerLeave.bind(this));
    });
    this.board.addEventListener("click", this.handleClick.bind(this));
  }

  hammerCursor(event) {
    const target = event.target;
    console.log("target", target);
    if (target.classList.contains("cell")) {
      const cursor = document.createElement("div");
      cursor.classList.add("hammer-cursor");
      target.appendChild(cursor);
    } else {
      console.log("not cursor");
    }
  }

  hammerLeave(event) {
    const target = event.target.closest(".cell");
    const cursor = target.querySelector(".hammer-cursor");
    if (cursor) {
      cursor.remove();
    }
  }

  handleClick(event) {
    const target = event.target.closest(".cell");
    if (target && target.id === this.goblinPositionId.toString()) {
      this.score++;
      if (this.score % 5 === 0) {
        this.timeOut /= 1.3;
      }
      target.classList.add("small-hammer");
      this.showGamePlay();
    }
  }

  showGamePlay() {
    this.stopGamePlay();
    this.goblinPosition();

    this.intervalId = setTimeout(() => {
      this.missedGoblins--;
      this.showGamePlay();

      if (this.missedGoblins <= 0) {
        this.endGame();
      }
    }, this.timeOut);
  }

  stopGamePlay() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  endGame() {
    this.stopGamePlay();
    this.renderBoard();
    setTimeout(() => {
      alert("Game Over! Your Score: " + this.score);
    }, 100);
  }
}
