export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    /* 
    NOTE:
    We first insert the value at the end and after that we will check where it'll place it (heapifyUp)

    Time Complexity: O(log n)
     */
    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        ++this.length;
    }

    /* 
    Time Complexity: O(log n)

    QUESTION: Why do we need to swap the bot with top?
    A: Because we're deleting the minimum value, which is always the root
    */
    delete(): number {
        if (this.length === 0) return -1;
        const out = this.data[0];

        // NOTE: We reduce before heapifying down because that method uses the length property
        --this.length;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        // NOTE: This is the last element
        this.data[this.length] = out;
        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;

        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        // NOTE: Since we always add left to right, then if this is the last node it'll have the same idx as the length
        if (lIdx >= this.length) return;

        const lVal = this.data[lIdx];
        const rVal = this.data[rIdx];
        const currVal = this.data[idx];

        // Right is smallest
        if (lVal > rVal && currVal > rVal) {
            this.data[idx] = rVal;
            this.data[rIdx] = currVal;
            this.heapifyDown(rIdx);
        } else if (rVal > lVal && currVal > lVal) {
            this.data[idx] = lVal;
            this.data[lIdx] = currVal;
            this.heapifyDown(lIdx);
        }
    }

    // NOTE: We're using the recursive way. It's easier but not as performant
    private heapifyUp(idx: number): void {
        if (idx === 0) return;

        const pIdx = this.parent(idx);
        const parentVal = this.data[pIdx];
        const currVal = this.data[idx];

        // If parent is less than us then we don't need to do anything as the condition for minHeap checks out (parent is smaller than children)
        if (parentVal > currVal) {
            // Swap with parent and continue up
            this.data[pIdx] = currVal;
            this.data[idx] = parentVal;
            this.heapifyUp(pIdx);
        }
    }


    // NOTE: These methods work in getting the position of the nodes because they are being stored
    // in an array list and they are added from left to right (complete tree)

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return (idx * 2) + 1;
    }

    private rightChild(idx: number): number {
        return (idx * 2) + 2;
    }
}