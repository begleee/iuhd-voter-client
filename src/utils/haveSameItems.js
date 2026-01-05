
export default function haveSameItems(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const a = [...arr1].sort();
  const b = [...arr2].sort();

  return a.every((item, index) => item === b[index]);
}
