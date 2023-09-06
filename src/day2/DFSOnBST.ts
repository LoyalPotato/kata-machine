export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return traverse(head, needle);
}

function traverse(curr: BinaryNode<number> | null, needle: number): boolean {
  if (!curr) return false;
  if (curr.value === needle) return true;
 if (!curr.left && !curr.right) return false;

  if (curr.value > needle) return traverse(curr.left, needle);

  return traverse(curr.right, needle);
}