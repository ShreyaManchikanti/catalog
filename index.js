const fs = require("fs");

// Function to decode a value from a given base to decimal
function decodeValue(value, base) {
  return parseInt(value, base);
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points) {
  let secret = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    let term = points[i].y;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        term *= -points[j].x / (points[i].x - points[j].x);
      }
    }
    secret += term;
  }

  return Math.round(secret); // Round to nearest integer
}

// Read and parse the JSON file
function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Main function
function main() {
  const filePath = "testcase.json"; // Path to your JSON file
  const testCases = readJsonFile(filePath);

  testCases.forEach((testCase, index) => {
    console.log(`\nProcessing Test Case ${index + 1}:`);

    const n = testCase.keys.n;
    const k = testCase.keys.k;
    const points = [];

    // Extract and decode points
    for (let key in testCase) {
      if (key !== "keys") {
        const x = parseInt(key);
        const base = parseInt(testCase[key].base);
        const value = testCase[key].value;
        const y = decodeValue(value, base);
        points.push({ x, y });
      }
    }

    // Ensure we have at least k points
    if (points.length < k) {
      console.error("Not enough points to interpolate the polynomial.");
      return;
    }

    // Use Lagrange interpolation to find the secret
    const secret = lagrangeInterpolation(points);
    console.log("The secret (constant term c) is:", secret);
  });
}

// Run the program
main();
