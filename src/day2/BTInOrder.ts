function traverse(curr: BinaryNode<number> | null, path: number[]) {
  if (!curr) return path;

  traverse(curr.left, path);
  path.push(curr.value);
  traverse(curr.right, path);

  return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  const path: number[] = traverse(head, []);

  return path;
}