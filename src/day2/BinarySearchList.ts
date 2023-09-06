export default function bs_list(haystack: number[], needle: number): boolean {
  if (!haystack.length) return false;

  let l = 0, r = haystack.length - 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    const midVal = haystack[m];
    if (needle > midVal) {
      l = m + 1;
    } else if (needle < midVal) {
      r = m - 1;
    } else {
      return true;
    }
  }

  return false;
}