function traverse(head: BinaryNode<number> | null, path: number[]): number[] {
  if (head === null) {
    return path;
  }

  traverse(head.left, path);
  traverse(head.right, path);
  path.push(head.value);

  return path;
}
export default function post_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}