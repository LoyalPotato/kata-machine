interface Node<T> {
    value: T;
    next?: Node<T>;
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;


    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        ++this.length;
        const newNode: Node<T> = { value: item };
        if (this.length === 1) {
            this.tail = this.head = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        }

    }
    deque(): T | undefined {
        if (this.length === 0) return;
        --this.length;
        const dqVal = this.head?.value;
        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else if (this.head) {
            this.head = this.head.next;
        }

        return dqVal;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}