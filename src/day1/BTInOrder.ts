function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }

    // recurse
    traverse(curr.left, path);
    path.push(curr.value);
    // recurse
    traverse(curr.right, path);

    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const path = traverse(head, []);
    console.log(path);
    return path;
}
