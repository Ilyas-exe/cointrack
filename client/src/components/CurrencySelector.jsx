// src/components/CurrencySelector.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRates, setCurrency } from '../features/currency/currencySlice';

function CurrencySelector() {
  const dispatch = useDispatch();
  const { rates, selectedCurrency, isLoading } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch]);

  const handleCurrencyChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  if (isLoading || Object.keys(rates).length === 0) {
    return <div className='text-sm'>Loading rates...</div>;
  }

  return (
    <select
      value={selectedCurrency}
      onChange={handleCurrencyChange}
      className='bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500'
    >
      {Object.keys(rates).map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelector;