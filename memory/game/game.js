class Game {
  constructor(timer, dataProvider, render) {
    this._timer = timer;
    this._gamePlay = new GamePlay(render, dataProvider, this);
  }

  start() {
    this._gamePlay.createCards();
    this._timer.start();
  }

  _saveResults(playerName) {
    const store = new Store("gameResults");
    store.add({ name: playerName, time: this._timer.time });
  }

  finish() {
    this._timer.stop();
    const modal = new Modal(this._saveResults.bind(this));
    modal.open();
  }
}

class GamePlay {
  constructor(render, dataProvider, game) {
    this._render = render;
    this._dataProvider = dataProvider;
    this._openedCard = null;
    this._cardInProcess = false;
    this._finishedPairs = 0;
    this._game = game;
  }
  createCards() {
    const cardLetters = this._dataProvider.getData();
    this.cards = cardLetters.map((letter) => {
      return new Card(
        letter,
        (card) => {
          this._onCardClick(card);
        },
        this._render
      );
    });

    const cardElements = this.cards.map((item) => {
      return item.element;
    });
    this._render.renderList("#cards-list", cardElements);
  }

  _checkFinishGame() {
    if (this._finishedPairs === this.cards.length / 2) {
      this._game.finish();
    }
  }

  _onCardClick(card) {
    if (card === this._openedCard || card.isFinished || this._cardInProcess) {
      return;
    }

    if (!this._openedCard) {
      card.open();
      this._openedCard = card;
      return;
    }

    if (card.key === this._openedCard.key) {
      card.open();
      card.markAsFinished();
      this._openedCard.markAsFinished();
      this._openedCard = null;
      this._finishedPairs++;
      this._checkFinishGame();
    } else {
      card.open();
      this._cardInProcess = true;
      setTimeout(() => {
        card.close();
        this._openedCard.close();
        this._openedCard = null;
        this._cardInProcess = false;
      }, 1000);
    }
  }
}

class DataProvider {
  getData() {
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
    ];
    const lettersPairs = [...letters, ...letters];
    return this._shuffle(lettersPairs);
  }

  _shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
}

class Card {
  constructor(key, handleClick, render) {
    this._key = key;
    this._isFinished = false;

    const elementContent = `
    <div class="cards-list__card-inner">
     <div class="cards-list__card-front">
     </div>
     <div class="cards-list__card-back">${key}
     </div>
   </div>
    `;

    this._element = render.createElement({
      tagName: "div",
      className: "cards-list__container",
      content: elementContent,
      onclick: () => {
        handleClick(this);
      },
    });
  }

  get key() {
    return this._key;
  }

  get element() {
    return this._element;
  }

  get isFinished() {
    return this._isFinished;
  }

  markAsFinished() {
    this._isFinished = true;
  }

  open() {
    this._element.classList.add("cards-list__container_opened");
  }

  close() {
    this._element.classList.remove("cards-list__container_opened");
  }
}

class Timer {
  constructor() {
    this._startTime = null;
    this._stopTime = null;
    this._element = document.querySelector(".timer__content");
    this.showTime();
  }

  get time() {
    if (!this._startTime) {
      return 0;
    } else if (this._startTime && !this._stopTime) {
      return Date.now() - this._startTime;
    } else if (this._stopTime) {
      return this._stopTime - this._startTime;
    }
  }

  get formatedTime() {
    return TimeFormater.formatTime(this.time);
  }

  showTime() {
    this._element.innerText = this.formatedTime;
  }

  start() {
    this._stopTime = null;
    this._startTime = Date.now();
    this._showTimeInterval = setInterval(() => {
      this.showTime();
    }, 1000);
  }

  stop() {
    if (this._startTime) {
      this._stopTime = Date.now();
      clearInterval(this._showTimeInterval);
    }
  }

  reset() {
    this._startTime = null;
    this._stopTime = null;
  }
}

class Modal {
  constructor(onSendClick) {
    this._modalBlock = document.getElementById("modal");
    this._modalClose = document.querySelector(".modal__close");
    this._modalClose.onclick = () => this._close();
    this._buttonClick = document.querySelector(".modal__form-submit");
    const inputElement = document.getElementById("name");
    inputElement.oninput = (event) => {
      const nameIsEmpty = event.target.value === "";
      this._buttonClick.disabled = nameIsEmpty;
    };
    this._buttonClick.onclick = () => {
      onSendClick(inputElement.value);
      this._close();
      return false;
    };
  }

  open() {
    this._modalBlock.classList.add("modal_active");
  }

  _close() {
    this._modalBlock.classList.remove("modal_active");
  }
}

const timer = new Timer();
const dataProvider = new DataProvider();
const render = new Render();
const game = new Game(timer, dataProvider, render);
game.start();
