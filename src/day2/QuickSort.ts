export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

// Lomuto
function qs(arr: number[], lo: number, hi: number): void {
  if (hi > arr.length || lo < 0) return;
  if (lo > hi) return;

  const pivotIdx = Math.floor((lo + hi) / 2);
  const pivotLocationIdx = partition(arr, lo, hi, pivotIdx);

  qs(arr, lo, pivotLocationIdx - 1);
  qs(arr, pivotLocationIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number, pivotIdx: number): number {
  /* 
  We pick the hi position because:

  https://stackoverflow.com/questions/5493763/quicksort-why-moving-pivot-to-the-end

  The pivot is moved to the end of the array because it doesn't know where it will end up until the other elements are moved.
  In order to avoid constantly shifting the entire array's elements after each comparison, 
  the pivot is placed at the end until the rest of the array is sorted (for that step of the quicksort), 
  then placed in its correct location. 
  */
  const pivotVal = swapPivot(arr, hi, pivotIdx);

  let swapIdx = lo - 1;

  for (let i = lo; i < hi; ++i) {
    if (arr[i] <= pivotVal) {
      ++swapIdx;
      const tmp = arr[i];
      arr[i] = arr[swapIdx];
      arr[swapIdx] = tmp;
    }
  }

  ++swapIdx;

  arr[hi] = arr[swapIdx];
  arr[swapIdx] = pivotVal;

  return swapIdx;
}

// We put the pivot to the swap position
function swapPivot(arr: number[], swapPos: number, pivotIdx: number): number {
  const pivotVal = arr[pivotIdx];

  arr[pivotIdx] = arr[swapPos];
  arr[swapPos] = pivotVal;

  return pivotVal;
}