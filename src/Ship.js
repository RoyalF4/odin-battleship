class Ship {
  #length;

  #hits;

  #sunk;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    this.#hits += 1;
  }

  isSunk() {
    return this.length === this.hits;
  }
}

export default Ship;
