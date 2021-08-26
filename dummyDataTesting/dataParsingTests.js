// import fluoxetineDummyData from "./FluoxetineDummyData";
const fluoxetineDummyData = require("./FluoxetineDummyData");

const txtAnnotationsArr = fluoxetineDummyData.responses[0].textAnnotations
// console.log(txtAnnotationsArr);

const filteredData = {}

for (const word of txtAnnotationsArr) {
  filteredData[word.description] = word.boundingPoly.vertices[0]
}
console.log(filteredData)


