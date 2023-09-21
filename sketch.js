let numArr = [];
let numInput;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  fill(255, 0, 100);
  numInput = select("#seed-input");
  numInput.changed(function () {
    evaluateSequence(numInput.value());
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function eval(n) {
  if (n % 2 == 0) {
    n *= 0.5;
  } else {
    n *= 3;
    n++;
  }
  return n;
}

async function evaluateSequence(s) {
  numArr = [];
  while (s != 1) {
    numArr.push(s);
    s = eval(s);
    visualize(numArr);
    await sleep(10);
  }
  numArr.push(1);
}

function visualize(arr) {
  background(0);
  const w = width / arr.length;
  let highestNum = -1;
  for (const n of arr) {
    if (n > highestNum) {
      highestNum = n;
    }
  }
  let px;
  let py;
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    let y = map(n, 1, highestNum, height - 50, 50);
    let x = i * w;
    // ellipse(x, y, 15, 15);
    if (i != 0) {
      stroke(255, 0, 100);
      strokeWeight(3);
      line(x, y, px, py);
    }
    px = x;
    py = y;
  }
}
