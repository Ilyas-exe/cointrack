import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import CurrencySelector from './CurrencySelector';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  return (
    <header className='flex justify-between items-center p-4 border-b border-slate-700 mb-8'>
      <div className='logo'>
        <Link to='/' className='text-2xl font-bold text-white'>
          CoinTrack
        </Link>
      </div>
      <nav className='flex items-center gap-4'>
        <CurrencySelector />
        <ul className='flex items-center'>
          {user ? (
            // If user is logged in
            <li>
              <button
                onClick={onLogout}
                className='bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 transition duration-300'
              >
                Logout
              </button>
            </li>
          ) : (
            // If user is logged out
            <>
              <li>
                <Link to='/login' className='py-2 px-4 rounded-md hover:bg-slate-800 transition duration-300'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register' className='bg-sky-600 py-2 px-4 rounded-md hover:bg-sky-700 transition duration-300'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;