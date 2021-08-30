// DUMMY DATA
const fluoxetineDummyData = require("./FluoxetineDummyData");

const txtAnnotationsArr = fluoxetineDummyData.responses[0].textAnnotations;

const summaryDesc = txtAnnotationsArr[0].description.trim();
let summaryDescArr = summaryDesc.split("\n");
const filteredData = {};

function getMaxY(boxArr) {
  let maxY = 0;
  for (let i = 0; i < boxArr.length; i++) {
    for (let j = 0; j < boxArr[i].length; j++) {
      let y = boxArr[i][j].y;
      if (y > maxY) {
        maxY = y;
      }
    }
    return maxY;
  }
}

function argsort(array) {
  const arrayObject = array.map((value, idx) => {
    return { value, idx };
  });
  arrayObject.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }

    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  const argIndices = arrayObject.map((data) => data.idx);
  return argIndices;
}

for (const word of txtAnnotationsArr) {
  filteredData[word.description] = word.boundingPoly.vertices;
}
//loop through summaryDescApp
//split each element by ' '
let yCoordinates = [];
for (let i = 0; i < summaryDescArr.length; i++) {
  let splitWord = summaryDescArr[i].split(" ");
  let individualBoxes = splitWord.map((desc) => filteredData[desc]);
  const maxY = getMaxY(individualBoxes);
  yCoordinates.push(maxY);
}

// PERFORMING ARGSORT
// https://titanwolf.org/Network/Articles/Article?AID=135aa377-6989-4a7c-8da9-6eb73ef33086#gsc.tab=0

let argsortYCoordiantes = argsort(yCoordinates);
let sortedSummaryDescArr = [];
for (let i = 0; i < argsortYCoordiantes.length; i++) {
  let idx = argsortYCoordiantes[i];
  sortedSummaryDescArr.push(summaryDescArr[idx]);
}
// Find "TAKE" in the array
let trueValue = 0;
for (let i = 0; i < sortedSummaryDescArr.length; i++) {
  if (sortedSummaryDescArr[i].toUpperCase().includes("TAKE") === true) {
    trueValue = i;
    break;
  }
}

let result = sortedSummaryDescArr.splice(trueValue);
result = result.join(" ");
console.log(result);

//console.log(splitt.substring("Take"))

//console.log(str.substring(1, 3))

/*
GOALS:
const textToSpeak = "Take 1 capsule by mouth every day in the morning"
//mild pain 

const sortedData = [
  [{Take},{1}, {capsule} ], => all of these will the same or similar y-values (the x values increase from left to right)
  [{by}, {mouth}, {every}, {day}], => all of these will have a LARGER y-value than the array before it
  [{in}, {the}, {morning}] => all of these will have the largest y-value
]

TO TEST:
run the following command in the terminal:
node dummyDataTesting/dataParsingTests.js
*/
