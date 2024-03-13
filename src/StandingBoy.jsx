import React, {useState, useEffect} from 'react'
import Chatbox from './ChatBox';

function StandingBoy() {

    const[currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const poses = ["src/assets/feddy-two.png", "src/assets/feddy-three.png", "src/assets/feddy-one.png"];
    const [showChatBox, setShowChatBox] = useState(false);
  
    const toggleChatBox = () => {   
      setShowChatBox(prevState => !prevState);
    }

    const closeChatBox = () => {
        setShowChatBox(false);
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPoseIndex((prevIndex) => (prevIndex + 1) % poses.length);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="standing-container">
        {!showChatBox && (
            <div className = "standing-boy" onClick = {toggleChatBox}>
                <img src={poses[currentPoseIndex]} alt="Standing Boy" height= "300px" width = "100px"/>
                {currentPoseIndex === 2 && <p className = "standing-boy-msg">Hi, I'm Chiru, your personal assistant</p>}
            </div>
        )}        
        {showChatBox && <Chatbox onClose = {closeChatBox}/>}
      </div>
    );
}
export default StandingBoy