import { useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Summary() {
    // ... (all the currency logic is the same)
    const { transactions } = useSelector((state) => state.transactions);
    const { selectedCurrency, rates } = useSelector((state) => state.currency);
    const rate = rates[selectedCurrency] || 1;

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, item) => acc + item.amount, 0);
    const balance = totalIncome - totalExpenses;

    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(amount * rate);

    const cardVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    };

    return (
        <section className='grid md:grid-cols-3 gap-6 mb-12'>
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }} className='bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-4'>
                <div className='bg-green-500/20 p-3 rounded-full'><FaArrowUp className='text-green-400' size={24}/></div>
                <div>
                    <h3 className='text-slate-400 text-lg'>Total Income</h3>
                    <p className='text-2xl font-bold text-green-400'>{formatCurrency(totalIncome)}</p>
                </div>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }} className='bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-4'>
                <div className='bg-red-500/20 p-3 rounded-full'><FaArrowDown className='text-red-400' size={24}/></div>
                <div>
                    <h3 className='text-slate-400 text-lg'>Total Expenses</h3>
                    <p className='text-2xl font-bold text-red-400'>{formatCurrency(totalExpenses)}</p>
                </div>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }} className='bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-4'>
                <div className='bg-sky-500/20 p-3 rounded-full'><FaBalanceScale className='text-sky-400' size={24}/></div>
                <div>
                    <h3 className='text-slate-400 text-lg'>Balance</h3>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>{formatCurrency(balance)}</p>
                </div>
            </motion.div>
        </section>
    );
}

export default Summary;