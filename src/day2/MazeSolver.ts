const dirs: Point[] = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];

// QUESTION: I don't understand what the "end" point is
export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  if (maze.length === 0) return [];
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }
  walk(maze, wall, start, end, path, seen);
  return path;
}

function walk(maze: string[], wall: string, curr: Point, end: Point, path: Point[], seen: boolean[][]): boolean {
  const rowLen = maze.length;
  const colLen = maze[0].length;

  if (
    curr.x < 0 || curr.x >= colLen ||
    curr.y < 0 || curr.y >= rowLen
  ) {
    return false;
  }

  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  if (curr.x === end.x && curr.y === end.y) {
    path.push(curr);
    return true;
  }

  if (seen[curr.y][curr.x]) return false;

  seen[curr.y][curr.x] = true;
  path.push(curr);

  for (let i = 0; i < dirs.length; ++i) {
    const { x, y } = dirs[i];
    const newCurr = { x: curr.x + x, y: curr.y + y };
    if (walk(maze, wall, newCurr, end, path, seen)) {
      return true;
    }
  }

  // post order
  path.pop();

  return false;
}