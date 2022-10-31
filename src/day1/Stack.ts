type Node<T> = {
    value: T;
    next?: Node<T>;
};


/*
/===========/
/     2     / <-- tail, latest item = removed first
/===========/
/===========/
/     6     /
/===========/
/===========/
/     28    /
/===========/
/===========/
/     31    /
/===========/
/===========/
/     3     / <-- first item inserted, last removed
/===========/
*/
export default class Stack<T> {
    public length: number;
    private tail?: Node<T>;

    constructor() {
        this.tail = undefined;
        this.length = 0;
    }

    push(item: T): void {
        this.length++;
        const node: Node<T> = {
            value: item,
        };
        if (!this.tail) {
            this.tail = node;
        }
        node.next = this.tail;
        this.tail = node;
    }

    pop(): T | undefined {
        if (!this.tail) return;

        this.length--;
        const tail = this.tail;

        if (this.length === 0) {
            this.tail = undefined;
        } else {
            this.tail = tail.next;
        }

        return tail.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}
