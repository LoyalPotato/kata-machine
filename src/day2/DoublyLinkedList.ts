interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

/**
 * NOTE:
 * - Always be careful with prev & next checks as they can be undefined (when head/tail)
 * - For remove, we need to check if the elements are head/tail and update them if they are
*/

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;


    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const newItem: Node<T> = { value: item };
        if (!this.head) {
            this.head = newItem;
            this.tail = this.head;
        } else {
            newItem.next = this.head;
            this.head.prev = newItem;
            this.head = newItem;
        }
        ++this.length;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }
        const node = this.traverseTillIdx(idx - 1);
        if (node) {
            const newNode: Node<T> = { value: item };

            newNode.prev = node.prev;
            newNode.next = node;

            node.prev = newNode;
            if (node.prev) {
                node.prev.next = newNode;
            }

            ++this.length;
        } else {
            this.append(item);
        }
    }
    append(item: T): void {
        const newNode: Node<T> = { value: item };
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        ++this.length;
    }
    remove(item: T): T | undefined {
        const node = this.traverseTillItem(item);
        if (!node) return;
        return this.removeNode(node);
    }
    get(idx: number): T | undefined {
        const node = this.traverseTillIdx(idx);
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.traverseTillIdx(idx);
        if (!node) return;
        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        if (this.length === 0) return;
        --this.length;
        if (this.length === 0) {
            const val = this.head!.value;
            this.head = this.tail = undefined;
            return val;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.next = node.prev = undefined;

        return node.value;
    }

    private traverseTillIdx(idx: number): Node<T> | undefined {
        if (this.length === 0) return;
        if (idx > this.length || idx < 0) return;

        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        return curr;
    }

    private traverseTillItem(item: T): Node<T> | undefined {
        if (this.length === 0) return;

        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                return curr;
            } else {
                curr = curr.next;
            }
        }

        return;
    }
}