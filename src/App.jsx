import React, { useRef, useState , useEffect, useCallback } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  
import InputForm from './InputForm';
import RepaymentSchedule from './RepaymentSchedule';
import { calculateRepaymentSchedule } from './repaymentUtils';
import AmortizationChart from './AmortizationChart';
import PDFDownloadButton from './PDFDownloadButton';
import ProfilePic from './assets/loan.png';
import favicon from './assets/favicon.ico';
import StandingBoy from './StandingBoy';

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
    <>
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
    </>
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
