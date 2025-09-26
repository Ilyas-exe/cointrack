import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import TransactionForm from '../components/TransactionForm';
import Summary from '../components/Summary';
import { getTransactions, reset } from '../features/transactions/transactionSlice';
import TransactionItem from '../components/TransactionItem';
import TransactionChart from '../components/TransactionChart';
import RecurringExpenses from '../components/RecurringExpenses';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (!user) navigate('/login');
    dispatch(getTransactions());
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <section className='text-left mb-12'>
        <h1 className='text-4xl font-bold'>Welcome Back, {user && user.name.split(' ')[0]}</h1>
        <p className='text-slate-400 mt-2'>Here's your financial overview for today.</p>
      </section>
      
      <Summary />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12'>
        {/* Main Column: Transactions List */}
        <section className='lg:col-span-2'>
          <h2 className='text-2xl font-bold mb-6'>Recent Transactions</h2>
          <div className='space-y-4'>
            <AnimatePresence>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionItem key={transaction._id} transaction={transaction} />
                ))
              ) : (
                <p className='text-center text-slate-500 mt-8'>No transactions yet. Add one to get started!</p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Sidebar: Form and Recurring */}
        <aside className='lg:col-span-1 flex flex-col gap-8'>
          <TransactionForm />
          <RecurringExpenses />
        </aside>
      </div>
      
      <TransactionChart />
    </motion.div>
  );
}

export default Dashboard;