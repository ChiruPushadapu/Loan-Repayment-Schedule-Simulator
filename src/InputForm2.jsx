import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [startDate, setStartDate] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate loan amount
    if (loanAmount <= 0 || isNaN(loanAmount)) {
      alert('Please enter a valid loan amount.');
      return;
    }
  
    // Validate interest rate
    if (interestRate < 0 || isNaN(interestRate)) {
      alert('Please enter a valid interest rate.');
      return;
    }
  
    // Validate loan term
    if (loanTerm <= 0 || !Number.isInteger(loanTerm)) {
      alert('Please enter a valid loan term.');
      return;
    }
  
    // Validate start date
    const currentDate = new Date();
    const selectedDate = new Date(startDate);
    if (selectedDate <= currentDate) {
      alert('Please select a future start date.');
      return;
    }
  
    // All inputs are valid, proceed with onSubmit
    onSubmit({ loanAmount, interestRate, loanTerm, startDate, currency });
  };
  

  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          
        </select>
      </div>
      <div>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          min={0}
          step={1000}
          onChange={(e) => setLoanAmount(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="interestRate">Interest Rate:</label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          min={0}
          max={100}
          step={0.1}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="loanTerm">Loan Term (months):</label>
        <input
          type="number"
          id="loanTerm"
          value={loanTerm}
          min={1}
          step={1}
          onChange={(e) => setLoanTerm(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="paymentFrequency">Payment Frequency:</label>
        <select
          id="paymentFrequency"
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      
      <button type="submit">Calculate</button>
    </form>
  );
};

export default InputForm;
