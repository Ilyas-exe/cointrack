import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TransactionForm from '../components/TransactionForm';
import Summary from '../components/Summary';
import { getTransactions, reset } from '../features/transactions/transactionSlice';
import TransactionItem from '../components/TransactionItem';
import TransactionChart from '../components/TransactionChart';

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

      <Summary />

      <TransactionForm />

      <section className='mt-12'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Your Transactions</h2>
        {transactions.length > 0 ? (
          <div className='space-y-4 max-w-xl mx-auto'>
            {transactions.map((transaction) => (
              <TransactionItem key={transaction._id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <h3 className='text-center text-slate-500'>You have not set any transactions yet.</h3>
        )}
      </section>
      <TransactionChart />
    </>
  );
}

export default Dashboard;