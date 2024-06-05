export function capitalizeFirstLetter(string: string) {
  const lower = string.toLocaleLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
