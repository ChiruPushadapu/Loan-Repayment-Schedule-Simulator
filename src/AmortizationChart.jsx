import React, { useState,useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
//import ChartDataLabels from 'chartjs-plugin-labels';


function AmortizationChart({ repaymentSchedule }) {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  let barChart = null;
  let pieChart = null; 
  const [installmentPayment, setInstallmentPayment] = useState(0);
  
  const totalPayment = repaymentSchedule.reduce((total, payment) => total + payment.principal, 0);
  const totalInterest = repaymentSchedule.reduce((total, payment) => total + payment.interest, 0);

  useEffect(() => {

    const payment = repaymentSchedule[0];
    setInstallmentPayment(payment.total);

    if  (barChart) {
     barChart.destroy();
    }
    if (pieChart){
      pieChart.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
   barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repaymentSchedule.map(payment => payment.number),
        datasets: [
          {
            label: 'Total Payment',
            data: repaymentSchedule.map(payment => payment.totalPayment.toFixed(2)),
            backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green
            borderColor: 'rgba(0, 255, 0, 1)', // Green
            borderWidth: 1
          },
          {
            label: 'Interest',
            data: repaymentSchedule.map(payment => payment.interest.toFixed(2)),
            backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red
            borderColor: 'rgba(255, 0, 0, 1)', // Red
            borderWidth: 1
          },
          {
            label: 'Remaining',
            data: repaymentSchedule.map(payment => payment.remainingBalance.toFixed(2)),
            backgroundColor: 'rgba(0, 0, 255, 0.2)', // Blue
            borderColor: 'rgba(0, 0, 255, 1)', // Blue
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    
    const pieCtx = pieChartRef.current.getContext('2d');
    pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [
          {
            label: 'Payment Breakdown',
            data: [
              totalPayment.toFixed(2),
              totalInterest.toFixed(2)              
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              const total = context.dataset.data.reduce((total, val) => total + val, 0);
              const percentage = (value / total) * 100;
              return `${percentage.toFixed(2)}%`;
            }
          }
        }
      }
    });

    // Clean up on unmount
    return () => {
      if  (barChart) {
       barChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, [repaymentSchedule]);
  return (
  <>
  <div className = "container2">
      <div className="chart"> 
        <canvas ref={chartRef} className="chart-canvas " />
      </div>
      <div className="pie-chart">
        {/* <h2 className="chart-title">Payment Breakdown</h2> */}
        <canvas ref={pieChartRef} className="pie-chart-canvas" />
        <p className = "pie-chart-text">Repayment amount per installment : {installmentPayment.toFixed(2)}</p>
        <p className = "pie-chart-text">Total payment : {totalPayment.toFixed(2)}</p>
        <p className = "pie-chart-text">Interest : {totalInterest.toFixed(2)}</p>
      </div>
      </div>
      </>
  );
}

export default AmortizationChart;
