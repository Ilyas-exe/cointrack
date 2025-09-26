// src/pages/Dashboard.jsx
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
    if (user) dispatch(getTransactions());
  }, [user, navigate, dispatch]);

  if (isLoading) { return <h2 className='text-center text-2xl mt-12'>Loading...</h2>; }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <section className='text-left mb-12'>
        <h1 className='text-4xl font-bold'>Welcome Back, {user && user.name.split(' ')[0]}</h1>
        <p className='text-slate-400 mt-2'>Here's your financial overview.</p>
      </section>
      
      <Summary />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
        
        {/* --- SLOT 1 & 2: Transactions and Form --- */}
        <div className='bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col h-[525px]'>
            <h2 className='text-2xl font-bold mb-6'>Recent Transactions</h2>
            <div className='flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-slate-700'>
                {transactions.length > 0 ? (
                    <div className='space-y-4'>
                        <AnimatePresence>
                            {transactions.map((transaction) => (
                                <TransactionItem key={transaction._id} transaction={transaction} />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className='h-full flex items-center justify-center'>
                     <p className='text-center text-slate-500'>No transactions yet.</p>
                    </div>
                )}
            </div>
        </div>
        
        <TransactionForm />

        {/* --- SLOT 3 & 4: Future and Recurring --- */}
        <div className='bg-slate-800 p-6 rounded-xl shadow-lg'>
             <h2 className='text-2xl font-bold mb-6 text-center'>Future Feature</h2>
             <p className='text-center text-slate-500'>This space is ready for your next great idea!</p>
        </div>

        <RecurringExpenses />

      </div>
      
      {/* --- SLOT 5: Chart --- */}
      <TransactionChart />
    </motion.div>
  );
}

export default Dashboard;