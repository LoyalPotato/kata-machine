export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);

  seen[source] = true;
  const q: number[] = new Array(source);

  do {
    const curr = q.shift() as number;
    if (curr === needle) break;
    const adjs = graph[curr];
    for (let i = 0; i < adjs.length; ++i) {
      if (adjs[i] === 0 || seen[i]) continue;
      seen[i] = true;
      prev[i] = curr;
      q.push(i);
    }
    // Why do we use curr? Curr represents the value no? Or is it the number of the node? I think that's it.
    seen[curr] = true;

  } while (q.length);

  if (prev[needle] === -1) return null;

  // walk the prevs until a -1
  let curr = needle;
  const path: number[] = [source];

  while (prev[curr] !== -1) {
    path.push(curr);
    curr = prev[curr]; // Set curr to who added me to the search
  }

  return path.reverse();
}