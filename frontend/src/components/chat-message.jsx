import "../styles/chat-message.css"

const ChatMessage = ({ message }) => {
  return (
    <div className={`message-wrapper ${message.sender === "user" ? "user-message" : "model-message"}`}>
      <div className="message-content">
        <div className={`message-bubble ${message.sender === "user" ? "user-bubble" : "model-bubble"}`}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
