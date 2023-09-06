export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    // QUESTION: What other algo does this relate to? BFSGraphMatrix?
    const seen = new Array(arr.length).fill(false);
    const dists = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1); // Trace the path

    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            const adj = adjs[i];
            // QUESTION: If we've already been through the node?, I don't understand too well, need visual
            if (seen[adj.to]) continue;

            // Calculate distance
            const dist = dists[curr] +  adj.weight;

            // QUESTION: If dist is less than know dist of adj? Visual
            // TODO: Don't understand this one as well
            if (dist < dists[adj.to]) {
                dists[adj.to] = dist;
                prev[adj.to] = curr;
            }
        }
    }

    const path: number[] = [source];
    let curr = sink; // Same as needle, our destination

    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr]; // Walking one parent back at a time, as prev holds the last node to update the distance to shortest one
    }

    return path.reverse(); 
}


/* 
NOTE:
Checks the seen array to see if we have not visited all the nodes (seen = false) and that the distance to that unvisited node is less than infinity
*/
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((seen, idx) => !seen && dists[idx] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let lowestIdx = -1;
    let lowestDistance = Infinity;

    /* 
    NOTE:
    Walk through all our distances and check for the lowest unseen node 
    */

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) continue;
        if (dists[i] < lowestDistance) {
            lowestDistance = dists[i];
            lowestIdx = i;
        }
    }

    return lowestIdx;
}
