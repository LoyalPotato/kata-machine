export default class ArrayList<T> {
    public length: number; // Number of items in array
    private capacity: number; // Total size of array
    private data: T[];

    constructor(capacity = 5) {
        this.length = 0;
        this.data = new Array(capacity);
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.capacity) return;
        if (idx === this.length) {
            this.append(item);
            return;
        }
        if (idx > this.length) {
            this.data[idx] = item;
            return;
        }
        this.shiftDataArr(idx, "add");
        this.data[idx] = item;
    }

    append(item: T): void {
        this.checkCapacity();
        this.data[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        //NOTE: Here it's the starting idx, from where to search
        return this.shiftDataArr(0, "remove", item);
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) return;
        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) return;
        return this.shiftDataArr(idx, "remove") as T;
    }

    private checkCapacity() {
        if (this.length === this.capacity) {
            this.growDataArr();
        }
    }

    private growDataArr(newCapacity: number = this.capacity + 10): void {
        const newDataArr: T[] = new Array(newCapacity);
        for (let i = 0; i < this.length; ++i) {
            const data = this.data[i];
            newDataArr[i] = data;
        }
        this.data = newDataArr;
        this.capacity = newCapacity;
    }

    private shiftDataArr<O extends "add" | "remove">(
        idx: number,
        operation: O,
        item?: T,
    ): T | undefined {
        if (operation === "add") {
            this.checkCapacity();
            this.length++;
            // NOTE: The length - 2 to account for the extra length and another to make it into an index
            for (let i = this.length - 2; i >= idx; --i) {
                const currData = this.data[i];
                this.data[i + 1] = currData;
            }
        } else {
            //NOTE: What do I put here for index, when removing by item? Null won't work
            item = item || this.data[idx];
            let len = this.length;
            this.length--;
            if (idx === this.length) return item;

            let itemFound = false;
            for (let i = idx ?? 0; i < len; ++i) {
                const nextData = this.data[i + 1];
                if (!idx) {
                    if (this.data[i] === item) {
                        itemFound = true;
                        this.data[i] = nextData;
                        len = this.length;
                    }
                } else if (idx || itemFound) {
                    this.data[i] = nextData;
                }
            }

            if (!idx && !itemFound) {
                this.length++; // Reset length
                return;
            }
            return item;
        }
        return;
    }
}
