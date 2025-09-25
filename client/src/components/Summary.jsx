import { useSelector } from 'react-redux';

function Summary() {
  const { transactions } = useSelector((state) => state.transactions);

  // Calculate totals using the reduce method
  const totalIncome = transactions
    .filter((item) => item.type === 'income')
    .reduce((acc, item) => (acc += item.amount), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) => (acc += item.amount), 0);

  const balance = totalIncome - totalExpenses;

  // Helper to format numbers as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <section className='grid md:grid-cols-3 gap-6 mb-12'>
      {/* Income Card */}
      <div className='bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-green-500'>
        <h3 className='text-slate-400 text-lg'>Total Income</h3>
        <p className='text-3xl font-bold text-green-500'>{formatCurrency(totalIncome)}</p>
      </div>

      {/* Expense Card */}
      <div className='bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-red-500'>
        <h3 className='text-slate-400 text-lg'>Total Expenses</h3>
        <p className='text-3xl font-bold text-red-500'>{formatCurrency(totalExpenses)}</p>
      </div>

      {/* Balance Card */}
      <div className='bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-sky-500'>
        <h3 className='text-slate-400 text-lg'>Balance</h3>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-500'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </section>
  );
}

export default Summary;