export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0;
  let hi = haystack.length - 1;

  while (lo <= hi){
    const mid = Math.floor((hi + lo)/ 2);
    console.log(mid)

    if (needle > haystack[mid]) {
      lo = mid + 1;
    } else if (needle < haystack[mid]){
      hi = mid - 1;
    } else {
      return true;
    }
    
  }

  return false;
}