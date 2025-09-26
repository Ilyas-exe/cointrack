import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { createTransaction } from '../features/transactions/transactionSlice';
import { addRecurring } from '../features/recurring/recurringSlice';

function TransactionForm() {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [isRecurring, setIsRecurring] = useState(false);

  const dispatch = useDispatch();
  const { selectedCurrency, rates } = useSelector((state) => state.currency);

  const onSubmit = (e) => {
    e.preventDefault();

    const rate = rates[selectedCurrency] || 1;
    const amountInUSD = +amount / rate;

    if (isRecurring) {
      dispatch(addRecurring({ text, amount: amountInUSD  }));
    } else {
      dispatch(createTransaction({ text, amount: amountInUSD, type }));
    }

    setText('');
    setAmount('');
    setIsRecurring(false);
  };

  return (
    <section className='max-w-xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-6'>Add New Transaction</h2>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor='text' className='block mb-2 font-medium'>Description</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='e.g., Coffee, Salary'
            className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='amount' className='block mb-2 font-medium'>Amount</label>
          <input
            type='number'
            name='amount'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
            className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 font-medium'>Type</label>
          <div className='flex gap-4'>
            <label className='flex items-center gap-2'>
              <input type='radio' name='type' value='income' checked={type === 'income'} onChange={(e) => setType(e.target.value)} className='form-radio text-green-500' />
              Income
            </label>
            <label className='flex items-center gap-2'>
              <input type='radio' name='type' value='expense' checked={type === 'expense'} onChange={(e) => setType(e.target.value)} className='form-radio text-red-500' />
              Expense
            </label>
          </div>
        </div>
        <div className='mb-6'>
          <label className='flex items-center gap-2'>
            <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
            Save as a monthly recurring expense
          </label>
        </div>
        <div>
          <button type='submit' className='w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition duration-300'>
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;