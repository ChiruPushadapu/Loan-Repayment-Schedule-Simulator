import React, { useState } from 'react';

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
      return 'Please select a future start date.';
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
      <button className = "calculate-button"  onClick={handleCalculateClick}>Calculate</button>
    </div>
  );
};

export default InputForm;
