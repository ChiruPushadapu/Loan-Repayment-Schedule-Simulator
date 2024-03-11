// App.js

import React, { useRef, useState , useEffect, useCallback } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  
import InputForm from './InputForm';
import RepaymentSchedule from './RepaymentSchedule';
import { calculateRepaymentSchedule } from './repaymentUtils';
import AmortizationChart from './AmortizationChart';
import PDFDownloadButton from './PDFDownloadButton';
import ProfilePic from './assets/loan.png';
import favicon from './assets/favicon.ico';

function Chatbox() {
  return (
    <div className="chat-box">
      <div className="message">
        <p>User: Hello</p>
      </div>
      <div className="message">
        <p>Bot: Hi there! I'm here to assist you with any questions you have.</p>
      </div>
      <div className="message">
        <p>User: typing..</p>
      </div>
    </div>
  );
}


function StandingBoy() {

  const[currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const poses = ["src/assets/feddy-two.png", "src/assets/feddy-three.png", "src/assets/feddy-one.png"];
  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox(prevState => !prevState);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoseIndex((prevIndex) => (prevIndex + 1) % poses.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="standing-container">
      <div className = "standing-boy" onClick = {toggleChatBox}>
      <img src={poses[currentPoseIndex]} alt="Standing Boy" height= "300px" width = "100px"/>
      {currentPoseIndex === 2 && <p className = "standing-boy-msg">Hi, I'm Chiru, your personal assistant</p>}
    </div>
      {showChatBox && <Chatbox />}
    </div>
  );
};

function App() {

  useEffect(() => {
    document.title = "Loan Repayment Scheduler  ";    
  }, []);
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  })
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);


  const [loanDetails, setLoanDetails] = useState({
    loanAmount: 100000,
    interestRate: 2.5,
    loanTerm: 12,
    startDate: new Date(),
    paymentFrequency: "monthly",
  });

  const [repaymentSchedule, setRepaymentSchedule] = useState(calculateRepaymentSchedule(loanDetails));
  const [showRepaymentSchedule, setShowRepaymentSchedule] = useState(true);
  const [showAmortizationChart, setShowAmortizationChart] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(true);



  const handleLoanDetailsChange = useCallback((updatedLoanDetails) => {
    setLoanDetails(() => updatedLoanDetails);
    const schedule = calculateRepaymentSchedule(updatedLoanDetails);
    setRepaymentSchedule(schedule);
    setShowRepaymentSchedule(true);
    setShowAmortizationChart(true); 
    setShowDownloadButton(true);
  }, []);
  
  const handleCalculateClick = useCallback((loanDetails) => {
    const schedule = calculateRepaymentSchedule(loanDetails);
    setRepaymentSchedule(schedule);
    setShowRepaymentSchedule(true);
    setShowAmortizationChart(true);
    setShowDownloadButton(true);      
  }, []);


    const content1Ref = useRef(null);
    const content2Ref = useRef(null);

  return (
    <div>
      <header>  
        <img className = "logo" src={ProfilePic} alt = "My Logo"/>
        <h1 className = "title" >Loan Repayment Schedule Simulator</h1>
      </header>
      <div style = {{display : 'flex'}}>
        <div style = {{flex :  1}}>
      <div ref = {content1Ref}>
      <InputForm onLoanDetailsChange={handleLoanDetailsChange} onCalculateClick={handleCalculateClick}/>
      </div>
      </div>
      <div style = {{flex : 1}}>
      <div ref = {content2Ref}>
        {showAmortizationChart && repaymentSchedule.length > 0 && <AmortizationChart repaymentSchedule={repaymentSchedule} />}
      </div>
      </div>
      </div>

      <StandingBoy/>
      {showRepaymentSchedule && <RepaymentSchedule loanDetails={loanDetails} />}

      
      {showDownloadButton && <PDFDownloadButton contentRefs={[content1Ref, content2Ref]} repaymentSchedule = {repaymentSchedule}/>}  

      
    </div>
  );
  // return(
  //   <Router>
  //     <Switch>
  //       <Route path = "/" exact component = {InputForm} />
  //       <Route path = "/repayment" component = {RepaymentSchedule} />
  //       <Route path="/result" component={AmortizationChart} /> 
  //     </Switch>
  //   </Router>
  // );
// 
  }

  

export default App;
