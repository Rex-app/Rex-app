import prescriptionParser from "./prescriptionParser"

export default function logData(googleResponse) {
  if (googleResponse) {
    // o: consider either writing a comment here explaining or writing a
    //  function with a very descriptive name and tossing this logic in there
    if (typeof (googleResponse.responses[0]) === "object" && Array.isArray(googleResponse.responses) && (Object.keys(googleResponse.responses[0]))[0] === undefined) {
      return "There was an error. Please retake photo."
    } else {
      let prescriptionData = googleResponse;
      let parsedData = JSON.stringify(googleResponse.responses[0].textAnnotations[0].description)

      const prescriptionInstructions = prescriptionParser(prescriptionData)
      const myRe = /([A-Z]){4,}/g
      const textArr = parsedData.match(myRe);
      const medicationName = textArr.join(' ');

      if (medicationName === undefined) {
        return "There was an error. Please retake photo."
      } else {
        return medicationName + prescriptionInstructions;
      }
    }
  } else {
    return "There was an error. Please retake photo."
  }
};
