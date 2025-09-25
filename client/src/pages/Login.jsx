import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className='max-w-md mx-auto mt-10 bg-slate-800 p-8 rounded-xl shadow-lg'>
        <section className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-slate-400 mt-2'>Login to track your finances</p>
        </section>
        <section>
          <form onSubmit={onSubmit}>
            <div className='mb-4'>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='mb-6'>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Enter password'
                required
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition duration-300'
              >
                Sign In
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;