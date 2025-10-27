const { GoogleGenAI, Modality } = require("@google/genai");
const fs = require("fs");
require("dotenv").config();

// async function generateImage() {
//   // ✅ FIXED: Proper object with apiKey
//   const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

//   const contents = [{ text: "Image of a big tree" }];

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash-preview-image-generation",
//     contents,
//     config: {
//       responseModalities: [Modality.TEXT, Modality.IMAGE],
//     },
//   });

//   for (const part of response.candidates[0].content.parts) {
//     if (part.text) {
//       console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       const buffer = Buffer.from(imageData, "base64");
//       fs.writeFileSync("gemini-native-image.png", buffer);
//       console.log("Image saved as gemini-native-image.png");
//     }
//   }
// }

// generateImage();


async function generateImage() {
  // ✅ FIXED: Proper object with apiKey
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

  const contents = [{ text: "Image of a big tree" }];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}

generateImage();
