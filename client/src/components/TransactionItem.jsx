import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, updateTransaction } from '../features/transactions/transactionSlice';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaBriefcase, FaMoneyBillWave, FaEdit, FaTimes } from 'react-icons/fa';

const customStyles = { /* ... You can add custom modal styles here if you want ... */ };

const getIconForTransaction = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('salary') || lowerText.includes('freelance')) return <FaBriefcase className="text-sky-400"/>;
    if (lowerText.includes('shop') || lowerText.includes('grocer')) return <FaShoppingBag className="text-amber-400"/>;
    return <FaMoneyBillWave className="text-emerald-400"/>;
};

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const { selectedCurrency, rates } = useSelector((state) => state.currency);
  const rate = rates[selectedCurrency] || 1;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: transaction.text,
    amount: transaction.amount,
  });
  const { text, amount } = formData;

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const amountInUSD = +amount / rate;
    dispatch(updateTransaction({ ...transaction, text, amount: amountInUSD }));
    closeModal();
  };

  return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`bg-slate-800 p-4 rounded-lg flex items-center gap-4 shadow-md relative group`}
        >
            <div className='bg-slate-700 p-3 rounded-full'>
                {getIconForTransaction(transaction.text)}
            </div>
            <div className='flex-grow'>
                <h3 className='font-bold text-lg'>{transaction.text}</h3>
                <p className='text-sm text-slate-400'>{new Date(transaction.createdAt).toLocaleDateString('en-US')}</p>
            </div>
            <div className={`font-bold text-lg text-right ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(Math.abs(transaction.amount) * rate)}
            </div>
            
            <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button onClick={openModal} className='text-slate-400 hover:text-white'><FaEdit /></button>
                <button onClick={() => dispatch(deleteTransaction(transaction._id))} className='text-slate-400 hover:text-red-500'><FaTimes /></button>
            </div>
            {/* The Modal JSX is the same */}
        </motion.div>
    );
}

export default TransactionItem;