// // import { useState } from "react";

// // const App = () => {
// //   const [value, setValue] = useState("");
// //   const [error, setError] = useState("");
// //   const [chatHistory, setChatHistory] = useState([]);

// //   const surpriseOptions = [
// //     "Who won the t20 world cup 2023 ?",
// //     "Who won the champions trophy 2024 ?",
// //     "Who is the india t20 World cup captain ?",
// //   ];
// //   const surprise = () => {
// //     const randomValue =
// //       surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
// //     setValue(randomValue);
// //   };

// //   const getResponse = async () => {
// //     if (!value) {
// //       setError("Error: Pls Ask a question!");
// //       return;
// //     }
// //     try {
// //       const options = {
// //         method: "POST",
// //         body: JSON.stringify({
// //           history: chatHistory,
// //           message: value,
// //         }),
// //         headers: {
// //           "Content-type": "application/json",
// //         },
// //       };
// //       const response = await fetch("http://localhost:5000/gemini", options);
// //       console.log(response,"rrrrrrrrrrrrrrrrrrrrrrrr");
      
// //       const data = await response.json();
// //       console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaaa");
      
// //       setChatHistory((oldChathistory) => [
// //         ...oldChathistory,
// //         {
// //           role: "user",
// //           parts: [{ text: value }],
// //         },
// //         {
// //           role: "model",
// //           parts: [{ text: data.reply }],
// //         },
// //       ]);
// //       setValue('')
// //       console.log(data, ">>>>>>>>>>>>>>>>>>.");
// //     } catch (error) {
// //       console.log(error);
// //       setError("Something went wrong");
// //     }
// //   };


// //   const clear =()=>{
// //     setError('')
// //     setValue('')
// //     setChatHistory([])  
// //   }
// //   return (
// //     <div className="app">
// //       <p>
// //         What do you want to know ?
// //         <button className="surprise" onClick={surprise} disabled={!chatHistory}>
// //           Surprise Me!
// //         </button>
// //       </p>
// //       <div className="input-container">
// //         <input
// //           value={value}
// //           placeholder="Search here"
// //           onChange={(e) => setValue(e.target.value)}
// //         />
// //         {!error && <button onClick={getResponse}>Ask me</button>}
// //         {error && <button onClick={clear}>Clear</button>}
// //       </div>
// //       {error && <p>{error}</p>}
// //       {chatHistory.map((chatitem, _index) => (
// //         <div className="search-result">
// //           <div key={_index}>
// //             <p className="answer">
// //               {chatitem.role} : {chatitem.parts[0]?.text}
// //             </p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default App;


// import { useState } from "react";
// import Sidebar from "./components/Sidbar";

// const App = () => {
//   const [value, setValue] = useState("");
//   const [error, setError] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const surpriseOptions = [
//     "Who won the t20 world cup 2023 ?",
//     "Who won the champions trophy 2024 ?",
//     "Who is the india t20 World cup captain ?",
//   ];

//   const surprise = () => {
//     const randomValue =
//       surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
//     setValue(randomValue);
//   };

//   const getResponse = async () => {
//     if (!value) {
//       setError("Error: Pls Ask a question!");
//       return;
//     }
//     try {
//       const options = {
//         method: "POST",
//         body: JSON.stringify({
//           history: chatHistory,
//           message: value,
//         }),
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const response = await fetch("http://localhost:5000/gemini", options);
//       const data = await response.json();

//       setChatHistory((oldChat) => [
//         ...oldChat,
//         { role: "user", parts: [{ text: value }] },
//         { role: "model", parts: [{ text: data.reply }] },
//       ]);
//       setValue("");
//     } catch (error) {
//       console.log(error);
//       setError("Something went wrong");
//     }
//   };

//   const clear = () => {
//     setError("");
//     setValue("");
//     setChatHistory([]);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ marginLeft: "240px", padding: "20px", flex: 1 }}>
//         <h2>🧠 Chat with Gemini</h2>
//         <p>
//           What do you want to know?
//           <button className="surprise" onClick={surprise}>
//             Surprise Me!
//           </button>
//         </p>

//         <div className="input-container">
//           <input
//             value={value}
//             placeholder="Ask me anything..."
//             onChange={(e) => setValue(e.target.value)}
//           />
//           {!error && <button onClick={getResponse}>Ask</button>}
//           {error && <button onClick={clear}>Clear</button>}
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {chatHistory.map((chatItem, index) => (
//           <div key={index} className="search-result">
//             <p>
//               <b>{chatItem.role}:</b> {chatItem.parts[0]?.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;




import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidbar"
import ChatMessage from "./components/chat-message"
import ImagePage from "./ImagePage"
import "./styles/app.css"

const App = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { id: Date.now(), text: input, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        message: input,
      }),
    });

    const data = await response.json();

    const botMessage = {
      id: Date.now() + 1,
      text: data.reply || "No reply received from Gemini.",
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    const botMessage = {
      id: Date.now() + 1,
      text: "Error: Could not connect to Gemini API.",
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
  } finally {
    setLoading(false);
  }
};


  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="app-container">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content">
              <div className="chat-wrapper">
                {messages.length === 0 ? (
                  <div className="welcome-section">
                    <div className="welcome-header">
                      <h1>Welcome to Gemini AI</h1>
                      <p>Your intelligent AI assistant powered by Google Gemini</p>
                    </div>
                    <div className="surprise-section">
                      <span className="section-label">Try asking something</span>
                      <button className="surprise-btn" onClick={() => setInput("Tell me a fun fact about space")}>
                        ✨ Surprise Me
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="chat-messages">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {loading && <ChatMessage message={{ id: "loading", text: "Thinking...", sender: "bot" }} />}
                  </div>
                )}
              </div>

              <div className="input-section">
                <div className="input-container">
                  <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Ask me anything..."
                    rows="3"
                  />
                  <div className="button-group">
                    {messages.length > 0 && (
                      <button className="clear-btn" onClick={handleClearChat}>
                        Clear Chat
                      </button>
                    )}
                    <button className="send-btn" onClick={handleSendMessage} disabled={loading || !input.trim()}>
                      {loading ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/image" element={<ImagePage />} />
      </Routes>
    </div>
  )
}

export default App
