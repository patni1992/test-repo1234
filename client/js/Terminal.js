class Terminal {
  constructor() {
    this.counter = 0;
  }
  typeWriter(element, text) {
    if (this.counter < text.length) {
      element.innerHTML += text.charAt(this.counter);
      this.counter++;
      setTimeout(() => this.typeWriter(element, text), 50);
    } else {
      //element.classList.add("text");
      this.counter = 0;
    }
  }
}

export default Terminal;
