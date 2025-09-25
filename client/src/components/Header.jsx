import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='flex justify-between items-center p-4 border-b border-slate-700 mb-8'>
      <div className='logo'>
        <Link to='/' className='text-2xl font-bold text-white'>
          CoinTrack
        </Link>
      </div>
      <nav>
        <ul className='flex items-center gap-4'>
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;