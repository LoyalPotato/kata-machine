export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (a === null && b === null) return true;// This means that they are structurally the same. That they arrived at the same
    // point and they are both at null
    if (a === null || b === null) return false;// This means that one has ended and the other hasn't, so this means that they're
    // not structurally the same
    if (a.value !== b.value) return false;

    return compare(a.left, b.left) && compare(a.right, b.right);
}
