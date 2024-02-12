export const removeTradePlugin = () => {
  // @ts-ignore
  window.tradeLoaded = false;
  Array.from(document.querySelectorAll('#tradepending-container')).forEach((container) => {
    container.remove();
    // @ts-ignore
    window.TradePendingPlugin = false;
  });
};

export const loadTradePending = () => {
  return () => {
    if (
      !document.querySelectorAll('#tradepending-container').length &&
      // @ts-ignore
      !window.tradeLoaded &&
      typeof window?.tradependingSetup === 'function'
    ) {
      // @ts-ignore
      window.tradeLoaded = true;
      removeTradePlugin();
      window?.tradependingSetup?.();
    }
  };
};
