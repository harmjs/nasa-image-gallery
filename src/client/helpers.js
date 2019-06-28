export function delay(timeoutId, callback, delayMs) {
  clearInterval(timeoutId);
  return setTimeout(() => {
    callback();
  }, delayMs)
}