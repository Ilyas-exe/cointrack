import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TransactionChart() {
  const { transactions } = useSelector((state) => state.transactions);
    const { selectedCurrency, rates } = useSelector((state) => state.currency);
  const rate = rates[selectedCurrency] || 1;

  // 1. Filter for expenses and aggregate data by description (text)
  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      const convertedAmount = transaction.amount * rate;
      acc[transaction.text] = (acc[transaction.text] || 0) + transaction.amount;
      return acc;
    }, {});

  // 2. Prepare data for the chart
  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenseData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderColor: '#1E293B', // slate-800
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency,
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
      legend: {
        labels: {
          color: '#F1F5F9', // slate-100
        },
      },
    },
  };

  // Don't render the chart if there are no expenses
  if (Object.keys(expenseData).length === 0) {
    return null;
  }

  return (
    <div className='max-w-xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg mt-12'>
      <h2 className='text-2xl font-bold text-center mb-6'>Expense Breakdown</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default TransactionChart;