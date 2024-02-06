let blocked = false;

let scrollYArr: number[] = [];

export const stopBodyScroll = () => {
  if (scrollYArr.length === 0) {
    scrollYArr.push(window.scrollY);
  }

  if (typeof window !== 'undefined' && !blocked) {
    window?.document?.body?.classList?.add('modal-open');
    blocked = true;
  }
};

export const resumeBodyScroll = () => {
  if (typeof window !== 'undefined' && blocked) {
    const scrollY = scrollYArr[0] || 0;
    scrollYArr = [];
    window?.document?.body?.classList?.remove('modal-open');
    window.scrollTo(0, scrollY);
    blocked = false;
  }
};
