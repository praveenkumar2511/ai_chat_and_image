// // import { useState } from "react";

// // const ImagePage = () => {
// //   const [prompt, setPrompt] = useState("");
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const generateImage = async () => {
// //     if (!prompt) {
// //       setError("Please enter a prompt!");
// //       return;
// //     }
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const response = await fetch("http://localhost:5000/gemini-img", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ message: prompt }),
// //       });
// //       const data = await response.json();
// //       console.log(data);

// //       if (data.url) {
// //         setImageUrl(data.url);
// //       } else {
// //         setError("Image not generated. Try again.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Something went wrong while generating image.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const clear = () => {
// //     setPrompt("");
// //     setImageUrl("");
// //     setError("");
// //   };

// //   return (
// //     <div className="image-page">
// //       <h2>🎨 Generate AI Image</h2>

// //       <div className="input-container">
// //         <input
// //           type="text"
// //           value={prompt}
// //           placeholder="Enter a prompt (e.g., A futuristic city at sunset)"
// //           onChange={(e) => setPrompt(e.target.value)}
// //         />
// //         <button onClick={generateImage} disabled={loading}>
// //           {loading ? "Generating..." : "Generate Image"}
// //         </button>
// //         <button onClick={clear}>Clear</button>
// //       </div>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {imageUrl && (
// //         <div className="image-result">
// //           <img
// //             src={imageUrl}
// //             alt="AI generated result"
// //             style={{
// //               width: "400px",
// //               height: "auto",
// //               borderRadius: "10px",
// //               marginTop: "20px",
// //             }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ImagePage;


// import { useState } from "react";
// import Sidebar from "./components/Sidbar";

// const ImagePage = () => {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateImage = async () => {
//     if (!prompt) {
//       setError("Please enter a prompt!");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/gemini-img", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: prompt }),
//       });
//       const data = await response.json();

//       if (data.url) {
//         setImageUrl(data.url);
//       } else {
//         setError("Image not generated. Try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong while generating image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clear = () => {
//     setPrompt("");
//     setImageUrl("");
//     setError("");
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ marginLeft: "240px", padding: "20px", flex: 1 }}>
//         <h2>🎨 Gemini Image Generator</h2>

//         <div className="input-container">
//           <input
//             type="text"
//             value={prompt}
//             placeholder="Enter a creative prompt..."
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <button onClick={generateImage} disabled={loading}>
//             {loading ? "Generating..." : "Generate"}
//           </button>
//           <button onClick={clear}>Clear</button>
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {imageUrl && (
//           <div className="image-result">
//             <img
//               src={imageUrl}
//               alt="AI result"
//               style={{
//                 width: "400px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImagePage;


// import { useState } from "react"
// import Sidebar from "./components/Sidbar"
// import "./styles/image-page.css"

// const ImagePage = () => {
//   const [prompt, setPrompt] = useState("")
//   const [imageUrl, setImageUrl] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const generateImage = async () => {
//     if (!prompt) {
//       setError("Please enter a prompt!")
//       return
//     }
//     setError("")
//     setLoading(true)
//     try {
//       const response = await fetch("http://localhost:5000/gemini-img", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: prompt }),
//       })
//       const data = await response.json()

//       if (data.url) {
//         setImageUrl(data.url)
//       } else {
//         setError("Image not generated. Try again.")
//       }
//     } catch (err) {
//       console.error(err)
//       setError("Something went wrong while generating image.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const clear = () => {
//     setPrompt("")
//     setImageUrl("")
//     setError("")
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       generateImage()
//     }
//   }

//   return (
//     <div className="app-container">
//       <Sidebar />
//       <main className="main-content">
//         <div className="image-wrapper">
//           <div className="image-header">
//             <h1>AI Image Generator</h1>
//             <p>Describe what you want to see, and let AI create it</p>
//           </div>

//           <div className="input-section">
//             <div className="input-container">
//               <textarea
//                 type="text"
//                 value={prompt}
//                 placeholder="Describe your image in detail..."
//                 onChange={(e) => setPrompt(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="chat-input"
//                 rows="3"
//               />
//               <div className="button-group">
//                 <button onClick={generateImage} disabled={loading || !prompt.trim()} className="send-btn">
//                   {loading ? "Generating..." : "Generate"}
//                 </button>
//                 <button onClick={clear} className="clear-btn">
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           {imageUrl && (
//             <div className="image-result">
//               <img src={imageUrl || "/placeholder.svg"} alt="Generated AI image" />
//             </div>
//           )}

//           {loading && (
//             <div className="loading-state">
//               <div className="spinner"></div>
//               <p>Creating your image...</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }

// export default ImagePage


import { useState } from "react"
import "./styles/image-page.css"

const ImagePage = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)

const handleGenerateImage = async () => {
  if (!prompt.trim()) return; // don’t call API if prompt is empty

  setLoading(true);
  setImage(null); // clear previous image if any

  try {
    // 🧠 Call your backend API (which calls Gemini + Cloudinary)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/gemini-im`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    // Parse JSON from server
    const data = await response.json();

    // ✅ The server sends back { status: "success", url: "https://cloudinary.com/..." }
    if (data.status === "success" && data.url) {
      setImage(data.url);
    } else {
      alert("Failed to generate image. Try again!");
    }
  } catch (error) {
    console.error("Error calling image API:", error);
    alert("Error connecting to Gemini API.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="main-content">
      <div className="image-wrapper">
        <div className="image-header">
          <h1>Image Generator</h1>
          <p>Create stunning images with AI</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Generating your image...</p>
          </div>
        ) : image ? (
          <div className="image-result">
            <img src={image || "/placeholder.svg"} alt="Generated" />
          </div>
        ) : (
          <div className="image-result">
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Enter a prompt and click generate to create an image
            </p>
          </div>
        )}

        <div className="input-section">
          <div className="input-container">
            <textarea
              className="chat-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              rows="3"
            />
            <div className="button-group">
              {image && (
                <button className="clear-btn" onClick={() => setImage(null)}>
                  Clear
                </button>
              )}
              <button className="send-btn" onClick={handleGenerateImage} disabled={loading || !prompt.trim()}>
                {loading ? "Generating..." : "Generate Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage