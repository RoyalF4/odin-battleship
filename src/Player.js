class Player {
  #name;

  #board;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export default Player;
