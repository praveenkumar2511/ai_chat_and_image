require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function describeImage() {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const imagePath = path.join(__dirname, 'gemini-native-image.png');
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString('base64');

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Image,
          }
        },
        {
          text: "Describe this image in detail."
        }
      ]
    }
  ];

  const result = await model.generateContent({ contents });

  const responseText = await result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("🧠 AI Description:\n", responseText);
  const partText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("🧠 AI Part Text:\n", partText);
  console.dir(result, { depth: null });

}

describeImage();
