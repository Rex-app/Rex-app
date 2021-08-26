// DUMMY DATA
const fluoxetineDummyData = require("./FluoxetineDummyData");

const txtAnnotationsArr = fluoxetineDummyData.responses[0].textAnnotations
// console.log(txtAnnotationsArr);

const filteredData = {}

for (const word of txtAnnotationsArr) {
  filteredData[word.description] = word.boundingPoly.vertices[0]
}
console.log(filteredData)

/*
GOALS:
const textToSpeak = "Take 1 capsule by mouth every day in the morning"

const sortedData = [
  [{Take},{1}, {capsule} ], => all of these will the same or similar y-values (the x values increase from left to right)
  [{by}, {mouth}, {every}, {day}], => all of these will have a LARGER y-value than the array before it
  [{in}, {the}, {morning}] => all of these will have the largest y-value
]

TO TEST:
run the following command in the terminal:
node dummyDataTesting/dataParsingTests.js
*/

