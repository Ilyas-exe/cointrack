import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TransactionForm from '../components/TransactionForm';
import { getTransactions, reset } from '../features/transactions/transactionSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message); // Or use a toast
    }

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getTransactions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold'>Welcome {user && user.name}</h1>
        <p className='text-slate-400 mt-2'>Your Personal Finance Dashboard</p>
      </section>

      <TransactionForm />

      <section className='mt-12'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Your Transactions</h2>
        {transactions.length > 0 ? (
          <div className='space-y-4 max-w-xl mx-auto'>
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className={`bg-slate-800 p-4 rounded-lg flex justify-between items-center border-l-4 ${
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
              </div>
            ))}
          </div>
        ) : (
          <h3 className='text-center text-slate-500'>You have not set any transactions yet.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;