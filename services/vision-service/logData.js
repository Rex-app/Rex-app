import prescriptionParser from "./prescriptionParser"

export default function logData(googleResponse) {
  //checking if there is a valid googleResponse
  if (googleResponse) {
    //this logic is checking if the googleResponse is an "empty" return aka no text was found in the picture. An "empty" google response is still a complex nested object, so the logic is checking that nested object is empty of text. If no text is found in the picture, the app asks the user to retake the photo.
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
