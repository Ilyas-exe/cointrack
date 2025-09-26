import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecurring, applyRecurring, reset, deleteRecurring, applySingleRecurring } from '../features/recurring/recurringSlice';
import { getTransactions } from '../features/transactions/transactionSlice';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

function RecurringExpenses() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.recurring);
  const { selectedCurrency, rates } = useSelector((state) => state.currency);
  const rate = rates[selectedCurrency] || 1;

  useEffect(() => {
    dispatch(getRecurring());
  }, [dispatch]);

  const onApply = () => {
    dispatch(applyRecurring()).then(() => {
        toast.success('Recurring expenses applied!');
        dispatch(getTransactions());
    });
  };

  const onApplySingle = (id) => {
    dispatch(applySingleRecurring(id)).then(() => {
        toast.success('Expense applied!');
        dispatch(getTransactions());
    }).catch(() => toast.error('Already applied this month'));
  };

  if (!items || items.length === 0) {
    return (
        <div className='bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col'>
            <h3 className='text-xl font-bold mb-4 text-center'>Monthly Recurring</h3>
            <div className='flex-grow flex items-center justify-center'>
                <p className='text-slate-500'>No recurring expenses saved.</p>
            </div>
        </div>
    );
  }

  return (
    <div className='bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col h-full'>
      <h3 className='text-xl font-bold mb-4 text-center'>Monthly Recurring</h3>
      {items && items.length > 0 ? (
        <>
          <ul className='space-y-3 mb-5 flex-grow overflow-y-auto max-h-[200px] pr-2 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-slate-700'>
            {items.map((item) => (
              <li key={item._id} className="flex justify-between items-center bg-slate-700 p-3 rounded-md group">
                <span className='font-medium'>{item.text}</span>
                <div className='flex items-center gap-3'>
                  <span className='text-slate-400'>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(item.amount * rate)}
                  </span>
                  <button onClick={() => onApplySingle(item._id)} className="bg-sky-800 text-xs py-1 px-2 rounded hover:bg-sky-700 transition-colors">Apply</button>
                  <button onClick={() => dispatch(deleteRecurring(item._id))} className='text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={onApply} className='w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition'>
            Apply All Due Expenses
          </button>
        </>
      ) : (
        <div className='flex-grow flex items-center justify-center'>
            <p className='text-slate-500'>No recurring expenses saved.</p>
        </div>
      )}
    </div>
  );
}
export default RecurringExpenses;