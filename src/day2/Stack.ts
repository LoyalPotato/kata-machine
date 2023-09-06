interface Node<T> {
    value: T;
    next?: Node<T>;
}

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
        this.length = 0;
    }

    push(item: T): void {
        ++this.length;
        const newNode: Node<T> = { value: item };
        if (this.length > 1) {
            newNode.next = this.tail;
        }
        this.tail = newNode;
    }

    pop(): T | undefined {
        if (this.length === 0) return;
        --this.length;
        const poppedVal = this.tail?.value;
        if (this.length === 0) {
            this.tail = undefined;
        } else {
            this.tail = this.tail!.next;
        }

        return poppedVal;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}