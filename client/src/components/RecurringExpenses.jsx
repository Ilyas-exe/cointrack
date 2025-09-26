import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecurring, applyRecurring, reset } from '../features/recurring/recurringSlice';
import { getTransactions } from '../features/transactions/transactionSlice';
import { applySingleRecurring } from '../features/recurring/recurringSlice';
import { toast } from 'react-toastify';

function RecurringExpenses() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.recurring);

  useEffect(() => {
    dispatch(getRecurring());
    return () => dispatch(reset());
  }, [dispatch]);

  const onApply = () => {
    dispatch(applyRecurring()).then(() => {
        toast.success('Recurring expenses applied!');
        dispatch(getTransactions()); // Refresh the main transaction list
    });
  };

  const onApplySingle = (id) => {
    dispatch(applySingleRecurring(id)).then(() => {
        toast.success('Expense applied!');
        dispatch(getTransactions()); // Refresh the main transaction list
    }).catch(() => toast.error('Already applied this month'));
  };

  if (items.length === 0) return null;

  return (
    <section className='lg:w-1/2'>
      <div className='bg-slate-800 p-8 rounded-xl'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Monthly Recurring</h2>
        <ul className='space-y-2 mb-6'>
          {items.map(item => (
            <li key={item._id} className="flex justify-between items-center">
              <span>{item.text}</span>
              <div className='flex items-center gap-2'>
                <span>${item.amount}</span>
                <button onClick={() => onApplySingle(item._id)} className="bg-sky-800 text-xs py-1 px-2 rounded hover:bg-sky-700">Apply</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onApply} className='w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700'>
          Apply All Due Expenses
        </button>
      </div>
    </section>
  );
}
export default RecurringExpenses;