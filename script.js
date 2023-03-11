const calculatePaymentData = (principle, rate, frequency, payment) => {
  // Calculate other necessary variables
  const monthlyRate = rate / 12;
  const totalMonths = frequency * 12;

  // Initialize some variables for the table
  let remainingMonths = totalMonths;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let totalPaid = 0;

  // Create an array to hold the payment data for each month
  const paymentData = [];

  // Loop through each month and calculate the payment data
  for (let month = 1; month <= totalMonths; month++) {
    const monthlyInterest = principle * monthlyRate;
    const monthlyPrincipal = payment - monthlyInterest;
    const principlePayment = Math.min(principle, monthlyPrincipal);
    principle -= principlePayment;

    totalInterestPaid += monthlyInterest;
    totalPrincipalPaid += principlePayment;
    totalPaid = totalPrincipalPaid + totalInterestPaid;

    const monthData = {
      month: month,
      remainingMonths: remainingMonths,
      principle: principle,
      monthlyInterest: monthlyInterest,
      monthlyPrincipal: monthlyPrincipal,
      principlePayment: principlePayment,
      totalInterestPaid: totalInterestPaid,
      totalPrincipalPaid: totalPrincipalPaid,
      totalPaid: totalPaid
    };

    paymentData.push(monthData);
    console.log(paymentData)
    remainingMonths--;

    if(principle <= 0){
      break;
    }
    
  }

  return paymentData;
};

const generateTableRows = (paymentData) => {
  clearTable();
  
  paymentData.forEach((monthData) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${monthData.month}</td>
      <td>${monthData.remainingMonths}</td>
      <td>${monthData.principle.toFixed(2)}</td>
      <td>${monthData.monthlyInterest.toFixed(2)}</td>
      <td>${monthData.monthlyPrincipal.toFixed(2)}</td>
     
      <td>${monthData.totalInterestPaid.toFixed(2)}</td>
      <td>${monthData.totalPrincipalPaid.toFixed(2)}</td>
      <td>${monthData.totalPaid.toFixed(2)}</td>
    `;
    document.getElementById("paymentTable").appendChild(newRow);
  });
};



const chartData = (paymentData) => {
 clearChart()
  let xValues = paymentData.map(data => data.month);
  let yValuesBalance = paymentData.map(data => data.principle);
  let yValuesInterest = paymentData.map(data => data.totalInterestPaid);
  let yValuesPrincipal = paymentData.map(data => data.totalPaid);

  let myChart = new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: 'Balance',
        data: yValuesBalance,
        borderColor: "red",
        fill: false
      },{
        label: 'Interest Paid',
        data: yValuesInterest,
        borderColor: "green",
        fill: false
      },{
        label: 'Total Paid',
        data: yValuesPrincipal,
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: {display: true}
    }
  });
};


const getInputData = () => {
  const principle = Number(document.getElementById("principle").value);
  const rate = Number(document.getElementById("rate").value);
  const frequency = Number(document.getElementById("frequency").value);
  const payment = Number(document.getElementById("payment").value);  
  const paymentData = calculatePaymentData(principle, rate, frequency, payment);
  generateTableRows(paymentData);
  chartData(paymentData);
}

const clearChart = () => {
  const chartInstance = Chart.getChart("myChart");
  if (chartInstance) {
    chartInstance.destroy();
  }
};


const clearInputs = () => { 
  const inputValues = document.querySelectorAll('.formInputs');
  inputValues.forEach((input) => {
    input.value = '';
  });
}

const clearTable = () => {
  const paymentTable = document.getElementById('paymentTable');
  while (paymentTable.rows.length > 1) {
    paymentTable.deleteRow(1);
  }
}



    


