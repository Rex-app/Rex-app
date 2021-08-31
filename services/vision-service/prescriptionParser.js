export default function prescriptionParser(prescriptionData) {
  const txtAnnotationsArr = prescriptionData.responses[0].textAnnotations;

  const summaryDesc = txtAnnotationsArr[0].description.trim();
  let summaryDescArr = summaryDesc.split("\n");
  const filteredData = {};

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
  return result;
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
