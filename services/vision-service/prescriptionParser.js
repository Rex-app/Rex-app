// Data parsing explaination:
//The way google works is it detects words, draws a bounding box around the word  and gives x and y axis for each word. 4 in total.
// google combines the words that occurs in the same line
//every line is separated by a new line delimeter. However those lines are not in the same order as they are in the picture.
// our job was to sort those line in the same order as how they are in the picture
// first we got the complete description from the data that google gave us
//then we split the description by a new line delimeter and got an array of each line as element
//that way we know what words are on each line
// in filtered data every word detected by google is the key and its location is value
//then we got the maximum y of that line (we push that into an empty array so that we have max y for each line )
//Now we have two arrays. One that has the lines and another has max y for each line
// we sort the max y array and get the INDEX of the sorted array using arg sort
// we then take the sortedSummaryDescArr and print elements after the word TAKE

export default function prescriptionParser(prescriptionData) {
  const txtAnnotationsArr = prescriptionData.responses[0].textAnnotations;

  const summaryDesc = txtAnnotationsArr[0].description.trim();
  let summaryDescArr = summaryDesc.split("\n");
  const filteredData = {};

  for (const word of txtAnnotationsArr) {
    filteredData[word.description] = word.boundingPoly.vertices;
  }

  let capsWords = [];
  capsWords = summaryDescArr.filter((line) => (line === line.toUpperCase()));
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
  if (Array.isArray(capsWords) && capsWords[0] === null) {
   return "There was an error. Please retake photo."
  } else {
    return `${capsWords}". "${result}`
  }
}

// HELPER FUNCTIONS
export function getMaxY(boxArr) {
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

export function argsort(array) {
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
