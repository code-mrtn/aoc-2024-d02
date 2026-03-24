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

async function main() {
  const data = (await fs.readFile('input.txt')).toString();
  const reports = data.trim().split('\n').map(line => line.split(' ').map(Number));
  console.log(reports.filter(isSafe).length);
}

main();
