export function debounce(callback: () => void, delay: number) {
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}
