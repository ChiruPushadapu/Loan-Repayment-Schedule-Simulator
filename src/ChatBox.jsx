
function ChatBox({onClose}) {
  
  const handleClose = () => {
    onClose();
  }
    return (
      <div className="card">
        <div className="chat-header">Chat  <button onClick = {handleClose}>Close</button></div>
        
        <div className="chat-window">
          <ul className="message-list"></ul>
        </div>
        <div className="chat-input">
            <input type="text" className="message-input" placeholder="Type your message here"></input>
            <button className="send-button">Send</button>
        </div>
      </div>  
    );
}

export default ChatBox;