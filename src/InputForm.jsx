import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

const InputForm = ({ onLoanDetailsChange, onCalculateClick }) => {

  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(2.5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [startDate, setStartDate] = useState(new Date());
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [errors, setErrors] = useState({});

  function validateLoanAmount(value) {
    if (value < 0 || value > 10000000) {
      return 'Loan amount must be between 0 and 10000000';
    }
    return '';
  }

  function validateInterestRate(value) {
    if (value < 0 || value > 25) {
      return 'Interest rate must be between 0 and 25';
    }
    return '';
  }

  function validateLoanTerm(value) {
    if (value < 0 || value > 480) {
      return 'Loan term must be between 0 and 480';
    }
    return '';
  }

  function validateStartDate(value) {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    if (selectedDate <= currentDate) {
      return ('Please select a future start date.');
    }
    return '';
  }

  function handleLoanAmountChange(e) {
    const value = parseInt(e.target.value);
    setLoanAmount(value);
    onLoanDetailsChange({
      loanAmount: value,
      interestRate,
      loanTerm,
      startDate,
      paymentFrequency
    });
    setErrors({ ...errors, loanAmount: validateLoanAmount(value) });
  }

  function handleInterestRateChange(e) {
    const value = parseFloat(e.target.value);
    setInterestRate(value);
    onLoanDetailsChange({
      loanAmount,
      interestRate : value,
      loanTerm,
      startDate,
      paymentFrequency
    });
    setErrors({ ...errors, interestRate: validateInterestRate(value) });
  }

  function handleLoanTermChange(e) {
    const value = parseInt(e.target.value);
    setLoanTerm(value);
    onLoanDetailsChange({
      loanAmount,
      interestRate,
      loanTerm : value,
      startDate,
      paymentFrequency
    });
    setErrors({ ...errors, loanTerm: validateLoanTerm(value) });
  }

  function handleStartDateChange(e) {
    const value = new Date(e.target.value);
    setStartDate(value);
    onLoanDetailsChange({
      loanAmount,
      interestRate,
      loanTerm,
      startDate : value,
      paymentFrequency
    });
    setErrors({ ...errors, startDate: validateStartDate(value) });
  }

  function handlePaymentFrequencyChange(e) {
    const value = e.target.value;
    setPaymentFrequency(value);
    onLoanDetailsChange({
      loanAmount,
      interestRate,
      loanTerm,
      startDate,
      paymentFrequency : value
    });
    
  }

  const handleCalculateClick = () => {
    onCalculateClick({loanAmount, interestRate, loanTerm, startDate, paymentFrequency }); // Trigger the calculate click event
  };

  return (
    <div className = "form-wrapper">
      <p className='sub-title'>Loan Amortization Calculator</p>
      <p className='msg'>Use our Loan Amortization calculator to calculate the amount you need to pay per installment based on the Loan Amount, Annual Interest Rate, Total Period, Start date and frequency of payment</p>
      <div className="input-wrapper">
        <label htmlFor="loanAmount">Loan Amount: {loanAmount}</label>
        <input
          type="range"
          id="loanAmount"
          min={100000}
          max={10000000}
          step={100000}
          value={loanAmount}
          onChange={handleLoanAmountChange}
          list="tickmarks"
        />
        <input
        type="text"
        id="loanAmountInput"
        value={loanAmount}
        onChange={handleLoanAmountChange}
      />
      </div>
      <div className="input-wrapper">
        <label htmlFor="interestRate">Interest Rate: {interestRate}%</label>
        <input
          type="range"
          id="interestRate"
          min={0.25}
          max={25}
          step={0.25}
          value={interestRate}
          onChange={handleInterestRateChange}
        />
        <input
        type="text"
        id="interestRateInput"
        value={interestRate}
        onChange={handleInterestRateChange}
      />
      </div>
      <div className="input-wrapper">
        <label htmlFor="loanTerm">Loan Term (months): {loanTerm}</label>
        <input
          type="range"
          id="loanTerm"
          min={3}
          max={480}
          step={3}
          value={loanTerm}
          onChange={handleLoanTermChange}
        />
        <input
        type="text"
        id="loanTermInput"
        value={loanTerm}
        onChange={handleLoanTermChange}
      />
      </div>
      <div className="input-wrapper">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate.toISOString().split('T')[0]}
          onChange={handleStartDateChange}
        />
        {errors.startDate && <span>{errors.startDate}</span>}
      </div>
      <div className="input-wrapper">
        <label htmlFor="paymentFrequency">Payment Frequency:</label>
        <select
          id="paymentFrequency"
          value={paymentFrequency}
          onChange={handlePaymentFrequencyChange}
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      <div className="btn-conteiner">
        <a className="btn-content" href="#" onClick={handleCalculateClick}>  
          <span className="btn-title">Calculate</span>
          <span className="icon-arrow">
            <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
              </g>
            </svg>
          </span> 
        </a>
      </div>
      {/* <button className = "calculate-button"  onClick={handleCalculateClick}>Calculate</button> */}
    </div>
  );
};

export default InputForm;
