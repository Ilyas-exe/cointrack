import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecurring, applyRecurring, reset } from '../features/recurring/recurringSlice';
import { getTransactions } from '../features/transactions/transactionSlice';
import { applySingleRecurring } from '../features/recurring/recurringSlice';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

function RecurringExpenses() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.recurring);
    const { selectedCurrency, rates } = useSelector((state) => state.currency);
    const rate = rates[selectedCurrency] || 1;

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
    <div className='bg-slate-800 p-6 rounded-xl shadow-lg'>
      <h3 className='text-xl font-bold mb-4 text-center'>Monthly Recurring</h3>
      <ul className='space-y-3 mb-5'>
        {items.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-slate-700 p-3 rounded-md group">
            <span className='font-medium'>{item.text}</span>
            <div className='flex items-center gap-3'>
              <span className='text-slate-400'>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(item.amount * rate)}
              </span>
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
    </div>
  );
}
export default RecurringExpenses;