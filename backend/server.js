require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generative-ai')
const { GoogleGenAI, Modality } = require("@google/genai");
const fs = require("fs");
const cloudinary = require('cloudinary')
const app = express()

app.use(cors())
app.use(express.json());

const PORT = 5000;


cloudinary.config({
    cloud_name :"dt6pxtrpl",
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

console.log(process.env.GOOGLE_GEMINI_API_KEY,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");


const genAi = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)

app.post('/gemini',async(req,res)=>{
    console.log(req.body.history,"hhhhhhhhhhhhhhhhhhh");
    console.log(req.body.message,"mmmmmmmmmmmmmmmmmmmmm");
    try {
        const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const rawHistory = req.body.history || [];

        const history = rawHistory
            .filter(entry =>
                entry &&
                entry.role &&
                Array.isArray(entry.parts) &&
                entry.parts.length > 0 &&
                typeof entry.parts[0].text === 'string'
            )
            .map(entry => ({
                role: entry.role,
                parts: [{ text: entry.parts[0].text }]
            }));

    
        const chat = model.startChat({
          history: history || [], 
        });
    
        const msg = req.body.message;
        console.log(msg,"mmmmmmmmmmmmmsssssssssssggggggggggg");
        
        const result = await chat.sendMessage(msg);
        console.log(result,"pppppppppppppppppppppppppp");
        const response =  result.response;
    
        res.json({ reply: response.text() });
    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).send({ error: "Something went wrong with Gemini API." });
      }
    });


const uploadToCloudinary = async (base64Image) => {
        try {
          const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
            folder: 'gemini-images', // optional folder
          });
          console.log("Cloudinary URL:", result.secure_url);
          return result.secure_url;
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw error;
        }
      };
      
app.post('/gemini-img',async(req,res) =>{
        console.log(req.body,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        
        // ✅ FIXED: Proper object with apiKey
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });
      
        const contents = [{ text: req.body.message}];
      
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
            if (part.inlineData) {
                const base64Image = imageData;
                const imageUrl = await uploadToCloudinary(base64Image);
                return res.json({ status: "success", url: imageUrl });
              }
              return res.json({
                message :"No initial data"
              })
            // const buffer = Buffer.from(imageData, "base64");
    
            // fs.writeFileSync("gemini-native-image.png", buffer);
            // const response = buffer
           
          }
        }
      })
      
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})