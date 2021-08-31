import Environment from "../../config/environments";

export default async function submitToGoogleVision(setUploading, setGoogleResponse, image) {
  try {
    setUploading(true);
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
          image: {
            source: {
              imageUri: image,
            },
          },
        },
      ],
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
      Environment["GOOGLE_CLOUD_VISION_API_KEY"],
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    let responseJson = await response.json();
    setGoogleResponse(responseJson);
    setUploading(false);
  } catch (error) {
    console.log(error);
  }
}
