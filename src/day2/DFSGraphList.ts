export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: number[] = [];
  traverse(graph, source, needle, path, seen);
  if (path.length === 0) return null;
  return path;
}

function traverse(graph: WeightedAdjacencyList, curr: number, needle: number, path: number[], seen: boolean[]): boolean {
  if (seen[curr]) return false;

  // visiting the node
  seen[curr] = true;
  path.push(curr);

  if (curr === needle) {
    return true;
  }

  // We're going to recursively traverse each adj
  const list = graph[curr];
  for (let i = 0; i < list.length; ++i) {
    const adj = list[i];
    if(traverse(graph, adj.to, needle, path, seen)) {
      return true;
    }
  }

  path.pop();

  return false;
}

// Running time is O(V + E) vertex + edges