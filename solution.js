const fs = require('fs').promises;

function isSafe(levels) {
  let i = 0;
  // determine if the sequence is increasing or decreasing from the first pair
  const direction = levels[1] - levels[0] > 0 ? 1 : -1;
  do {
    // normalize diff so both directions map to a positive range
    const diff = (levels[i + 1] - levels[i]) * direction;
    // unsafe if the step is out of range or reverses direction
    if (diff < 1 || diff > 3) return false;
    i++;
  } while (i < levels.length - 1);
  return true;
}

// try removing each level one at a time to see if any removal makes it safe
function isSafeWithDampener(levels) {
  if (isSafe(levels)) return true;
  for (let i = 0; i < levels.length; i++) {
    const candidate = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isSafe(candidate)) return true;
  }
  return false;
}

async function main() {
  const data = (await fs.readFile('input.txt')).toString();
  const reports = data.trim().split('\n').map(line => line.split(' ').map(Number));
  console.log('Part 1:', reports.filter(isSafe).length);
  console.log('Part 2:', reports.filter(isSafeWithDampener).length);
}

main();
