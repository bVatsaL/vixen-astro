export default class MatchHeight {
  constructor(el) {
    this.DOM = el;
    this.init();
  }

  init() {
    this.resizeHeight();
    window.addEventListener('resize', this.resizeHeight, { passive: true });
  }

  resizeHeight() {
    let maxHeight = 0;
    this.DOM.forEach((el) => {
      const divHeight = el.getBoundingClientRect().height;
      if (divHeight > maxHeight) {
        maxHeight = divHeight;
      }
    });
    this.DOM.forEach((el) => {
      el.style.height = `${maxHeight}px`;
    });
  }
}
