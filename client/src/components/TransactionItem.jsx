import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionSlice';

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`bg-slate-800 p-4 rounded-lg flex justify-between items-center border-l-4 relative group ${
        transaction.type === 'income' ? 'border-green-500' : 'border-red-500'
      }`}
    >
      <div>
        <h3 className='font-bold text-lg'>{transaction.text}</h3>
        <p className='text-sm text-slate-400'>
          {new Date(transaction.createdAt).toLocaleDateString('en-US')}
        </p>
      </div>
      <div
        className={`font-bold text-xl ${
          transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
      </div>
      <button
        onClick={() => dispatch(deleteTransaction(transaction._id))}
        className='absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity'
      >
        X
      </button>
    </div>
  );
}

export default TransactionItem;