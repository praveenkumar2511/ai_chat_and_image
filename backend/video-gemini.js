require('dotenv').config();

const { GoogleGenAI } = require("@google/genai");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

// async function main() {
//   let operation = await ai.models.generateVideos({
//     model: "veo-2.0-generate-001",
//     prompt: "Panning wide shot of a calico kitten sleeping in the sunshine",
//     config: {
//       personGeneration: "dont_allow",
//       aspectRatio: "16:9",
//     },
//   });

//   while (!operation.done) {
//     await new Promise((resolve) => setTimeout(resolve, 10000));
//     operation = await ai.operations.getVideosOperation({
//       operation: operation,
//     });
//   }
//   const models = await ai.listModels();
//   console.log(models,"ooooooooooooooooooooooooooooooooo");
//   operation.response?.generatedVideos?.forEach(async (generatedVideo, n) => {
//     const resp = await fetch(`${generatedVideo.video?.uri}&key=GOOGLE_API_KEY`); // append your API key
//     const writer = createWriteStream(`video${n}.mp4`);
//     Readable.fromWeb(resp.body).pipe(writer);
//   });
// }

// main();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

async function main() {
  // 🔍 Check available models
  const models = await ai.listModels();
  console.log("Available models:");
  models.forEach((model) => {
    console.log(`- ${model.name}`);
  });

  // You can now pick a model from this list, e.g. "gemini-1.5-pro"
}

main();

