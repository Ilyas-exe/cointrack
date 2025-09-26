import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, updateTransaction } from '../features/transactions/transactionSlice';
import Modal from 'react-modal';
import { FaEdit } from 'react-icons/fa';

const customStyles = { /* ... You can add custom modal styles here if you want ... */ };

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
    dispatch(updateTransaction({ ...transaction, text, amount: +amount }));
    closeModal();
  };

  return (
    <div className={`bg-slate-800 p-4 rounded-lg flex justify-between items-center border-l-4 relative group ${transaction.type === 'income' ? 'border-green-500' : 'border-red-500'}`}>
      <div>
        <h3 className='font-bold text-lg'>{transaction.text}</h3>
        <p className='text-sm text-slate-400'>{new Date(transaction.createdAt).toLocaleDateString('en-US')}</p>
      </div>
      <div className={`font-bold text-xl ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
        {transaction.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(Math.abs(transaction.amount) * rate)}
      </div>

      <div className='absolute top-1 right-1 flex gap-2'>
        <button onClick={openModal} className='text-white w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity'><FaEdit /></button>
        <button onClick={() => dispatch(deleteTransaction(transaction._id))} className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity'>X</button>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit Transaction" overlayClassName="fixed inset-0 bg-black/75" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className='text-2xl font-bold text-center mb-6'>Edit Transaction</h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label htmlFor='text' className='block mb-2 font-medium'>Description</label>
            <input type='text' name='text' id='text' value={text} onChange={onChange} className='w-full p-3 bg-slate-700 rounded-md' />
          </div>
          <div className='mb-6'>
            <label htmlFor='amount' className='block mb-2 font-medium'>Amount</label>
            <input type='number' name='amount' id='amount' value={amount} onChange={onChange} className='w-full p-3 bg-slate-700 rounded-md' />
          </div>
          <button type='submit' className='w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700'>Update Transaction</button>
        </form>
      </Modal>
    </div>
  );
}

export default TransactionItem;