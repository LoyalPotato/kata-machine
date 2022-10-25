function traverse(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {

    if (seen[curr]) return false;

    seen[curr] = true;
    //pre
    path.push(curr);

    if (curr === needle) return true;

    //recurse

    const list = graph[curr];

    for (let i = 0; i < list.length; ++i) {
        const edge = list[i];
        // I think the difference here is that we go to each node recursively
        // while in the BFS we see what are curr connections and add to a queue I think
        if (traverse(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    //post

    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {

  const seen : boolean[] = new Array(graph.length).fill(false);
  const path: number[] = [];

  traverse(graph, source, needle, seen, path);

  if (path.length === 0){
    return null;
  }

  return path;
}
