import React from 'react';
import PropTypes from 'prop-types'
import { calculateRepaymentSchedule } from './repaymentUtils'
import * as XLSX from  'xlsx'
import  jsPDF from 'jspdf';
import 'jspdf-autotable';   


function RepaymentSchedule({loanDetails}) {

  const { loanAmount, interestRate, loanTerm, startDate, paymentFrequency } = loanDetails;  
    
  const repaymentSchedule = calculateRepaymentSchedule(loanDetails);


  let firstColumnLabel;
  switch (paymentFrequency) {
    case 'weekly':
      firstColumnLabel = 'Week Number';
      break;
    case 'biweekly':
      firstColumnLabel = 'Installment Number';
      break;
    case 'monthly':
      firstColumnLabel = 'Month Number';
      break;
    case 'quarterly':
      firstColumnLabel = 'Quarter Number';
      break;
    default:
      firstColumnLabel = 'Time Unit';
  }

  function getFirstColumnValue(payment, paymentFrequency) {
    switch (paymentFrequency) {
      case 'weekly':
        return payment.number;
      case 'biweekly':
        return payment.number;
      case 'monthly':
        return payment.number;
      case 'quarterly':
        return payment.number;
      default:
        return '';
    }
  }
  function formatDate(date)
  {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    calculateRepaymentSchedule,
    <div>
    <table>
      <thead>
        <tr>
          <th>{firstColumnLabel}</th>
          <th>Payment Date</th>
          <th>Principal Amount</th>
          <th>Interest Amount</th>
          <th>Principal + Interest</th>
          <th>Total Payment</th>
          <th>Remaining Balance</th>
        </tr>
      </thead>
      <tbody>
        {repaymentSchedule.map((payment, index) => (
          <tr key={index}>
            <td>{getFirstColumnValue(payment, paymentFrequency)}</td>
            <td>{formatDate(payment.paymentDate)}</td>
            <td>{payment.principal.toFixed(2)}</td>
            <td>{payment.interest.toFixed(2)}</td>
            <td>{payment.total.toFixed(2)}</td>
            <td>{payment.totalPayment.toFixed(2)}</td>
            <td>{payment.remainingBalance.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}


export default RepaymentSchedule;
